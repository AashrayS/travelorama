
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Loader, Car, Filter, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TransportCard from '@/components/TransportCard';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

// Mock data
const transports = [
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
    provider: 'Green Mobility',
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
    provider: 'Adventure Rentals',
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
    provider: 'Roman Riders',
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
    provider: 'Premium Auto',
  },
  {
    id: '5',
    title: 'Mountain Bike',
    location: 'Aspen, CO',
    price: 35,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2068&q=80',
    type: 'Bike',
    seats: 1,
    transmission: 'Manual',
    provider: 'Mountain Explorers',
  },
  {
    id: '6',
    title: 'Kayak',
    location: 'Seattle, WA',
    price: 30,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1526188667582-8c4f240cfa76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Boat',
    seats: 1,
    transmission: 'Manual',
    provider: 'Pacific Paddlers',
  },
  {
    id: '7',
    title: 'Mercedes-Benz GLC',
    location: 'Miami, FL',
    price: 110,
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1551830820-330a71b99659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'SUV',
    seats: 5,
    transmission: 'Automatic',
    provider: 'Luxury Fleet',
  },
  {
    id: '8',
    title: 'Honda Metropolitan Scooter',
    location: 'Barcelona, Spain',
    price: 40,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1595970331019-3b2bc16e9890?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Scooter',
    seats: 2,
    transmission: 'Automatic',
    provider: 'Barcelona Wheels',
  },
];

const types = ['Car', 'SUV', 'Sedan', 'Electric', 'Hybrid', 'Scooter', 'Bike', 'Boat'];
const transmissions = ['Automatic', 'Manual'];
const seatCounts = [1, 2, 4, 5, 7, 8];

