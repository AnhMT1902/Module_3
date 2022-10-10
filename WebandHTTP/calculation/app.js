const http = require('http')
const fs = require('fs')
const qs = require('qs');
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.readFile('./calculator.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        })
    } else {
        let data = '';
        req.on("data", (chunk) => {
            data += chunk;
        })
        req.on("end", () => {
            const calC = qs.parse(data);
            let nbOne = +calC.nb1;
            let nbTwo = +calC.nb2;
            fs.readFile('./show.html', 'utf8', (err, dataHTML) => {
                if (err) {
                    console.log(err)
                } else {
                    if (calC.cal === "+") {
                        dataHTML = dataHTML.replace('{ket-qua}', nbOne + nbTwo)
                    }
                    if (calC.cal === "-") {
                        dataHTML = dataHTML.replace('{ket-qua}', nbOne - nbTwo)
                    }
                    if (calC.cal === "*") {
                        dataHTML = dataHTML.replace('{ket-qua}', nbOne * nbTwo)
                    }
                    if (calC.cal === "/") {
                        dataHTML = dataHTML.replace('{ket-qua}', nbOne / nbTwo)
                    }
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(dataHTML);
                    return res.end();
                }
            })
        })
        req.on("error", () => {
            console.log("error")
        })
    }
}).listen(8080, () => {
    console.log('server running at localhost:8080 ')
})