<template>
  <div>
    <div class='table'>
      <!-- Table -->
      <b-table
        @row-selected='onRowSelected'
        selectable
        select-mode='single'
        :busy.sync='isBusy'
        hover
        head-variant='light'
        :items='guestbook'
        :fields='fields'
      >
        <!-- Loading table -->
        <template v-slot:table-busy>
          <div class='text-center text-danger my-2'>
            <b-spinner class='align-middle'></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
      </b-table>
      <b-container>
        <b-button :variant='deleteBtnColor' class='mt-3' size='sm' @click='deleteRow'>Delete row</b-button>
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
    onRowSelected (items) {
      this.selected = items
    },
    deleteRow () {
      // If row is selected, send row id to backend with axios, return response and update table 
      if (this.selected.length > 0) {
        var row = this.selected[0].id
        axios.deleteRow(row).then(res => {
          this.$store.state.guestbook = res.data
        })
      }
    }
  },
  computed: {
    // Delete btn color
    deleteBtnColor () {
      if (this.selected.length > 0)
        return 'danger'
      else return null
    },
    guestbook () {
      return this.$store.state.guestbook
    },
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