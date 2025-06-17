import { useState } from "react";
import API from "../services/api";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    pricePerNight: "",
    imageUrl: "",
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const payload = {
        title: formData.title,
        location: formData.location,
        price: Number(formData.pricePerNight),
        description: formData.description,
        images: [formData.imageUrl],
      };

      await API.post("/listings", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Listing created!");
      setFormData({
        title: "",
        description: "",
        location: "",
        pricePerNight: "",
        imageUrl: "",
      });
    } catch (err) {
      console.error(err);
      alert("Creation failed");
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
    </div>
  );
};

export default Dashboard;
