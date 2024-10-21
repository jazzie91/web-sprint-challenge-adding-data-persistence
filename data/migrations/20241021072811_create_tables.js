
exports.up = async function(knex) {
    
    await knex.schema.createTable('projects', (table) => {
      table.increments('project_id').primary();
      table.string('project_name').notNullable();
      table.string('project_description');
      table.boolean('project_completed').defaultTo(false);
    });
  
    
    await knex.schema.createTable('resources', (table) => {
      table.increments('resource_id').primary();
      table.string('resource_name').notNullable().unique();
      table.string('resource_description');
    });
  
    
    await knex.schema.createTable('tasks', (table) => {
      table.increments('task_id').primary();
      table.string('task_description').notNullable();
      table.string('task_notes');
      table.boolean('task_completed').defaultTo(false);
      table.integer('project_id')
           .unsigned()
           .notNullable()
           .references('project_id')
           .inTable('projects')
           .onDelete('CASCADE')
           .onUpdate('CASCADE');
    });
  };
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('tasks');
    await knex.schema.dropTableIfExists('resources');
    await knex.schema.dropTableIfExists('projects');
  };
  