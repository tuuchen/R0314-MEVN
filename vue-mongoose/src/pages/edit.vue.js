var Edit = Vue.component('Edit', {
    template: `<div>
    <h1 id="details-title" class="text-center mb-3">Edit details</h1>
    <b-form @submit="onSubmit">
  	 <div style="max-width: 50rem; margin: 0 auto;" :key="index" v-for="(item, index) in data">
       <b-card
      	footer-bg-variant="light"
      	class="mb-3"         
	  	bg-variant="primary"
	  	text-variant="white"
	  	header-tag="header"
          ><template v-slot:header>
          <div>Title:</div>
          <b-form-input required v-model="form.title" :value="form.title" id="nested-title"></b-form-input>
        </template>
           <template v-slot:footer>
           <b-button @click="$router.push('/')" variant="primary">Return</b-button>
           <b-button type="submit" variant="success">Confirm</b-button>
           <b-button style="float: right;" @click="deleteMovie(form._id)" variant="outline-danger">Delete movie</b-button>
             </template>
             <div>Plot:</div>
               <p class="card-text">
                <b-form-textarea class="mt-1" required v-model="form.fullplot"></b-form-textarea>
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
                    <div>Poster URL:</div>
                    <b-form-input class="mt-1" v-model="form.poster"></b-form-input>
				</b-col>
				<b-col sm>
				 <div class="text-center">
				  <b-row>
					<b-col>
					 <h5>Genre:</h5>
                     <div v-for="(genre, index) in item.genres">
                     <b-form-input class="mt-1" required v-model="form.genres[index]"></b-form-input>
                      </div>
                      <div class="mt-1">
                      <b-button size="sm" variant="light" @click="addItem('genre')">add</b-button><b-button size="sm" class="ml-1"variant="dark" @click="removeItem('genre')">remove</b-button>
                      </div>
					</b-col>
					<b-col>
					 <h5>Cast:</h5>
					 <div v-for="(cast, index) in item.cast">
                     <b-form-input class="mt-1" required v-model="form.cast[index]"></b-form-input>
                      </div>
                      <div class="mt-1">
                      <b-button size="sm" variant="light" @click="addItem('cast')">add</b-button><b-button size="sm" class="ml-1"variant="dark" @click="removeItem('cast')">remove</b-button>
                      </div>
					</b-col>
				  </b-row>
				  <b-row class="mt-3">
				   <b-col>
					<h5 v-if="item.awards">Awards:</h5>
                    <div v-if="item.awards" class="mt-2">
                    <b-form-textarea class="mt-1" required v-model="form.awards.text"></b-form-textarea>
                    </div>
				   </b-col>
				   <b-col>
					<h5 v-if="item.imdb">IMDB Rating:</h5>
                    <div v-if="item.imdb">Score:</div>
                    <b-form-input v-if="item.imdb" class="mt-1" required v-model="form.imdb.rating"></b-form-input>
                    <div v-if="item.imdb">Votes:</div>
                    <b-form-input  v-if="item.imdb" class="mt-1" required v-model="form.imdb.votes"></b-form-input>
				   </b-col>
				</b-row>
				</div>
			 </b-col>
		 </b-row>
        </b-card> 
    </div>
    </b-form>
</div>`,
    data () {
        return {
            data: '',
            form: {
                title: '',
                genres: '',
                cast: '',
                awards: '',
                fullplot: '',
                poster: '',
                imdb: ''
            }
        }
    },
    beforeMount () {
        if (this.items === '') {
            this.$router.push('/');
        } else {
            this.data = [...this.$store.state.details]
            this.form = JSON.parse(JSON.stringify(this.data[0]));
        }
    },
    mounted () {
        document.getElementById('details-title').scrollIntoView();
    },
    methods: {
        onSubmit (evt) {
            evt.preventDefault()
            fetch('/api/edit/', {
                method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(this.form)
            }).then(res => {
                return res.json();
            }).then(data => {
                this.$store.state.details = data;
                objIndex = this.$store.state.items.findIndex(obj => obj._id == this.form._id.toString());
                this.$store.state.items[objIndex] = this.form;
                this.$router.push('/details');
            });
        },
        addItem (option) {
            if (option === 'genre')
                this.form.genres.push('');
            if (option === 'cast')
                this.form.cast.push('');
        },
        removeItem (option) {
            if (option === 'genre' && this.form.genres.length > 1)
                this.form.genres.splice(-1, 1);
            if (option === 'cast' && this.form.cast.length > 1)
                this.form.cast.splice(-1, 1);
        },
        deleteMovie (id) {
            if (confirm('Are you sure you want to remove this item from database?')) {
                fetch('/api/delete/' + this.form._id, {
                    method: 'DELETE'
                }).then(res => {
                    this.$store.state.items = this.$store.state.items.filter(function (obj) { return obj._id !== id });
                    this.$router.push('/');
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    },
    computed: {
        items () {
            return this.$store.state.details;
        }
    }
});
