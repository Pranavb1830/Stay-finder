import { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
  const [listings, setListings] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    pricePerNight: "",
    imageUrl: "",
  });

  const fetchListings = async () => {
    try {
      const res = await API.get("/listings");
      setListings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        location: formData.location,
        price: Number(formData.pricePerNight),
        description: formData.description,
        images: [formData.imageUrl],
      };

      await API.post("/listings", payload);

      alert("Listing created!");
      setFormData({
        title: "",
        description: "",
        location: "",
        pricePerNight: "",
        imageUrl: "",
      });
      fetchListings();
    } catch (err) {
      console.error(err);
      alert("Creation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    try {
      await API.delete(`/listings/${id}`);
      alert("Listing deleted successfully!");
      fetchListings(); // Refresh after delete
    } catch (err) {
      console.error("Error deleting listing:", err);
      alert("Delete failed, please try again.");
    }
  };

  return (
    <div>
      <h1>Host Dashboard</h1>

      <h2>Create New Listing</h2>
      <form onSubmit={handleCreate}>
        <input
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
        <input
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price per night"
          value={formData.pricePerNight}
          onChange={(e) =>
            setFormData({ ...formData, pricePerNight: e.target.value })
          }
          required
        />
        <input
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          required
        />
        <button type="submit">Create</button>
      </form>

      <h2>Your Listings</h2>
      {listings.map((listing) => (
        <div
          key={listing._id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            margin: "10px 0",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <img
            src={listing.images && listing.images[0]}
            alt={listing.title}
            style={{
              width: "150px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
          <div style={{ flex: 1 }}>
            <h3>{listing.title}</h3>
            <p>{listing.description}</p>
            <p>
              <strong>Location:</strong> {listing.location}
            </p>
            <p>
              <strong>Price:</strong> ₹{listing.price}
            </p>
          </div>
          <button onClick={() => handleDelete(listing._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;