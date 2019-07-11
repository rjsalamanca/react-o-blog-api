const pgp = require('pg-promise')({
    query: e => {
        console.log('QUERY:', e.query);
    }
})

const options = {
    host: 'localhost',
    database: 'react_o_blog',
    user: 'rjs'
}

const db = pgp(options);

module.exports = db;