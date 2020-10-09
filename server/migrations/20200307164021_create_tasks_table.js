const Task = require('../models/Task');

exports.up = function(knex) {
  return knex.schema
    .createTable('tasks', (table) => {
      table.increments('id');
      table.string('description', 512).notNullable();
      table.string('status', 512).notNullable().defaultTo(Task.PENDING);
      table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('tasks');
};
