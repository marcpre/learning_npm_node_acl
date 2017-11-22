const acl = require('acl')
const AclKnexBackend = require('acl-knex');
const knex = require('../config/db')

function setup() {
  this.acl = new acl(new AclKnexBackend(knex, 'postgres', 'acl_'));
  
  this.acl.allow([{
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
  this.acl.addRoleParents('user', 'guest');
  this.acl.addRoleParents('admin', 'user');
  
  return acl
}

/*
function setRoles() {

  // Define roles, resources and permissions
  this.acl.allow([{
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
*/

module.exports = {
  setup,
}
