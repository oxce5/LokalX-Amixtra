const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors'); 

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const userContentRoutes = require('./routes/userContent');
const postsRoutes = require('./routes/posts');
const messagesRoutes = require('./routes/messages'); 
const messageWS = require('./services/message-ws');  

const app = express();
app.use(cors()); 
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/user-content', userContentRoutes);
app.use('/posts', postsRoutes);
app.use('/messages', messagesRoutes); // <-- add this line

const server = http.createServer(app);
messageWS.setup(server); 
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  console.log('WebSocket server running on ws://localhost:3000');
});
