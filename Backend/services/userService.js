const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function createUser(user) {
    let userModel = new User(user);
  return userModel.save();
}

async function findUserByEmail(email) {
  return User.findOne({ email });
}

async function comparePasswords(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

function generateToken(user) {

    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '60s' }); // 1-minute expiration

}
async function logout(token) {
    try {
      return { message: 'Logout successful' };
    } catch (error) {
      throw new Error(error.message);
    }
  }


module.exports = {
  createUser,
  findUserByEmail,
  comparePasswords,
  generateToken,
  logout
};
