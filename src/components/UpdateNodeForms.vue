<template>
  <form>
    <div class="row">

      <div class="tabs twelve columns">
        <div class="row">
          <div class="tab six columns" @click="tab=editForm">Edit Node</div>
          <div class="tab six columns" @click="tab=childForm">Generate Children</div>
        </div>
      </div>

      <div class="twelve columns">
        <components v-bind:is="tab" :node="node"></components>
      </div>
    </div>
  </form>
</template>

<script>

  // Components
  import EditNodeForm from './EditNodeForm';
  import CreateNodeChildrenForm from './CreateNodeChildrenForm';

  export default {
    components: { EditNodeForm, CreateNodeChildrenForm },

    props: ['node'],

    data() {
      return {
        tab:       'edit-node-form',
        editForm:  'edit-node-form',
        childForm: 'create-node-children-form',
      }
    },

  };
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .tabs {
    text-align: center;
    margin-bottom: 15px;
  }

  .tab {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-weight: bold;
    cursor: pointer;
    background-color: rgba(#1EAEDB, 0.10);
    border-radius: 5px;
    padding: 7px 0;
  }
</style>
