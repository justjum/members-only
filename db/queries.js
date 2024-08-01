const pool = require('./pool');

async function createUser(username, f_name, l_name, password) {
    await pool.query('INSERT INTO users (username, f_name, l_name, password) VALUES ($1, $2, $3, $4)', [username, f_name, l_name, password]);
    console.log(`User ${username} Added`)
}


module.exports = ( {
    createUser,
})