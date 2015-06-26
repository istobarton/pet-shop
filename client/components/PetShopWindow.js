var m = require('mithril')
var Shop = require('../models/shop')


var PetShopWindow = module.exports = {}

PetShopWindow.fetch = function(){
  return m.request({ method: 'GET', url: 'http://pet-shop.api.mks.io/shops/1/pets'})
}

PetShopWindow.controller = function () {
  var ctrl = this
  ctrl.shop = m.prop(null)
  Shop.fetch().then(ctrl.shop)
  ctrl.petShop = m.prop(null)
  PetShopWindow.fetch().then(ctrl.petShop)
}

PetShopWindow.view = function (ctrl) {
  debugger;
  return m('.pet-shop', [
    m('h1', "Welcome to " + ctrl.shop().name),
    m('fieldset', [
      m('legend', "Pet Name: " + ctrl.petShop()[0].name),
      m('p', "species: " + ctrl.petShop()[0].species),
      m('img', {src: ctrl.petShop()[0].imageUrl}),
      m('p', "Likes: " + ctrl.petShop()[0].likes)
    ])
  ])

}
// + ctrl.petShop.name + ctrl.?. imageUrl + ctrl.petShop.likes + ctrl.petShop.id)
// var m = require('mithril')
// var Shop = require('../models/shop')


// var PetShopWindow = module.exports = {}

// PetShopWindow.controller = function () {
//   var ctrl = this
//   ctrl.shop = m.prop(null)
//   Shop.fetch().then(ctrl.shop)
// }

// PetShopWindow.view = function (ctrl) {
//   return m('.pet-shop', [
//     m('h1', "Welcome to " + ctrl.shop().name)
//   ])
// }
// Contacts.view = function (ctrl) {
/*
  return m('.contacts', [
    m('h3', 'Please enter your contact information:'),
    ctrl.contacts().map(function (contact, idx) {
      return m('fieldset', [
        m('legend', "Attendee #" + (idx+1)),
        m('label', "Name:"),
        m('input[type=text]', { value: contact.name(), onchange: m.withAttr('value', contact.name) }),
        m('br'),
        m('label', "Email:"),
        m('input[type=text]', { value: contact.email(), onchange: m.withAttr('value', contact.email) }),
        removeAnchor(ctrl, idx)
      ])
    }),
    m('a', { onclick: ctrl.add, href:'#' }, 'Add another attendee')
  ])
}
*/
