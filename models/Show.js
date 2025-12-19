const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  theater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theater',
    required: true
  },
  screenNumber: {
    type: Number,
    required: true
  },
  showDate: {
    type: Date,
    required: true
  },
  showTime: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  seatCategories: [{
    category: {
      type: String,
      enum: ['Normal', 'Premium', 'Recliner'],
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    rows: [String], // e.g., ['A', 'B', 'C'] for Normal
    totalSeats: Number,
    availableSeats: Number
  }],
  totalSeats: {
    type: Number,
    required: true
  },
  availableSeats: {
    type: Number,
    required: true
  },
  bookedSeats: [{
    seatNumber: String,
    row: String,
    column: Number
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient queries
showSchema.index({ movie: 1, theater: 1, showDate: 1 });

module.exports = mongoose.model('Show', showSchema);
