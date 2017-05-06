<template>
  <form>
    <div class="row">
      <div class="six columns">
        <label for="node-name">New node name.</label>
        <input class="u-full-width" type="text" placeholder="Node name" id="node-name" v-model="form.name">
        <p class="error-text" v-show="submitted && !isValid">Node name must be 5 characters or greater in length</p>
        <button class="button-primary" @click.prevent="submit">Submit</button>
      </div>
    </div>
  </form>
</template>

<script>
  export default {

    data() {
      return {
        form:      {
          name: '',
        },
        submitted: false,
      }
    },

    methods: {

      submit() {
        this.submitted = true;

        if (this.isValid) {
          this.createNode();
        }
      },

      createNode() {
        this.$http.post('nodes/', this.form)
          .then(res => {
            this.$emit('nodesUpdate');
          })
          .catch(err => {
            console.log(err);
          });
      },

    },

    computed: {
      isValid() {
        return this.form.name.length >= 5;
      },
    }
  };
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
