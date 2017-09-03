<template>
  <div id="app">
    <header>
      <img src="./assets/logo.png" alt="Bitcoin" width="36">
      <span>Cryptocurrency Price</span>
      <div class="refresh">Refreshing in {{ remainingSeconds }}</div>
    </header>
    <main>
      <div class="currencies">
        <currency
          class="currency"
          v-for="currency in currencies"
          :key="currency.name"
          :name="currency.name"
          :price="currency.price_eur"
        ></currency>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Currency from './components/Currency'

export default {
  name: 'app',

  data () {
    return {
      remainingSeconds: 0,
      refreshInterval: 60,
      countdown: null
    }
  },

  components: {
    Currency
  },

  computed: mapState({
    currencies: state => state.currencies,
    pending: state => state.pending,
    error: state => state.error
  }),

  created () {
    this.listCurrencies()

    setInterval(() => {
      this.listCurrencies()
    }, this.refreshInterval * 1000)

    setInterval(() => {
      if (this.remainingSeconds === 0) {
        this.remainingSeconds = this.refreshInterval
      } else {
        this.remainingSeconds--
      }
    }, 1000)
  },

  methods: {
    ...mapActions([
      'listCurrencies'
    ])
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  align-items: center;
  display: flex;
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  margin-left: 20px;
}

header .refresh {
  flex: 1;
  text-align: right;
}

.currencies {
  display: flex;
  flex-wrap: wrap;
}

.currency {
  width: 20%;
}
</style>
