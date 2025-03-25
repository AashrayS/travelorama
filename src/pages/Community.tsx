
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, ThumbsUp, MessageSquare, MapPin, Globe, Filter, Bookmark, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CommunityCard from '@/components/CommunityCard';

// Mock data
const recommendations = [
  {
    id: '1',
    title: 'Hidden Beach Cove',
    location: 'Big Sur, California',
    description: 'A secluded beach cove that\'s perfect for watching the sunset. The hike down is a bit steep but absolutely worth it for the privacy and stunning views. Bring a picnic and enjoy the peaceful atmosphere.',
    image: 'https://images.unsplash.com/photo-1520942702018-0862200e6873?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    upvotes: 142,
    downvotes: 5,
    comments: 32,
    category: 'Nature',
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
    category: 'Food',
    author: {
      name: 'Sophie Williams',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
  },
  {
    id: '3',
    title: 'Secret Viewpoint of the City',
    location: 'Lisbon, Portugal',
    description: 'While most tourists go to the popular viewpoints, this hidden gem offers an even better view with hardly any crowds. Perfect for sunset photography or a romantic evening.',
    image: 'https://images.unsplash.com/photo-1580323956656-26bbb1206e34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80',
    upvotes: 75,
    downvotes: 3,
    comments: 12,
    category: 'Sightseeing',
    author: {
      name: 'Marcus Chen',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    },
  },
  {
    id: '4',
    title: 'Underground Jazz Club',
    location: 'New Orleans, LA',
    description: 'Skip the touristy Bourbon Street joints and head to this authentic jazz club where local musicians perform nightly. The atmosphere is incredible and the music is top-notch.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80',
    upvotes: 110,
    downvotes: 8,
    comments: 23,
    category: 'Nightlife',
    author: {
      name: 'Jasmine Reed',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    },
  },
  {
    id: '5',
    title: 'Ancient Hidden Pathway',
    location: 'Kyoto, Japan',
    description: 'This beautiful stone pathway winds through a bamboo forest and leads to a small, rarely visited shrine. It\'s peaceful, stunning, and provides a glimpse into ancient Japan away from the crowds.',
    image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2053&q=80',
    upvotes: 156,
    downvotes: 4,
    comments: 28,
    category: 'Culture',
    author: {
      name: 'Hiroshi Yamamoto',
      avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    },
  },
  {
    id: '6',
    title: 'Hidden Waterfall Hike',
    location: 'Kauai, Hawaii',
    description: 'A moderate 2-hour hike that leads to a spectacular waterfall with a swimming hole. Most tourists don\'t know about this trail, so you\'ll likely have it all to yourself.',
    image: 'https://images.unsplash.com/photo-1565019011521-b0575cca82cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    upvotes: 187,
    downvotes: 3,
    comments: 42,
    category: 'Adventure',
    author: {
      name: 'Olivia Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    },
  },
];

const categories = [
  'All',
  'Food',
  'Nature',
  'Adventure',
  'Nightlife',
  'Culture',
  'Sightseeing',
  'Shopping',
];

const locations = [
  'All Locations',
  'North America',
  'Europe',
  'Asia',
  'Africa',
  'South America',
  'Oceania',
];

const Community = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [filteredRecommendations, setFilteredRecommendations] = useState(recommendations);
  const [sortOption, setSortOption] = useState('Most Upvoted');
  
  useEffect(() => {
    // Filter recommendations based on search, category, and location
    let filtered = recommendations.filter((recommendation) => {
      // Filter by search
      const matchesSearch = !searchValue 
        || recommendation.title.toLowerCase().includes(searchValue.toLowerCase())
        || recommendation.location.toLowerCase().includes(searchValue.toLowerCase())
        || recommendation.description.toLowerCase().includes(searchValue.toLowerCase());
      
      // Filter by category
      const matchesCategory = selectedCategory === 'All' 
        || recommendation.category === selectedCategory;
      
      // Filter by location (this is simplified, would need real location data)
      const matchesLocation = selectedLocation === 'All Locations' 
        || (selectedLocation === 'North America' && (
          recommendation.location.includes('California') 
          || recommendation.location.includes('LA')
          || recommendation.location.includes('Hawaii')
        ))
        || (selectedLocation === 'Europe' && (
          recommendation.location.includes('Italy')
          || recommendation.location.includes('Portugal')
        ))
        || (selectedLocation === 'Asia' && recommendation.location.includes('Japan'));
      
      return matchesSearch && matchesCategory && matchesLocation;
    });
    
    // Sort filtered recommendations
    if (sortOption === 'Most Upvoted') {
      filtered = [...filtered].sort((a, b) => b.upvotes - a.upvotes);
    } else if (sortOption === 'Most Recent') {
      // In a real app, this would sort by date
      filtered = [...filtered].sort((a, b) => a.id.localeCompare(b.id));
    } else if (sortOption === 'Most Discussed') {
      filtered = [...filtered].sort((a, b) => b.comments - a.comments);
    }
    
    setFilteredRecommendations(filtered);
  }, [searchValue, selectedCategory, selectedLocation, sortOption]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled in useEffect
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Discover Local Gems</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore community recommendations for hidden spots, local favorites, and must-visit places around the world
            </p>
          </div>
          
          {/* Search and filters */}
          <div className="mb-8">
            <div className="glass rounded-xl p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <form onSubmit={handleSearch} className="flex-1">
                  <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search recommendations..."
                      className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                  </div>
                </form>
                
                <div className="flex flex-wrap gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full md:w-auto">
                        <Filter size={16} className="mr-2" />
                        {selectedCategory}
                        <ChevronDown size={16} className="ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {categories.map((category) => (
                        <DropdownMenuItem 
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full md:w-auto">
                        <Globe size={16} className="mr-2" />
                        {selectedLocation}
                        <ChevronDown size={16} className="ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {locations.map((location) => (
                        <DropdownMenuItem 
                          key={location}
                          onClick={() => setSelectedLocation(location)}
                        >
                          {location}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full md:w-auto">
                        <ThumbsUp size={16} className="mr-2" />
                        {sortOption}
                        <ChevronDown size={16} className="ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSortOption('Most Upvoted')}>
                        Most Upvoted
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortOption('Most Recent')}>
                        Most Recent
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortOption('Most Discussed')}>
                        Most Discussed
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="flex overflow-x-auto py-4 no-scrollbar">
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-foreground hover:bg-secondary/80'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="w-full max-w-md mx-auto">
              <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
              <TabsTrigger value="saved" className="flex-1">Saved</TabsTrigger>
              <TabsTrigger value="following" className="flex-1">Following</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="pt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  {filteredRecommendations.length} {selectedCategory !== 'All' ? selectedCategory : ''} Recommendations
                </h2>
                
                <Link to="/add-recommendation">
                  <Button className="rounded-full">
                    <Plus size={16} className="mr-2" />
                    Add recommendation
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-6">
                {filteredRecommendations.length > 0 ? (
                  filteredRecommendations.map((recommendation) => (
                    <CommunityCard
                      key={recommendation.id}
                      {...recommendation}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 bg-muted rounded-xl">
                    <MapPin size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No recommendations found</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-6">
                      We couldn't find any recommendations matching your criteria. 
                      Try adjusting your filters or be the first to add one!
                    </p>
                    <Link to="/add-recommendation">
                      <Button>
                        <Plus size={16} className="mr-2" />
                        Add recommendation
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="saved" className="pt-6">
              <div className="text-center py-12 bg-muted rounded-xl">
                <Bookmark size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No saved recommendations yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Save recommendations you like to find them later. Click the save button on any recommendation to add it here.
                </p>
                <Button variant="outline" asChild>
                  <Link to="?tab=all">Browse recommendations</Link>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="following" className="pt-6">
              <div className="text-center py-12 bg-muted rounded-xl">
                <MessageSquare size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Follow users to see their recommendations</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  When you follow other travelers, their recommendations will appear here.
                </p>
                <Button variant="outline" asChild>
                  <Link to="?tab=all">Discover users to follow</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Community;
