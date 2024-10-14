exports.up = function(knex) {
    return knex.schema.createTable('resources', function(table) {
      table.increments('resource_id'); 
      table.string('resource_name').notNullable().unique(); 
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('resources');
  };
  