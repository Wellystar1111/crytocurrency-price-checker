// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import Vuex from 'vuex'
import Vapi from 'vuex-rest-api'

Vue.use(Vuex)

const currencies = new Vapi({
  baseURL: 'https://api.coinmarketcap.com/v1/ticker',
  state: {
    currencies: []
  }})
  .get({
    action: 'listCurrencies',
    property: 'currencies',
    path: '/?convert=EUR&limit=40',
    queryParams: true
  })
  .getStore()

const store = new Vuex.Store(currencies)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
