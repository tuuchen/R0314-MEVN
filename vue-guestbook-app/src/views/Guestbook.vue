<template>
  <div>
    <div class="table">
      <!-- Table -->
      <b-container>
        <b-table
          @row-selected="onRowSelected"
          selectable
          select-mode="single"
          :busy.sync="isBusy"
          hover
          head-variant="light"
          :items="guestbook"
          :fields="fields"
        >
          <!-- Loading table -->
          <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>
        </b-table>
      </b-container>
      <b-container>
        <b-button
          v-if="!this.btn"
          disabled
          :variant="deleteBtnColor"
          class="my-3"
          size="sm"
        >Delete row</b-button>
        <b-button
          v-if="this.btn"
          :variant="deleteBtnColor"
          class="my-3"
          size="sm"
          @click="deleteRow"
        >Delete row</b-button>
      </b-container>
    </div>
  </div>
</template>
<script>
import axios from "@/plugins/axios"
export default {
  name: 'Guestbook',
  data () {
    return {
      btn: true,
      selected: [],
      // Table fields
      fields: [
        {
          key: "id",
          sortable: true
        },
        {
          key: "username",
          sortable: true
        },
        {
          key: "country",
          sortable: true
        },
        {
          key: "date",
          sortable: true
        },
        {
          key: "message",
          sortable: true
        }
      ]
    }
  },
  methods: {
    // Populate "selected" -array with selected items
    onRowSelected (items) {
      this.selected = items
      if (this.selected.length > 0 && this.selected[0].id <= 5) {
        this.btn = false
      } else {
        this.btn = true
      }
    },
    deleteRow () {
      // If row is selected, send row id to backend with axios, return response and update table 
      if (this.selected.length > 0 && this.selected[0].id > 5) {
        var row = this.selected[0].id
        axios.deleteRow(row).then(res => {
          this.$store.state.guestbook = res.data
        })
      }
    }
  },
  computed: {
    // Styling
    deleteBtnColor () {
      if (this.selected.length > 0 && this.selected[0].id > 5)
        return 'danger'
      else return 'secondary'
    },
    // Return guestbook and populate table
    guestbook () {
      return this.$store.state.guestbook
    },
    // Return busy-state 
    isBusy () {
      return this.$store.state.busy
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table {
  margin: 0 auto;
  max-width: 60rem;
}
</style>