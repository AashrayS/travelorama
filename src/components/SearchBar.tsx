
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SearchBarProps {
  isHero?: boolean;
}

const SearchBar = ({ isHero = false }: SearchBarProps) => {
  const [activeTab, setActiveTab] = useState('stays');
  const [destination, setDestination] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'stays') {
      navigate(`/listings?location=${destination}`);
    } else {
      navigate(`/transport-listings?location=${destination}`);
    }
  };
  
  return (
    <div className={`w-full max-w-5xl mx-auto ${isHero ? '' : 'glass rounded-xl p-1'}`}>
      <Tabs defaultValue="stays" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-xs mb-3">
          <TabsTrigger value="stays" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Stays
          </TabsTrigger>
          <TabsTrigger value="transport" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Transport
          </TabsTrigger>
        </TabsList>
        
        <form onSubmit={handleSearch} className="w-full grid grid-cols-1 md:grid-cols-4 gap-2">
          <div className={`relative ${isHero ? 'glass' : 'bg-secondary'} rounded-lg p-3 flex items-center col-span-1 md:col-span-2`}>
            <MapPin size={20} className="text-muted-foreground mr-2" />
            <input
              type="text"
              placeholder="Where in India are you going?"
              className="w-full bg-transparent border-none outline-none text-foreground"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>
          
          <div className={`${isHero ? 'glass' : 'bg-secondary'} rounded-lg p-3 flex items-center`}>
            <Calendar size={20} className="text-muted-foreground mr-2" />
            <input
              type="text"
              placeholder="Add dates"
              className="w-full bg-transparent border-none outline-none text-foreground"
              onFocus={(e) => e.target.type = 'date'}
              onBlur={(e) => e.target.type = 'text'}
            />
          </div>
          
          <div className="flex">
            <div className={`flex-1 ${isHero ? 'glass' : 'bg-secondary'} rounded-lg p-3 flex items-center mr-2`}>
              <Users size={20} className="text-muted-foreground mr-2" />
              <select className="w-full bg-transparent border-none outline-none text-foreground">
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4+ Guests</option>
              </select>
            </div>
            
            <Button type="submit" className="bg-primary rounded-lg px-6" size="icon">
              <Search size={20} />
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  );
};

export default SearchBar;
