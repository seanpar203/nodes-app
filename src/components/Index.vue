<template>
  <div v-if="nodes">

    <div class="row">
      <div class="six columns">

        <div class="row">

          <div class="seven columns">
            <node-hierarchy class="node-hierarchy" v-for="node in nodes" :key="node.id" :node="node"></node-hierarchy>
          </div>

          <div class="five columns">
            <span class="pointer lht-blue" @click="createNode">
              <i class="fa fa-plus" aria-hidden="true"></i>
              Create a new node.
            </span>
          </div>
        </div>
      </div>

      <div class="six columns">
        <create-node-form v-show="isCreating" keep-alive></create-node-form>
        <update-node-forms v-if="isUpdating" :node="activeNode"></update-node-forms>
      </div>
    </div>

  </div>
</template>

<script>
  // Services
  import EventBus from '../services/EventBus';

  // Mixins
  import EmitsSocketEvents from '../mixins/EmitsSocketEvents';

  // Components
  import UpdateNodeForms from './UpdateNodeForms';
  import CreateNodeForm from './CreateNodeForm';
  import NodeHierarchy from '../components/NodeHierarchy';

  export default {
    mixins:     [EmitsSocketEvents],
    components: { NodeHierarchy, CreateNodeForm, UpdateNodeForms },

    data() {
      return {
        nodes:      [],
        activeNode: {},
        isCreating: false,
        isUpdating: false,
      }
    },

    created() {
      this.getNodes();

      /**
       * Create Event listeners.
       */
      EventBus.$on('edit:node', node => {
        this.resetState();
        this.activeNode = node;
        this.isUpdating = true;
      });

      EventBus.$on('update:node', () => {
        this.resetState();
        this.updateNodes();
      })
    },

    sockets: {
      connect() {
        console.log('Connected!');
      },

      update(nodes) {
        this.nodes = JSON.parse(nodes);
      }
    },

    methods: {

      getNodes() {
        this.$http.get('nodes/')
          .then(this.getSuccess)
          .catch(this.getError);
      },

      getSuccess(res) {
        this.nodes = res.body;
      },

      getError(err) {
        console.log(err)
      },

      resetState() {
        this.isCreating = false;
        this.isUpdating = false;
      },

      createNode() {
        this.resetState();
        this.isCreating = true;
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
