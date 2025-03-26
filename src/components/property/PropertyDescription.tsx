
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PropertyDescriptionProps {
  description: string;
}

const PropertyDescription = ({ description }: PropertyDescriptionProps) => {
  const [showAll, setShowAll] = useState(false);
  
  return (
    <div className="border-b border-border pb-6 mb-6">
      <h2 className="text-xl font-semibold mb-3">About this place</h2>
      <div>
        <p className={cn(
          "text-gray-600",
          !showAll && "line-clamp-3"
        )}>
          {description}
        </p>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="mt-2 p-0 h-auto font-medium" 
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? (
            <span className="flex items-center">
              Show less <ChevronUp size={16} className="ml-1" />
            </span>
          ) : (
            <span className="flex items-center">
              Show more <ChevronDown size={16} className="ml-1" />
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PropertyDescription;
