const express = require('express');
const ProjectResource = require('../models/ProjectResourcesModel');
const router = express.Router();
const db = require('../data/dbConfig');


router.get('/project/:projectId', async (req, res) => {
  const { projectId } = req.params;
  try {
    const resources = await ProjectResource.getByProjectId(projectId);
    res.status(200).json(resources);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve resources for the project' });
  }
});

router.post('/', async (req, res) => {
  const { resource_name, resource_description } = req.body; 

  if (!resource_name) {
    return res.status(400).json({ message: 'Resource name is required' });
  }

  try {
    const [newResource] = await db('resources').insert({
      resource_name,
      resource_description: resource_description || null 
    }).returning('*'); 

    res.status(201).json(newResource); 
  } catch (err) {
    console.error('Error creating resource:', err);
    res.status(500).json({ message: 'Error creating resource' });
  }
});


router.delete('/:projectId/:resourceId', async (req, res) => {
  const { projectId, resourceId } = req.params;
  try {
    await ProjectResource.unassignResource(projectId, resourceId);
    res.status(200).json({ message: 'Resource unassigned from project' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to unassign resource from project' });
  }
});

module.exports = router;
