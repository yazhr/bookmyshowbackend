# BookMyShow Backend

Backend API for BookMyShow movie ticket booking application built with Node.js, Express, and MongoDB.

## Features

- User Authentication (JWT)
- Movie Management
- Theater Management
- Show Management
- Booking System
- Seat Selection

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

## Installation

```bash
npm install
```

## Database Seeding

To populate the database with sample data:

```bash
node seeder.js
```

This will create:
- 31 movies
- 3 theaters
- Multiple shows

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie by ID

### Theaters
- `GET /api/theaters` - Get all theaters

### Shows
- `GET /api/shows` - Get all shows
- `GET /api/shows/:id` - Get show by ID

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my-bookings` - Get user bookings

## Deployment on Render

1. Push code to GitHub
2. Connect repository to Render
3. Configure environment variables in Render dashboard
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Deploy!

## License

MIT
