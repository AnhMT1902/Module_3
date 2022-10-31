const PRODUCT_ROUTING = require('./handle/homestayRouting');
const handler = {
    "home": PRODUCT_ROUTING.showHome,
    "info": PRODUCT_ROUTING.showInfo,
    "home/edit": PRODUCT_ROUTING.editHomestay,
}

module.exports = handler;