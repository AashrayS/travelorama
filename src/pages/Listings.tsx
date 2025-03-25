
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Check, ChevronsUpDown, Home, Bed, Bath, Users, Search, Loader } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PropertyCard from '@/components/PropertyCard';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem 
} from '@/components/ui/dropdown-menu';

// Mock data
const properties = [
  {
    id: '1',
    title: 'Modern Beach House with Ocean View',
    location: 'Malibu, California',
    price: 299,
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Entire villa',
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    amenities: ['Beach access', 'Pool', 'Wifi', 'Kitchen', 'Free parking'],
  },
  {
    id: '2',
    title: 'Downtown Luxury Loft',
    location: 'New York City, NY',
    price: 189,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80',
    type: 'Apartment',
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    amenities: ['Wifi', 'Kitchen', 'Air conditioning', 'Washer'],
  },
  {
    id: '3',
    title: 'Mountain Retreat with Hot Tub',
    location: 'Aspen, Colorado',
    price: 250,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Cabin',
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    amenities: ['Hot tub', 'Fireplace', 'Wifi', 'Kitchen', 'Free parking'],
  },
  {
    id: '4',
    title: 'Lakefront Cottage with Private Dock',
    location: 'Lake Tahoe, California',
    price: 179,
    rating: 4.85,
    image: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Cottage',
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    amenities: ['Lake access', 'Wifi', 'Kitchen', 'Free parking'],
  },
  {
    id: '5',
    title: 'Luxury Penthouse with Sky Lounge',
    location: 'Miami, Florida',
    price: 350,
    rating: 4.92,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Penthouse',
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    amenities: ['Pool', 'Gym', 'Wifi', 'Kitchen', 'Free parking'],
  },
  {
    id: '6',
    title: 'Cozy Studio in Historic District',
    location: 'Charleston, SC',
    price: 120,
    rating: 4.75,
    image: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Studio',
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    amenities: ['Wifi', 'Kitchen'],
  },
  {
    id: '7',
    title: 'Charming Brownstone with Garden',
    location: 'Boston, MA',
    price: 210,
    rating: 4.88,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Entire house',
    bedrooms: 2,
    bathrooms: 1.5,
    guests: 4,
    amenities: ['Garden', 'Wifi', 'Kitchen', 'Free parking'],
  },
  {
    id: '8',
    title: 'Desert Oasis with Private Pool',
    location: 'Scottsdale, AZ',
    price: 275,
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Entire villa',
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    amenities: ['Pool', 'Wifi', 'Kitchen', 'Free parking', 'Air conditioning'],
  },
];

const propertyTypes = [
  'Apartment',
  'House',
  'Villa',
  'Cabin',
  'Cottage',
  'Studio',
  'Penthouse',
];

const amenities = [
  'Wifi',
  'Kitchen',
  'Free parking',
  'Pool',
  'Hot tub',
  'Air conditioning',
  'Washer',
  'Dryer',
  'Beach access',
  'Lake access',
  'Gym',
  'Fireplace',
];

