const db = require('../data/dbConfig'); 


function getProjects() {
  return db('projects');
}


function getProjectById(id) {
  return db('projects').where({ id }).first();
}


function addProject(project) {
  return db('projects')
    .insert(project)
    .then(([id]) => getProjectById(id));
}


function updateProject(id, changes) {
  return db('projects')
    .where({ id })
    .update(changes)
    .then(() => getProjectById(id));
}


function deleteProject(id) {
  return db('projects')
    .where({ id })
    .del();
}

module.exports = {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject
};
