<!-- This component recursively calls itself to create the node hierarchy -->

<template>
  <ul :class="{'has-children': hasChildren}">
    <li class="name" @click="editNode(node)" :class="{'cursor': isSubNode}">{{node.name}}

      <span class="num-range" v-show="isSubNode">{{node.min_num}}:{{node.max_num}}</span>
    </li>
    <node-hierarchy v-if="node.can_have_children" class="child" v-for="child in node.children" :key="child.id" :node="child"></node-hierarchy>
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

    methods: {

      editNode(node) {
        if (this.isSubNode) {
          EventBus.$emit('edit:node', node);
        }
      },

    },

    computed: {
      hasChildren() {
        if (this.node.children !== undefined) {
          return this.node.children.length > 0;
        }
      },

      isSubNode() {
        return (this.node.can_have_children && this.node.name !== 'Root');
      }
    },
  };
</script>

<style scoped lang="scss" rel="stylesheet/scss">

  li {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .num-range {
    padding: 3px;
    border-radius: 3px;
    color: #FFF;
    background-color: rgba(#000, 0.45);
  }

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
        top: 10px;
        background-color: black;
        transform: translateY(-50%);
      }
    }
  }

  .cursor {
    cursor: pointer;
  }

</style>
