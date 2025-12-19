const Show = require('../models/Show');
const Movie = require('../models/Movie');
const Theater = require('../models/Theater');

// @desc    Get all shows
// @route   GET /api/shows
// @access  Public
exports.getShows = async (req, res, next) => {
  try {
    const { movieId, theaterId, date } = req.query;
    let query = { isActive: true };

    if (movieId) query.movie = movieId;
    if (theaterId) query.theater = theaterId;
    if (date) {
      // Parse date string and create date range for the entire day
      const [year, month, day] = date.split('-').map(Number);
      const startDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
      const endDate = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));
      query.showDate = { $gte: startDate, $lte: endDate };
      console.log('Date query:', { date, startDate, endDate, query: query.showDate });
    }

    const shows = await Show.find(query)
      .populate('movie', 'title poster duration rating genre language')
      .populate('theater', 'name location')
      .sort('showTime');

    res.status(200).json({
      success: true,
      count: shows.length,
      data: shows
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single show
// @route   GET /api/shows/:id
// @access  Public
exports.getShow = async (req, res, next) => {
  try {
    const show = await Show.findById(req.params.id)
      .populate('movie')
      .populate('theater');

    if (!show) {
      return res.status(404).json({
        success: false,
        message: 'Show not found'
      });
    }

    res.status(200).json({
      success: true,
      data: show
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new show
// @route   POST /api/shows
// @access  Private/Admin
exports.createShow = async (req, res, next) => {
  try {
    // Verify movie and theater exist
    const movie = await Movie.findById(req.body.movie);
    const theater = await Theater.findById(req.body.theater);

    if (!movie || !theater) {
      return res.status(404).json({
        success: false,
        message: 'Movie or Theater not found'
      });
    }

    const show = await Show.create(req.body);

    res.status(201).json({
      success: true,
      data: show
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update show
// @route   PUT /api/shows/:id
// @access  Private/Admin
exports.updateShow = async (req, res, next) => {
  try {
    const show = await Show.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!show) {
      return res.status(404).json({
        success: false,
        message: 'Show not found'
      });
    }

    res.status(200).json({
      success: true,
      data: show
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete show
// @route   DELETE /api/shows/:id
// @access  Private/Admin
exports.deleteShow = async (req, res, next) => {
  try {
    const show = await Show.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!show) {
      return res.status(404).json({
        success: false,
        message: 'Show not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Show deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
