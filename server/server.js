const express = require('express');
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.static('public')); // For serving frontend files

// Routes will go here
app.use('/api/boxes', require('./routes/boxes'));
app.use('/api/shelves', require('./routes/shelves'));
app.use('/api/locations', require('./routes/locations'));

app.listen(port, () => {
  console.log(`📦 JSON API running at http://localhost:${port}`);
});
