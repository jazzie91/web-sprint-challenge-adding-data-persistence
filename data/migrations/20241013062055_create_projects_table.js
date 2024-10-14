exports.up = async function(knex) {
  await knex.schema.createTable('projects', table => {
    table.increments('id'); 
    table.string('name').notNullable(); 
    table.text('description'); 
    table.boolean('completed').defaultTo(false); 
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('projects');
};
