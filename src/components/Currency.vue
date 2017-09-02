<template>
  <div class="currency">
    <h1>{{ normalizedPrice }}</h1>
    <h2>{{ name }}</h2>
  </div>
</template>

<script>
import accounting from 'accounting'

export default {
  name: 'currency',

  props: ['name', 'price'],

  computed: {
    normalizedPrice: function () {
      let price = this.price
      const format = { symbol: '€', format: '%v %s', precision: 7 }
      price = accounting.formatMoney(price, format)

      return price
    }
  }
}
</script>

<style scoped>
h1 {
  font-weight: normal;
  margin-bottom: 0;
}

h2 {
  font-weight: normal;
  margin-top: 0;
}
</style>
