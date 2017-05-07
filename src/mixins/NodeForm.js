/**
 * Created by Admin on 06/05/2017.
 */
export default {
  data() {
    return {
      form:       {
        name:    '',
        min_num: 0,
        max_num: 1,
      },
      fields:     [],
      submitted:  false,
    }
  },

  methods: {

    resetState() {
      this.submitted = false;

      this.form.name = '';
      this.form.min_num = 0;
      this.form.max_num = 1;
    },

    bindProps() {
      this.fields.forEach(field => {
        this.form[field] = this.node[field];
      })
    },
  },

  computed: {

    isFormValid() {
      return !this.validators.includes(false)
    },

    isNameValid() {
      return 5 <= this.form.name.length;
    },

    isValuesValid() {
      return this.form.min_num < this.form.max_num;
    }
  },

  watch: {
    node(val, oldVal) {
      this.bindProps();
    }
  }
}
