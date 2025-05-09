const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const boxDir = path.join(__dirname, '/../../jsonDatabase/boxes');
const dbPath = path.join(__dirname, '/../../database.json');

router.post('/', (req, res) => {
  const box = req.body;
  const fileName = `box_${box.id}.json`;
  const filePath = path.join(boxDir, fileName);

  if (!fs.existsSync(boxDir)) fs.mkdirSync(boxDir, { recursive: true });
  if (fs.existsSync(filePath)) return res.status(409).json({ error: 'Box already exists' });

  fs.writeFileSync(filePath, JSON.stringify(box, null, 2));

  const db = JSON.parse(fs.readFileSync(dbPath));
  db.boxes[box.id] = `boxes/${fileName}`;
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  res.status(201).json({ message: `Box ${box.id} created.` });
});

module.exports = router;
