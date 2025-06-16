import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    if (!id) {
      console.error("No listing ID provided in the URL.");
      return;
    }

    const fetchListing = async () => {
      try {
        const res = await API.get(`/listings/${id}`);
        setListing(res.data);
      } catch (err) {
        console.error("Error fetching listing:", err);
      }
    };

    fetchListing();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to make a booking.");
      navigate("/login");
      return;
    }

    try {
      await API.post("/bookings", {
        listingId: id,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: guests,
      });
      alert("Booking successful!");
    } catch (err) {
      console.error("Booking error:", err);
      alert("Booking failed! Please ensure you're logged in and try again.");
    }
  };

  if (!listing) return <p>Loading...</p>;

  return (
    <div>
      <h1>{listing.title}</h1>
      <img
        src={listing.imageUrl || listing.images?.[0]}
        alt={listing.title}
        style={{ width: "400px" }}
      />
      <p>{listing.description}</p>
      <p>Location: {listing.location}</p>
      <p>Price per night: ₹{listing.pricePerNight || listing.price}</p>

      <h3>Book Now:</h3>
      <form onSubmit={handleBooking}>
        <div>
          <label>
            Check-In Date:{" "}
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Check-Out Date:{" "}
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Guests:{" "}
            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              required
            />
          </label>
        </div>

        <button type="submit">Book</button>
      </form>
    </div>
  );
};

export default ListingDetails;