<template>
  <div class="currency-detail">
    <currency
      v-if="currency"
      class="currency"
      :name="currency.name"
      :price="currency.price_eur"
    ></currency>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Currency from './components/Currency'

export default {
  name: 'currency-detail',

  props: ['name'],

  components: {
    Currency
  },

  computed: mapState({
    currency: state => (state.currency !== null && state.currency.hasOwnProperty(0) ? state.currency[0] : state.currency),
    remainingSeconds: state => state.remainingSeconds,
    refreshInterval: state => state.refreshInterval,
    pending: state => state.pending,
    error: state => state.error
  }),

  created () {
    this.getCurrency({params: { name: this.name }})

    setInterval(() => {
      this.getCurrency({params: { name: this.name }})
    }, this.refreshInterval * 1000)
  },

  methods: {
    ...mapActions([
      'getCurrency'
    ])
  }
}
</script>
