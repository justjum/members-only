const pool = require('./pool');

async function createUser(username, f_name, l_name, password) {
    await pool.query('INSERT INTO users (username, f_name, l_name, password) VALUES ($1, $2, $3, $4)', [username, f_name, l_name, password]);
    console.log(`User ${username} Added`)
}

async function createMessage(username, headline, message) {
    await pool.query('INSERT INTO messages(user_id, headline, message) VALUES ((SELECT id FROM users WHERE username = $1), $2, $3)', [username, headline, message])
}

async function getUser(username) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = ($1)", [username]);
    return rows;
}

async function getMessages() {
    const { rows } = await pool.query("SELECT M.*, U.f_name as user FROM messages M INNER JOIN users U ON U.id = M.user_id")
    return rows;
}


module.exports = ( {
    createUser,
    createMessage,
    getUser,
    getMessages,
})