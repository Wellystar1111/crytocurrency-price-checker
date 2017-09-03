<template>
  <div id="app">
    <header>
      <img src="./assets/logo.png" alt="Bitcoin" width="36">
      <span><router-link to="/">Cryptocurrency Price</router-link></span>
      <div class="refresh">Refreshing in {{ remainingSeconds }}</div>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'app',

  computed: mapState({
    remainingSeconds: state => state.remainingSeconds
  }),

  created () {
    setInterval(() => {
      this.decrement()
    }, 1000)
  },

  methods: {
    ...mapActions([
      'decrement'
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

a {
  color: currentColor;
  text-decoration: none;
}
</style>
