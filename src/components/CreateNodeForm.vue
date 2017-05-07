<template>
  <form>
    <div class="row">
      <div class="six columns">
        <label for="node-name">New node name.</label>
        <input class="u-full-width" type="text" placeholder="Node name" id="node-name" v-model="form.name">
        <p class="error-text" v-show="submitted && !isNameValid">Node name must be 5 characters or greater in length</p>
        <button class="button-primary" @click.prevent="submit">Create</button>
      </div>
    </div>
  </form>
</template>

<script>
  // Mixins
  import NodeForm from '../mixins/NodeForm';

  // Services
  import EventBus from '../services/EventBus';

  export default {
    mixins: [NodeForm],

    methods: {

      submit() {
        this.submitted = true;

        if (this.isFormValid) {
          this.createNode();
        }
      },

      createNode() {
        this.$http.post('nodes/', this.form)
          .then(this.createSuccess)
          .catch(this.createError);
      },

      createSuccess() {
        this.resetState();
        EventBus.$emit('update:node');
      },

      createError(err) {
        console.log(err);
      },

    },
  };
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
