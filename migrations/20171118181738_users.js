exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (t) => {
    t.increments('id').unsigned().primary()
    t.string('username')
    t.integer('role_id').references('id').inTable('roles').notNull()
      .onDelete('cascade')
    t.string('email').notNull()
    t.string('password').notNull()
    t.boolean('deleted').nullable()
    t.dateTime('createdAt').notNull()
    t.dateTime('updatedAt').nullable()
    t.dateTime('deletedAt').nullable()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
}
