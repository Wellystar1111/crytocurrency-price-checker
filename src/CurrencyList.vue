<template>
  <div class="currency-list">
    <router-link
      class="currency"
      v-for="currency in currencies"
      :key="currency.name"
      :to="{ name: 'CurrencyDetail', params: { name: currency.name } }">
      <currency
        :name="currency.name"
        :price="currency.price_eur"
      ></currency>
    </router-link>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Currency from './components/Currency'

export default {
  name: 'currency-list',

  components: {
    Currency
  },

  computed: mapState({
    currencies: state => state.currencies,
    remainingSeconds: state => state.remainingSeconds,
    refreshInterval: state => state.refreshInterval,
    pending: state => state.pending,
    error: state => state.error
  }),

  created () {
    this.listCurrencies()

    setInterval(() => {
      this.listCurrencies()
    }, this.refreshInterval * 1000)
  },

  methods: {
    ...mapActions([
      'listCurrencies'
    ])
  }
}
</script>

<style scoped>
.currency-list {
  display: flex;
  flex-wrap: wrap;
}

.currency {
  width: 20%;
}
</style>
