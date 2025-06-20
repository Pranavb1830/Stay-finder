const Booking = require('../models/Booking');
const Listing = require('../models/Listing');

exports.createBooking = async (req, res) => {
  try {
    const { listingId, checkIn, checkOut, guests } = req.body;

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    const overlapping = await Booking.findOne({
      listing: listingId,
      $or: [
        {
          checkIn: { $lt: new Date(checkOut) },
          checkOut: { $gt: new Date(checkIn) },
        },
      ],
    });

    if (overlapping) {
      return res.status(400).json({ message: 'This listing is already booked for the selected dates. Please choose different dates.' });
    }

    const booking = new Booking({
      listing: listingId,
      user: req.user.id,
      checkIn,
      checkOut,
      guests
    });

    await booking.save();

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
