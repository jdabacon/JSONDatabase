const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const shelvesDir = path.join(__dirname, '../../jsonDatabase/shelves');
const dbPath = path.join(__dirname, '../../database.json');

router.post('/', (req, res) => {
  const shelf = req.body;
  const fileName = `box_${shelf.id}.json`;
  const filePath = path.join(shelvesDir, fileName);

  if (!fs.existsSync(shelvesDir)) fs.mkdirSync(shelvesDir, { recursive: true });
  if (fs.existsSync(filePath)) return res.status(409).json({ error: 'shelf already exists' });

  fs.writeFileSync(filePath, JSON.stringify(box, null, 2));

  const db = JSON.parse(fs.readFileSync(dbPath));
  db.shelves[shelf.id] = `shelves/${fileName}`;
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  res.status(201).json({ message: `shelf ${shelf.id} created.` });
});

module.exports = router;
