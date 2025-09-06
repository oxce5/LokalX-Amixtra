const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const userContentRoutes = require('./routes/userContent');

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/user-content', userContentRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
