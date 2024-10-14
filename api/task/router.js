const express = require('express');
const Task = require('../models/TaskModel'); 
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const tasks = await Task.getAll();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve tasks' });
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.getById(id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve task' });
  }
});


router.get('/project/:projectId', async (req, res) => {
  const { projectId } = req.params;
  try {
    const tasks = await Task.getByProjectId(projectId);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve tasks for the project' });
  }
});


router.post('/', async (req, res) => {
  const taskData = req.body;
  if (!taskData.task_name || !taskData.project_id) {
    return res.status(400).json({ message: 'Task name and project ID are required' });
  }
  try {
    const newTask = await Task.create(taskData);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task' });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedTask = await Task.update(id, updatedData);
    if (updatedTask) {
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task' });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Task.delete(id);
    if (deleted) {
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete task' });
  }
});

module.exports = router;
