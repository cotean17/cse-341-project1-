// index.js
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Import and use contacts routes
const contactsRoutes = require('./routes/contacts');
app.use('/contacts', contactsRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Hello World from Contacts API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
