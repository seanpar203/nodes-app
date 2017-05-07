<template>
  <div class="u-full-width">

    <label for="node-name">Name</label>
    <input class="u-full-width" type="text" placeholder="Node name" id="node-name" v-model="form.name">

    <label for="node-min">Min value: {{ form.min_num }}</label>
    <input class="u-full-width" type="range" max="970" placeholder="Node min value" id="node-max" v-model.number="form.min_num">

    <label for="node-max">Max value: {{ form.max_num }}</label>
    <input class="u-full-width" type="range" max="1000" placeholder="Node max value" id="node-min" v-model.number="form.max_num">

    <p class="error-text" v-show="submitted && !isNameValid">Node name must be 5 characters or greater in length</p>
    <p class="error-text" v-show="submitted && !isValuesValid">Min value must be less than Max value.</p>
    <button class="button-primary" @click.prevent="submit">Update</button>
    <button class="button-primary lht-red-bg" @click.prevent="deleteNode">Delete this node</button>
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
        fields: ['name', 'min_num', 'max_num'],
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

      /***
       *  Update Node API Call.
       */
      updateNode() {
        this.$http.put(`nodes/${this.node.id}/`, this.form)
          .then(this.updateSuccess)
          .catch(this.updateError);
      },

      updateSuccess(res) {
        EventBus.$emit('update:node');
      },

      updateError(err) {
        EventBus.$emit('api:error', err.body);
      },


      /***
       * Delete Node API Call.
       */
      deleteNode() {
        this.$http.delete(`nodes/${this.node.id}/`)
          .then(this.deleteSuccess)
          .catch(this.deleteError);
      },

      deleteSuccess(res) {
        EventBus.$emit('update:node');
      },

      deleteError(err) {
        EventBus.$emit('api:error', err.body);
      },
    },

    computed: {
      validators() {
        return [this.isNameValid, this.isValuesValid]
      }
    },
  };
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  $lht-red: rgba(200, 0, 0, 0.75);
  .lht-red-bg {
    background-color: $lht-red;
    border: none;
  }

  .lht-red-bg:hover {
    background-color: darken($lht-red, 10%);
  }
</style>
