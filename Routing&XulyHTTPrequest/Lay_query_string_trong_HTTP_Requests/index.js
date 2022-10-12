let http = require('http');
let url = require('url');
let StringDecoder = require('string_decoder').StringDecoder;

let server = http.createServer((req, res) => {
    let parseUrl = url.parse(req.url, true);
    let queryStringObject = parseUrl.query;
    console.log(queryStringObject)
  res.end('hello')
})
server.listen(3000, ()=>{
    console.log('server running localhost:3000')
})