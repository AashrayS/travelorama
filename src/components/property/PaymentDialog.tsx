
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  total: number;
  onPaymentInitiation: () => void;
}

const PaymentDialog = ({
  open,
  onOpenChange,
  checkInDate,
  checkOutDate,
  guestCount,
  total,
  onPaymentInitiation,
}: PaymentDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Booking</DialogTitle>
          <DialogDescription>
            Your booking is confirmed! Please complete the payment to secure your reservation.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="font-medium">Booking Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">Check-in:</span>
              <span>{checkInDate}</span>
              <span className="text-muted-foreground">Check-out:</span>
              <span>{checkOutDate}</span>
              <span className="text-muted-foreground">Guests:</span>
              <span>{guestCount}</span>
              <span className="text-muted-foreground">Total Amount:</span>
              <span className="font-medium">₹{total.toFixed(2)}</span>
            </div>
          </div>
          
          <Button 
            className="w-full" 
            onClick={onPaymentInitiation}
          >
            Proceed to Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
