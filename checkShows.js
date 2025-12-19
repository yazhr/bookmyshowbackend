const mongoose = require('mongoose');
const Movie = require('./models/Movie');
const Theater = require('./models/Theater');
const Show = require('./models/Show');

mongoose.connect('mongodb://localhost:27017/bookmyshow')
  .then(async () => {
    console.log('Connected to MongoDB\n');
    
    const jaiBhim = await Movie.findOne({ title: 'Jai Bhim' });
    console.log('Jai Bhim ID:', jaiBhim._id.toString());
    
    const allShows = await Show.find({ movie: jaiBhim._id }).sort('showDate');
    console.log('Total shows:', allShows.length);
    
    console.log('\nAll unique dates:');
    const dates = {};
    allShows.forEach(s => {
      const dateStr = s.showDate.toISOString().split('T')[0];
      dates[dateStr] = (dates[dateStr] || 0) + 1;
    });
    
    Object.keys(dates).sort().forEach(d => console.log(d, ':', dates[d], 'shows'));
    
    // Check Dec 23 specifically
    console.log('\n--- Dec 23 Shows ---');
    const dec23Shows = await Show.find({
      movie: jaiBhim._id,
      showDate: {
        $gte: new Date('2025-12-23T00:00:00.000Z'),
        $lt: new Date('2025-12-24T00:00:00.000Z')
      }
    }).populate('theater', 'name');
    
    console.log('Found', dec23Shows.length, 'shows for Dec 23');
    dec23Shows.forEach(s => {
      console.log('- Time:', s.showTime, 'Theater:', s.theater.name, 'Date:', s.showDate.toISOString());
    });
    
    mongoose.disconnect();
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
