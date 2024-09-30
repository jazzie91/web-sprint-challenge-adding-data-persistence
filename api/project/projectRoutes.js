const express = require('express');
const Projects = require('./models/projectModel'); 

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const projects = await Projects.getProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving projects' });
  }
});


module.exports = router;
