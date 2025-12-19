const express = require('express');
const {
  createBooking,
  getUserBookings,
  getBooking,
  cancelBooking,
  getAllBookings
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .post(protect, createBooking)
  .get(protect, authorize('admin'), getAllBookings);

router.route('/user').get(protect, getUserBookings);

router
  .route('/:id')
  .get(protect, getBooking);

router.route('/:id/cancel').put(protect, cancelBooking);

module.exports = router;
