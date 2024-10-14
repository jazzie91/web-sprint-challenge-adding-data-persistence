const express = require('express');
const ProjectResource = require('../models/ProjectResourcesModel');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const resources = await ProjectResource.getAll();
    res.status(200).json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve resource assignments' });
  }
});


router.get('/project/:projectId', async (req, res) => {
  const { projectId } = req.params;
  try {
    const resources = await ProjectResource.getByProjectId(projectId);
    res.status(200).json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve resources for the project' });
  }
});


router.get('/resource/:resourceId', async (req, res) => {
  const { resourceId } = req.params;
  try {
    const projects = await ProjectResource.getByResourceId(resourceId);
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve projects for the resource' });
  }
});


router.post('/', async (req, res) => {
  const assignmentData = req.body;
  if (!assignmentData.project_id || !assignmentData.resource_id) {
    return res.status(400).json({ message: 'Project ID and Resource ID are required' });
  }
  try {
    const newAssignment = await ProjectResource.assignResource(assignmentData);
    res.status(201).json(newAssignment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to assign resource to project' });
  }
});


router.delete('/:projectId/:resourceId', async (req, res) => {
  const { projectId, resourceId } = req.params;
  try {
    await ProjectResource.unassignResource(projectId, resourceId);
    res.status(200).json({ message: 'Resource unassigned from project' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to unassign resource from project' });
  }
});

module.exports = router;
