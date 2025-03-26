import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Calendar, Users, Shield, Award, Check, ChevronDown, ChevronUp, MessageSquare, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const property = {
  id: '1',
  title: 'Modern Beach House with Ocean View',
  description: 'Stunning beach house with panoramic ocean views, located just steps from the sand. This spacious property features 4 bedrooms, 3 bathrooms, and a large deck perfect for entertaining and watching the sunset. Modern amenities include a fully equipped kitchen, high-speed WiFi, and smart home features.',
  location: 'Malibu, California',
  price: 299,
  rating: 4.95,
  reviewCount: 124,
  images: [
    'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1615529182904-14819c35db37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1600607687644-c7531e451e23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1669071192880-0a94316e6e09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  ],
  type: 'Entire villa',
  bedrooms: 4,
  bathrooms: 3,
  guests: 8,
  amenities: [
    { name: 'Beach access', description: 'Direct access to the beach via private path' },
    { name: 'Pool', description: 'Private outdoor pool with sun loungers' },
    { name: 'Wifi', description: 'High-speed internet throughout the property' },
    { name: 'Kitchen', description: 'Fully equipped modern kitchen with island' },
    { name: 'Free parking', description: 'Two car garage and additional driveway parking' },
    { name: 'Air conditioning', description: 'Central AC with smart thermostat' },
    { name: 'Washer & Dryer', description: 'In-unit laundry facilities' },
    { name: 'Patio', description: 'Large deck with ocean views and outdoor furniture' },
  ],
  host: {
    name: 'Michael Scott',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    joinDate: 'January 2018',
    isSuperhost: true,
    responseRate: 99,
    responseTime: 'within an hour',
  },
  reviews: [
    {
      id: '1',
      user: {
        name: 'Emma Thompson',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      rating: 5,
      date: 'March 2023',
      comment: 'Absolutely stunning place with incredible views. The house was immaculate and had everything we needed for a perfect beach getaway. Michael was an excellent host, very responsive and provided great local recommendations. Would definitely stay again!',
    },
    {
      id: '2',
      user: {
        name: 'David Chen',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      },
      rating: 5,
      date: 'February 2023',
      comment: 'We had an amazing time at this beach house. The location is perfect - just steps from the beach and the views are even better than in the photos. The house itself is beautiful, spacious and well equipped with high-end finishes. Highly recommend!',
    },
    {
      id: '3',
      user: {
        name: 'Sophia Martinez',
        avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      },
      rating: 4,
      date: 'January 2023',
      comment: 'Great location and beautiful property. We loved being so close to the beach and the pool was a nice bonus. The only reason for 4 stars instead of 5 is that we had some minor issues with the WiFi, but Michael was very responsive and got it fixed quickly.',
    },
  ],
  location_details: {
    address: '123 Ocean Drive, Malibu, CA 90265',
    lat: 34.0259,
    lng: -118.7798,
    description: 'Located in a quiet residential area with easy access to restaurants, shopping, and outdoor activities. The property is 5 miles from downtown Malibu and a 45-minute drive from Los Angeles International Airport.',
  },
};

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showAllDescription, setShowAllDescription] = useState(false);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestCount, setGuestCount] = useState(2);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageSliderVisible, setImageSliderVisible] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  
  const handleBookNow = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to book this property",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }
    
    if (!checkInDate || !checkOutDate) {
      toast({
        title: "Dates Required",
        description: "Please select check-in and check-out dates",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          property_id: id,
          user_id: user.id,
          check_in: checkInDate,
          check_out: checkOutDate,
          total_price: total,
          status: 'pending'
        })
        .select();
      
      if (error) throw error;
      
      setBookingId(data[0].id);
      
      toast({
        title: "Booking Confirmed!",
        description: "Please proceed to payment to complete your booking.",
      });
      
      setShowPaymentDialog(true);
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: "Booking Failed",
        description: "There was an issue creating your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handlePaymentInitiation = () => {
    if (!bookingId) return;
    
    const options = {
      key: "rzp_test_JGb8T6Pfgi7zLz",
      amount: total * 100,
      currency: "INR",
      name: "StayBeyond",
      description: `Booking for ${property.title}`,
      image: "https://example.com/your_logo",
      order_id: "",
      handler: function (response) {
        handlePaymentSuccess(response);
      },
      prefill: {
        name: user?.email,
        email: user?.email,
      },
      notes: {
        booking_id: bookingId,
        property_id: id
      },
      theme: {
        color: "#3B82F6"
      }
    };
    
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  
  const handlePaymentSuccess = async (response) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'paid' })
        .eq('id', bookingId);
      
      if (error) throw error;
      
      toast({
        title: "Payment Successful!",
        description: "Your booking is confirmed. Enjoy your stay!",
      });
      
      setShowPaymentDialog(false);
      
      navigate('/bookings/confirmed');
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast({
        title: "Payment Error",
        description: "Payment was received but we couldn't update your booking. Please contact support.",
        variant: "destructive",
      });
    }
  };
  
  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate) return 0;
    
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return property.price * diffDays;
  };
  
  const totalPrice = calculateTotalPrice();
  const serviceFee = totalPrice * 0.12;
  const total = totalPrice + serviceFee;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-4">
            <Button variant="ghost" size="sm" asChild className="flex items-center">
              <Link to="/listings">
                <ArrowLeft size={16} className="mr-1" />
                Back to listings
              </Link>
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="flex items-center">
                <Share2 size={16} className="mr-1" />
                Share
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart 
                  size={16} 
                  className={cn(
                    "mr-1 transition-colors",
                    isFavorite ? "fill-red-500 stroke-red-500" : ""
                  )} 
                />
                {isFavorite ? 'Saved' : 'Save'}
              </Button>
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{property.title}</h1>
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex items-center">
              <Star size={16} className="fill-yellow-400 stroke-yellow-400 mr-1" />
              <span className="font-medium">{property.rating}</span>
              <span className="mx-1 text-muted-foreground">·</span>
              <span className="text-muted-foreground">{property.reviewCount} reviews</span>
            </div>
            
            <div className="flex items-center">
              <MapPin size={16} className="text-muted-foreground mr-1" />
              <span>{property.location}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8">
            <div className="md:col-span-2 row-span-2 relative rounded-l-xl overflow-hidden">
              <img 
                src={property.images[0]} 
                alt={property.title}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => {
                  setActiveImageIndex(0);
                  setImageSliderVisible(true);
                }}
              />
            </div>
            
            {property.images.slice(1, 5).map((image, index) => (
              <div 
                key={index}
                className={cn(
                  "relative overflow-hidden", 
                  index === 1 ? "rounded-tr-xl" : "",
                  index === 3 ? "rounded-br-xl" : ""
                )}
              >
                <img 
                  src={image} 
                  alt={`${property.title} ${index + 1}`}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => {
                    setActiveImageIndex(index + 1);
                    setImageSliderVisible(true);
                  }}
                />
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="border-b border-border pb-6 mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      {property.type} hosted by {property.host.name}
                    </h2>
                    <div className="flex items-center flex-wrap gap-2">
                      <span>{property.bedrooms} bedrooms</span>
                      <span>·</span>
                      <span>{property.bathrooms} bathrooms</span>
                      <span>·</span>
                      <span>Up to {property.guests} guests</span>
                    </div>
                  </div>
                  
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={property.host.avatar} alt={property.host.name} />
                    <AvatarFallback>{property.host.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              
              <div className="border-b border-border pb-6 mb-6">
                <div className="flex items-start gap-3">
                  {property.host.isSuperhost && (
                    <div className="flex-shrink-0">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Award size={20} className="text-primary" />
                      </div>
                    </div>
                  )}
                  
                  <div>
                    {property.host.isSuperhost && (
                      <p className="font-medium mb-1">{property.host.name} is a Superhost</p>
                    )}
                    <p className="text-muted-foreground text-sm">
                      Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-b border-border pb-6 mb-6">
                <h2 className="text-xl font-semibold mb-3">About this place</h2>
                <div>
                  <p className={cn(
                    "text-gray-600",
                    !showAllDescription && "line-clamp-3"
                  )}>
                    {property.description}
                  </p>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-2 p-0 h-auto font-medium" 
                    onClick={() => setShowAllDescription(!showAllDescription)}
                  >
                    {showAllDescription ? (
                      <span className="flex items-center">
                        Show less <ChevronUp size={16} className="ml-1" />
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Show more <ChevronDown size={16} className="ml-1" />
                      </span>
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="border-b border-border pb-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.amenities
                    .slice(0, showAllAmenities ? property.amenities.length : 6)
                    .map((amenity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check size={18} className="flex-shrink-0 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">{amenity.name}</p>
                          <p className="text-sm text-muted-foreground">{amenity.description}</p>
                        </div>
                      </div>
                    ))}
                </div>
                
                {property.amenities.length > 6 && (
                  <Button 
                    variant="outline" 
                    className="mt-4" 
                    onClick={() => setShowAllAmenities(!showAllAmenities)}
                  >
                    {showAllAmenities ? 'Show less' : `Show all ${property.amenities.length} amenities`}
                  </Button>
                )}
              </div>
              
              <div className="border-b border-border pb-6 mb-6">
                <div className="flex items-center mb-4">
                  <Star size={20} className="fill-yellow-400 stroke-yellow-400 mr-2" />
                  <h2 className="text-xl font-semibold">
                    {property.rating} · {property.reviewCount} reviews
                  </h2>
                </div>
                
                <div className="space-y-6">
                  {property.reviews.map((review) => (
                    <div key={review.id} className="space-y-2">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-4">
                          <AvatarImage src={review.user.avatar} alt={review.user.name} />
                          <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{review.user.name}</p>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
                
                {property.reviewCount > 3 && (
                  <Button className="mt-6" variant="outline">
                    Show all {property.reviewCount} reviews
                  </Button>
                )}
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Where you'll be</h2>
                <p className="mb-4 text-gray-600">{property.location_details.description}</p>
                <div className="bg-muted h-64 rounded-xl overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="map"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(property.location)}`}
                    style={{ border: 0 }}
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-24 glass rounded-xl p-6 shadow-sm border border-border">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xl font-semibold">
                      ${property.price} <span className="text-sm font-normal">night</span>
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Star size={16} className="fill-yellow-400 stroke-yellow-400 mr-1" />
                    <span>{property.rating}</span>
                    <span className="mx-1">·</span>
                    <span className="text-muted-foreground text-sm">{property.reviewCount} reviews</span>
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
                        {Array.from({ length: property.guests }, (_, i) => i + 1).map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'guest' : 'guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={handleBookNow}
                      disabled={!checkInDate || !checkOutDate || isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Book now'}
                    </Button>
                    
                    {checkInDate && checkOutDate && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>
                            ${property.price} x {Math.ceil(totalPrice / property.price)} nights
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
                            <AvatarImage src={property.host.avatar} alt={property.host.name} />
                            <AvatarFallback>{property.host.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{property.host.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Joined {property.host.joinDate}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Shield size={16} />
                        <span>To protect your payment, never transfer money or communicate outside of the Masterplan website.</span>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Response rate: {property.host.responseRate}%</h3>
                        <p className="text-sm text-muted-foreground">
                          Usually responds {property.host.responseTime}
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
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
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
              onClick={handlePaymentInitiation}
            >
              Proceed to Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PropertyDetails;
