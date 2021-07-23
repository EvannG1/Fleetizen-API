const express = require('express');
const app = express();
const cors = require('cors');
require('./db/dbConfig');
const mongoose = require('mongoose');

const shipsRoutes = require('./routes/shipsController');
const citizensRoutes = require('./routes/citizensController');

mongoose.set('useFindAndModify', false);

// Initialisation du CORS
app.use(cors());

// Body-Parser
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Routes
app.use('/ships', shipsRoutes);
app.use('/citizens', citizensRoutes);

app.listen(8081, () => console.log('Server started: 8081'));