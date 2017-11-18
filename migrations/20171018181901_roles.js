exports.up = function(knex, Promise) {
  return knex.schema.createTable('roles', (t) => {
    t.increments('id').unsigned().primary()
    t.string('role')// , ['admin', 'user'])
    t.string('description')
    t.boolean('deleted').nullable()
    t.dateTime('createdAt').notNull()
    t.dateTime('updatedAt').nullable()
    t.dateTime('deletedAt').nullable()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('groups')
}