const TransportListings = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const locationQuery = searchParams.get('location') || '';
  
  const [filteredTransports, setFilteredTransports] = useState(transports);
  const [searchValue, setSearchValue] = useState(locationQuery);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>([]);
  const [selectedSeatCounts, setSelectedSeatCounts] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Filter transports based on selected filters
    const filtered = transports.filter((transport) => {
      // Filter by search value (location or title)
      const matchesSearch = !searchValue 
        || transport.location.toLowerCase().includes(searchValue.toLowerCase())
        || transport.title.toLowerCase().includes(searchValue.toLowerCase());
      
      // Filter by price range
      const matchesPrice = transport.price >= priceRange[0] && transport.price <= priceRange[1];
      
      // Filter by type
      const matchesType = selectedTypes.length === 0 
        || selectedTypes.some(type => transport.type.toLowerCase().includes(type.toLowerCase()));
      
      // Filter by transmission
      const matchesTransmission = selectedTransmissions.length === 0 
        || selectedTransmissions.includes(transport.transmission);
      
      // Filter by seat count
      const matchesSeatCount = selectedSeatCounts.length === 0 
        || selectedSeatCounts.includes(transport.seats);
      
      return matchesSearch && matchesPrice && matchesType && matchesTransmission && matchesSeatCount;
    });
    
    setFilteredTransports(filtered);
  }, [
    searchValue,
    priceRange,
    selectedTypes,
    selectedTransmissions,
    selectedSeatCounts
  ]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search already handled by useEffect
  };
  
  const handleClearFilters = () => {
    setSearchValue(locationQuery);
    setPriceRange([0, 200]);
    setSelectedTypes([]);
    setSelectedTransmissions([]);
    setSelectedSeatCounts([]);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {locationQuery ? `Transport in ${locationQuery}` : 'All Transport Options'}
            </h1>
            
            <div className="flex gap-2">
              <div className="relative md:w-64">
                <form onSubmit={handleSearch}>
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search location..."
                    className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg text-sm"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </form>
              </div>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Filter size={18} />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>Adjust filters to find the perfect transport</SheetDescription>
                  </SheetHeader>
                  <div className="space-y-6 py-4">
                    {/* Mobile Filters */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Price Range</h3>
                      <Slider
                        onValueChange={(values) => setPriceRange(values as [number, number])}
                        defaultValue={[0, 200]}
                        value={priceRange}
                        max={200}
                        step={5}
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}+</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Type</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {types.map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mobile-type-${type}`} 
                              checked={selectedTypes.includes(type)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedTypes([...selectedTypes, type]);
                                } else {
                                  setSelectedTypes(
                                    selectedTypes.filter((t) => t !== type)
                                  );
                                }
                              }}
                            />
                            <label 
                              htmlFor={`mobile-type-${type}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Transmission</h3>
                      <div className="space-y-1.5">
                        {transmissions.map((transmission) => (
                          <div key={transmission} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mobile-transmission-${transmission}`} 
                              checked={selectedTransmissions.includes(transmission)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedTransmissions([...selectedTransmissions, transmission]);
                                } else {
                                  setSelectedTransmissions(
                                    selectedTransmissions.filter((t) => t !== transmission)
                                  );
                                }
                              }}
                            />
                            <label 
                              htmlFor={`mobile-transmission-${transmission}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {transmission}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Seats</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {seatCounts.map((seatCount) => (
                          <div key={seatCount} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mobile-seats-${seatCount}`} 
                              checked={selectedSeatCounts.includes(seatCount)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedSeatCounts([...selectedSeatCounts, seatCount]);
                                } else {
                                  setSelectedSeatCounts(
                                    selectedSeatCounts.filter((s) => s !== seatCount)
                                  );
                                }
                              }}
                            />
                            <label 
                              htmlFor={`mobile-seats-${seatCount}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {seatCount}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-4"
                      onClick={handleClearFilters}
                    >
                      Clear all filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters sidebar - Desktop */}
            <div className="hidden md:block w-64 flex-shrink-0 space-y-6">
              <div className="glass p-4 rounded-xl space-y-4">
                <h2 className="font-semibold text-lg">Filters</h2>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Price Range</h3>
                  <Slider
                    onValueChange={(values) => setPriceRange(values as [number, number])}
                    defaultValue={[0, 200]}
                    value={priceRange}
                    max={200}
                    step={5}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}+</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Type</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {types.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`type-${type}`} 
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedTypes([...selectedTypes, type]);
                            } else {
                              setSelectedTypes(
                                selectedTypes.filter((t) => t !== type)
                              );
                            }
                          }}
                        />
                        <label 
                          htmlFor={`type-${type}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Transmission</h3>
                  <div className="space-y-1.5">
                    {transmissions.map((transmission) => (
                      <div key={transmission} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`transmission-${transmission}`} 
                          checked={selectedTransmissions.includes(transmission)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedTransmissions([...selectedTransmissions, transmission]);
                            } else {
                              setSelectedTransmissions(
                                selectedTransmissions.filter((t) => t !== transmission)
                              );
                            }
                          }}
                        />
                        <label 
                          htmlFor={`transmission-${transmission}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {transmission}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Seats</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {seatCounts.map((seatCount) => (
                      <div key={seatCount} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`seats-${seatCount}`} 
                          checked={selectedSeatCounts.includes(seatCount)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedSeatCounts([...selectedSeatCounts, seatCount]);
                            } else {
                              setSelectedSeatCounts(
                                selectedSeatCounts.filter((s) => s !== seatCount)
                              );
                            }
                          }}
                        />
                        <label 
                          htmlFor={`seats-${seatCount}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {seatCount}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={handleClearFilters}
                >
                  Clear all filters
                </Button>
              </div>
            </div>
            
            {/* Transports grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">
                  {filteredTransports.length} transport options found
                </p>
                
                <div className="hidden md:flex flex-wrap gap-2">
                  {selectedTypes.length > 0 && (
                    <div className="flex items-center gap-1 text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                      <CheckCircle2 size={14} />
                      <span>{selectedTypes.length} types</span>
                    </div>
                  )}
                  
                  {selectedTransmissions.length > 0 && (
                    <div className="flex items-center gap-1 text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                      <CheckCircle2 size={14} />
                      <span>{selectedTransmissions.length} transmissions</span>
                    </div>
                  )}
                  
                  {selectedSeatCounts.length > 0 && (
                    <div className="flex items-center gap-1 text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                      <CheckCircle2 size={14} />
                      <span>{selectedSeatCounts.length} seat options</span>
                    </div>
                  )}
                  
                  {(selectedTypes.length > 0 || selectedTransmissions.length > 0 || selectedSeatCounts.length > 0) && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 px-2 text-xs"
                      onClick={handleClearFilters}
                    >
                      Clear all
                    </Button>
                  )}
                </div>
              </div>
              
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-96">
                  <Loader size={40} className="animate-spin text-primary" />
                  <p className="mt-4 text-muted-foreground">Loading transport options...</p>
                </div>
              ) : filteredTransports.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTransports.map((transport) => (
                    <TransportCard
                      key={transport.id}
                      id={transport.id}
                      title={transport.title}
                      location={transport.location}
                      price={transport.price}
                      rating={transport.rating}
                      image={transport.image}
                      type={transport.type}
                      seats={transport.seats}
                      transmission={transport.transmission}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-96 bg-secondary/50 rounded-xl">
                  <Car size={48} className="text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No transport options found</h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    We couldn't find any transport options matching your filters. 
                    Try adjusting your search criteria or clear the filters.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={handleClearFilters}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TransportListings;
