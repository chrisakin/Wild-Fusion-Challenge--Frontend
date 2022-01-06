<template>
   <div>
      <section class="is-small section">
          <div class="container">
              <div class="card-header">
                <div class=" container">
                <br>
                  <div class="float-start">
                 <b-field label="Filter By: "> </b-field>
                 <div class="select" >
                <select class="selectsize"  v-model="filterby"  @change="FilterBy($event)">
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
            </select>
                 </div>
            </div> 
            <div class="float-end">
             <b-field  label="Sort By: "> </b-field>
             <div class="select" >
                <select placeholder="Sort by date of Event"
                              v-model="sortby" @change="SortBy($event)">
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
            </select>
             </div>
            <br>
            </div>
                </div>
              </div>
              <div class="card">
                  <div class="card-content row">
                      <div class="col-md-3" v-for="(event, index) of events" :key="index">
                        <div>
                          <div class="card" style="width: 18rem; marhin-bottom: 10px">
                              <img :src="event.posterImage" class="card-img-top" alt="" style="height: 200px">
                                <div class="card-body">
                                <h5 class="card-title subtitle is-spaced">{{event.name}}</h5>
                                <p class="card-text">{{event.location}}</p>
                                <p class="card-text">Event Type: {{event.eventtype}} <span v-if="event.eventtype === 'Paid'">- ₦ {{event.eventprice}}</span></p>
                                <br>
                                <a @click="isviewDetails(event)" class="btn btn-success">View Details</a>
                                <a v-if="!token" @click="isbookEvent(event)" class="btn btn-danger text-right">Book Event</a>
                                <a v-if="token" @click="iseditEvent(event)" class="btn btn-danger text-right">Edit Details</a>
                            </div>
                          </div>
                      </div>
                          <br><br>
                      </div>
                  </div>
              </div>
              <!-- modal to view event details -->
              <b-modal  v-model="isviewDetailsOpen" :data="ifviewDetailsOpens" width="1060px">
                <div v-if="viewDetailsModalIsOpen == true" >
                <div class="columns is-centered is-vcentered modal-size">
              <div class="column is-12">
                <h1 class="title is-spaced has-text-centered">
              EVENT DETAILS
            </h1>
            <img :src="ifviewDetailsOpens.posterImage" style="max-height: 250px; margin-bottom: 30px" alt="">
                <div class="columns">
                  <div class="column is-12">
                    Name : {{ifviewDetailsOpens.name}}
                  </div>
                  </div>
                  <div class="columns">
                    <div class="column is-12">
                      Location: {{ifviewDetailsOpens.location}}
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column is-6">
                      Date of Event: {{ifviewDetailsOpens.eventdate}}
                    </div>
                    <div class="column is-6" v-if="daysleftforBooking > 0">
                      Days Left for Booking: {{daysleftforBooking}} Days
                    </div>
                    <div class="column is-6" v-if="daysleftforBooking < 0">
                      Days Left for Booking: 0 Days
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column is-6">
                      Type of Event: {{ifviewDetailsOpens.eventtype}} <span v-if="ifviewDetailsOpens.eventtype === 'Paid'">- ₦ {{ifviewDetailsOpens.eventprice}}</span>
                    </div>
                    <div class="column is-6" v-if="slotsLeft > 0">
                      Slots Left: {{slotsLeft}}
                    </div>
                    <div class="column is-6" v-if="slotsLeft < 0">
                      Slots Left: 0
                    </div>
                  </div>
                    <br><br>
                    <div v-if="token">
                  <h1  class="title is-spaced has-text-centered">
              EVENT INSIGHTS
            </h1>
            <div class="columns">
                    <div class="column is-6">
                      Number of Views: {{noofViews}}
                    </div>
                    <div class="column is-6">
                      Number of Bookings: {{noofBookings}}
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column is-6">
                      Amount Made:₦ {{moneyMade}}
                    </div>
                    <div class="column is-6" v-if="slotsLeft > 0">
                      Slots Left: {{slotsLeft}}
                    </div>
                    <div class="column is-6" v-if="slotsLeft < 0">
                      Slots Left: 0
                    </div>
                  </div>
                  </div>
              </div>
            </div>
                </div>
              </b-modal>

              <!-- modal to book event -->
               <b-modal  v-model="isbookEventOpen" :data="ifbookEventOpens" width="1060px">
                <div v-if="bookEventModalIsOpen == true" >
                <div class="columns is-centered is-vcentered modal-size">
                  <div data-aos="fade-up" class="column is-12">
              <div class="columns is-centered is-vcentered is-mobile">
                <div class="column is-12-desktop is-12-mobile">
                    <header class="card-header">
                    <div class="card-header-title is-bold">
                       <b-icon icon="account-circle" custom-size="default" /> Book Event
                    </div>
                   </header>
                  <div class="card">
                  <div class="card-content" >
                    <ValidationObserver ref="loginForm">
                      <form @submit.prevent="callback">
                      <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
                      <ValidationProvider name="Your Name" rules="required" v-slot="{ errors, valid }">
                          <b-field label="Name"
                          :type="{
                                  'is-danger': errors[0],
                                  'is-success': valid,
                                  }"
                            :message="errors"
                            required>
                            <b-input
                              placeholder="Please enter your Name"
                              type="text"
                              v-model="name"
                            >
                            </b-input>
                          </b-field>
                        </ValidationProvider>
                        <ValidationProvider name="Your email" rules="required|email" v-slot="{ errors, valid }">
                          <b-field label="Email"
                            :type="{
                                  'is-danger': errors[0],
                                  'is-success': valid,
                                  }"
                            :message="errors"
                            required>
                            <b-input
                              placeholder="Enter your email address"
                              type="text"
                              v-model="email"
                            >
                            </b-input>
                          </b-field>
                        </ValidationProvider>
                        <div v-if="ifbookEventOpens.eventtype === 'Paid'">
                          <p class="subtitle is-6"> This is a paid booking you will be directed to the payment portal to make your payment</p>
                        </div>
                        <br>
                        <b-field>
                          <div v-if="ifbookEventOpens.eventtype === 'Free'" class="buttons">
                            <b-button  native-type="submit" type="is-primary is-rounded">Book Event
                            </b-button>
                          </div>
                          <div v-if="ifbookEventOpens.eventtype === 'Paid'" class="buttons">
                            <button native-type="submit" class="btn-success btn is-rounded">
                              <paystack class="btn-success btn is-rounded"
                              :amount="ifbookEventOpens.eventprice * 100"
                              :email="email"
                              :paystackkey="paystackkey"
                              :reference="reference"
                              :callback="callback"
                              :close="close"
                              :embed="false"
                               >
                              <i class="fas fa-money-bill-alt"></i>
                                 Pay and Book Event
                              </paystack>
                            </button>
                          </div>
                        </b-field>
                      </form>
                    </ValidationObserver>
                  </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
                </div>
              </b-modal>

              <!-- modal to edit event -->
  <b-modal  v-model="iseditEventOpen" :data="ifeditEventOpens" width="1060px">
                <div v-if="editEventModalIsOpen == true" >
                <div class="columns is-centered is-vcentered modal-size" style="height: 560px;">
                  <div data-aos="fade-up" class="column is-12">
              <div class="columns is-centered is-vcentered is-mobile">
                <div class="column is-12-desktop is-12-mobile">
                    <header class="card-header">
                    <div class="card-header-title is-bold">
                       <b-icon icon="account-circle" custom-size="default" /> Edit Event
                    </div>
                   </header>
                  <div class="card">
                  <div class="card-content" >
                    <div >
                    <ValidationObserver ref="loginForm">
                      <form @submit.prevent="editEvent(ifeditEventOpens._id, ifeditEventOpens)">
                      <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
                      <div class="columns">
                          <div class="column is-6">
                              <ValidationProvider name="event date" rules="required" v-slot="{ errors, valid }">
                          <b-field label="Date of Event"
                          :type="{
                                  'is-danger': errors[0],
                                  'is-success': valid,
                                  }"
                            :message="errors"
                            required>
                                <b-datepicker
                                 ref="datepicker"
                                    expanded
                                placeholder="Select a date"
                                 v-model="ifeditEventOpens.eventdate">
                                </b-datepicker>
                         </b-field>
                        </ValidationProvider>
                          </div>
                          <div class="column is-6">
                              <ValidationProvider name="Booking end date" rules="required" v-slot="{ errors, valid }">
                          <b-field label="Booking end date"
                          :type="{
                                  'is-danger': errors[0],
                                  'is-success': valid,
                                  }"
                            :message="errors"
                            required>
                            <b-datepicker
                                 ref="datepicker"
                                    expanded
                                placeholder="Select a date"
                                 v-model="ifeditEventOpens.enddate">
                                </b-datepicker>
                          </b-field>
                        </ValidationProvider>
                          </div>
                      </div>
                      <div class="columns" v-if="ifeditEventOpens.eventtype==='Paid'">
                          <div class="column is-5" >
                        <ValidationProvider name="Space Capacity" rules="required" v-slot="{ errors, valid }">
                          <b-field label="Space Capacity of Event"
                          :type="{
                                  'is-danger': errors[0],
                                  'is-success': valid,
                                  }"
                            :message="errors"
                            required>
                            <b-input
                              placeholder="Event Space Capacity"
                              type="number"
                              min="1"
                              v-model="ifeditEventOpens.eventspace"
                            >
                            </b-input>
                          </b-field>
                        </ValidationProvider>
                          </div>
                      </div>
                      <div class="columns">
                        <div class="column is-5">
                            <b-field label="Do you want to cancel Event?">
                              <b-checkbox v-model="ifeditEventOpens.iscancelled">
                                  {{ ifeditEventOpens.iscancelled }}
                              </b-checkbox>
                            </b-field>
                        </div>
                      </div>
                    <br>
                        <b-field>
                          <div class="buttons">
                            <b-button  native-type="submit" type="is-primary is-rounded">Edit Event
                            </b-button>
                          </div>
                        </b-field>
                      </form>
                    </ValidationObserver>
                  </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
                </div>
              </b-modal>
          </div>
      </section>
   </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import paystack from 'vue-paystack';
