const http = require('http')
const fs = require('fs');

let server = http.createServer(function (req, res) {
    let dataFile = ""
    let html = ""
    fs.readFile('./text/data.txt', 'utf8', (err, str) => {
        if (err) {
            console.log(err.message);
        }
        dataFile = str.split(",");
        dataFile.forEach((item, index) => {
            html += `<tr>`
            html += `<td>${index + 1}</td>`
            html += `<td>${item}</td>`
            html += `<td><button type="button" class="button_danger">delete</button></td>`
            html += `</tr>`
        })
    })
    fs.readFile('./templates/index.html', 'utf8', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        data = data.replace('{list-user}', html)
        res.write(data);
        res.end()
    })
});
server.listen('8080', function () {
    console.log('Serve running port localhost:8080')
})
