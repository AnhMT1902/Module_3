const http = require('http');
const server = http.createServer((req, res) => {
    res.write('<h1>hello world</h1>');
    res.end();
});
server.listen(8080, 'localhost');