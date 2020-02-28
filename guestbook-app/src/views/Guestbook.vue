<template>
  <div>
    <div class="table">
      <!-- Table -->
      <b-table
        @row-selected="onRowSelected"
        selectable
        select-mode="single"
        :busy.sync="isBusy"
        hover
        head-variant="light"
        :items="items"
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
      <!-- <p>
        Selected Rows:
        <br />
        {{ selected }}
      </p>-->
      <!-- Delete row btn -->
      <b-container>
        <b-button :variant="deleteColor" class="mt-3" size="sm" @click="deleteRow">Delete row</b-button>
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
      isBusy: true,
      selected: [],
      items: [],
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
          this.items = res.data
          this.$store.state.guestbook = res.data
        })
      }
    }
  },
  computed: {
    // Delete btn color
    deleteColor () {
      if (this.selected.length > 0)
        return 'danger'
      else return null
    }
  },
  mounted () {
    // Init table on mount
    this.items = this.$store.state.guestbook
    this.isBusy = false
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