
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

// Mock Data
const featuredProperties = [
  {
    id: '1',
    title: 'Modern Beach House with Ocean View',
    location: 'Malibu, California',
    price: 299,
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Entire villa',
  },
  {
    id: '2',
    title: 'Downtown Luxury Loft',
    location: 'New York City, NY',
    price: 189,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80',
    type: 'Apartment',
  },
  {
    id: '3',
    title: 'Mountain Retreat with Hot Tub',
    location: 'Aspen, Colorado',
    price: 250,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Cabin',
  },
  {
    id: '4',
    title: 'Lakefront Cottage with Private Dock',
    location: 'Lake Tahoe, California',
    price: 179,
    rating: 4.85,
    image: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Cottage',
  },
  {
    id: '5',
    title: 'Luxury Penthouse with Sky Lounge',
    location: 'Miami, Florida',
    price: 350,
    rating: 4.92,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Penthouse',
  },
];

const popularTransport = [
  {
    id: '1',
    title: 'Tesla Model 3',
    location: 'San Francisco, CA',
    price: 89,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
    type: 'Electric',
    seats: 5,
    transmission: 'Automatic',
  },
  {
    id: '2',
    title: 'Jeep Wrangler',
    location: 'Denver, CO',
    price: 75,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'SUV',
    seats: 4,
    transmission: 'Manual',
  },
  {
    id: '3',
    title: 'Vespa Primavera',
    location: 'Rome, Italy',
    price: 45,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1558980664-3a031fbc6931?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
    type: 'Scooter',
    seats: 2,
    transmission: 'Automatic',
  },
  {
    id: '4',
    title: 'BMW 3 Series',
    location: 'Los Angeles, CA',
    price: 95,
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
    title: 'Hidden Beach Cove',
    location: 'Big Sur, California',
    description: 'A secluded beach cove that\'s perfect for watching the sunset. The hike down is a bit steep but absolutely worth it for the privacy and stunning views. Bring a picnic and enjoy the peaceful atmosphere.',
    image: 'https://images.unsplash.com/photo-1520942702018-0862200e6873?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    upvotes: 142,
    downvotes: 5,
    comments: 32,
    author: {
      name: 'Alex Morgan',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
  },
  {
    id: '2',
    title: 'Trattoria Giovanni - Best Local Pasta',
    location: 'Florence, Italy',
    description: 'This family-owned restaurant serves the most authentic pasta in Florence. It\'s tucked away from the tourist areas and offers amazing food at reasonable prices. The truffle pasta is a must-try!',
    image: 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2090&q=80',
    upvotes: 98,
    downvotes: 2,
    comments: 18,
    author: {
      name: 'Sophie Williams',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
  },
];

const destinations = [
  {
    name: 'New York',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    properties: 1204,
  },
  {
    name: 'Paris',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80',
    properties: 932,
  },
  {
    name: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
    properties: 1089,
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
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80"
            alt="Beach destination"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
        </div>
        
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in text-shadow-lg">
            Your journey begins here
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 animate-fade-in text-shadow">
            Discover stays, transportation, and hidden gems for your next adventure
          </p>
          
          <div className="max-w-5xl mx-auto mt-10 animate-slide-up">
            <SearchBar isHero={true} />
          </div>
        </div>
      </section>
      
      {/* Popular Destinations */}
      <section className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Popular Destinations</h2>
        
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
            <h2 className="text-3xl font-bold mb-4">Why Choose Masterplan</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              All-in-one travel platform that helps you book accommodations, 
              rent transportation, and discover local gems from real travelers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-xl text-center animate-zoom-in">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Building size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Perfect Stays</h3>
              <p className="text-muted-foreground">
                Browse thousands of accommodations from cozy apartments to luxury villas, 
                verified by our team for quality.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl text-center animate-zoom-in delay-100">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Car size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Book Transport Easily</h3>
              <p className="text-muted-foreground">
                Rent cars, bikes, and more from trusted providers to explore your destination 
                with complete freedom.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl text-center animate-zoom-in delay-200">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover Local Gems</h3>
              <p className="text-muted-foreground">
                Explore community-recommended attractions, restaurants, and hidden spots that 
                only locals know about.
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
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80"
            alt="Nature view"
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
              Become a host on Masterplan and earn extra income by sharing your property 
              or vehicle with travelers from around the world.
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
