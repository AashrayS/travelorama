
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building, Car, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import TransportCard from '@/components/TransportCard';
import CommunityCard from '@/components/CommunityCard';

// Mock Data with India-centric properties
const featuredProperties = [
  {
    id: '1',
    title: 'Luxury Lakeside Villa in Udaipur',
    location: 'Udaipur, Rajasthan',
    price: 15999,
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Villa',
  },
  {
    id: '2',
    title: 'Modern Apartment with Sea View',
    location: 'Marine Drive, Mumbai',
    price: 8999,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Apartment',
  },
  {
    id: '3',
    title: 'Heritage Haveli with Private Courtyard',
    location: 'Jaipur, Rajasthan',
    price: 12500,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Heritage Home',
  },
  {
    id: '4',
    title: 'Beachfront Cottage in Goa',
    location: 'Calangute, Goa',
    price: 7999,
    rating: 4.85,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Beach House',
  },
  {
    id: '5',
    title: 'Luxury Penthouse in Cyber City',
    location: 'Gurugram, Haryana',
    price: 18500,
    rating: 4.92,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Penthouse',
  },
];

const popularTransport = [
  {
    id: '1',
    title: 'Tata Nexon EV',
    location: 'Delhi, NCR',
    price: 2499,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1612804726863-56264aa868e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
    type: 'Electric SUV',
    seats: 5,
    transmission: 'Automatic',
  },
  {
    id: '2',
    title: 'Mahindra Thar',
    location: 'Manali, Himachal Pradesh',
    price: 3200,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'SUV',
    seats: 4,
    transmission: 'Manual',
  },
  {
    id: '3',
    title: 'Bajaj Chetak Electric',
    location: 'Jaipur, Rajasthan',
    price: 799,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1558980664-3a031fbc6931?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
    type: 'Electric Scooter',
    seats: 2,
    transmission: 'Automatic',
  },
  {
    id: '4',
    title: 'Honda City',
    location: 'Bengaluru, Karnataka',
    price: 1999,
    rating: 4.85,
    image: 'https://images.unsplash.com/photo-1549399542-7e8f2e0ce858?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
    type: 'Sedan',
    seats: 5,
    transmission: 'Automatic',
  },
];

const communityRecommendations = [
  {
    id: '1',
    title: 'Secret Beach in Varkala',
    location: 'Varkala, Kerala',
    description: 'A hidden beach cove that\'s perfect for watching the sunset. The path down is through a small fishing village and absolutely worth it for the privacy and stunning views. Great for early morning yoga sessions and evening relaxation.',
    image: 'https://images.unsplash.com/photo-1621329688238-ff730aa7a2a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    upvotes: 142,
    downvotes: 5,
    comments: 32,
    author: {
      name: 'Arjun Sharma',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
  },
  {
    id: '2',
    title: 'Dhabba Khana - Authentic Punjabi Food',
    location: 'Amritsar, Punjab',
    description: 'This family-owned dhaba serves the most authentic Punjabi food in Amritsar. It\'s tucked away from the tourist areas and offers amazing food at reasonable prices. The butter chicken and dal makhani are must-tries!',
    image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2090&q=80',
    upvotes: 98,
    downvotes: 2,
    comments: 18,
    author: {
      name: 'Priya Patel',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
  },
];

const destinations = [
  {
    name: 'Goa',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    properties: 1204,
  },
  {
    name: 'Jaipur',
    image: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80',
    properties: 932,
  },
  {
    name: 'Darjeeling',
    image: 'https://images.unsplash.com/photo-1544085311-11a028465b03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
    properties: 645,
  },
];

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
            alt="India destination"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
        </div>
        
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in text-shadow-lg">
            Discover India, Your Way
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 animate-fade-in text-shadow">
            Find perfect stays, transportation, and hidden gems across India's diverse landscapes
          </p>
          
          <div className="max-w-5xl mx-auto mt-10 animate-slide-up">
            <SearchBar isHero={true} />
          </div>
        </div>
      </section>
      
      {/* Popular Destinations */}
      <section className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Popular Destinations in India</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {destinations.map((destination) => (
            <Link 
              key={destination.name}
              to={`/listings?location=${destination.name}`}
              className="group relative h-80 rounded-xl overflow-hidden"
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-xl font-bold text-shadow">{destination.name}</h3>
                <p className="text-white/90 text-shadow-lg">
                  {destination.properties} properties
                </p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button variant="outline" asChild className="rounded-full">
            <Link to="/destinations" className="gap-2 group">
              View all destinations
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Featured Listings */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Places to Stay</h2>
          <Button variant="ghost" asChild className="group">
            <Link to="/listings" className="gap-2">
              View all
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property, index) => (
            <PropertyCard
              key={property.id}
              {...property}
              isFeatured={index === 0}
            />
          ))}
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose StayBeyond</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Your all-in-one travel platform for exploring India - book accommodations, 
              rent transportation, and discover local gems from fellow travelers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-xl text-center animate-zoom-in border-india-pattern">
              <div className="w-16 h-16 rounded-full bg-india-saffron/10 flex items-center justify-center mx-auto mb-4">
                <Building size={24} className="text-india-saffron" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Perfect Stays</h3>
              <p className="text-muted-foreground">
                Browse thousands of accommodations from heritage havelis to luxury resorts, 
                verified by our team for quality and authenticity.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl text-center animate-zoom-in delay-100 border-india-pattern">
              <div className="w-16 h-16 rounded-full bg-india-green/10 flex items-center justify-center mx-auto mb-4">
                <Car size={24} className="text-india-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Book Transport Easily</h3>
              <p className="text-muted-foreground">
                Rent cars, bikes, and more from trusted providers to explore India's diverse 
                landscapes with complete freedom.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl text-center animate-zoom-in delay-200 border-india-pattern">
              <div className="w-16 h-16 rounded-full bg-india-navy/10 flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} className="text-india-navy" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover Local Gems</h3>
              <p className="text-muted-foreground">
                Explore community-recommended attractions, street food, and hidden spots that 
                only locals know about across India.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popular Transport */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Popular Transport Options</h2>
          <Button variant="ghost" asChild className="group">
            <Link to="/transport-listings" className="gap-2">
              View all
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularTransport.map((transport) => (
            <TransportCard
              key={transport.id}
              {...transport}
            />
          ))}
        </div>
      </section>
      
      {/* Community Recommendations */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Community Recommendations</h2>
          <Button variant="ghost" asChild className="group">
            <Link to="/community" className="gap-2">
              View all
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {communityRecommendations.map((recommendation) => (
            <CommunityCard
              key={recommendation.id}
              {...recommendation}
            />
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="India landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-shadow-lg">
              Share Your Own Place or Vehicle
            </h2>
            <p className="text-white/90 text-lg mb-6 text-shadow">
              Become a host on StayBeyond and earn extra income by sharing your property 
              or vehicle with travelers exploring India.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full" asChild>
                <Link to="/become-host">
                  <Building className="mr-2" size={18} />
                  List your property
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20" asChild>
                <Link to="/list-vehicle">
                  <Car className="mr-2" size={18} />
                  List your vehicle
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
