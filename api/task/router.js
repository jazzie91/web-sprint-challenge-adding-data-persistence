const express = require('express');
const Task = require('../models/TaskModel'); 
const router = express.Router();
const db = require('../data/dbConfig');


router.get('/', async (req, res) => {
  try {
    const tasks = await Task.getAll(); 
    res.status(200).json(tasks); 
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve tasks' });
  }
});


router.post('/', async (req, res) => {
  const { task_description, task_notes, project_id } = req.body;

  if (!task_description) {
    return res.status(400).json({ message: 'Task description is required' });
  }

  try {
    const [newTask] = await db('tasks')
      .insert({
        task_description,
        task_notes: task_notes || null, 
        task_completed: false, 
        project_id
      })
      .returning('*'); 

    const formattedTask = {
      ...newTask,
      task_completed: newTask.task_completed === 1 
    };

    res.status(201).json(formattedTask); 
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ message: 'Error creating task' });
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
