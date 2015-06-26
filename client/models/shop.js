var m = require('mithril')


var Shop = module.exports = {}

Shop.fetch = function () {

  return m.request({ method: 'GET', url: 'http://pet-shop.api.mks.io/shops/1' })

    // "shopId": 1,
    // "species": "cat",
    // "name": "Scaredy Cat",
    // "imageUrl": "http://i.imgur.com/TOEskNX.jpg",
    // "likes": [],
    // "id": 1

}


// var m = require('mithril')


// var Shop = module.exports = {}

// Shop.fetch = function () {
//   return m.request({ method: 'GET', url: 'http://pet-shop.api.mks.io/shops/1' })
// }
