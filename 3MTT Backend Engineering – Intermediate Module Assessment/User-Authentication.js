const jwt = require('jsonwebtoken');

function generateToken(user) {
  return jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
}

// Signup
app.post('/signup', async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Signin
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = generateToken(user);
  res.json({ token });
});
