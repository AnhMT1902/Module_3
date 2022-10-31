const fs = require('fs');
const qs = require('qs');
const ProductDatabase = require('C:\\Users\\adnin\\Desktop\\CodeGym\\MĐ3\\thaotacvoidatabase\\demoDatabase\\service\\productDatabase.js');

class CreatRouter {
    static showCreat(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/product/creat.html', 'utf-8', (err, creatHTML) => {
                if (err) console.log(err); else {
                    res.writeHead(200, 'text/html');
                    res.write(creatHTML);
                    res.end()
                }
            })
        } else {
            let productChuck = ''
            req.on('data', chunk => {
                productChuck += chunk;
            })
            req.on('end', async (err) => {
                if (err) console.log(err)
                else {
                    let product = qs.parse(productChuck)
                    await ProductDatabase.saveProduct(product);
                    res.writeHead(301,{'location': '/home'})
                    res.end();
                }
            })

        }
    }
}

module.exports = CreatRouter;