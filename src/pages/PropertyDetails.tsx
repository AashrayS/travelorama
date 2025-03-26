import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Award } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { loadRazorpayScript, initializeRazorpay, updateBookingStatus } from '@/utils/razorpayUtils';
import PropertyHeader from '@/components/property/PropertyHeader';
import PropertyImages from '@/components/property/PropertyImages';
import PropertyDescription from '@/components/property/PropertyDescription';
import PropertyAmenities from '@/components/property/PropertyAmenities';
import PropertyReviews from '@/components/property/PropertyReviews';
import PropertyLocation from '@/components/property/PropertyLocation';
import BookingCard from '@/components/property/BookingCard';
import PaymentDialog from '@/components/property/PaymentDialog';

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
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestCount, setGuestCount] = useState(2);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageSliderVisible, setImageSliderVisible] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    loadRazorpayScript();
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
      key: "rzp_test_YOUR_TEST_KEY_ID",
      amount: total * 100,
      currency: "INR",
      name: "StayBeyond",
      description: `Booking for ${property.title}`,
      image: "https://example.com/your_logo",
      order_id: "",
      handler: function (response: RazorpayResponse) {
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
    
    initializeRazorpay(options);
  };
  
  const handlePaymentSuccess = async (response: RazorpayResponse) => {
    try {
      await updateBookingStatus(bookingId!, 'paid');
      
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
          <PropertyHeader
            title={property.title}
            location={property.location}
            rating={property.rating}
            reviewCount={property.reviewCount}
            isFavorite={isFavorite}
            onToggleFavorite={() => setIsFavorite(!isFavorite)}
          />
          
          <PropertyImages
            images={property.images}
            title={property.title}
            onViewImage={(index) => {
              setActiveImageIndex(index);
              setImageSliderVisible(true);
            }}
          />
          
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
              
              <PropertyDescription description={property.description} />
              <PropertyAmenities amenities={property.amenities} />
              <PropertyReviews
                rating={property.rating}
                reviewCount={property.reviewCount}
                reviews={property.reviews}
              />
              <PropertyLocation 
                location={property.location}
                locationDetails={property.location_details}
              />
            </div>
            
            <div className="lg:col-span-1">
              <BookingCard
                price={property.price}
                rating={property.rating}
                reviewCount={property.reviewCount}
                guests={property.guests}
                host={property.host}
                onBookNow={handleBookNow}
                checkInDate={checkInDate}
                setCheckInDate={setCheckInDate}
                checkOutDate={checkOutDate}
                setCheckOutDate={setCheckOutDate}
                guestCount={guestCount}
                setGuestCount={setGuestCount}
                totalPrice={totalPrice}
                serviceFee={serviceFee}
                total={total}
                isProcessing={isProcessing}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <PaymentDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        guestCount={guestCount}
        total={total}
        onPaymentInitiation={handlePaymentInitiation}
      />
    </div>
  );
};

export default PropertyDetails;
