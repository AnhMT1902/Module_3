const http = require('http');
const server = http.createServer((req, res) => {
    let txt = '';
    if (req.url === "/login") {
        txt = 'login success';
    } else {
        txt = 'login fail'
    }
    res.end();
}).listen(8080, "localhost")