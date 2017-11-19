const config = require('../../knexfile')

const env = process.env.DB_ENV
const knex = require('knex')(config[env])

knex.on('query', (queryData) => {
  console.log(queryData)
})

module.exports = knex
