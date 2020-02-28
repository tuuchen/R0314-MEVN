<template>
  <div class="add">
    <!-- Input form -->
    <b-card title="P1: Guestbook application form" bg-variant="light">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="input-group-1" label="Your Name:" label-for="input-1">
          <b-form-input id="input-1" v-model="form.username" required placeholder="Enter name"></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Your Country:" label-for="input-2">
          <b-form-input id="input-2" v-model="form.country" required placeholder="Enter country"></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-3" label="Your Message:" label-for="input-3">
          <b-form-textarea
            label-for="input-3"
            id="input-2"
            v-model="form.message"
            placeholder="Enter message..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>
        <b-button class="mr-3" type="submit" variant="success">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
      <!-- Form ajax response -->
      <b-card v-if="submittedForm" class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ submittedForm }}</pre>
      </b-card>
    </b-card>
  </div>
</template>
<script>
import axios from "@/plugins/axios"
export default {
  name: 'Add',
  data () {
    return {
      // Form values
      form: {
        id: '',
        username: '',
        country: '',
        date: '',
        message: ''
      },
      // Ajax response form values
      submittedForm: '',
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      // Add ID and date to form
      this.form.id = (this.$store.state.guestbook.length + 1).toString();
      this.form.date = new Date().toString()
      // Send data to backend
      axios.postForm(JSON.stringify(this.form))
      axios.postAjax(JSON.stringify(this.form)).then(res =>
        this.submittedForm = res.data)
      // Update table
      axios.getGuestbook()
        .then(res => {
          this.$store.state.guestbook = res.data
        })
      this.resetForm()
    },
    onReset (evt) {
      evt.preventDefault()
      this.resetForm()
    },
    // Clear form data
    resetForm () {
      this.form.id = ''
      this.form.username = ''
      this.form.country = ''
      this.form.date = ''
      this.form.message = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add {
  margin: 0 auto;
  max-width: 60rem;
}
</style>