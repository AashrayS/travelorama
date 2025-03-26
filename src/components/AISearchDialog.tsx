
import { useState } from "react";
import { Search, Loader2, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  location: string;
  price?: number;
  type?: string;
  image_url?: string;
  resultType: 'property' | 'transport' | 'recommendation';
}

interface AISearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AISearchDialog = ({ open, onOpenChange }: AISearchDialogProps) => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [explanation, setExplanation] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setResults([]);
    setExplanation("");
    
    try {
      const response = await fetch("/functions/v1/gemini-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      
      if (!response.ok) {
        throw new Error("Search failed. Please try again.");
      }
      
      const data = await response.json();
      
      // Process results from the AI
      const processedResults = Array.isArray(data.results) 
        ? data.results.map((item: any) => ({
            ...item,
            resultType: determineResultType(item)
          }))
        : [];
        
      setResults(processedResults);
      setExplanation(data.explanation || "");
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Failed to search database: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setIsSearching(false);
    }
  };
  
  // Helper function to determine the type of result
  const determineResultType = (item: any): 'property' | 'transport' | 'recommendation' => {
    if (item.type === 'house' || item.type === 'apartment' || item.type === 'villa' || item.type === 'cottage') {
      return 'property';
    } else if (item.type === 'car' || item.type === 'bike' || item.type === 'scooter' || item.seats) {
      return 'transport';
    } else if (item.upvotes !== undefined || item.comments !== undefined) {
      return 'recommendation';
    }
    
    // Default fallback
    return 'property';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>AI Database Search</DialogTitle>
        </DialogHeader>
        
        <div className="flex items-center space-x-2 my-4">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for properties, transport, or recommendations..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
          />
          <Button 
            onClick={handleSearch} 
            disabled={isSearching || !query.trim()}
            variant="secondary"
          >
            {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          </Button>
        </div>
        
        {isSearching && (
          <div className="flex justify-center items-center my-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2">Searching database with AI...</p>
          </div>
        )}
        
        {explanation && !isSearching && (
          <div className="bg-muted p-3 rounded-md mb-4 text-sm">
            <strong>AI Explanation:</strong> {explanation}
          </div>
        )}
        
        {results.length > 0 && !isSearching && (
          <div className="space-y-4">
            <h3 className="font-medium">Search Results ({results.length})</h3>
            {results.map((result) => (
              <Card key={result.id} className="p-4 relative hover:bg-accent transition-colors">
                <div className="absolute top-2 right-2">
                  {result.resultType === 'property' && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Property</span>
                  )}
                  {result.resultType === 'transport' && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Transport</span>
                  )}
                  {result.resultType === 'recommendation' && (
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Recommendation</span>
                  )}
                </div>
                <h4 className="font-bold text-base">{result.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{result.location}</p>
                
                {result.price && (
                  <p className="mt-1 font-medium">₹{result.price.toLocaleString('en-IN')}</p>
                )}
                
                <p className="text-sm mt-2 line-clamp-2">{result.description}</p>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3"
                  onClick={() => {
                    onOpenChange(false);
                    if (result.resultType === 'property') {
                      window.location.href = `/property/${result.id}`;
                    } else if (result.resultType === 'transport') {
                      window.location.href = `/transport-listings?id=${result.id}`;
                    } else {
                      window.location.href = `/community`;
                    }
                  }}
                >
                  View Details
                </Button>
              </Card>
            ))}
          </div>
        )}
        
        {!isSearching && results.length === 0 && query.trim() && !explanation && (
          <div className="text-center my-8 text-muted-foreground">
            <p>No results found. Try a different search term.</p>
          </div>
        )}
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AISearchDialog;
