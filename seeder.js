const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('./models/Movie');
const Theater = require('./models/Theater');
const Show = require('./models/Show');

// Load env vars
dotenv.config();

const seedData = async () => {
  try {
    // Connect to DB with proper error handling
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected Successfully');

    // Clear existing data
    await Movie.deleteMany();
    await Theater.deleteMany();
    await Show.deleteMany();

    console.log('Data cleared...');

    // Create movies
    const movies = await Movie.create([
      {
        title: 'Avatar: The Way of Water',
        description: 'Set more than a decade after the events of the first film, "Avatar: The Way of Water" begins to tell the story of the Sully family.',
        genre: ['Action', 'Adventure', 'Sci-Fi'],
        language: 'English',
        duration: 192,
        releaseDate: new Date('2023-12-16'),
        rating: 8.5,
        poster: 'https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_FMjpg_UX1000_.jpg',
        director: 'James Cameron',
        cast: [
          { name: 'Sam Worthington', role: 'Jake Sully' },
          { name: 'Zoe Saldana', role: 'Neytiri' }
        ]
      },
      {
        title: 'Pathaan',
        description: 'An Indian spy takes on the leader of a group of mercenaries who have nefarious plans to target his homeland.',
        genre: ['Action', 'Thriller'],
        language: 'Hindi',
        duration: 146,
        releaseDate: new Date('2023-01-25'),
        rating: 7.8,
        poster: 'https://m.media-amazon.com/images/M/MV5BNTU2MzZkNDMtYTM3Yy00ZjEyLTljZDUtNWZhYTNjYWRlODc5XkEyXkFqcGc@._V1_.jpg',
        director: 'Siddharth Anand',
        cast: [
          { name: 'Shah Rukh Khan', role: 'Pathaan' },
          { name: 'Deepika Padukone', role: 'Rubina' }
        ]
      },
      {
        title: 'The Super Mario Bros. Movie',
        description: 'A plumber named Mario travels through an underground labyrinth with his brother Luigi, trying to save a captured princess.',
        genre: ['Animation', 'Adventure', 'Comedy'],
        language: 'English',
        duration: 92,
        releaseDate: new Date('2023-04-05'),
        rating: 7.2,
        poster: 'https://m.media-amazon.com/images/M/MV5BOTJhNzlmNzctNTU5Yy00N2YwLThhMjQtZDM0YjEzN2Y0ZjNhXkEyXkFqcGdeQXVyMTEwMTQ4MzU5._V1_.jpg',
        director: 'Aaron Horvath',
        cast: [
          { name: 'Chris Pratt', role: 'Mario (voice)' },
          { name: 'Anya Taylor-Joy', role: 'Princess Peach (voice)' }
        ]
      },
      {
        title: 'Oppenheimer',
        description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
        genre: ['Biography', 'Drama', 'History'],
        language: 'English',
        duration: 180,
        releaseDate: new Date('2023-07-21'),
        rating: 8.8,
        poster: 'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg',
        director: 'Christopher Nolan',
        cast: [
          { name: 'Cillian Murphy', role: 'J. Robert Oppenheimer' },
          { name: 'Emily Blunt', role: 'Kitty Oppenheimer' },
          { name: 'Robert Downey Jr.', role: 'Lewis Strauss' }
        ]
      },
      {
        title: 'Jawan',
        description: 'A high-octane action thriller which outlines the emotional journey of a man who is set to rectify the wrongs in the society.',
        genre: ['Action', 'Thriller', 'Drama'],
        language: 'Hindi',
        duration: 169,
        releaseDate: new Date('2023-09-07'),
        rating: 7.5,
        poster: 'https://www.tribuneindia.com/sortd-service/imaginary/v22-01/jpg/large/high?url=dGhldHJpYnVuZS1zb3J0ZC1wcm8tcHJvZC1zb3J0ZC9tZWRpYTlhZTIxZmMwLTRlNzctMTFlZi05OGRlLTFkNTM0OTA4ODgyMy5qcGc=',
        director: 'Atlee',
        cast: [
          { name: 'Shah Rukh Khan', role: 'Azad/Vikram' },
          { name: 'Nayanthara', role: 'Narmada' },
          { name: 'Vijay Sethupathi', role: 'Kaalie' }
        ]
      },
      {
        title: 'Barbie',
        description: 'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.',
        genre: ['Comedy', 'Adventure', 'Fantasy'],
        language: 'English',
        duration: 114,
        releaseDate: new Date('2023-07-21'),
        rating: 7.3,
        poster: 'https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg',
        director: 'Greta Gerwig',
        cast: [
          { name: 'Margot Robbie', role: 'Barbie' },
          { name: 'Ryan Gosling', role: 'Ken' },
          { name: 'Will Ferrell', role: 'CEO' }
        ]
      },
      {
        title: 'Spider-Man: Across the Spider-Verse',
        description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
        genre: ['Animation', 'Action', 'Adventure'],
        language: 'English',
        duration: 140,
        releaseDate: new Date('2023-06-02'),
        rating: 8.7,
        poster: 'https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1000_.jpg',
        director: 'Joaquim Dos Santos',
        cast: [
          { name: 'Shameik Moore', role: 'Miles Morales (voice)' },
          { name: 'Hailee Steinfeld', role: 'Gwen Stacy (voice)' },
          { name: 'Oscar Isaac', role: 'Miguel O\'Hara (voice)' }
        ]
      },
      {
        title: 'Gadar 2',
        description: 'When Tara Singh goes missing during a skirmish and is believed to be captured in Pakistan, his son Jeete sets out to rescue him.',
        genre: ['Action', 'Drama', 'Romance'],
        language: 'Hindi',
        duration: 170,
        releaseDate: new Date('2023-08-11'),
        rating: 7.0,
        poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsbeEFkCuQKz3Q6zsV85P6sSgk7p_BAzbk5A&s',
        director: 'Anil Sharma',
        cast: [
          { name: 'Sunny Deol', role: 'Tara Singh' },
          { name: 'Ameesha Patel', role: 'Sakeena' },
          { name: 'Utkarsh Sharma', role: 'Jeete' }
        ]
      },
      {
        title: 'The Creator',
        description: 'Against the backdrop of a war between humans and robots with artificial intelligence, a former soldier finds the secret weapon, a robot in the form of a young child.',
        genre: ['Sci-Fi', 'Action', 'Thriller'],
        language: 'English',
        duration: 133,
        releaseDate: new Date('2023-09-29'),
        rating: 7.4,
        poster: '',
        poster: 'https://m.media-amazon.com/images/I/81+JRa6G+3L._AC_UF1000,1000_QL80_.jpg',
        director: 'Gareth Edwards',
        cast: [
          { name: 'John David Washington', role: 'Joshua' },
          { name: 'Gemma Chan', role: 'Maya' },
          { name: 'Allison Janney', role: 'Colonel Howell' }
        ]
      },
      {
        title: 'Salaar',
        description: 'The fate of a violently contested kingdom hangs on the fraught bond between two friends-turned-foes in this saga of power, bloodshed and betrayal.',
        genre: ['Action', 'Thriller', 'Drama'],
        language: 'Telugu',
        duration: 175,
        releaseDate: new Date('2023-12-22'),
        rating: 7.9,
        poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToPFUPtjXRKeHk5HLcj2e6wzGlPef-vJE6Rw&s',
        director: 'Prashanth Neel',
        cast: [
          { name: 'Prabhas', role: 'Deva/Salaar' },
          { name: 'Prithviraj Sukumaran', role: 'Vardha' },
          { name: 'Shruti Haasan', role: 'Aadhya' }
        ]
      },
      {
        title: 'Dunki',
        description: 'Four friends from a village in Punjab share a common dream: to go to England. Their problem is that they have neither the visa nor the ticket.',
        genre: ['Comedy', 'Drama'],
        language: 'Hindi',
        duration: 161,
        releaseDate: new Date('2023-12-21'),
        rating: 7.6,
        poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1QjULpekLq1-zAVCSwHLBWiNEP1Al7GA9DQ&s',
        director: 'Rajkumar Hirani',
        cast: [
          { name: 'Shah Rukh Khan', role: 'Hardy' },
          { name: 'Taapsee Pannu', role: 'Manu' },
          { name: 'Vicky Kaushal', role: 'Sukhi' }
        ]
      },
      {
        title: 'Animal',
        description: 'The hardened son of a powerful industrialist returns home after years abroad and vows to take bloody revenge on those threatening his father\'s life.',
        genre: ['Action', 'Crime', 'Drama'],
        language: 'Hindi',
        duration: 201,
        releaseDate: new Date('2023-12-01'),
        rating: 7.8,
        poster: 'https://m.media-amazon.com/images/M/MV5BZThmNDg1NjUtNWJhMC00YjA3LWJiMjItNmM4ZDQ5ZGZiN2Y2XkEyXkFqcGc@._V1_.jpg',
        director: 'Sandeep Reddy Vanga',
        cast: [
          { name: 'Ranbir Kapoor', role: 'Ranvijay Singh' },
          { name: 'Anil Kapoor', role: 'Balbir Singh' },
          { name: 'Bobby Deol', role: 'Abrar Haque' }
        ]
      },
      {
        title: '12th Fail',
        description: 'The real-life story of IPS officer Manoj Kumar Sharma who fearlessly embraced the idea of restarting his academic journey and reclaiming his destiny.',
        genre: ['Biography', 'Drama'],
        language: 'Hindi',
        duration: 147,
        releaseDate: new Date('2023-10-27'),
        rating: 9.2,
        poster: 'https://m.media-amazon.com/images/M/MV5BNTE3OTIxZDYtNjA0NC00N2YxLTg1NGQtOTYxNmZkMDkwOWNjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
        director: 'Vidhu Vinod Chopra',
        cast: [
          { name: 'Vikrant Massey', role: 'Manoj Kumar Sharma' },
          { name: 'Medha Shankar', role: 'Shraddha Joshi' }
        ]
      },
      {
        title: 'Mission: Impossible - Dead Reckoning Part One',
        description: 'Ethan Hunt and his IMF team must track down a terrifying new weapon that threatens all of humanity if it falls into the wrong hands.',
        genre: ['Action', 'Thriller', 'Adventure'],
        language: 'English',
        duration: 163,
        releaseDate: new Date('2023-07-12'),
        rating: 7.9,
        poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4JW_QjBMswuCNZ9aNcg-bn_wX_3jDOXwJVg&s',
        director: 'Christopher McQuarrie',
        cast: [
          { name: 'Tom Cruise', role: 'Ethan Hunt' },
          { name: 'Hayley Atwell', role: 'Grace' },
          { name: 'Ving Rhames', role: 'Luther Stickell' }
        ]
      },
      {
        title: 'Guardians of the Galaxy Vol. 3',
        description: 'Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and one of their own - a mission that could mean the end of the Guardians if not successful.',
        genre: ['Action', 'Adventure', 'Sci-Fi'],
        language: 'English',
        duration: 150,
        releaseDate: new Date('2023-05-05'),
        rating: 8.1,
        poster: 'https://m.media-amazon.com/images/M/MV5BMDgxOTdjMzYtZGQxMS00ZTAzLWI4Y2UtMTQzN2VlYjYyZWRiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg',
        director: 'James Gunn',
        cast: [
          { name: 'Chris Pratt', role: 'Peter Quill' },
          { name: 'Zoe Saldana', role: 'Gamora' },
          { name: 'Dave Bautista', role: 'Drax' }
        ]
      },
      {
        title: 'Vikram',
        description: 'Members of a black ops team must track and eliminate a gang of masked murderers.',
        genre: ['Action', 'Thriller', 'Crime'],
        language: 'Tamil',
        duration: 174,
        releaseDate: new Date('2022-06-03'),
        rating: 8.3,
        poster: 'https://m.media-amazon.com/images/M/MV5BMmJhYTYxMGEtNjQ5NS00MWZiLWEwN2ItYjJmMWE2YTU1YWYxXkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_.jpg',
        director: 'Lokesh Kanagaraj',
        cast: [
          { name: 'Kamal Haasan', role: 'Vikram' },
          { name: 'Vijay Sethupathi', role: 'Santhanam' },
          { name: 'Fahadh Faasil', role: 'Amar' }
        ]
      },
      {
        title: 'Ponniyin Selvan: Part 1',
        description: 'Vandiyathevan crosses the Chola land to deliver a message from the Crown Prince Aditha Karikalan, while Kundavai attempts to establish political peace in the land.',
        genre: ['Action', 'Adventure', 'Drama'],
        language: 'Tamil',
        duration: 167,
        releaseDate: new Date('2022-09-30'),
        rating: 7.8,
        poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd8pXhfOlXvhc50mgqVUZcUoLxKN4l1lCF3Q&s',
        director: 'Mani Ratnam',
        cast: [
          { name: 'Vikram', role: 'Aditya Karikalan' },
          { name: 'Aishwarya Rai Bachchan', role: 'Nandini' },
          { name: 'Jayam Ravi', role: 'Ponniyin Selvan' },
          { name: 'Karthi', role: 'Vandiyathevan' }
        ]
      },
      {
        title: 'Leo',
        description: 'A mild-mannered cafe owner is pulled into a world of violence when his dark past is revealed.',
        genre: ['Action', 'Thriller', 'Drama'],
        language: 'Tamil',
        duration: 164,
        releaseDate: new Date('2023-10-19'),
        rating: 7.4,
        poster: 'https://resizing.flixster.com/-BOvYVtW6LKWOdfbFz12hVdYzGk=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2RlNzVkZjM0LWRiZmEtNGE0YS1hYTUyLTU1YzlhYjQwMzViZi5qcGc=',
        director: 'Lokesh Kanagaraj',
        cast: [
          { name: 'Vijay', role: 'Parthiban/Leo Das' },
          { name: 'Trisha', role: 'Sathya' },
          { name: 'Sanjay Dutt', role: 'Antony Das' }
        ]
      },
      {
        title: 'Jailer',
        description: 'A retired jailer goes on a manhunt to find his son\'s killers. But the road leads him to a familiar, albeit a bit darker place.',
        genre: ['Action', 'Comedy', 'Crime'],
        language: 'Tamil',
        duration: 168,
        releaseDate: new Date('2023-08-10'),
        rating: 7.1,
        poster: 'https://m.media-amazon.com/images/M/MV5BMjE5MzhjYmItMGFjNC00ODIxLWJkNjktYWMxYTU0ZTM3NGYzXkEyXkFqcGc@._V1_.jpg',
        director: 'Nelson Dilipkumar',
        cast: [
          { name: 'Rajinikanth', role: 'Muthuvel Pandian' },
          { name: 'Mohanlal', role: 'Mathew' },
          { name: 'Shiva Rajkumar', role: 'Narasimha' }
        ]
      },
      {
        title: 'Varisu',
        description: 'Vijay Rajendran is a happy-go-lucky man. Things change when his father becomes terminally ill, and he is left to manage his business empire.',
        genre: ['Action', 'Drama', 'Family'],
        language: 'Tamil',
        duration: 169,
        releaseDate: new Date('2023-01-12'),
        rating: 6.2,
        poster: 'https://upload.wikimedia.org/wikipedia/en/a/af/Varisu_poster.jpg',
        director: 'Vamshi Paidipally',
        cast: [
          { name: 'Vijay', role: 'Vijay Rajendran' },
          { name: 'Rashmika Mandanna', role: 'Divya' },
          { name: 'R. Sarathkumar', role: 'Rajendran' }
        ]
      },
      {
        title: 'Ponniyin Selvan: Part 2',
        description: 'Arulmozhi Varman continues on his journey to become Rajaraja I, the greatest ruler of the historic Chola empire.',
        genre: ['Action', 'Adventure', 'Drama'],
        language: 'Tamil',
        duration: 164,
        releaseDate: new Date('2023-04-28'),
        rating: 7.2,
        poster: 'https://m.media-amazon.com/images/S/pv-target-images/7d016739ef3e9d50a05051118d38494400f45007360d53caf537e659739bb0d5.jpg',
        director: 'Mani Ratnam',
        cast: [
          { name: 'Vikram', role: 'Aditya Karikalan' },
          { name: 'Aishwarya Rai Bachchan', role: 'Nandini' },
          { name: 'Jayam Ravi', role: 'Arulmozhi Varman' },
          { name: 'Karthi', role: 'Vandiyathevan' }
        ]
      },
      {
        title: 'Thunivu',
        description: 'A criminal mastermind and his team form a plan to rob the biggest bank in the country. Will they succeed or get caught in the crossfire?',
        genre: ['Action', 'Thriller', 'Crime'],
        language: 'Tamil',
        duration: 146,
        releaseDate: new Date('2023-01-11'),
        rating: 6.8,
        poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJiOsv0DqjQO0MLO8irRhCSv4gWiUnW37YNA&s',
        director: 'H. Vinoth',
        cast: [
          { name: 'Ajith Kumar', role: 'Dark Devil' },
          { name: 'Manju Warrier', role: 'Kanmani' },
          { name: 'Samuthirakani', role: 'DCP' }
        ]
      },
      {
        title: 'Maaveeran',
        description: 'A cowardly cartoonist starts being controlled by a cartoon action figure, and takes on a corrupt politician.',
        genre: ['Action', 'Comedy', 'Drama'],
        language: 'Tamil',
        duration: 163,
        releaseDate: new Date('2023-07-14'),
        rating: 7.6,
        poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT79LoNv2gWJzm639JkiMAUx_tmfofJeuKqTg&s',
        director: 'Madonne Ashwin',
        cast: [
          { name: 'Sivakarthikeyan', role: 'Sathya' },
          { name: 'Aditi Shankar', role: 'Nila' },
          { name: 'Mysskin', role: 'Minister' }
        ]
      },
      {
        title: 'Kaithi',
        description: 'Dilli, an ex-convict, endeavours to meet his daughter for the first time after leaving prison. However, his plans are interrupted by a drug raid planned by inspector Bejoy.',
        genre: ['Action', 'Thriller', 'Crime'],
        language: 'Tamil',
        duration: 145,
        releaseDate: new Date('2019-10-25'),
        rating: 8.4,
        poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrALkp418Vwg_ZR2gRZBvDzbNUYRtvWFBL2w&s',
        director: 'Lokesh Kanagaraj',
        cast: [
          { name: 'Karthi', role: 'Dilli' },
          { name: 'Narain', role: 'Bejoy' },
          { name: 'George Maryan', role: 'Napoleon' }
        ]
      },
      {
        title: 'Enthiran (Robot)',
        description: 'A scientist creates a humanoid robot with artificial intelligence, but things go awry when the robot falls in love with his creator\'s girlfriend.',
        genre: ['Action', 'Sci-Fi', 'Thriller'],
        language: 'Tamil',
        duration: 155,
        releaseDate: new Date('2010-10-01'),
        rating: 7.1,
        poster: 'https://m.media-amazon.com/images/M/MV5BNDUxOGQ5NzItYmM0ZC00YTg3LWFmZjEtOTEwZDBmMTE5Mzc1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
        director: 'S. Shankar',
        cast: [
          { name: 'Rajinikanth', role: 'Chitti/Vaseegaran' },
          { name: 'Aishwarya Rai Bachchan', role: 'Sana' },
          { name: 'Danny Denzongpa', role: 'Bohra' }
        ]
      },
      {
        title: 'Master',
        description: 'An alcoholic professor is sent to a juvenile school to teach, where he encounters a gangster who uses the children for criminal activities.',
        genre: ['Action', 'Thriller', 'Drama'],
        language: 'Tamil',
        duration: 179,
        releaseDate: new Date('2021-01-13'),
        rating: 7.3,
        poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOByssz2n4HYKHubmkfUpxb62mZd2oTiqmog&s',
        director: 'Lokesh Kanagaraj',
        cast: [
          { name: 'Vijay', role: 'JD' },
          { name: 'Vijay Sethupathi', role: 'Bhavani' },
          { name: 'Malavika Mohanan', role: 'Charulatha' }
        ]
      },
      {
        title: 'Jai Bhim',
        description: 'A tribal woman and her husband are falsely accused of theft. A lawyer fights for justice against powerful forces in this courtroom drama.',
        genre: ['Drama', 'Crime', 'Thriller'],
        language: 'Tamil',
        duration: 164,
        releaseDate: new Date('2021-11-02'),
        rating: 8.8,
        poster: 'https://mir-s3-cdn-cf.behance.net/projects/404/22df0a124976789.Y3JvcCwyNzYxLDIxNjAsNTQwLDA.jpg',
        director: 'T. J. Gnanavel',
        cast: [
          { name: 'Suriya', role: 'Chandru' },
          { name: 'Lijomol Jose', role: 'Sengeni' },
          { name: 'Manikandan', role: 'Rajakannu' }
        ]
      },
      {
        title: 'Karnan',
        description: 'A generational oppression of a marginalized community continues until a fearless young man rises to lead his people in a fight for equality.',
        genre: ['Action', 'Drama'],
        language: 'Tamil',
        duration: 159,
        releaseDate: new Date('2021-04-09'),
        rating: 8.1,
        poster: 'https://imgs.search.brave.com/iU_olGNei_H0p_LNxYop5nY6ywRIqOj_5DD78Hxbdlw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9yZXNv/dXJjZXMudGlkYWwu/Y29tL2ltYWdlcy8x/YWZlMTRhMS8wZDMz/LzQ0YmIvOTlhNC8z/M2RkNWRmZmY4ODUv/NjQweDY0MC5qcGc',
        director: 'Mari Selvaraj',
        cast: [
          { name: 'Dhanush', role: 'Karnan' },
          { name: 'Lal', role: 'Yeman Appa' },
          { name: 'Rajisha Vijayan', role: 'Draupathi' }
        ]
      },
      {
        title: 'Asuran',
        description: 'A mild-mannered farmer is forced to take up arms to protect his family from a powerful and violent landlord family.',
        genre: ['Action', 'Drama', 'Thriller'],
        language: 'Tamil',
        duration: 141,
        releaseDate: new Date('2019-10-04'),
        rating: 8.4,
        poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKkRAYPF2I0zwv0VmTSruHa2x0MaZ6Ofb0ng&s',
        director: 'Vetrimaaran',
        cast: [
          { name: 'Dhanush', role: 'Sivasaami' },
          { name: 'Manju Warrier', role: 'Pachaiyamma' },
          { name: 'Ken Karunas', role: 'Murugan' }
        ]
      },
      {
        title: 'Valimai',
        description: 'An honest police officer is tasked with bringing down a bike racing gang that is involved in illegal activities and drug trafficking.',
        genre: ['Action', 'Thriller', 'Crime'],
        language: 'Tamil',
        duration: 179,
        releaseDate: new Date('2022-02-24'),
        rating: 6.1,
        poster: 'https://m.media-amazon.com/images/M/MV5BODRhYjlmNjktNTA4OS00NmU1LWIwOTctYmMyNThiMDYwZDJmXkEyXkFqcGc@._V1_.jpg',
        director: 'H. Vinoth',
        cast: [
          { name: 'Ajith Kumar', role: 'Arjun' },
          { name: 'Huma Qureshi', role: 'Lyla' },
          { name: 'Kartikeya Gummakonda', role: 'Naren' }
        ]
      },
      {
        title: 'Soorarai Pottru',
        description: 'Nedumaaran Rajangam "Maara" sets out to make the common man fly and in the process takes on the world\'s most capital intensive industry.',
        genre: ['Drama', 'Action'],
        language: 'Tamil',
        duration: 153,
        releaseDate: new Date('2020-11-12'),
        rating: 8.7,
        poster: 'https://m.media-amazon.com/images/M/MV5BZTU5NTNmMjAtODM0Mi00YzU5LTk1OWQtZWU1NzZhMzBjYjY1XkEyXkFqcGc@._V1_.jpg',
        director: 'Sudha Kongara',
        cast: [
          { name: 'Suriya', role: 'Maara' },
          { name: 'Aparna Balamurali', role: 'Bommi' },
          { name: 'Paresh Rawal', role: 'Paresh Goswami' }
        ]
      }
    ]);


    console.log('Movies created...');

    // Create theaters
    const theaters = await Theater.create([
      {
        name: 'PVR Cinemas - Phoenix Mall',
        location: {
          address: 'Phoenix Marketcity, Whitefield',
          city: 'Bangalore',
          state: 'Karnataka',
          pincode: '560066'
        },
        screens: [
          {
            screenNumber: 1,
            screenName: 'Audi 1',
            totalSeats: 150,
            seatLayout: { rows: 10, columns: 15 }
          },
          {
            screenNumber: 2,
            screenName: 'Audi 2',
            totalSeats: 120,
            seatLayout: { rows: 8, columns: 15 }
          }
        ],
        facilities: ['Parking', 'Food Court', 'Wheelchair Access', 'Dolby Atmos'],
        contactNumber: '+91 80 12345678'
      },
      {
        name: 'INOX - Forum Mall',
        location: {
          address: 'Forum Mall, Koramangala',
          city: 'Bangalore',
          state: 'Karnataka',
          pincode: '560095'
        },
        screens: [
          {
            screenNumber: 1,
            screenName: 'Screen 1',
            totalSeats: 180,
            seatLayout: { rows: 12, columns: 15 }
          }
        ],
        facilities: ['Parking', 'Food Court', 'Recliner Seats'],
        contactNumber: '+91 80 87654321'
      },
      {
        name: 'Cinepolis - Mantri Square Mall',
        location: {
          address: 'Mantri Square Mall, Malleshwaram',
          city: 'Bangalore',
          state: 'Karnataka',
          pincode: '560003'
        },
        screens: [
          {
            screenNumber: 1,
            screenName: 'Premium Screen',
            totalSeats: 100,
            seatLayout: { rows: 10, columns: 10 }
          }
        ],
        facilities: ['Parking', 'Premium Seating', 'Gourmet Food'],
        contactNumber: '+91 80 11223344'
      }
    ]);

    console.log('Theaters created...');

    // Create shows for next 7 days
    const shows = [];
    const showTimes = ['10:00 AM', '01:30 PM', '05:00 PM', '08:30 PM'];
    
    for (let day = 0; day < 7; day++) {
      const showDate = new Date();
      showDate.setDate(showDate.getDate() + day);
      showDate.setHours(0, 0, 0, 0);

      for (const movie of movies) {
        for (const theater of theaters) {
          // Create 3-4 shows per theater per movie per day
          const numShows = Math.floor(Math.random() * 2) + 3;
          
          for (let i = 0; i < numShows; i++) {
            shows.push({
              movie: movie._id,
              theater: theater._id,
              screenNumber: 1,
              showDate: showDate,
              showTime: showTimes[i],
              price: 200 + Math.floor(Math.random() * 100),
              totalSeats: theater.screens[0].totalSeats,
              availableSeats: theater.screens[0].totalSeats,
              bookedSeats: []
            });
          }
        }
      }
    }

    await Show.create(shows);
    console.log('Shows created...');

    console.log('✅ Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();











