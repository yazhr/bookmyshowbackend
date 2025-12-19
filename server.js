const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

dotenv.config();

connectDB();


const auth = require('./routes/auth');
const movies = require('./routes/movies');
const theaters = require('./routes/theaters');
const shows = require('./routes/shows');
const bookings = require('./routes/bookings');

const app = express();


app.use(express.json());

app.use(cors());

app.use('/api/auth', auth);
app.use('/api/movies', movies);
app.use('/api/theaters', theaters);
app.use('/api/shows', shows);
app.use('/api/bookings', bookings);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'BookMyShow API is running'
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});


process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
