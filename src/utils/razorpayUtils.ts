
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    script.onload = () => {
      resolve(true);
    };
    
    script.onerror = () => {
      console.error('Razorpay SDK failed to load');
      resolve(false);
    };
    
    document.body.appendChild(script);
  });
};

export const initializeRazorpay = (
  options: RazorpayOptions,
  onSuccess?: () => void,
  onError?: (error: any) => void
) => {
  try {
    const rzp = new window.Razorpay(options);
    rzp.open();
    return rzp;
  } catch (error) {
    console.error('Error initializing Razorpay:', error);
    if (onError) onError(error);
    return null;
  }
};

export const updateBookingStatus = async (bookingId: string, status: 'paid' | 'cancelled') => {
  try {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId);
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error updating booking status:', error);
    toast({
      title: "Update Error",
      description: "There was an error updating your booking. Please contact support.",
      variant: "destructive",
    });
    return false;
  }
};
