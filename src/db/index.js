const { Knex } = require('knex') // 为了让VScode对knex进行代码提示，才引入了这个类
/**
 * @type {Knex}
 */
const knex = require('knex')
const db = knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }
})

module.exports = db
