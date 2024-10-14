const knex = require('../db/knex'); 

const ProjectResource = {
  
  getAll: async () => {
    return knex('project_resources').select('*');
  },

  
  getByProjectId: async (projectId) => {
    return knex('project_resources')
      .join('resources', 'project_resources.resource_id', 'resources.resource_id')
      .where({ project_id: projectId })
      .select('resources.*', 'project_resources.quantity', 'project_resources.assigned_date', 'project_resources.notes');
  },

  
  getByResourceId: async (resourceId) => {
    return knex('project_resources')
      .join('projects', 'project_resources.project_id', 'projects.id')
      .where({ resource_id: resourceId })
      .select('projects.*', 'project_resources.quantity', 'project_resources.assigned_date', 'project_resources.notes');
  },

  
  assignResource: async (assignmentData) => {
    return knex('project_resources').insert(assignmentData).returning('*');
  },

  
  unassignResource: async (projectId, resourceId) => {
    return knex('project_resources')
      .where({ project_id: projectId, resource_id: resourceId })
      .del();
  }
};

module.exports = ProjectResource;