const Listings = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const locationQuery = searchParams.get('location') || '';
  
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [searchValue, setSearchValue] = useState(locationQuery);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [bedroomCount, setBedroomCount] = useState<number | null>(null);
  const [bathroomCount, setBathroomCount] = useState<number | null>(null);
  const [guestCount, setGuestCount] = useState<number | null>(null);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Filter properties based on selected filters
    const filtered = properties.filter((property) => {
      // Filter by search value (location or title)
      const matchesSearch = !searchValue 
        || property.location.toLowerCase().includes(searchValue.toLowerCase())
        || property.title.toLowerCase().includes(searchValue.toLowerCase());
      
      // Filter by price range
      const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
      
      // Filter by bedroom count
      const matchesBedrooms = bedroomCount === null || property.bedrooms >= bedroomCount;
      
      // Filter by bathroom count
      const matchesBathrooms = bathroomCount === null || property.bathrooms >= bathroomCount;
      
      // Filter by guest count
      const matchesGuests = guestCount === null || property.guests >= guestCount;
      
      // Filter by property type
      const matchesPropertyType = selectedPropertyTypes.length === 0 
        || selectedPropertyTypes.some(type => property.type.toLowerCase().includes(type.toLowerCase()));
      
      // Filter by amenities
      const matchesAmenities = selectedAmenities.length === 0 
        || selectedAmenities.every(amenity => property.amenities.includes(amenity));
      
      return matchesSearch && matchesPrice && matchesBedrooms && matchesBathrooms 
        && matchesGuests && matchesPropertyType && matchesAmenities;
    });
    
    setFilteredProperties(filtered);
  }, [
    searchValue,
    priceRange,
    bedroomCount,
    bathroomCount,
    guestCount,
    selectedPropertyTypes,
    selectedAmenities
  ]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search already handled by useEffect
  };
  
  const handleClearFilters = () => {
    setSearchValue(locationQuery);
    setPriceRange([0, 500]);
    setBedroomCount(null);
    setBathroomCount(null);
    setGuestCount(null);
    setSelectedPropertyTypes([]);
    setSelectedAmenities([]);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters sidebar */}
            <div className="w-full md:w-64 flex-shrink-0 space-y-6">
              <div className="glass p-4 rounded-xl space-y-4">
                <h2 className="font-semibold text-lg">Filters</h2>
                
                <div className="space-y-2">
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search location..."
                        className="w-full pl-10 pr-4 py-2 bg-secondary rounded-lg text-sm"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Price Range</h3>
                  <Slider
                    onValueChange={(values) => setPriceRange(values as [number, number])}
                    defaultValue={[0, 500]}
                    value={priceRange}
                    max={500}
                    step={10}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}+</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Property Type</h3>
                  <div className="space-y-1.5">
                    {propertyTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`type-${type}`} 
                          checked={selectedPropertyTypes.includes(type)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedPropertyTypes([...selectedPropertyTypes, type]);
                            } else {
                              setSelectedPropertyTypes(
                                selectedPropertyTypes.filter((t) => t !== type)
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
                  <h3 className="text-sm font-medium">Rooms and Guests</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bed size={16} className="text-muted-foreground" />
                        <span className="text-sm">Bedrooms</span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8">
                            {bedroomCount || 'Any'}
                            <ChevronsUpDown size={14} className="ml-1 text-muted-foreground" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuCheckboxItem
                            checked={bedroomCount === null}
                            onCheckedChange={() => setBedroomCount(null)}
                          >
                            Any
                          </DropdownMenuCheckboxItem>
                          {[1, 2, 3, 4, 5].map((num) => (
                            <DropdownMenuCheckboxItem
                              key={num}
                              checked={bedroomCount === num}
                              onCheckedChange={() => setBedroomCount(num)}
                            >
                              {num}+
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bath size={16} className="text-muted-foreground" />
                        <span className="text-sm">Bathrooms</span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8">
                            {bathroomCount || 'Any'}
                            <ChevronsUpDown size={14} className="ml-1 text-muted-foreground" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuCheckboxItem
                            checked={bathroomCount === null}
                            onCheckedChange={() => setBathroomCount(null)}
                          >
                            Any
                          </DropdownMenuCheckboxItem>
                          {[1, 2, 3, 4, 5].map((num) => (
                            <DropdownMenuCheckboxItem
                              key={num}
                              checked={bathroomCount === num}
                              onCheckedChange={() => setBathroomCount(num)}
                            >
                              {num}+
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users size={16} className="text-muted-foreground" />
                        <span className="text-sm">Guests</span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8">
                            {guestCount || 'Any'}
                            <ChevronsUpDown size={14} className="ml-1 text-muted-foreground" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuCheckboxItem
                            checked={guestCount === null}
                            onCheckedChange={() => setGuestCount(null)}
                          >
                            Any
                          </DropdownMenuCheckboxItem>
                          {[1, 2, 4, 6, 8, 10].map((num) => (
                            <DropdownMenuCheckboxItem
                              key={num}
                              checked={guestCount === num}
                              onCheckedChange={() => setGuestCount(num)}
                            >
                              {num}+
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Amenities</h3>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-2 scrollbar-none">
                    {amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`amenity-${amenity}`} 
                          checked={selectedAmenities.includes(amenity)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedAmenities([...selectedAmenities, amenity]);
                            } else {
                              setSelectedAmenities(
                                selectedAmenities.filter((a) => a !== amenity)
                              );
                            }
                          }}
                        />
                        <label 
                          htmlFor={`amenity-${amenity}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {amenity}
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
            
            {/* Listings grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                  {locationQuery ? `Stays in ${locationQuery}` : 'All Stays'}
                </h1>
                <p className="text-muted-foreground">
                  {filteredProperties.length} properties found
                </p>
              </div>
              
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-96">
                  <Loader size={40} className="animate-spin text-primary" />
                  <p className="mt-4 text-muted-foreground">Loading properties...</p>
                </div>
              ) : filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      id={property.id}
                      title={property.title}
                      location={property.location}
                      price={property.price}
                      rating={property.rating}
                      image={property.image}
                      type={property.type}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-96 bg-secondary/50 rounded-xl">
                  <Home size={48} className="text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    We couldn't find any properties matching your filters. 
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

export default Listings;
