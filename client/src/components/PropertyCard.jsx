import { Link } from 'react-router-dom';

const PropertyCard = ({ listing }) => (
  <div style={{ border: '1px solid #ccc', margin: 10, padding: 10, borderRadius: 5 }}>
    <img 
      src={listing.imageUrl || listing.images?.[0] || "/default.jpg"} 
      alt={listing.title} 
      style={{ width: "200px", height: "150px", objectFit: "cover", borderRadius: 5 }}
    />
    <h3>{listing.title}</h3>
    <p>{listing.location}</p>
    <p>₹{listing.pricePerNight || listing.price || "N/A"} per night</p>
    <Link to={`/listings/${listing._id}`}>View Details</Link>
  </div>
);

export default PropertyCard;
