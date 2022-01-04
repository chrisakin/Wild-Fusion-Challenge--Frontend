<template>
    <div>
        <section class="section is-medium">
               <b-table :bordered="true" :striped="true"  :hoverable="true" :data="events" :columns="columns" :mobile-cards="true" @click="view(events)"></b-table>   
          </section>
    </div>
</template>

<script>
export default {
    name: "Home",
    data (){
      return {
          events: [],
         columns: [
      {
          field: 'name',
          label: 'Name of Event',
      },
      {
          field: 'location',
          label: 'Events Location',
      },
      {
          field: 'eventdate',
          label: 'Date of Event',
          centered: true
      },
      {
          field: 'enddate',
          label: 'Booking End Date',
          centered: true
      },
      {
          field: 'eventtype',
          label: 'Type of Event',
      }
      ]
        }
    },
      mounted () {
    this.getEvents()
  },
    methods: {
        async getEvents () {
      try {
        let response = await fetch('http://localhost:8080/api/event/', {
          method: 'GET',
        })
        response = await response.json()
        this.events = response.events
      } catch (error) {
        this.$buefy.snackbar.open({ message: 'An error occured, try again later.', position: 'is-bottom-left' })
        this.isLoading = false
      }
    },
    view (event){
        console.log(event);
    }
    }
}
</script>