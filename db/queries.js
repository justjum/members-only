const pool = require('./pool');

async function createUser(username, f_name, l_name, password) {
    await pool.query('INSERT INTO users (username, f_name, l_name, password) VALUES ($1, $2, $3, $4)', [username, f_name, l_name, password]);
    console.log(`User ${username} Added`)
}

async function createMessage(username, headline, message, date) {
    await pool.query('INSERT INTO messages(user_id, headline, message, date) VALUES ((SELECT id FROM users WHERE username = $1), $2, $3, $4)', [username, headline, message, date])
}

async function getUser(username) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = ($1)", [username]);
    return rows;
}

async function getMessages() {
    const { rows } = await pool.query("SELECT M.*, U.f_name as user FROM messages M INNER JOIN users U ON U.id = M.user_id")
    return rows;
}

async function getMessage(id) {
    console.log(id)
    const { rows } = await pool.query("SELECT M.*, U.f_name as user FROM messages M INNER JOIN users U ON U.id = M.user_id WHERE M.id = ($1)", [id]);
    return rows[0];
}

async function deleteMessage(id) {
    await pool.query("DELETE FROM messages WHERE id = ($1)", [id])
}

async function upgradeUser(user, admin) {
    await pool.query("UPDATE users SET is_member = True, is_admin = ($2) WHERE id = ($1)", [user.id, admin])
}

module.exports = ( {
    createUser,
    createMessage,
    getUser,
    getMessages,
    getMessage,
    deleteMessage,
    upgradeUser
})