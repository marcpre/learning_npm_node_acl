require('dotenv').config()

const _ = require('lodash');
const buckets = require('./buckets');
const knex = require('../src/config/db');

var downSql = 'DROP TABLE IF EXISTS "{{prefix}}{{meta}}";'+
	'DROP TABLE IF EXISTS "{{prefix}}{{resources}}";'+
	'DROP TABLE IF EXISTS "{{prefix}}{{parents}}";'+
	'DROP TABLE IF EXISTS "{{prefix}}{{users}}";'+
	'DROP TABLE IF EXISTS "{{prefix}}{{roles}}";'+
	'DROP TABLE IF EXISTS "{{prefix}}{{permissions}}";';
var upSql = 'CREATE TABLE "{{prefix}}{{meta}}" (key TEXT NOT NULL PRIMARY KEY, value TEXT[][] NOT NULL);'+
	'INSERT INTO "{{prefix}}{{meta}}" VALUES (\'users\', \'{}\');'+
	'INSERT INTO "{{prefix}}{{meta}}" VALUES (\'roles\', \'{}\');'+
	'CREATE TABLE "{{prefix}}{{resources}}" (key TEXT NOT NULL PRIMARY KEY, value TEXT[][] NOT NULL);'+
	'CREATE TABLE "{{prefix}}{{parents}}" (key TEXT NOT NULL PRIMARY KEY, value TEXT[][] NOT NULL);'+
	'CREATE TABLE "{{prefix}}{{roles}}" (key TEXT NOT NULL PRIMARY KEY, value TEXT[][] NOT NULL);'+
	'CREATE TABLE "{{prefix}}{{users}}" (key TEXT NOT NULL PRIMARY KEY, value TEXT[][] NOT NULL);'+
	'CREATE TABLE "{{prefix}}{{permissions}}" (key TEXT NOT NULL PRIMARY KEY, value JSON NOT NULL);';

function tmpl(str, ctx) {
	var n = 1;
	var sql = str.replace(/{{(\w+)}}/g, function(match, cap1) {
		return ctx[cap1] || match;
	});
	return sql.replace(/\?/g, function() { return '$' + n++; });
}

function createTables(callback) {
	var prefix = ''
	var bucketNames = buckets()
	
	if (!prefix) prefix = 'acl_';
	
	knex.raw(tmpl(downSql+upSql, {
            'meta': bucketNames.meta,
            'parents': bucketNames.parents,
            'permissions': bucketNames.permissions,
            'prefix': prefix,
            'resources': bucketNames.resources,
            'roles': bucketNames.roles,
            'users': bucketNames.users
        }))
        .then(function() {
            if (!_.isUndefined(callback)) {
                callback(null, db);
            }
        })
    ;
}

createTables()
console.log("Inserted Table")
