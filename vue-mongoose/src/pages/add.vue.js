

var Add = Vue.component('Add', {
	template: `<div>
	<b-card bg-variant="light">
	<b-form @submit="onSubmit" @reset="onReset">
	  <b-form-group
		label-cols-lg="3"
		label="Add New Movie"
		label-size="lg"
		label-class="font-weight-bold pt-0"
		class="mb-0"
	  >
		<b-form-group
		  label-cols-sm="3"
		  label="Title:"
		  label-align-sm="right"
		  label-for="nested-title"
		>
		  <b-form-input required v-model="form.title" id="nested-title"></b-form-input>
		</b-form-group>
  
		<b-form-group
		  label-cols-sm="3"
		  label="Genre:"
		  label-align-sm="right"
		  label-for="nested-genre"
		>
		  <b-form-input required v-model="form.genres" id="nested-genre"></b-form-input>
		</b-form-group>
  
		<b-form-group
		  label-cols-sm="3"
		  label="Cast:"
		  label-align-sm="right"
		  label-for="nested-cast"
		>
		  <b-form-input required v-model="form.cast" id="nested-cast"></b-form-input>
		</b-form-group>

		<b-form-group
		label-cols-sm="3"
		label="URL to poster"
		label-align-sm="right"
		label-for="nested-poster"
	  >
		<b-form-input v-model="form.poster" id="nested-poster"></b-form-input>
	  </b-form-group>

		<b-form-group
		label-cols-sm="3"
		label="Plot:"
		label-align-sm="right"
		label-for="nested-plot"
	  >
	  <b-form-textarea
	  required
	  label-for="nested-plot"
	  v-model="form.fullplot"
	  placeholder="Compose an extraordinary plot..."
	  rows="3"
	  max-rows="6"
	></b-form-textarea>
	  </b-form-group>
  
	  </b-form-group>
	  <b-button type="submit" variant="outline-primary">Submit</b-button>
      <b-button type="reset" variant="outline-danger">Reset</b-button>
	  </b-form>
	</b-card>
	<b-container>
	 <b-card
	 :key="index" v-for="(item, index) in response"
	   footer-bg-variant="light"
	   bg-variant="primary"
	   text-variant="white"
	 :header="item.title"
	 style="min-height: 35rem; max-width: 21rem; margin: 0 auto;"
	   class="h-100 mt-3"
	   >
		<template v-slot:footer>
		 <b-button @click="details(index)" variant="outline-primary">Details</b-button>
		</template>
	 <b-img v-if="item.poster"
	 class="poster"
	   center
	   :src="item.poster"
	   height="444"
	 width="300"
	 fluid
	 onerror="javascript:this.src=''"
	 ></b-img>
	 </b-card> 
 </b-container>
  </div>`,
	data () {
		return {
			form: {
				title: '',
				genres: '',
				cast: '',
				fullplot: '',
				poster: '',
			},
			response: ''
		}
	},
	mounted () {
		// Reserved 
	},
	methods: {
		onSubmit (evt) {
			evt.preventDefault()
			fetch('/api/newmovie/', {
				method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(this.form)
			}).then(res => {
				return res.json();
			}).then(data => {
				this.response = data
			});
			this.resetForm();
		},
		onReset (evt) {
			evt.preventDefault()
			this.resetForm()
		},
		resetForm () {
			this.form.title = ''
			this.form.genres = ''
			this.form.cast = ''
			this.form.fullplot = ''
			this.form.poster = ''
		},
		details (index) {
			let values = [];
			values.push(this.response[index]);
			this.$store.state.details = values;
			this.$router.push('/details');
		},
	},
	computed: {
		// Reserved 
	}
});
