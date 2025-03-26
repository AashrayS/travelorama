
interface LocationDetails {
  address: string;
  lat: number;
  lng: number;
  description: string;
}

interface PropertyLocationProps {
  location: string;
  locationDetails: LocationDetails;
}

const PropertyLocation = ({ location, locationDetails }: PropertyLocationProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Where you'll be</h2>
      <p className="mb-4 text-gray-600">{locationDetails.description}</p>
      <div className="bg-muted h-64 rounded-xl overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          title="map"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(location)}`}
          style={{ border: 0 }}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default PropertyLocation;
