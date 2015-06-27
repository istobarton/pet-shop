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
  return m.request({
    method: 'POST',
    url: 'http://pet-shop.api.mks.io/signin',
    config: xhrConfig,
    data: { "username": username, "password": password},
  })

}

PetShopWindow.userInfo = function(access){
  var info = access;
  return info;
}

PetShopWindow.like = function(userInfo, petID, shopID){
  var xhrConfig = function(xhr) {
    xhr.setRequestHeader("Content-Type", "application/json");
  }
  return m.request({
    method: 'POST',
    url: 'http://pet-shop.api.mks.io/shops/1/pets/' + petID +'/like',
    config: xhrConfig,
    data: { apiToken : userInfo.apiToken },
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
  ctrl.userInfo = m.prop(null)

  ctrl.signUp = function () {
    // debugger;
    PetShopWindow.signUp(ctrl.username(), ctrl.password())
  }

  ctrl.signIn = function () {
    // debugger;
    PetShopWindow.signIn(ctrl.username(), ctrl.password()).then(ctrl.userInfo).then(function(){
      PetShopWindow.userInfo(ctrl.userInfo())

    })
    // debugger;
  }

  ctrl.like = function(petID){
    PetShopWindow.like(ctrl.userInfo(), petID, ctrl.shop().id)
  }

  setInterval(updatePets.bind(null, ctrl), 5000);
}


PetShopWindow.view = function (ctrl) {

  return m('.pet-shop', [
    m('h1', "Welcome to " + ctrl.shop().name + " Delicacies!"),
    m('fieldset',  [
      m('div', [
        m('label', "Name:"),
        m('input[type=text]', {oninput: m.withAttr("value", ctrl.username), value: ctrl.username()}),
        m('br'),
        m('label', "Password:"),
        m('input[type=text]', {oninput: m.withAttr("value", ctrl.password), value: ctrl.password()}),
        m('button', { class:'sign-up', onclick: ctrl.signUp }, 'Sign Up'),
        m('button', { class:'sign-in', onclick: ctrl.signIn }, 'Sign In')
      ]),
    ]),

    ctrl.petShop().map(function(pet){
      return m('div', {'class': "pet"}, [
        m('p', "Pet Name: " + pet.name),
        m('p', "species: " + pet.species),
        m('img', {src: pet.imageUrl, width: '75%', height: '55%'}),
        m('p', "Likes: " + pet.likes.length),
        addLikeButton(ctrl, pet.id)
      ])
    })
  ])

}

function addLikeButton(ctrl, petID){
  if(ctrl.userInfo()){
    // debugger;
    return m('button', { class: 'like', onclick: ctrl.like.papp(petID) }, "LIKE")
  }
}

function updatePets(ctrl){
  PetShopWindow.fetch().then(ctrl.petShop)
}

