
import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Amenity {
  name: string;
  description: string;
}

interface PropertyAmenitiesProps {
  amenities: Amenity[];
}

const PropertyAmenities = ({ amenities }: PropertyAmenitiesProps) => {
  const [showAll, setShowAll] = useState(false);
  
  return (
    <div className="border-b border-border pb-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {amenities
          .slice(0, showAll ? amenities.length : 6)
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
      
      {amenities.length > 6 && (
        <Button 
          variant="outline" 
          className="mt-4" 
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show less' : `Show all ${amenities.length} amenities`}
        </Button>
      )}
    </div>
  );
};

export default PropertyAmenities;