export default {
    name: "EventCard",
    components: { ValidationObserver, ValidationProvider, paystack },
    data (){
    return {
        email: "",
        name: "",
        isLoading: false,
        checkbox: false,
        eventdate: [],
        eventspace: "",
        filterby: "",
        sortby: "",
        enddate: [],
        daysleftforBooking: 0,
        events: [],
        noofViews: 0,
        noofBookings: 0,
        moneyMade: 0,
        slotsLeft: 0,
        booknoofBookings: 0,
        bookslotsLeft: 0,
        ifviewDetailsOpens: null,
        viewDetailsModalIsOpen: false,
        isviewDetailsOpen: false,
        ifbookEventOpens: null,
        bookEventModalIsOpen: false,
        isbookEventOpen: false,
        ifeditEventOpens: null,
        editEventModalIsOpen: false,
        iseditEventOpen: false,
        token: '',
        amount: 100000,
        paystackkey: 'pk_test_92f5c219dfacf989851eb9f603a0ce47ccfc55a1', //paystack public key
    }
    },
    mounted () {
      this.token = sessionStorage.getItem('token')
    this.getEvents()
  },
  computed: {
      reference(){
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
        for( let i=0; i < 10; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
 
        return text;
      }
    },
    methods: {
        async getEvents () {
      try {
        let response = await fetch('https://eventxyx.herokuapp.com/api/event/', {
          method: 'GET',
        })
        response = await response.json()
        if (!this.token){
         response.events.forEach((data) => {
          if (data.iscancelled === false){
              this.events.push(data)
          }
        })
      } else {
       this.events = response.events
      }
      } catch (error) {
        this.$buefy.snackbar.open({ message: 'An error occured, try again later.', position: 'is-bottom-left' })
        this.isLoading = false
      }
    },
   async FilterBy(event){
      this.filterby = event.target.value
      try {
        let response = await fetch(`https://eventxyx.herokuapp.com/api/event/?filter=${this.filterby}`, {
          method: 'GET',
        })
        response = await response.json()
        if (!this.token){
         response.events.forEach((data) => {
          if (data.iscancelled === false){
              this.events.push(data)
          }
        })
      } else {
       this.events = response.events
      }
      } catch (error) {
        this.$buefy.snackbar.open({ message: 'An error occured, try again later.', position: 'is-bottom-left' })
        this.isLoading = false
      }
    },
    async SortBy(event){
      this.sortby = event.target.value
    try {
        let response = await fetch(`https://eventxyx.herokuapp.com/api/event/?sort=${this.sortby}`, {
          method: 'GET',
        })
        response = await response.json()
        if (!this.token){
         response.events.forEach((data) => {
          if (data.iscancelled === false){
              this.events.push(data)
          }
        })
      } else {
       this.events = response.events
      }
      } catch (error) {
        this.$buefy.snackbar.open({ message: 'An error occured, try again later.', position: 'is-bottom-left' })
        this.isLoading = false
      }
    },
      isviewDetails(data){
      this.ifviewDetailsOpens = data
      this.ifviewDetailsOpens.eventdate = (new Date (data.eventdate.toLocaleString()));
      this.ifviewDetailsOpens.enddate = (new Date (data.enddate.toLocaleString()));
     let now = (new Date().getTime());
     let bookdateTime = (new Date(data.enddate.toString()).getTime());
     let millis = bookdateTime - now
     this.daysleftforBooking =  Math.floor(millis / (60*60*24*1000))
      this.noofViews = data.views.length
      this.noofBookings = data.bookings.length
      this.moneyMade = data.eventprice * this.noofBookings
      this.slotsLeft = data.eventspace - this.noofBookings
      this.viewDetailsModalIsOpen = true
      this.isviewDetailsOpen = true 
      this.viewEvent(data)
    },
     isbookEvent(data){
       this.booknoofBookings = data.bookings.length
       this.bookslotsLeft = data.eventspace - this.booknoofBookings
        let now = (new Date().getTime());
      let bookdateTime = (new Date(data.enddate.toString()).getTime());
      if (now > bookdateTime){
      this.$buefy.snackbar.open({ message: "Sorry, you cannot book for this event as Booking Date has Passed", position: 'is-bottom-left' }) 
      } else if (data.eventtype === 'Paid' && this.bookslotsLeft == 0){
         this.$buefy.snackbar.open({ message: "Sorry, you cannot book for this event as the booking capacity is filled up", position: 'is-bottom-left' })  
      }
      else {
        this.ifbookEventOpens = data
      this.bookEventModalIsOpen = true
      this.isbookEventOpen = true 
      }
    },
    iseditEvent(data){
      let now = (new Date().getTime());
      let eventdateTime = (new Date(data.eventdate.toString()).getTime());
      if (now <= eventdateTime){
      this.ifeditEventOpens = data
    this.ifeditEventOpens.eventdate = [(new Date (data.eventdate.toString()))];
    this.ifeditEventOpens.enddate = [(new Date (data.enddate.toString()))];  
      this.editEventModalIsOpen = true
      this.iseditEventOpen = true
      } else {
       this.$buefy.snackbar.open({ message: "Event Date has Passed", position: 'is-bottom-left' }) 
      }
    },
    async bookEvent(){
      this.isLoading = true;
        try{
            let lead = JSON.stringify({
                name: this.name,
                email: this.email,
                eventId: this.ifbookEventOpens._id,
                eventname: this.ifbookEventOpens.name,
                eventdate: this.ifbookEventOpens.eventdate,
                eventlocation: this.ifbookEventOpens.location
            });
            let response = await fetch('https://eventxyx.herokuapp.com/api/event/book', {
              method: "POST",
              headers: {
              "Content-Type": "application/json",
              },
              body: lead,
            });
            response = await response.json();
            if (response.success === false) {
          this.$buefy.snackbar.open({ message: `${response.message ? response.message : 'Something went wrong, try again.'}`, position: 'is-bottom-left' })
        } else {
          this.$buefy.snackbar.open({ message: `${response.message ? response.message : 'Event Booked.'}`, position: 'is-bottom-left' })
          this.bookEventModalIsOpen = false
          this.isbookEventOpen = false
          window.location.reload()
        }
      } catch (error) {
        this.$buefy.snackbar.open({ message: 'An error occured, try again later.', position: 'is-bottom-left' })
      }
      this.isLoading = false 
    },

    async editEvent(id, body){
      this.isLoading = true;
        if(!await this.$refs.loginForm.validate()) { 
            this.isLoading = false; 
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return; 
        }
        try{
          let lead = JSON.stringify({
              enddate: body.enddate.toString(),
              eventdate: body.eventdate.toString(),
              eventspace: body.eventspace,
              iscancelled: body.iscancelled
            });
              
            let response = await fetch(`https://eventxyx.herokuapp.com/api/event/edit/${id}`, {
              method: "PUT",
              headers: {
              "Content-Type": "application/json",
              },
              body: lead,
            });
            response = await response.json();
            if (response.success === false) {
          this.$buefy.snackbar.open({ message: `${response.message ? response.message : 'Something went wrong, try again.'}`, position: 'is-bottom-left' })
        } else {
          this.$buefy.snackbar.open({ message: `${response.message ? response.message : 'Event Booked.'}`, position: 'is-bottom-left' })
        this.editEventModalIsOpen = false
      this.iseditEventOpen = false 
      window.location.reload()
        }
      } catch (error) {
        this.$buefy.snackbar.open({ message: 'An error occured, try again later.', position: 'is-bottom-left' })
      }
      this.isLoading = false
    },

     async viewEvent(event){
        try{
            let lead = JSON.stringify({
                text: "I viewed",
                viewId: event._id
            });
            let response = await fetch('https://eventxyx.herokuapp.com/api/event/view', {
              method: "POST",
              headers: {
              "Content-Type": "application/json",
              },
              body: lead,
            });
            response = await response.json();
            if (response.success === false) {
          this.$buefy.snackbar.open({ message: `${response.message ? response.message : 'Something went wrong, try again.'}`, position: 'is-bottom-left' })
        } else {
          console.log('');
        }
      } catch (error) {
        this.$buefy.snackbar.open({ message: 'An error occured, try again later.', position: 'is-bottom-left' })
      }
    },
    callback: function(response){
        if(response.status === 'success' && this.ifbookEventOpens.eventtype === 'Paid'){
          this.bookEvent()
        } else if(this.ifbookEventOpens.eventtype === 'Free'){
          this.bookEvent()
        }
      },
      close: function(){
          console.log("Payment closed")
      }
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
.modal-size{
  position: relative;
  // width: 1260px;
  margin: 0 auto;
  // height: 560px;
  // max-height: 120vh;
  // margin-top: calc(100vh - 85vh - 20px);
  background: rgb(236, 236, 236);
  border-radius: 4px;
  padding: 20px;
  border: 1px solid #999;
  overflow: none;
}
</style>