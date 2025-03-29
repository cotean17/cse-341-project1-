// routes/contacts.js
const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI);
let contactsCollection;

// Connect to MongoDB and set the collection
client.connect()
  .then(() => {
    const db = client.db('contactsDB'); // Make sure your DB is named correctly
    contactsCollection = db.collection('contacts');
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('MongoDB connection error:', err));

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await contactsCollection.find({}).toArray();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// GET one contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await contactsCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
});

module.exports = router;
