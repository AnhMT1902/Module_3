const mysql = require('mysql');
const http = require('http');
const qs = require('qs');
const url = require('url');

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
});

const server = http.createServer(async (req, res) => {
    try {
        if (req.url === '/user' && req.method === 'POST') {
            let buffers = [];
            for await (const chunk of req) {
                buffers.push(chunk);
            }
            const data = Buffer.concat(buffers).toString();
            const userData = JSON.parse(data);
            const sql = `INSERT INTO customer(id, name, age)
                         VALUES ('${userData.id}', '${userData.name}', '${userData.age}')`;
            connection.query(sql, (err) => {
                if (err) throw err
                res.end('success')
            })
        }
    } catch (err) {
        return res.end(err.message)
    }
});
server.listen(8080, () => {
    console.log('server running at localhost 8080')
})