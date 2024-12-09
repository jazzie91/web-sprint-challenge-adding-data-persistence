exports.up = async function (knex) {
  const exists = await knex.schema.hasTable('resources');
  if (!exists) {
    await knex.schema.createTable('resources', (table) => {
      table.increments('resource_id');
      table.string('resource_name').notNullable().unique();
      table.string('resource_description');
    });
  }
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('resources');
};
