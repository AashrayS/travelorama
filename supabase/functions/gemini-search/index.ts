
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.23.0';

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GEMINI_MODEL = "gemini-1.5-flash";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/";

// Create a Supabase client with the admin key for accessing all database contents
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    
    // Fetch data from all relevant tables
    const [properties, transports, communityRecs] = await Promise.all([
      supabase.from('properties').select('*'),
      supabase.from('transports').select('*'),
      supabase.from('community_recommendations').select('*')
    ]);
    
    // Compile all data into a JSON string for context
    const databaseContext = {
      properties: properties.data || [],
      transports: transports.data || [],
      community_recommendations: communityRecs.data || []
    };

    // Context for Gemini to understand database schema
    const systemContext = `
      You are an AI assistant helping search through a travel database with the following tables:
      
      1. properties - contains accommodation listings with fields: id, title, description, location, price, type, rating
      2. transports - contains vehicle/transport options with fields: id, title, description, location, price, type, seats, transmission
      3. community_recommendations - community-contributed travel tips with fields: id, title, description, location, upvotes, downvotes

      When a user asks a question, search through the database context I provide and return the most relevant results.
      Format your response as JSON with the structure: {"results": [...items], "explanation": "reason for selection"}
      
      Current database context:
      ${JSON.stringify(databaseContext, null, 2)}
    `;

    // Make request to Gemini API
    const response = await fetch(`${GEMINI_API_URL}${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: systemContext },
              { text: `Search query: "${query}"` }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      }),
    });

    const geminiResult = await response.json();
    
    // Extract the response text
    let aiResponse = {};
    try {
      const responseText = geminiResult.candidates[0].content.parts[0].text;
      // Parse the JSON from the response text
      const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) || 
                         responseText.match(/```\n([\s\S]*?)\n```/) ||
                         [null, responseText];
      
      const cleanedJson = jsonMatch[1].trim();
      aiResponse = JSON.parse(cleanedJson);
    } catch (error) {
      console.error("Error parsing Gemini response:", error);
      aiResponse = { 
        results: [], 
        explanation: "Error processing results. The AI response couldn't be parsed correctly." 
      };
    }

    return new Response(JSON.stringify(aiResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in gemini-search function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
