<template>
  <div class="overlay" v-if="hasErrorMsg">
    <div class="modal">
      <h2>Sorry there was an error.</h2>
      <p class="error-text">{{message}}</p>
      <button class="button-primary" @click="message = '';">Ok</button>
    </div>
  </div>
</template>

<script>
  // Services
  import EventBus from '../services/EventBus';

  export default {

    data() {
      return {
        message: ''
      }
    },

    created() {

      EventBus.$on('api:error', err => {
        this.message = err;
      })

    },

    computed: {
      hasErrorMsg() {
        return this.message.length > 0;
      },
    }
  };
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(#000, 0.45);
  }

  .modal {
    padding: 40px 10px;
    text-align: center;
    position: absolute;
    background-color: #FFF;
    top: 50%;
    left: 50%;
    width: 75%;
    border-radius: 10px;
    transform: translate(-50%, -50%);
  }

  h2 {
    padding-top: 35px;
  }
</style>
