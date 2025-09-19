const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const noteRoutes = require('./routes/noteRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve static frontend from client folder
const clientPath = path.resolve(__dirname, '../client');
app.use(express.static(clientPath));

// ✅ API routes
app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);

// ✅ Frontend routes
app.get('/', (req, res) => res.sendFile(path.join(clientPath, 'index.html')));
app.get('/login.html', (req, res) => res.sendFile(path.join(clientPath, 'login.html')));
app.get('/signup.html', (req, res) => res.sendFile(path.join(clientPath, 'signup.html')));
app.get('/main.html', (req, res) => res.sendFile(path.join(clientPath, 'main.html')));

// ✅ MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error('MongoDB connection error:', err));
