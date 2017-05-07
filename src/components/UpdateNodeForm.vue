<template>
  <form>
    <div class="row">
      <div class="six columns">
        <label for="node-name">Update node.</label>

        <label for="node-name">Node name</label>
        <input class="u-full-width" type="text" placeholder="Node name" id="node-name" v-model="form.name">

        <label for="node-min">Node min value: {{ form.min_num }}</label>
        <input class="u-full-width" type="range" max="970" placeholder="Node min value" id="node-max" v-model.number="form.min_num">

        <label for="node-max">Node max value: {{ form.max_num }}</label>
        <input class="u-full-width" type="range" max="1000" placeholder="Node max value" id="node-min" v-model.number="form.max_num">

        <p class="error-text" v-show="submitted && !isFormValid">Node name must be 5 characters or greater in length</p>
        <p class="error-text" v-show="submitted && !isValuesValid">Min value must be less than Max value.</p>
        <button class="button-primary" @click.prevent="submit">Update</button>
      </div>
    </div>
  </form>
</template>

<script>
  // Services
  import EventBus from '../services/EventBus';

  // mixins
  import NodeFrom from '../mixins/NodeForm';

  export default {
    mixins: [NodeFrom],
    props:  ['node'],

    data() {
      return {
        fields:     ['name', 'min_num', 'max_num'],
        validators: [this.isNameValid, this.isValuesValid]
      }
    },


    created() {
      this.bindProps();
    },


    methods: {
      submit() {
        this.submitted = true;

        if (this.isFormValid) {
          this.updateNode();
        }
      },

      updateNode() {
        this.$http.put(`nodes/${this.node.id}/`, this.form)
          .then(this.updateSuccess)
          .catch(this.updateError);
      },

      updateSuccess(res) {
        EventBus.$emit('update:node');
      },

      updateError(err) {
        console.log(err);
      }
    },
  };
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
