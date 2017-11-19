const acl = require('acl')
const AclKnexBackend = require('acl-knex');
const knex = require('../config/db')

function setup() {
  acl = new Acl(new AclKnexBackend(knex, 'postgres', 'acl_'));
  setRoles()  
}

function setRoles() {

  // Define roles, resources and permissions
  acl.allow([{
    roles: 'admin',
    allows: [{
      resources: '/admin',
      permissions: '*'
    }]
  }, {
    roles: 'user',
    allows: [{
      resources: '/index',
      permissions: 'get'
    }]
  }, {
    roles: 'guest',
    allows: []
  }]);

  // Inherit roles
  //  Every user is allowed to do what guests do
  //  Every admin is allowed to do what users do
  acl.addRoleParents('user', 'guest');
  acl.addRoleParents('admin', 'user');
}


module.exports = {
  setup,
  setRoles,
}
