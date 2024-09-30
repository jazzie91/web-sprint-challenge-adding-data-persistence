const db = require('../data/dbConfig'); 

const Projects = {
  
  getProjects: async () => {
    return await db('projects'); 
  },

  
  getProjectById: async (id) => {
    return await db('projects').where({ project_id: id }).first(); 
  },

  
  addProject: async (projectData) => {
    const [project_id] = await db('projects').insert(projectData).returning('project_id'); 
    return Projects.getProjectById(project_id); 
  },


  updateProject: async (id, changes) => {
    await db('projects').where({ project_id: id }).update(changes); 
    return Projects.getProjectById(id); 
  },

  
  deleteProject: async (id) => {
    const deleted = await db('projects').where({ project_id: id }).del(); 
    return deleted > 0; 
  }
};

module.exports = Projects;

