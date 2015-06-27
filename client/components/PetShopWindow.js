var m = require('mithril')
var Shop = require('../models/shop')


var PetShopWindow = module.exports = {}

PetShopWindow.fetch = function(){
  return m.request({ method: 'GET', url: 'http://pet-shop.api.mks.io/shops/1/pets'})
}

PetShopWindow.signUp = function(username, password){
  var xhrConfig = function(xhr) {
    xhr.setRequestHeader("Content-Type", "application/json");
  }
  return m.request({
    method: 'POST',
    url: 'http://pet-shop.api.mks.io/signup',
    config: xhrConfig,
    data: { "username": username, "password": password},
  })
}

PetShopWindow.signIn = function(username, password){
  var xhrConfig = function(xhr) {
    xhr.setRequestHeader("Content-Type", "application/json");
  }

  debugger;

  var output = m.request({
    method: 'POST',
    url: 'http://pet-shop.api.mks.io/signin',
    config: xhrConfig,
    data: { "username": username, "password": password},
  })

}



PetShopWindow.controller = function () {
  var ctrl = this
  ctrl.shop = m.prop(null)
  Shop.fetch().then(ctrl.shop)

  ctrl.petShop = m.prop(null)
  PetShopWindow.fetch().then(ctrl.petShop)

  ctrl.username = m.prop(null)
  ctrl.password = m.prop(null)

  ctrl.signUp = function () {
    debugger;
    PetShopWindow.signUp(ctrl.username(), ctrl.password())
  }

  ctrl.signIn = function () {
    debugger;
    PetShopWindow.signIn(ctrl.username(), ctrl.password())
  }

}


PetShopWindow.view = function (ctrl) {

  return m('.pet-shop', [
    m('h1', "Welcome to " + ctrl.shop().name + " Delicacies!"),
    m('fieldset',  [
      m('div', [
        m('legend', "Sign Up"),
        m('label', "Name:"),
        m('input[type=text]', {oninput: m.withAttr("value", ctrl.username), value: ctrl.username()}),
        m('br'),
        m('label', "Password:"),
        m('input[type=text]', {oninput: m.withAttr("value", ctrl.password), value: ctrl.password()}),
        m('button', { onclick: ctrl.signUp })
      ]),
      m('div', [
        m('legend', "Sign In"),
        m('label', "Name:"),
        m('input[type=text]', {onchange: m.withAttr("value", ctrl.username), value: ctrl.username()}),
        m('br'),
        m('label', "Password:"),
        m('input[type=text]',  {onchange: m.withAttr("value", ctrl.password), value: ctrl.password()}),
        m('button', { onclick: ctrl.signIn })
      ])
    ]),

    ctrl.petShop().map(function(pet){
      return m('div', {'class': "pet"}, [
        m('p', "Pet Name: " + pet.name),
        m('p', "species: " + pet.species),
        m('img', {src: pet.imageUrl, width: '75%', height: '55%'}),
        m('p', "Likes: " + pet.likes)
      ])
    })
  ])

}

/*
m("input", {onchange: m.withAttr("value", todo.vm.description), value: todo.vm.description()}),
m("button", {onclick: todo.vm.add}, "Add"),*/

/*
ctrl.petShop().map(function (){
  return
})*/
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

//   return m('.contacts', [
//     m('h3', 'Please enter your contact information:'),
//     ctrl.contacts().map(function (contact, idx) {
//       return m('fieldset', [
//         m('legend', "Attendee #" + (idx+1)),
//         m('label', "Name:"),
//         m('input[type=text]', { value: contact.name(), onchange: m.withAttr('value', contact.name) }),
//         m('br'),
//         m('label', "Email:"),
//         m('input[type=text]', { value: contact.email(), onchange: m.withAttr('value', contact.email) }),
//         removeAnchor(ctrl, idx)
//       ])
//     }),
//     m('a', { onclick: ctrl.add, href:'#' }, 'Add another attendee')
//   ])
// }

