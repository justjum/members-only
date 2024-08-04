
const { Client } = require("pg");
const dotenv = require('dotenv');
const { argv } = require('node:process')
const bcrypt = require('bcryptjs');

dotenv.config();

console.log(
    'This script populates some test users and messages.'
  );
  
  // SQL Data to insert into script at end
  const SQLTABLES = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR ( 64 ) NOT NULL UNIQUE,
    f_name VARCHAR (64) NOT NULL,
    l_name VARCHAR (64) NOT NULL,
    password VARCHAR (255),
    is_member BOOLEAN DEFAULT false,
    is_admin BOOLEAN DEFAULT false
  );

    CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INT,
    headline VARCHAR (255) NOT NULL,
    message VARCHAR (1024) NOT NULL,
    date DATE,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
  );
  

`;

const SQLDATA = `
    INSERT INTO users (username, f_name, l_name, password, is_member, is_admin) 
    VALUES
    ('polly_p', 'Polly', 'Piper', '$2a$10$txh/nLkBIXi4aphlgn7UouFKEN2zYl7qxW5J7Ida/zWXThvWJgJ7m', true, true),
    ('gary_g', 'Gary', 'Grover', '$2a$10$txh/nLkBIXi4aphlgn7UouFKEN2zYl7qxW5J7Ida/zWXThvWJgJ7m', true, false);

    INSERT INTO users (username, f_name, l_name, password) 
    VALUES
    ('timmy_t', 'Tim', 'Taylor', '$2a$10$txh/nLkBIXi4aphlgn7UouFKEN2zYl7qxW5J7Ida/zWXThvWJgJ7m');

    INSERT INTO messages (user_id, headline, message, date) 
    VALUES ((SELECT id FROM users WHERE f_name = 'Polly'), 'The First Message', 'I hearby post the first message to Members Only.  I''ve just realised that I might want to sort these descending.', '03/05/24'),
    ((SELECT id FROM users WHERE f_name = 'Gary'), 'The Second Message', 'My name''s Gary and I''m golly glad to be here. ', '04/06/24'),
    ((SELECT id FROM users WHERE f_name = 'Tim'), 'These headlines are a bit predictable', 'Bird, bird.  Bird is the word.', '13/01/24'),
    ((SELECT id FROM users WHERE f_name = 'Polly'), 'Headline', 'Message. Inserted Here.', '18/02/24'),
    ((SELECT id FROM users WHERE f_name = 'Gary'), 'Roly polie Ollie', 'Roly polie Ollie got golly jolly until Interpol-y roly polied Ollie.. ', '04/04/24'),
    ((SELECT id FROM users WHERE f_name = 'Tim'), 'Tweet Tweet', 'Sweet tweet, queet, meet. Deep feet meet wheat.', '13/01/24');`

  ;



  async function main() {
    console.log("seeding "+(argv[2]==='production' ? 'to production': 'locally'));
    console.log(argv[2])
    const client = new Client({
      connectionString: argv[2]==='production' ? process.env.PRODCONNECT : process.env.LOCALCONNECT
    });
    await client.connect();
    await client.query(SQLTABLES);
    await client.query(SQLDATA);
    await client.end();
    console.log("done");
  }
  
  main();