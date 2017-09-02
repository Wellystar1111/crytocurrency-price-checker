<template>
  <div id="app">
    <header>
      <img src="./assets/logo.png" alt="Bitcoin" width="36">
      <span>Cryptocurrency Price</span>
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
import Currency from './components/Currency'
import axios from 'axios'

export default {
  name: 'app',

  data () {
    return {
      currencies: []
    }
  },

  components: {
    Currency
  },

  created () {
    this.getPrice()

    setInterval(() => {
      this.getPrice()
    }, 6000)
  },

  methods: {
    getPrice () {
      const url = 'https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=40'

      axios
        .get(url)
        .then(response => {
          this.currencies = response.data
        })
    }
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

.currencies {
  display: flex;
  flex-wrap: wrap;
}

.currency {
  width: 20%;
}
</style>
