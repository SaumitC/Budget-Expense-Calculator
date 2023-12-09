// controllers/authController.js
const authService = require('../services/userService');

async function signup(req, res) {
  try {
    const user = await authService.createUser(req.body);
    res.status(201).json({ message: 'User registered successfully', success:true });
  } catch (error) {
    console.error(error);
    // Write logic to handle different cases like user already present etc
    res.status(500).json({ error: 'Internal server error',success:false });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await authService.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials',success:false });
    }

    const passwordMatch = await authService.comparePasswords(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' ,success:false});
    }

    const token = authService.generateToken(user);

    res.json({ message: 'Login successful', token ,success:true, user: { email: user.email, firstName: user.firstName, lastName: user.lastName } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error',success:false });
  }
}
async function logout(req, res) {
    try {
      // Assuming you are passing the token in the request headers as 'Authorization'
      console.log(req.headers)
      const token = req.headers.authorization;
  
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' ,success:false});
      }
  
      const result = await authService.logout(token);
      res.json({ message: 'Logout successful',success:true });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error',success:false });
    }
  }
  async function generateAccessToken(req, res) {
    try {
      
      const user = req.user; // Assume you've added the user to the request during authentication`
      const token = authService.generateToken(user);
      res.json({ message: 'Token generated successfully', token ,success:true ,user: { email: user.email, firstName: user.firstName, lastName: user.lastName }});
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
module.exports = {
  signup,
  login,
  logout,
  generateAccessToken
};
