const knex = require('../db/knex'); 

const Task = {
 
  getAll: async () => {
    return knex('tasks').select('*');
  },

  
  getById: async (id) => {
    return knex('tasks').where({ task_id: id }).first();
  },

  
  getByProjectId: async (projectId) => {
    return knex('tasks').where({ project_id: projectId });
  },

  
  create: async (taskData) => {
    return knex('tasks').insert(taskData).returning('*');
  },

  
  update: async (id, updatedData) => {
    return knex('tasks').where({ task_id: id }).update(updatedData).returning('*');
  },

  
  delete: async (id) => {
    return knex('tasks').where({ task_id: id }).del();
  }
};

module.exports = Task;
