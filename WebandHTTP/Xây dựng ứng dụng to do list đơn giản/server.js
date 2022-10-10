const http = require('http');
const fs = require('fs');
const qs = require('qs')
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.readFile('./todo.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        })
    } else {
        let data = '';
        req.on("data", (chunk) => {
            data += chunk;
        })
        req.on('end', () => {
            const listTodo = qs.parse(data);
            fs.readFile('./display.html', 'utf8',(err,dataHTML) => {
                if (err) {
                    console.log(err);
                }
                    dataHTML = dataHTML.replace('{list-todo}',listTodo.list);
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(dataHTML);
                    return res.end();
            })
        })
        req.on("error", () => {
            console.log("error")
        })
    }
}).listen(8080, () => {
    console.log('server running at localhost:8080 ')
})