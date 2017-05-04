<template>
  <div v-if="nodes">
    <node-hierarchy class="node-hierarchy" v-for="node in nodes" :key="node.id" :node="node"></node-hierarchy>
  </div>
</template>

<script>
  import bus from '../bus';
  import NodeHierarchy from '../components/NodeHierarchy';

  export default {
    components: { NodeHierarchy },

    data() {
      return {
        nodes: [],
      }
    },

    created() {
      this.$http.get('nodes/')
        .then(res => {
          this.nodes = res.body;
        })
        .catch(err => console.log(err))

    },

    mounted() {
      this.broadcastUpdate();
    },

    methods: {

      broadcastUpdate() {
        bus.$emit('update');
      },

    },
  }
</script>


<style scoped lang="scss" rel="stylesheet/scss">

</style>
