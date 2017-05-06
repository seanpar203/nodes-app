<!-- This component recursively calls itself to create the node hierarchy -->

<template>
  <ul :class="{'has-children': hasChildren}">
    <li class="name" @click="editNode(node)">{{node.name}}</li>
    <node-hierarchy class="child" v-for="child in node.children" :key="child.id" :node="child"></node-hierarchy>
  </ul>
</template>

<script>
  // Services
  import EventBus from '../services/EventBus';

  // Mixins
  import EmitsSocketEvents from '../mixins/EmitsSocketEvents';

  export default {
    mixins: [EmitsSocketEvents],
    name:   'node-hierarchy',
    props:  ['node'],

    computed: {
      hasChildren() {
        return this.node.children.length > 0;
      }
    },

    methods: {

      editNode(node) {
        if (node.can_have_children) {
          EventBus.$emit('edit:node', node);
        }
      },

    }
  };
</script>

<style scoped lang="scss" rel="stylesheet/scss">

  ul {
    margin: 0;
    padding-left: 20px;
    list-style-type: none;
    position: relative;

    &.has-children {

      &:after {
        content: '';
        position: absolute;
        height: calc(100% - 20px);
        top: 20px;
        left: 20px;
        width: 1px;
        background-color: black;
      }
    }
  }

  .child {
    li {
      margin-bottom: 20px;

      &:after {
        content: '';
        position: absolute;
        height: 1px;
        width: 15px;
        left: 0;
        top: 50%;
        background-color: black;
        transform: translateY(-50%);
      }
    }
  }

</style>
