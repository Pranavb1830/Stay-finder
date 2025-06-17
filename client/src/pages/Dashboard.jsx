const Listing = require('../models/Listing');

exports.getAllListings = async (req, res) => {
  try {
    const { location, minPrice, maxPrice } = req.query;

    let filter = {};

    if (location) {
      filter.location = { $regex: location, $options: 'i' }; // case-insensitive match
    }

    if (minPrice) {
      filter.price = { ...filter.price, $gte: Number(minPrice) };
    }

    if (maxPrice) {
      filter.price = { ...filter.price, $lte: Number(maxPrice) };
    }

    const listings = await Listing.find(filter).populate('host', 'name email');
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getListingById = async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await Listing.findById(id).populate('host', 'name email');
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching listing', error: error.message });
  }
};

exports.createListing = async (req, res) => {
  const { title, location, price, description, images } = req.body;
  const host = req.user._id;

  try {
    const newListing = new Listing({
      title,
      location,
      price,
      description,
      images,
      host,
    });

    await newListing.save();
    res.status(201).json(newListing);
  } catch (error) {
    res.status(500).json({ message: 'Error creating listing', error: error.message });
  }
};

exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You do not have permission to delete this listing' });
    }

    await Listing.findByIdAndDelete(id);
    res.status(200).json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting listing', error: error.message });
  }
};
