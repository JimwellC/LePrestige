const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/menuDB', { useNewUrlParser: true, useUnifiedTopology: true });

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

const menuSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String, // Store the file path
  category: String,
});
const Menu = mongoose.model('Menu', menuSchema);

// Get all menu items
app.get('/menu', async (req, res) => {
  const menuItems = await Menu.find();
  res.json(menuItems);
});

// Add a menu item with an image
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

// Update an item
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

// Delete a menu item
app.delete('/menu/:id', async (req, res) => {
  await Menu.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item deleted' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
