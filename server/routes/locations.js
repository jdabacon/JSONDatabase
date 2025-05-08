const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const locationsDir = path.join(__dirname, '../../jsonDatabase/locations');
const dbPath = path.join(__dirname, '../../database.json');

router.post('/', (req, res) => {
  const location = req.body;
  const fileName = `box_${location.id}.json`;
  const filePath = path.join(locationsDir, fileName);

  if (!fs.existsSync(locationsDir)) fs.mkdirSync(locationsDir, { recursive: true });
  if (fs.existsSync(filePath)) return res.status(409).json({ error: 'location already exists' });

  fs.writeFileSync(filePath, JSON.stringify(box, null, 2));

  const db = JSON.parse(fs.readFileSync(dbPath));
  db.locations[location.id] = `locations/${fileName}`;
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  res.status(201).json({ message: `location ${location.id} created.` });
});

module.exports = router;
