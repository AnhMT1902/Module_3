const http = require('http');
const fs = require('fs');
const qs = require('qs');
const {parse} = require("qs");

const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        fs.readFile('./register.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data)
            return res.end()
        })
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            const userInfo = qs.parse(data);
            fs.readFile('./info.html', 'utf8', (err, dataHtml) => {
                if (err) console.log(err);
                dataHtml = dataHtml.replace('{name}', userInfo.name);
                dataHtml = dataHtml.replace('{email}', userInfo.email);
                dataHtml = dataHtml.replace('{password}', userInfo.password);
                res.writeHead(200, {'Content-Type': 'text/html'})
                console.log(dataHtml)
                res.write(dataHtml);
                return res.end()
            });
        })
        req.on("error", () => {
            console.log("error")
        })
    }
})
server.listen(8080, "localhost")