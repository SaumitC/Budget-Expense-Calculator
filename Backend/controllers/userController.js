// controllers/authController.js
const authService = require('../services/userService');

async function signup(req, res) {
  try {
    const user = await authService.createUser(req.body);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error);
    // Write logic to handle different cases like user already present etc
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await authService.findUserByUsername(username);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await authService.comparePasswords(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = authService.generateToken(user);

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
async function logout(req, res) {
    try {
      // Assuming you are passing the token in the request headers as 'Authorization'
      console.log(req.headers)
      const token = req.headers.authorization;
  
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      const result = await authService.logout(token);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
module.exports = {
  signup,
  login,
  logout
};
