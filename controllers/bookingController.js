const Booking = require('../models/Booking');
const Show = require('../models/Show');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res, next) => {
  try {
    console.log('=== CREATE BOOKING REQUEST ===');
    console.log('User:', req.user?.id);
    console.log('Body:', JSON.stringify(req.body, null, 2));
    
    const { showId, seats } = req.body;

    if (!showId || !seats || !Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'showId and seats array are required'
      });
    }

    // Get show details
    const show = await Show.findById(showId)
      .populate('movie')
      .populate('theater');

    if (!show) {
      return res.status(404).json({
        success: false,
        message: 'Show not found'
      });
    }

    // Check if seats are available
    const bookedSeatNumbers = show.bookedSeats.map(seat => seat.seatNumber);
    const requestedSeatNumbers = seats.map(seat => seat.seatNumber);

    const alreadyBooked = requestedSeatNumbers.some(seatNum => 
      bookedSeatNumbers.includes(seatNum)
    );

    if (alreadyBooked) {
      return res.status(400).json({
        success: false,
        message: 'Some of the selected seats are already booked'
      });
    }

    // Check if enough seats are available
    if (show.availableSeats < seats.length) {
      return res.status(400).json({
        success: false,
        message: 'Not enough seats available'
      });
    }

    // Calculate total amount
    const totalAmount = show.price * seats.length;

    // Create booking
    const booking = await Booking.create({
      user: req.user.id,
      show: showId,
      movie: show.movie._id,
      theater: show.theater._id,
      seats,
      totalAmount,
      showDate: show.showDate,
      showTime: show.showTime
    });

    // Update show - add booked seats and decrease available seats
    show.bookedSeats.push(...seats);
    show.availableSeats -= seats.length;
    await show.save();

    // Populate booking details
    const populatedBooking = await Booking.findById(booking._id)
      .populate('movie', 'title poster')
      .populate('theater', 'name location')
      .populate('show', 'showDate showTime');

    res.status(201).json({
      success: true,
      data: populatedBooking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookings for a user
// @route   GET /api/bookings/user
// @access  Private
exports.getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('movie', 'title poster duration language')
      .populate('theater', 'name location')
      .populate('show', 'showDate showTime')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('movie')
      .populate('theater')
      .populate('show')
      .populate('user', 'name email phone');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Make sure user is booking owner or admin
    if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this booking'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Make sure user is booking owner
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }

    // Check if booking can be cancelled (e.g., not too close to show time)
    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled'
      });
    }

    // Update booking status
    booking.status = 'cancelled';
    await booking.save();

    // Release seats in the show
    const show = await Show.findById(booking.show);
    if (show) {
      const seatNumbers = booking.seats.map(seat => seat.seatNumber);
      show.bookedSeats = show.bookedSeats.filter(
        seat => !seatNumbers.includes(seat.seatNumber)
      );
      show.availableSeats += booking.seats.length;
      await show.save();
    }

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
// @access  Private/Admin
exports.getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email phone')
      .populate('movie', 'title')
      .populate('theater', 'name')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};
