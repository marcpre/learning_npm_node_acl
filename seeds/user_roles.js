const faker = require("faker")
const bcrypt = require("bcryptjs")
const dataLength = 9 //how many seeds should be generated

//generate bcrypt password
const plainPwd = "admin"

exports.seed = async (knex, Promise) => {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(plainPwd, salt)
    return knex('roles').del()
        .then(() => knex('users').del())
        .then(() => {
            const roles = []
            roles.push({
                role: "admin",
                description: 'The admin role',
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
                deleted: false,
            })
            roles.push({
                role: "user",
                description: 'The user role',
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
                deleted: false,
            })
            return knex("roles").insert(roles)
        })
        .then(() => knex('roles').pluck('id').then(async (roleIds) => {
            const users = []
            const adminRoleId = await knex('roles').pluck('id').where('role','admin')
            for (let index = 0; index < dataLength; index++) {
                users.push({
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    password: faker.internet.password(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deleted: faker.random.boolean(),
                    role_id: faker.random.arrayElement(roleIds),
                })
            } 
            users.push({
                email: "admin@admin.com",
                username: "admin",
                password: password,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
                deleted: false,
                role_id: parseInt(adminRoleId), //admin role
            })
            return knex("users").insert(users)
        }))
}
