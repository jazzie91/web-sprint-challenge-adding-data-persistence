const express = require('express');
const Projects = require('../models/projectModel'); 

const router = express.Router();


router.get('/', (req, res) => {
  Projects.getProjects()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving projects' });
    });
});


router.get('/:id', (req, res) => {
  const { id } = req.params;
  Projects.getProjectById(id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: 'Project not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving project' });
    });
});


router.post('/', (req, res) => {
  const projectData = req.body;
  Projects.addProject(projectData)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error adding project' });
    });
});


router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Projects.updateProject(id, changes)
    .then(updatedProject => {
      if (updatedProject) {
        res.status(200).json(updatedProject);
      } else {
        res.status(404).json({ message: 'Project not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error updating project' });
    });
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Projects.deleteProject(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json({ message: 'Project deleted' });
      } else {
        res.status(404).json({ message: 'Project not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error deleting project' });
    });
});

module.exports = router;
