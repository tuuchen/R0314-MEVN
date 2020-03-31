var Movies = Vue.component('Movies', {
	template: `<div>
	<h1 id="title" 
	style="text-align: center">MongoDB movie finder</h1>
	<div>
	<b-input-group :prepend="$store.state.label" class="my-5">
     <b-form-input placeholder="Waiting for input.." v-model="input" @keyup.enter="getData(input)"></b-form-input>
      <b-input-group-append>
       <b-button @click="getData(input)" variant="outline-primary">Search</b-button>
    	</b-input-group-append>
  	   </b-input-group>
  	</div>
  	<b-container>
  	 <b-row class="align-items-stretch">
  	  <b-col class="mt-3" md="4" :key="index" v-for="(item, index) in paginatedItems">
		<b-card
	  	footer-bg-variant="light"
	  	bg-variant="primary"
	  	text-variant="white"
		:header="item.title"
		style="min-height: 35rem;"
	  	class="h-100"
	  	>
	  	 <template v-slot:footer>
	  	  <b-button @click="details(index)" variant="outline-primary">Details</b-button>
      	 </template>
		<b-img v-if="item.poster && !loadingState"
		id="poster"
	  	center
	  	:src="item.poster"
	  	height="444"
		width="300"
	  	fluid
		></b-img>
		<div v-if="loadingState" class="d-flex justify-content-center">
  			<div class="spinner-border" role="status">
    		<span class="sr-only">Loading...</span>
  			</div>
		</div>
		</b-card> 
  	 </b-col>
    </b-row>
    </b-container>
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
			loading: true,
			input: '',
			paginatedItems: '',
			perPage: 3
		};
	},
	mounted () {
		if (this.items.length == 0) {
			this.getData('Star Wars');
		} else {
			this.paginate(this.perPage, this.$store.state.currentPage - 1);
		}
	},
	methods: {
		details (index) {
			let values = [];
			values.push(this.paginatedItems[index]);
			this.$store.state.details = values;
			this.$router.push('/details');
		},
		paginate (page_size, page_number) {
			this.loading = true
			let itemsToParse = this.items;
			this.paginatedItems = itemsToParse.slice(
				page_number * page_size,
				(page_number + 1) * page_size
			);
			var posts = document.querySelectorAll('#poster');
			imagesLoaded(posts, () => {
				this.loading = false
			});
		},
		onPageChanged (page) {
			this.paginate(this.perPage, page - 1);
			document.getElementById('title').scrollIntoView();
		},
		getData (input) {
			if (input != 0) {
				fetch('/api/search/' + input)
					.then(res => {
						return res.json();
					})
					.then(data => {
						if (data.length > 0) {
							this.$store.state.label = this.input;
							this.$store.state.items = data;
							this.$store.state.currentPage = 1;
							this.paginate(this.perPage, 0);
							this.input = '';
						} else {
							this.input = '';
							alert('No results!');
						}
					});
			}
		}
	},
	computed: {
		items () {
			return this.$store.state.items;
		},
		rows () {
			return this.$store.state.items.length;
		},
		pageCount () {
			let l = this.rows,
				s = this.perPage;
			return Math.floor(l / s);
		},
		loadingState () {
			return this.loading
		}
	}
});
