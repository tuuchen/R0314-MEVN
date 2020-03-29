var Movies = Vue.component("Movies", {
	template: `<div>
	<h1 style="text-align: center">MongoDB movie finder</h1>
	<div>
	<b-input-group prepend="Movie title" class="my-5">
    <b-form-input v-model="input" @keyup.enter="getData(input)"></b-form-input>
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
	  class="text-center"
	  >
	  <p class="card-text">
		{{item.plot}}
	  </p>
	  <b-img v-if="item.poster"
	  :src="item.poster"
	  height="444"
	  width="300"
	  blank-color="#ccc"
	  fluid
	  alt="placeholder"
	></b-img>
	</b-card> 
  </div>
  <div>
  <b-pagination v-if="items.length > 0" class="my-5" align="center" @change="onPageChanged" :total-rows="rows" :per-page="perPage" v-model="$store.state.currentPage"/>
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
						this.$store.state.items = data
						this.$store.state.currentPage = 1
						this.paginate(this.perPage, 0)
					} else {
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