var Details = Vue.component('Details', {
	template: `<div>
	<h1 id="details-title" class="text-center mb-3">Details</h1>
  	 <div style="max-width: 50rem; margin: 0 auto;" :key="index" v-for="(item, index) in items">
       <b-card
      	footer-bg-variant="light"
      	class="mb-3"         
	  	bg-variant="primary"
	  	text-variant="white"
	  	:header="item.title"
      	>
      	 <template v-slot:footer>
			<b-button @click="$router.push('/')" variant="outline-primary">Back</b-button>
			<b-button style="float: right;" @click="$router.push('/edit')" variant="outline-primary">Edit</b-button>
      	   </template>
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
					onerror="javascript:this.src=''"
	  				fluid
					></b-img>
				</b-col>
				<b-col sm>
				 <div class="text-center">
				  <b-row>
					<b-col>
					 <h5>Genre:</h5>
					 <div v-for="genre in item.genres">
					 {{genre}}
					  </div>
					</b-col>
					<b-col>
					 <h5>Cast:</h5>
					 <div v-for="cast in item.cast">
					 {{cast}}
					  </div>
					</b-col>
				  </b-row>
				  <b-row class="mt-3">
				   <b-col>
					<h5 v-if="item.awards">Awards:</h5>
					<div v-if="item.awards" class="mt-2">{{item.awards.text}}</div>
				   </b-col>
				   <b-col>
					<h5 v-if="item.imdb">IMDB Rating:</h5>
					<div v-if="item.imdb">Score: {{item.imdb.rating}}</div>
					<div v-if="item.imdb">Votes: {{item.imdb.votes}}</div>
				   </b-col>
				</b-row>
				</div>
			 </b-col>
		 </b-row>
        </b-card> 
	</div>
</div>`,
	mounted () {
		if (this.items === '') {
			this.$router.push('/');
		} else {
			document.getElementById('details-title').scrollIntoView();
		}
	},
	computed: {
		items () {
			return this.$store.state.details;
		}
	}
});
