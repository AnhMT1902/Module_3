const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'demo2006',
    charset: 'utf8_general_ci'
});
connection.connect((err) => {
    if (err) console.log(err.message)
    else console.log('connect success');
})