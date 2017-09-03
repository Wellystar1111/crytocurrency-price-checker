// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import Vuex from 'vuex'
import Vapi from 'vuex-rest-api'

Vue.use(Vuex)

let currencies = new Vapi({
  baseURL: 'https://api.coinmarketcap.com/v1/ticker',

  state: {
    refreshInterval: 60,
    currencies: [],
    currency: null
  }})

  .get({
    action: 'getCurrency',
    property: 'currency',
    path: ({ name }) => `/${name}/?convert=EUR`,
    queryParams: true
  })
  .get({
    action: 'listCurrencies',
    property: 'currencies',
    path: '/?convert=EUR&limit=40',
    queryParams: true
  })
  .getStore()

currencies.state.remainingSeconds = 60

currencies.mutations.decrement = state => {
  if (state.remainingSeconds === 0) {
    state.remainingSeconds = state.refreshInterval
  } else {
    state.remainingSeconds--
  }
}

currencies.actions.decrement = context => {
  context.commit('decrement')
}

const store = new Vuex.Store(currencies)

// Router
import VueRouter from 'vue-router'
import CurrencyList from './CurrencyList'
import CurrencyDetail from './CurrencyDetail'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: CurrencyList, name: 'CurrencyList' },
  { path: '/:name', component: CurrencyDetail, name: 'CurrencyDetail', props: true }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
