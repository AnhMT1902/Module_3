const fs = require('fs');
const qs = require('qs');
const HOMESTAY_SERVICE = require('C:\\Users\\adnin\\Desktop\\CodeGym\\MĐ3\\de thi thu\\service\\homestayService.js');

// const CategoryService = require('D:\\JavaScript\\Module3\\Module3DemoDatabase\\service\\categoryService.js');

class HomestayRouting {
    static getHtmlHomestay(products, indexHtml) {
        let tbody = '';
        products.forEach((product, index) => {
            tbody += `<tr>
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${product.city}</td>
            <td>${product.price}</td>
            <td><a href="/home/edit/${product.id}" class="btn btn-danger">Edit</a></td>
            <td><a href="/home/delete/${product.id}" class="btn btn-danger">Delete</a></td>
        </tr>`
        });
        indexHtml = indexHtml.replace('{homestay}', tbody);
        return indexHtml;
    }

    showHome(req, res) {
        fs.readFile('./views/home.html', 'utf-8', async (err, indexHtml) => {
            if (err) {
                console.log(err);
            } else {
                let homestays = await HOMESTAY_SERVICE.getHomestay();
                indexHtml = HomestayRouting.getHtmlHomestay(homestays, indexHtml);
                res.writeHead(200, 'text/html');
                res.write(indexHtml);
                res.end();
            }
        });
    }

    showInfo(req, res, id) {
        fs.readFile('./views/info.html', 'utf-8', async (err, indexHtml) => {
            if (err) {
                console.log(err);
            } else {
                let homestays = await HOMESTAY_SERVICE.getHomestay();
                indexHtml = HomestayRouting.getHtmlProducts(homestays, indexHtml);
                res.writeHead(200, 'text/html');
                res.write(indexHtml);
                res.end();
            }
        });
    }

    static getHtmlEdit(homestay, arrCity, editHtml) {
        let selCity = ''
        arrCity.forEach((item) => {
            selCity += `<option value="${item.id}">${item.name}</option>`
        })
        editHtml = editHtml.replaceAll('{name}', homestay[0].name);
        editHtml = editHtml.replace('{city}', selCity);
        editHtml = editHtml.replace('{bedroom}', homestay[0].bedroom);
        editHtml = editHtml.replace('{wc}', homestay[0].wc);
        editHtml = editHtml.replace('{price}', homestay[0].price);
        return editHtml;
    }

    editHomestay(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/edit.html', 'utf-8', async (err, editHtml) => {
                if (err) {
                    console.log(err);
                } else {
                    let homestays = await HOMESTAY_SERVICE.findByID(id);
                    let arrCity = await HOMESTAY_SERVICE.showCity();
                    let editDataHtml = await HomestayRouting.getHtmlEdit(homestays, arrCity, editHtml);
                    res.writeHead(200, 'text/html');
                    res.write(editDataHtml);
                    res.end();
                }
            });
        } else {
            let homeChuck = '';
            req.on('data', chunk => {
                homeChuck += chunk
            });
            req.on('end', async (err) => {
                if (err) {
                    console.log(err);
                } else {
                    let homestay = qs.parse(homeChuck);
                    if (homestay.name.length > 10 || homestay.wc === 'null' || homestay.bedroom === 'null' || homestay.price === 'null') {
                        res.writeHead(301, {'location': `/home/edit/${+id}`});
                        res.end();
                    } else {
                        HOMESTAY_SERVICE.editHomestay(homestay, id);
                        alert("success")
                        res.writeHead(301, {'location': '/home'});
                        res.end();
                    }

                }
            });
        }
    }
}

module.exports = new HomestayRouting;