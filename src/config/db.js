require('dotenv').config()
// Loading from an external file
const config = require('../../knexfile')
console.log(config)
const env = process.env.DB_ENV
console.log(env)

const knex = require('knex')(config[env])

knex.on('query', (queryData) => {
  console.log(queryData)
})

module.exports = knex
