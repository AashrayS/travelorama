
import { useState } from 'react';

interface PropertyImagesProps {
  images: string[];
  title: string;
  onViewImage: (index: number) => void;
}

const PropertyImages = ({ images, title, onViewImage }: PropertyImagesProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8">
      <div className="md:col-span-2 row-span-2 relative rounded-l-xl overflow-hidden">
        <img 
          src={images[0]} 
          alt={title}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => onViewImage(0)}
        />
      </div>
      
      {images.slice(1, 5).map((image, index) => (
        <div 
          key={index}
          className={`relative overflow-hidden ${
            index === 1 ? "rounded-tr-xl" : ""
          } ${index === 3 ? "rounded-br-xl" : ""}`}
        >
          <img 
            src={image} 
            alt={`${title} ${index + 1}`}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => onViewImage(index + 1)}
          />
        </div>
      ))}
    </div>
  );
};

export default PropertyImages;
