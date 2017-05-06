<template>
  <div v-if="nodes">

    <div class="row">
      <div class="six columns">

        <div class="row">

          <div class="seven columns">
            <node-hierarchy class="node-hierarchy" v-for="node in nodes" :key="node.id" :node="node"></node-hierarchy>
          </div>

          <div class="five columns">
            <span class="pointer lht-blue" @click="isCreating = !isCreating">
              <i class="fa fa-plus" aria-hidden="true"></i>
              Create a new node.
            </span>
          </div>
        </div>
      </div>

      <div class="six columns">
        <create-node-form v-show="isCreating" @nodesUpdate="nodesUpdate()" keep-alive></create-node-form>
      </div>
    </div>

  </div>
</template>

<script>
  // Mixins
  import EmitsEvents from '../mixins/EmitsEvents';

  // Components
  import CreateNodeForm from './CreateNodeForm';
  import NodeHierarchy from '../components/NodeHierarchy';

  export default {
    mixins:     [EmitsEvents],
    components: { NodeHierarchy, CreateNodeForm },

    data() {
      return {
        nodes:      [],
        isCreating: false,
        isUpdating: false,
      }
    },

    created() {
      this.getNodes();
    },

    sockets: {
      connect() {
        console.log('Connected!');
      },

      update(nodes) {
        nodes = JSON.parse(nodes);
        this.nodes = nodes;
      }
    },

    methods: {

      getNodes() {
        this.$http.get('nodes/')
          .then(res => {
            this.nodes = res.body;
          })
          .catch(err => {
            console.log(err)
          });
      },

      resetState() {
        this.isCreating = false;
        this.isEditing = false;
      },

      nodesUpdate() {
        this.resetState();
        this.modifiedNodes();
      }
    },
  }
</script>


<style scoped lang="scss" rel="stylesheet/scss">
  .lht-blue {
    color: rgba(0, 0, 200, 0.75);
  }

  .pointer {
    cursor: pointer;
  }
</style>
