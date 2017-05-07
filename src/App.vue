<template>
  <div id="app">
    <error-modal></error-modal>

    <header>
      <div class="container">
        <h1>Nodes App</h1>
      </div>
    </header>

    <div class="container">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  // Components
  import ErrorModal from './components/ErrorModal';

  export default {
    components: { ErrorModal },
    name:       'app'
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  header {
    margin-bottom: 25px;
    background-color: rgba(0, 0, 200, 0.65);

    h1 {
      margin: 0;
      color: #FFF;
      font-weight: lighter;
    }
  }

  .error-text {
    color: rgba(255, 0, 0, 0.65);
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 5px;
  }
</style>
