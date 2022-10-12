let http = require('http');
let url = require('url');
let StringDecoder = require('string_decoder').StringDecoder;

let server = http.createServer((req, res) => {
    let buffer = ''
    let decoder = new StringDecoder('utf8');
    req.on('data', (data) => {
        buffer += decoder.write(data)
    })
    req.on('end', () => {
        buffer += decoder.end();
        res.end("hellu");
        console.log(buffer)
    })

})
server.listen(3000, () => {
    console.log("server running localhost:3000")
})