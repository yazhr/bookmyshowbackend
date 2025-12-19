const Theater = require('../models/Theater');

// @desc    Get all theaters
// @route   GET /api/theaters
// @access  Public
exports.getTheaters = async (req, res, next) => {
  try {
    const theaters = await Theater.find({ isActive: true });

    res.status(200).json({
      success: true,
      count: theaters.length,
      data: theaters
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single theater
// @route   GET /api/theaters/:id
// @access  Public
exports.getTheater = async (req, res, next) => {
  try {
    const theater = await Theater.findById(req.params.id);

    if (!theater) {
      return res.status(404).json({
        success: false,
        message: 'Theater not found'
      });
    }

    res.status(200).json({
      success: true,
      data: theater
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new theater
// @route   POST /api/theaters
// @access  Private/Admin
exports.createTheater = async (req, res, next) => {
  try {
    const theater = await Theater.create(req.body);

    res.status(201).json({
      success: true,
      data: theater
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update theater
// @route   PUT /api/theaters/:id
// @access  Private/Admin
exports.updateTheater = async (req, res, next) => {
  try {
    const theater = await Theater.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!theater) {
      return res.status(404).json({
        success: false,
        message: 'Theater not found'
      });
    }

    res.status(200).json({
      success: true,
      data: theater
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete theater
// @route   DELETE /api/theaters/:id
// @access  Private/Admin
exports.deleteTheater = async (req, res, next) => {
  try {
    const theater = await Theater.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!theater) {
      return res.status(404).json({
        success: false,
        message: 'Theater not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Theater deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
