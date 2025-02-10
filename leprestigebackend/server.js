const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 5001;

const Contact = require('./models/contact');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/menuDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Menu Schema and Model
const menuSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String, // Store the file path
  category: String,
});
const Menu = mongoose.model('Menu', menuSchema);

// Reservation Schema and Model
const reservationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  people: Number,
  date: Date,
  time: String,
  message: String,
});
const Reservation = mongoose.model('Reservation', reservationSchema);

// Routes
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Menu Routes
app.get('/menu', async (req, res) => {
  const menuItems = await Menu.find();
  res.json(menuItems);
});

app.post('/menu', upload.single('image'), async (req, res) => {
  const { name, price, category } = req.body;
  const newItem = new Menu({
    name,
    price,
    category,
    image: req.file ? `/uploads/${req.file.filename}` : '',
  });
  await newItem.save();
  res.json(newItem);
});

app.put('/menu/:id', upload.single('image'), async (req, res) => {
  const { name, price, category } = req.body;
  const update = {
    name,
    price,
    category,
  };
  if (req.file) {
    update.image = `/uploads/${req.file.filename}`;
  }
  const updatedItem = await Menu.findByIdAndUpdate(req.params.id, update, { new: true });
  res.json(updatedItem);
});

app.delete('/menu/:id', async (req, res) => {
  await Menu.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item deleted' });
});

// Contact Routes
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact information' });
  }
});

app.post('/contacts', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const savedContact = await contact.save();
    res.json(savedContact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save contact information' });
  }
});

// Reservation Routes
// Save a reservation
app.post('/reservations', async (req, res) => {
  try {
    const { name, email, phone, people, date, time, message } = req.body;
    const newReservation = new Reservation({
      name,
      email,
      phone,
      people,
      date,
      time,
      message,
    });
    const savedReservation = await newReservation.save();
    res.json(savedReservation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save reservation' });
  }
});

// Retrieve all reservations
app.get('/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
