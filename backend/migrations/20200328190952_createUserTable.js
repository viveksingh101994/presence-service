
exports.up = function(knex) {
    return knex.schema
    .createTable('user', function(table) {
      table
        .increments('uid')
        .primary()
        .unique();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.date('lastLogin').notNullable();
      table.boolean('isActive');
      table.string('avatarUrl');
      table.integer('userId');
    })
};

exports.down = function(knex) {
    return knex.schema.raw('DROP TABLE user CASCADE');
};
