let http = require('http');
let url = require('url');
let fs = require('fs');

let handlers = {}
handlers.product = (req, res) => {
    fs.readFile('./view/product.html', 'utf8', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(data);
        return res.end()
    })
}

handlers.users = (req, res) => {
    fs.readFile('./view/users.html', 'utf8', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end()
    })
}

handlers.notFound = function (rep, res) {
    fs.readFile('./view/notfound.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};

let router = {
    "users": handlers.users,
    'product': handlers.product,
    'notFound' : handlers.notFound
}

let server = http.createServer((req, res) => {
    let parseUrl = url.parse(req.url, true);
    let path = parseUrl.pathname;
    // console.log(path)
    let trimPath = path.replace(/^\/+|\/+$/g, "");
    console.log(trimPath)
    console.log(typeof (router[trimPath]))
    console.log(router)
    let choseHandler = (typeof (router[trimPath]) !== 'undefined' ? router[trimPath] : handlers.notFound)
    choseHandler(req, res)
})

server.listen(3000, () => {
    console.log('server running localhost:3000')
})