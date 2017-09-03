<template>
  <div class="currency-list">
    <currency
      class="currency"
      v-for="currency in currencies"
      :key="currency.name"
      :name="currency.name"
      :price="currency.price_eur"
    ></currency>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Currency from './components/Currency'

export default {
  name: 'currency-list',

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
.currency-list {
  display: flex;
  flex-wrap: wrap;
}

.currency {
  width: 20%;
}
</style>
