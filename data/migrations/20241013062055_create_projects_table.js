exports.up = function(knex) {
    return knex.schema.createTable('projects', table => {
      table.increments('id'); 
      table.string('name').notNullable(); 
      table.string('description'); 
      table.boolean('completed').defaultTo(false); 
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('projects');
  };
  