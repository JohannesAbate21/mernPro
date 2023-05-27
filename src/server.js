const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an Express app
const app = express();

// Enable CORS
app.use(cors());

// Parse requests of content-type 'application/json'
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(
  'mongodb+srv://abateabel851:abateabel852@cluster0.jrg0ugc.mongodb.net/new?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Define a MongoDB schema
const Schema = mongoose.Schema;
const dataSchema = new Schema({
  name: String,
  email: String,
});

// Create a MongoDB model
const Data = mongoose.model('Data', dataSchema);

// Define a POST route to save data to MongoDB
app.post('/api/data', (req, res) => {
  const { name, email } = req.body;

  // Create a new data document
  const newData = new Data({ name, email });

  // Save the data to MongoDB
  newData.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to save data' });
    } else {
      res.json({ message: 'Data saved successfully' });
    }
  });
});

// Define a GET route to fetch data from MongoDB
app.get('/api/data', (req, res) => {
  // Find all data documents in MongoDB
  Data.find({}, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch data' });
    } else {
      res.json(data);
    }
  });
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
