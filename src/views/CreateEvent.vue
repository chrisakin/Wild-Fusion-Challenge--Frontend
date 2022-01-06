<template>
    <div class="postgraduate">
    <section class="section is-small">
      <div class="is-max-widescreen">
        <div class="columns">
          <div data-aos="fade-up" class="column is-12">
            <br />
            <h1 class="title is-spaced has-text-centered">
              CREATE EVENT
            </h1>
          </div>
        </div>
      </div>
    </section>
        <section class="section is-small">
                <div data-aos="fade-up" class="column is-12">
              <div class="columns is-centered is-vcentered is-mobile">
                <div class="column is-8-desktop is-12-mobile">
                <div class="card">
                    <div class="card-content">
                    <h3 class="subtitle">
                        Please fill the form below to create an event. <span class="span-field"> All fields are required</span>
                    </h3>
                    <br>
                  <div >
                    <ValidationObserver ref="waitlistForm">
                      <form @submit.prevent="signUp">
                      <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
                      <div class="columns">
                          <div class="column is-12">
                              <ValidationProvider name="Event name" rules="required" v-slot="{ errors, valid }">
                          <b-field label="Name of Event"
                          :type="{
                                'is-danger': errors[0],
                                'is-success': valid,
                                }"
                          :message="errors"
                          required>
                            <b-input
                              placeholder="Enter the name of the event"
                              type="text"
                              v-model="name"
                            >
                            </b-input>
                          </b-field>
                        </ValidationProvider>
                          </div>
                      </div>
                      <div class="columns">
                          <div class="column is-12">
                              <ValidationProvider name="Event location" rules="required" v-slot="{ errors, valid }">
                                <b-field label="Event Location"
                                :type="{
                                  'is-danger': errors[0],
                                  'is-success': valid,
                                  }"
                            :message="errors"
                            required>
                            <b-input
                              placeholder="Enter the event location"
                              type="text"
                              v-model="location"
                            >
                            </b-input>
                          </b-field>
                        </ValidationProvider>
                          </div>
                      </div>
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
                                 v-model="eventdate">
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
                                 v-model="enddate">
                                </b-datepicker>
                          </b-field>
                        </ValidationProvider>
                          </div>
                      </div>
                      <div class="columns">
                          <div class="column is-3">
                          <ValidationProvider name="type of event" rules="required">
                          <b-field label="Type of Event"></b-field>
                          <div class="select"
                          required >
                            <select
                            class="selectsize"
                              placeholder=""
                              type="select"
                              v-model="eventtype"
                              required
                            >
                             <option>Free</option>
                             <option>Paid</option>
                            </select>
                          </div>
                        </ValidationProvider>
                          </div>
                          <div class="column is-4" v-if="eventtype==='Paid'">
                              <ValidationProvider name="Price of Event" rules="required" v-slot="{ errors, valid }">
                          <b-field label="Price of Event"
                          :type="{
                                  'is-danger': errors[0],
                                  'is-success': valid,
                                  }"
                            :message="errors"
                            required>
                            <b-input
                              placeholder="Price of Event"
                              type="text"
                              v-model="eventprice"
                            >
                            </b-input>
                          </b-field>
                        </ValidationProvider>
                          </div>
                          <div class="column is-5" v-if="eventtype==='Paid'">
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
                              type="text"
                              v-model="eventspace"
                            >
                            </b-input>
                          </b-field>
                        </ValidationProvider>
                          </div>
                      </div>
                      <div class="columns">
                          <div class="column is-12">
                            <b-field label="Upload poster Image">
                             <b-field class="file is-primary" :class="{'has-name': !!file}">
                              <b-upload v-model="file" class="file-label">
                                <span class="file-cta">
                                  <b-icon class="file-icon" icon="upload"></b-icon>
                                   <span class="file-label">{{ file.name || "Click to upload"}}</span>
                                </span>
                              </b-upload>
                              </b-field>
                            </b-field>
                          </div>
                      </div>
                    <br>
                        <b-field>
                          <div class="buttons">
                            <b-button  @click="submit" type="is-primary is-rounded">Create Event
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
    </section>
   </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import axios from "axios";
export default {
  name: "CreateEvent",
  components: { ValidationObserver, ValidationProvider},
  data() {
    return {
      name : "",
      location: "",
      eventdate: [],
      enddate: [],
      eventtype: "",
      eventprice: "",
      eventspace: "",
      iscancelled: false,
       file: {},
      isLoading: false,
    }
  },
  methods: {
      async submit(){ 
        const formData = new FormData();
      formData.append("file", this.file, this.file.name); 
      formData.append("name", this.name);
      formData.append("location", this.location);
      formData.append("eventdate", this.eventdate);
      formData.append("enddate", this.enddate);
      formData.append("eventtype", this.eventtype);
      formData.append("eventprice", this.eventprice);
      formData.append("eventspace", this.eventspace);
      formData.append("iscancelled", this.iscancelled);
         axios
        .post("http://localhost:8080/api/event/", formData,{
             headers: {
      'Content-Type': 'application/pdf'
    }
        }
    )
        .then(res => {
          if (res.data.success === true){
             this.$buefy.snackbar.open({ message:res.data.message, position: 'is-bottom-left', duration: 5000 })
          }else{
              this.$buefy.snackbar.open({ message:'Something went wrong, try again.', position: 'is-bottom-left', duration: 5000 })
          }
        })
        .catch(err => {
       this.$buefy.snackbar.open({message: err,position : 'is-bottom-left', duration: 5000})
        });
    },
  onProgress(event){
    event
  },
 }
}
</script>

<style lang="scss" scoped>
    .category-header{
        font-weight: bold;
        font-size: 27px;
    }
    .span-field{
        color: red;
        font-size: 13px;
    }
.button-margin{
  margin-right: 12px;
}
.btn{
  background-color: rgb(162, 229, 238);
  color: rgb(4, 87, 102);
  border: none;
  padding: 7px;
  font-size: 12px;
  margin-left: -5px;
  margin-top: 20px;
  margin-bottom: 50px;
}

</style>