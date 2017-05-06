/**
 * Created by Admin on 06/05/2017.
 */

export default {

  methods: {
    updateNodes() {
      this.$socket.emit('update:nodes');
    }
  },
}
