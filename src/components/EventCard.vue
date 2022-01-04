<template>
   <div>
      <section class="is-medium section">
          <div class="container">
              <div class="card-header">
                <div>
                  Filter By: 
                </div>
              </div>
              <div class="card">
                  <div class="card-content row">
                      <div class="col-md-3" v-for="(event, index) of events" :key="index">
                          <div class="card" style="width: 18rem; marhin-bottom: 10px">
                              <img :src="event.posterImage" class="card-img-top" alt="" style="max-height: 200px">
                                <div class="card-body">
                                <h5 class="card-title subtitle is-spaced">{{event.name}}</h5>
                                <p class="card-text">{{event.location}}</p>
                                <p class="card-text">Event Type: {{event.eventtype}}</p>
                                <p class="card-text">Date: {{event.eventdate}}</p>
                                <br>
                                <a class="btn btn-success">View Details</a>
                                <!-- <a class="btn btn-danger text-right">Book Event</a> -->
                                <a class="btn btn-danger text-right">Edit Details</a>
                            </div>
                          </div>
                          <br><br>
                      </div>
                  </div>
              </div>
          </div>
      </section>
   </div>
</template>

<script>
export default {
    name: "EventCard",
    data (){
    return {
        events: []
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
    }
}
</script>

<style lang="scss" scoped>

a {
  color: white;
}
@media screen and (min-width: 950px) {
.text-right {
  margin-left: 25px;
}
}
@media screen and (max-width: 950px) {
.text-right {
  margin-top: 15px;
}
}
</style>