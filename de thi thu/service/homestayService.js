const CONNECTION = require('../model/connection');
CONNECTION.connecting();

class HomestayService {
    getHomestay() {
        let connection = CONNECTION.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`select h.id, h.name, c.name as city, h.price
                              from homestay h
                                       join city c on c.id = h.id_city`, (err, homestays) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(homestays);
                }
            });
        })
    }

    showCity() {
        let connection = CONNECTION.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`select *
                              from city`, (err, homestays) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(homestays);
                }
            });
        })
    }

    findByID(id) {
        let connection = CONNECTION.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`select h.id, h.name, c.name as city, h.price, h.wc, h.bedroom, h.id_city
                              from homestay h
                                       join city c on c.id = h.id_city
                              where h.id = ${id}`, (err, homestays) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(homestays);
                }
            });
        })
    }

    saveHomestay(homestay) {
        let connection = CONNECTION.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`insert into homestay(id_city, name, wc, bedroom, price, description) value (${+homestay.id}, '${homestay.name}', ${+homestay.wc},${+homestay.bedroom},${+homestay.price}, '${homestay.description}')`, (err, homestays) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(homestays);
                }
            });
        })
    }

    editHomestay(product, id) {
        let connection = CONNECTION.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`update homestay
                              set name        = '${product.name}',
                                  id_city     = ${+product.city},
                                  wc          = ${+product.wc},
                                  bedroom     = ${+product.bedroom},
                                  price       = ${+product.price},
                                  description = '${product.description}'
                              where id = ${+id}`, (err, homestays) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(homestays);
                }
            });
        })
    }

}

module.exports = new HomestayService;