<template>
  <div class="contact">
    <section class="hero is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container is-max-widescreen">
          <div class="columns is-vcentered is-narrow">
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
                      <form @submit.prevent="signUp">
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
                        <br>
                        <b-field>
                          <div class="buttons">
                            <b-button native-type="submit" type="is-primary is-rounded">Book Event
                              <!-- <span class="ml-1 icon">
                                <i class="fas fa-file-signature"></i>
                              </span> -->
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
    </section>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  name: "BookEvent",
  components: { ValidationObserver, ValidationProvider },
  data() {
    return {
      email: "",
      name: "",
      isLoading: false
    }
  },
  methods: {
    async signUp(){
      this.isLoading = true;
        if(!await this.$refs.loginForm.validate()) { 
            this.isLoading = false; 
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return; 
        }
        try{
            let lead = JSON.stringify({
                name: this.name,
                email: this.email
            });
            let response = await fetch('http://localhost:8080/api/auth/login', {
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
        }
      } catch (error) {
        this.$buefy.snackbar.open({ message: 'An error occured, try again later.', position: 'is-bottom-left' })
        this.isLoading = false
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.hello{
    display: none;
}
.is-color-green{
  color: #0D730B;
  font-weight: 600;
}
</style>
