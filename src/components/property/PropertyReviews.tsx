
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Review {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  date: string;
  comment: string;
}

interface PropertyReviewsProps {
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

const PropertyReviews = ({ rating, reviewCount, reviews }: PropertyReviewsProps) => {
  return (
    <div className="border-b border-border pb-6 mb-6">
      <div className="flex items-center mb-4">
        <Star size={20} className="fill-yellow-400 stroke-yellow-400 mr-2" />
        <h2 className="text-xl font-semibold">
          {rating} · {reviewCount} reviews
        </h2>
      </div>
      
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="space-y-2">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-4">
                <AvatarImage src={review.user.avatar} alt={review.user.name} />
                <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{review.user.name}</p>
                <p className="text-sm text-muted-foreground">{review.date}</p>
              </div>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
      
      {reviewCount > 3 && (
        <Button className="mt-6" variant="outline">
          Show all {reviewCount} reviews
        </Button>
      )}
    </div>
  );
};

export default PropertyReviews;
