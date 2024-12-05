const express = require('express');
const Resources = require('./model'); 
const router = express.Router();


router.get('/', async (req, res, next) => {
  try {
    const resources = await Resources.getResources();
    res.json(resources);
  } catch (err) {
    next(err);
  }
});


router.post('/', async (req, res, next) => {
  try {
    const newResource = await Resources.addResource(req.body);
    res.status(201).json(newResource[0]); 
  } catch (err) {
    next(err);
  }
});

module.exports = router;