<template>
  <div id="app">

    <header>
      <h1>Nodes App</h1>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  body {
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  header {
    background-color: rgba(0, 0, 200, 0.65);

    h1 {
      margin: 0;
      color: #FFF;
      font-weight: lighter;
    }

  }
</style>
