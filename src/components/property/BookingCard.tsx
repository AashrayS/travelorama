
import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Shield } from 'lucide-react';

interface Host {
  name: string;
  avatar: string;
  joinDate: string;
  isSuperhost: boolean;
  responseRate: number;
  responseTime: string;
}

interface BookingCardProps {
  price: number;
  rating: number;
  reviewCount: number;
  guests: number;
  host: Host;
  onBookNow: () => void;
  checkInDate: string;
  setCheckInDate: (date: string) => void;
  checkOutDate: string;
  setCheckOutDate: (date: string) => void;
  guestCount: number;
  setGuestCount: (count: number) => void;
  totalPrice: number;
  serviceFee: number;
  total: number;
  isProcessing: boolean;
}

const BookingCard = ({
  price,
  rating,
  reviewCount,
  guests,
  host,
  onBookNow,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  guestCount,
  setGuestCount,
  totalPrice,
  serviceFee,
  total,
  isProcessing
}: BookingCardProps) => {
  return (
    <div className="sticky top-24 glass rounded-xl p-6 shadow-sm border border-border">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xl font-semibold">
            ${price} <span className="text-sm font-normal">night</span>
          </p>
        </div>
        <div className="flex items-center">
          <Star size={16} className="fill-yellow-400 stroke-yellow-400 mr-1" />
          <span>{rating}</span>
          <span className="mx-1">·</span>
          <span className="text-muted-foreground text-sm">{reviewCount} reviews</span>
        </div>
      </div>
      
      <Tabs defaultValue="booking" className="mb-4">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="booking">Booking</TabsTrigger>
          <TabsTrigger value="contact">Contact host</TabsTrigger>
        </TabsList>
        <TabsContent value="booking" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-sm font-medium">Check-in</label>
              <input
                type="date"
                className="w-full border border-input rounded-md p-2"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Check-out</label>
              <input
                type="date"
                className="w-full border border-input rounded-md p-2"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium">Guests</label>
            <select
              className="w-full border border-input rounded-md p-2"
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
            >
              {Array.from({ length: guests }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'guest' : 'guests'}
                </option>
              ))}
            </select>
          </div>
          
          <Button 
            className="w-full" 
            size="lg"
            onClick={onBookNow}
            disabled={!checkInDate || !checkOutDate || isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Book now'}
          </Button>
          
          {checkInDate && checkOutDate && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>
                  ${price} x {Math.ceil(totalPrice / price)} nights
                </span>
                <span>${totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Service fee</span>
                <span>${serviceFee.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          )}
          
          <div className="text-center text-sm text-muted-foreground">
            You won't be charged yet
          </div>
        </TabsContent>
        
        <TabsContent value="contact" className="pt-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src={host.avatar} alt={host.name} />
                  <AvatarFallback>{host.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{host.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Joined {host.joinDate}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield size={16} />
              <span>To protect your payment, never transfer money or communicate outside of the Masterplan website.</span>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Response rate: {host.responseRate}%</h3>
              <p className="text-sm text-muted-foreground">
                Usually responds {host.responseTime}
              </p>
            </div>
            
            <div className="pt-2">
              <Button className="w-full" size="lg">
                <MessageSquare size={16} className="mr-2" />
                Contact host
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingCard;
