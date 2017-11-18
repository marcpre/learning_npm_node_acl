const bcrypt = require('bcryptjs')
const knex = require('../config/db')

async function usernameExists(username) {
  const res = await knex('users').where({ username }).count().first()
  return (parseInt(res.count) > 0)
}

async function signin(username, password) {
  const user = await knex('users').where({ username }).first()
  console.log(`user: ${user.username} password: ${user.password}`)
  if (!user) return null

  return (await bcrypt.compare(password, user.password)) ? user : null
}

async function findById(id) {
  return knex('users').where({ id }).first()
}

async function findByUsername(username) {
  return knex('users').where({ username }).first()
}

module.exports = {
  signin,
  usernameExists,
  findById,
  findByUsername,
}
