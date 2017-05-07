<template>
  <div class="u-full-width">

    <label for="node-count">Children to generate: {{ form.count }}</label>
    <input class="u-full-width" type="range" max="15" id="node-count" v-model.number="form.count">

    <p class="error-text" v-show="submitted && !isCountValid">Count must be between 1-15</p>
    <button class="button-primary lht-red-bg" @click.prevent="submit">Generate children</button>
  </div>
</template>

<script>
  // Services
  import EventBus from '../services/EventBus';

  // mixins
  import NodeForm from '../mixins/NodeForm';

  export default {
    mixins: [NodeForm],
    props:  ['node'],

    data() {
      return {
        form: {
          count: 1
        }
      }
    },

    methods: {
      submit() {
        this.submitted = true;

        if (this.isFormValid) {
          this.updateNode();
        }
      },

      /***
       *  Update Node API Call.
       */
      updateNode() {
        this.$http.post(`nodes/${this.node.id}/nodes/`, this.form)
          .then(this.updateSuccess)
          .catch(this.updateError);
      },

      updateSuccess(res) {
        EventBus.$emit('update:node');
      },

      updateError(err) {
        EventBus.$emit('api:error', err.body);
      },
    },

    computed: {
      validators() {
        return [this.isCountValid]
      },

      isCountValid() {
        return (this.form.count > 0 && this.form.count <= 15);
      },
    }
  };
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
