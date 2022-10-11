const http = require('http');
const fs = require('fs');
const qs = require('qs');
let server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.readFile("./templates/index.html", "utf8", (err, data) => {
            if (err) {
                console.log(err.message)
            }
            res.writeHeader(200, 'Content-Type', 'text/html');
            res.write(data);
            return res.end();
        })
    } else {
        //xu ly submit
        let data = ''
        req.on("data", chunk => {
            data += chunk
        })
        req.on("end", () => {
            let name = qs.parse(data).name;
            console.log(name)
            fs.writeFile('./data/data.txt', '\r\n' + name, {flag: 'a'}, err => {
                if (err) {
                    console.log("err")
                    return;
                }
                return res.end("Create success");
            })
        })
        res.on("error", () => {
            console.log('error')
        })
    }
})
server.listen(8080, () => {
    console.log('Serve running port 8080')
})