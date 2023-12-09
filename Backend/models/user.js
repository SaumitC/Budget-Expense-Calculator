const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Define the user schema
const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
        validator: (value) => {
          // Simple email format validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: 'Invalid email format',
      }
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });
// Create and export the User model
const User = mongoose.model('User', userSchema);


module.exports = User;
