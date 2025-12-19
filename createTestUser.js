const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

const createTestUser = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected Successfully');

    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'test@bookmyshow.com' });
    
    if (existingUser) {
      console.log('Test user already exists!');
      console.log('✅ Email: test@bookmyshow.com');
      console.log('✅ Password: test123');
      process.exit();
      return;
    }

    // Create test user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('test123', salt);

    const testUser = await User.create({
      name: 'Test User',
      email: 'test@bookmyshow.com',
      phone: '9876543210',
      password: hashedPassword,
      role: 'user'
    });

    console.log('\n✅ Test user created successfully!\n');
    console.log('═══════════════════════════════════');
    console.log('📧 Email: test@bookmyshow.com');
    console.log('🔑 Password: test123');
    console.log('👤 Name: Test User');
    console.log('📱 Phone: 9876543210');
    console.log('═══════════════════════════════════\n');
    console.log('You can now login and book movies! 🎬\n');
    
    process.exit();
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
};

createTestUser();
