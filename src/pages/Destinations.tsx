
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

const popularDestinations = [
  {
    name: 'Goa',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    properties: 1204,
    description: 'Sun-kissed beaches, vibrant nightlife, and Portuguese heritage'
  },
  {
    name: 'Jaipur',
    image: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80',
    properties: 932,
    description: 'The Pink City with majestic palaces, bustling bazaars, and rich Rajasthani culture'
  },
  {
    name: 'Darjeeling',
    image: 'https://images.unsplash.com/photo-1544085311-11a028465b03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
    properties: 645,
    description: 'Breathtaking Himalayan views, tea plantations, and the world-famous toy train'
  },
  {
    name: 'Varanasi',
    image: 'https://images.unsplash.com/photo-1561361058-c24cecce58eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    properties: 578,
    description: 'The spiritual capital of India with ancient ghats, temples, and vibrant ceremonies'
  },
  {
    name: 'Kerala',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    properties: 891,
    description: 'Serene backwaters, ayurvedic retreats, and lush green landscapes'
  },
  {
    name: 'Udaipur',
    image: 'https://images.unsplash.com/photo-1622397815608-359542a19ad4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    properties: 764,
    description: 'The City of Lakes with romantic palaces, serene waters, and royal heritage'
  },
  {
    name: 'Shimla',
    image: 'https://images.unsplash.com/photo-1626621331169-5f34be280ed9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    properties: 698,
    description: 'Colonial architecture, forested hills, and snow-capped Himalayan views'
  },
  {
    name: 'Agra',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
    properties: 520,
    description: 'Home to the Taj Mahal, Agra Fort, and rich Mughal heritage'
  },
  {
    name: 'Rishikesh',
    image: 'https://images.unsplash.com/photo-1600257934236-10220100a084?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    properties: 423,
    description: 'The yoga capital with sacred Ganges, ashrams, and adventure activities'
  }
];

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDestinations, setFilteredDestinations] = useState(popularDestinations);
  
  useEffect(() => {
    const filtered = popularDestinations.filter(destination => 
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDestinations(filtered);
  }, [searchTerm]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Explore India's Top Destinations</h1>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Discover the diverse beauty of India, from the beaches of Goa to the mountains of Darjeeling. 
              Find the perfect stay in your dream destination.
            </p>
            
            <div className="max-w-md mx-auto mt-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border bg-background text-foreground"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {filteredDestinations.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No destinations found matching your search.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setSearchTerm('')}
              >
                Clear search
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((destination) => (
                <Link 
                  key={destination.name}
                  to={`/listings?location=${destination.name}`}
                  className="group relative h-80 rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl font-bold text-shadow">{destination.name}</h3>
                    <p className="text-white/90 text-shadow-lg text-sm mb-2">
                      {destination.properties} properties
                    </p>
                    <p className="text-white/90 text-shadow-lg text-sm line-clamp-2">
                      {destination.description}
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {destination.properties} stays
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Destinations;
