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

// Mock data with India-centric properties
const properties = [
  {
    id: '1',
    title: 'Luxury Lakeside Villa in Udaipur',
    location: 'Udaipur, Rajasthan',
    price: 15999,
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Villa',
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    amenities: ['Lake view', 'Pool', 'Wifi', 'Kitchen', 'Free parking'],
  },
  {
    id: '2',
    title: 'Modern Apartment with Sea View',
    location: 'Marine Drive, Mumbai',
    price: 8999,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    amenities: ['Sea view', 'Wifi', 'Kitchen', 'Air conditioning'],
  },
  {
    id: '3',
    title: 'Heritage Haveli with Private Courtyard',
    location: 'Jaipur, Rajasthan',
    price: 12500,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Heritage Home',
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    amenities: ['Heritage structure', 'Courtyard', 'Wifi', 'Kitchen', 'Free parking'],
  },
  {
    id: '4',
    title: 'Beachfront Cottage in Goa',
    location: 'Calangute, Goa',
    price: 7999,
    rating: 4.85,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Beach House',
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    amenities: ['Beach access', 'Wifi', 'Kitchen', 'Free parking'],
  },
  {
    id: '5',
    title: 'Luxury Penthouse in Cyber City',
    location: 'Gurugram, Haryana',
    price: 18500,
    rating: 4.92,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Penthouse',
    bedrooms: 3,
    bathrooms: 3,
    guests: 6,
    amenities: ['City view', 'Gym', 'Wifi', 'Kitchen', 'Free parking'],
  },
  {
    id: '6',
    title: 'Tea Estate Bungalow',
    location: 'Darjeeling, West Bengal',
    price: 9500,
    rating: 4.88,
    image: 'https://images.unsplash.com/photo-1544085311-11a028465b03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
    type: 'Bungalow',
    bedrooms: 3,
    bathrooms: 2,
    guests: 5,
    amenities: ['Mountain view', 'Garden', 'Wifi', 'Kitchen', 'Free parking'],
  },
  {
    id: '7',
    title: 'Riverside Eco Resort',
    location: 'Rishikesh, Uttarakhand',
    price: 6999,
    rating: 4.79,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80',
    type: 'Eco Resort',
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    amenities: ['River view', 'Yoga deck', 'Wifi', 'Kitchen', 'Free parking'],
  },
  {
    id: '8',
    title: 'Backwater Houseboat',
    location: 'Alleppey, Kerala',
    price: 11999,
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Houseboat',
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    amenities: ['Backwater view', 'Deck', 'Full meals', 'Air conditioning'],
  },
  {
    id: '9',
    title: 'Colonial Hill Station Cottage',
    location: 'Shimla, Himachal Pradesh',
    price: 8500,
    rating: 4.82,
    image: 'https://images.unsplash.com/photo-1626621331169-5f34be280ed9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Cottage',
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    amenities: ['Mountain view', 'Fireplace', 'Wifi', 'Kitchen', 'Free parking'],
  },
  {
    id: '10',
    title: 'Royal Palace Suite',
    location: 'Jodhpur, Rajasthan',
    price: 22999,
    rating: 4.97,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Heritage Palace',
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    amenities: ['Heritage structure', 'Royal service', 'Wifi', 'Air conditioning', 'Free parking'],
  },
  {
    id: '11',
    title: 'Taj View Apartment',
    location: 'Agra, Uttar Pradesh',
    price: 7500,
    rating: 4.75,
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    amenities: ['Taj Mahal view', 'Terrace', 'Wifi', 'Kitchen', 'Free parking'],
  },
  {
    id: '12',
    title: 'Riverside Ashram Stay',
    location: 'Varanasi, Uttar Pradesh',
    price: 4999,
    rating: 4.65,
    image: 'https://images.unsplash.com/photo-1561361058-c24cecce58eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    type: 'Ashram',
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    amenities: ['Ganga view', 'Yoga classes', 'Vegetarian meals', 'Wifi'],
  }
];

const propertyTypes = [
  'Apartment',
  'Villa',
  'Heritage Home',
  'Beach House',
  'Penthouse',
  'Bungalow',
  'Eco Resort',
  'Houseboat',
  'Cottage',
  'Heritage Palace',
  'Ashram',
];

const amenities = [
  'Wifi',
  'Kitchen',
  'Free parking',
  'Pool',
  'Air conditioning',
  'Mountain view',
  'Sea view',
  'Lake view',
  'River view',
  'Backwater view',
  'Beach access',
  'Gym',
  'Yoga deck',
  'Fireplace',
  'Garden',
  'Terrace',
  'Heritage structure',
  'Royal service',
  'Vegetarian meals',
  'Full meals',
  'Courtyard',
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
