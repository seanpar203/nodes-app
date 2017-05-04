<template>
  <div v-if="nodes">
    <node-hierarchy class="node-hierarchy" v-for="node in nodes" :key="node.id" :node="node"></node-hierarchy>
  </div>
</template>

<script>
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
          this.nodes = res.body
        })
        .catch(err => console.log(err))

    },

    sockets: {
      connect(){
        console.log('socket connected')
      },

      test(val){
        console.log(val)
      },
    },


  }
</script>


<style scoped lang="scss" rel="stylesheet/scss">

</style>
