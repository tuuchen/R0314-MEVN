var Movies = Vue.component("Movies", {
	template: `<div>
	<h1 style="text-align: center">MongoDB movie finder</h1>
	<div>
	<b-input-group :prepend="$store.state.label" class="my-5">
    <b-form-input placeholder="Waiting for input.." v-model="input" @keyup.enter="getData(input)"></b-form-input>
    <b-input-group-append>
      <b-button @click="getData(input)" variant="outline-primary">Search</b-button>
    </b-input-group-append>
  </b-input-group>
  </div>
  <div style="max-width: 50rem; margin: 0 auto;" :key="index"
  v-for="(item, index) in paginatedItems">
	<b-card         
	  bg-variant="primary"
	  text-variant="white"
	  :header="item.title"
	  >
	  <p class="card-text">
		{{item.fullplot}}
	  </p>
	  <b-row>
	  <b-col sm class="mb-1">
	  <b-img v-if="item.poster"
	  center
	  :src="item.poster"
	  height="444"
	  width="400"
	  blank-color="#ccc"
	  fluid
	  alt="placeholder"
	></b-img>
	</b-col>
	<b-col sm>
	<div class="text-center">
	<b-row>
	<b-col>
	<h5>Genre:</h5>
	<div v-for="genre in item.genres" :key="index">
	{{genre}}
	<div>
	</b-col>
	<b-col>
	<h5>Cast:</h5>
	<div v-for="cast in item.cast" :key="index">
	{{cast}}
	<div>
	</b-col>
	</b-row>
	<b-row class="mt-3">
	<b-col>
	<h5>Awards:</h5>
	<div class="mt-2">{{item.awards.text}}</div>
	</b-col>
	<b-col>
	<h5>IMDB Rating:</h5>
	<div>Score: {{item.imdb.rating}}</div>
	<div>Votes: {{item.imdb.votes}}</div>
	</b-col>
	</b-row>
	</div>
	</b-col>
	</b-card> 
	</b-row>
  </div>
  <div>
  <b-pagination v-if="items.length > 0" 
  class="my-5" 
  align="center" 
  @change="onPageChanged" 
  :total-rows="rows" 
  :per-page="perPage" 
  first-number
  last-number
  v-model="$store.state.currentPage"/>
</div>
</div>`,
	data () {
		return {
			input: '',
			paginatedItems: '',
			perPage: 1,
		};
	},
	mounted () {
		if (this.items.length == 0) {
			this.getData("Star Wars")
		} else {
			this.paginate(this.perPage, this.$store.state.currentPage - 1)
		}
	},
	methods: {
		paginate (page_size, page_number) {
			let itemsToParse = this.items
			this.paginatedItems = itemsToParse.slice(page_number * page_size, (page_number + 1) * page_size);
		},
		onPageChanged (page) {
			this.paginate(this.perPage, page - 1)
		},
		getData (input) {
			if (input != 0) {
				fetch('/api/search/' + input).then(res => {
					return res.json()
				}).then(data => {
					if (data.length > 0) {
						this.$store.state.label = this.input
						this.$store.state.items = data
						this.$store.state.currentPage = 1
						this.paginate(this.perPage, 0)
						this.input = ''
					} else {
						this.input = ''
						alert("No results!")
					}
				})
			}
		}
	},
	computed: {
		items () {
			return this.$store.state.items
		},
		rows () {
			return this.$store.state.items.length
		},
		pageCount () {
			let l = this.totalRows,
				s = this.perPage;
			return Math.floor(l / s);
		}
	},
});