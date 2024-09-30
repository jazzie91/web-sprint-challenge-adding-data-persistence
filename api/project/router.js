const express = require('express');
const Projects = require('../models/projectModel'); 

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const projects = await Projects.getProjects();
    res.status(200).json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving projects' });
  }
});


router.post('/', async (req, res) => {
  const projectData = req.body;
  try {
    const newProject = await Projects.addProject(projectData);
    res.status(201).json(newProject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding project' });
  }
});



module.exports = router;

