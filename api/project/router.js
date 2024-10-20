const express = require('express');
const Project = require('../models/Project'); 
const router = express.Router();
const db = require('../data/dbConfig');

router.get('/', async (req, res) => {
  try {
    const projects = await Project.getAll(); 
    
    const formattedProjects = projects.map(project => ({
      ...project,
      project_completed: project.project_completed === 1, 
    }));
    res.status(200).json(formattedProjects);
  } catch (err) {
    console.error('Error retrieving projects:', err);
    res.status(500).json({ message: 'Failed to retrieve projects' });
  }
});



router.post('/', async (req, res) => {
  const { project_name, project_description } = req.body;

  if (!project_name) {
    return res.status(400).json({ message: 'Project name is required' });
  }

  try {
    const [newProject] = await db('projects').insert({
      project_name,
      project_description,
      project_completed: false
    }).returning('*'); 

    res.status(201).json({
      ...newProject,
      project_completed: newProject.project_completed === 1, 
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating project' });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { project_name, project_description, project_completed } = req.body;

  try {
    const updatedProject = await db('projects')
      .where('project_id', id)
      .update({
        project_name,
        project_description,
        project_completed: project_completed !== undefined ? project_completed : undefined
      })
      .returning('*'); 

    if (updatedProject.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({
      ...updatedProject[0],
      project_completed: updatedProject[0].project_completed === 1, 
    });
  } catch (err) {
    res.status(500).json({ message: 'Error updating project' });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await db('projects')
      .where('project_id', id)
      .del(); 

    if (deleted === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting project' });
  }
});

module.exports = router;
