import { useEffect, useState } from "react";
import API from "../services/api";
import PropertyCard from "../components/PropertyCard";

const Home = () => {
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
  });

  const fetchListings = async (currentFilters) => {
    try {
      const res = await API.get("/listings", {
        params: {
          location: currentFilters.location,
          minPrice: currentFilters.minPrice,
          maxPrice: currentFilters.maxPrice,
        },
      });
      setListings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchListings(filters);
  }, [filters]);

  const handleSearch = () => {
    fetchListings(filters);
  };

  return (
    <div>
      <h1>Available Properties</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
        <input
          placeholder="Min Price"
          type="number"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />
        <input
          placeholder="Max Price"
          type="number"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {listings.map((listing) => (
          <PropertyCard key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default Home;