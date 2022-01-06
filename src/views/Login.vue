<template>
  <div class="contact">
    <section class="hero is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container is-max-widescreen">
          <div class="columns is-vcentered is-narrow">
            <div data-aos="fade-up" class="column is-6">
              <div class="image">
                  <img src="@/assets/images/queue.gif" alt="" />
                </div>
            </div>
            <div data-aos="fade-up" class="column is-6">
              <div class="columns is-centered is-vcentered is-mobile">
                <div class="column is-12-desktop is-12-mobile">
                    <header class="card-header">
                    <div class="card-header-title is-bold">
                       <b-icon icon="account-circle" custom-size="default" /> Login to view Admin Dashboard
                    </div>
                   </header>
                  <div class="card">
                  <div class="card-content" >
                    <ValidationObserver ref="loginForm">
                      <form @submit.prevent="signUp">
                      <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
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
                        <ValidationProvider name="Your password" rules="required" v-slot="{ errors, valid }">
                          <b-field label="Password"
                          :type="{
                                  'is-danger': errors[0],
                                  'is-success': valid,
                                  }"
                            :message="errors"
                            required>
                            <b-input
                              placeholder="Please input your password"
                              type="password"
                              v-model="password"
                            >
                            </b-input>
                          </b-field>
                        </ValidationProvider>
                        <br>
                        <b-field>
                          <div class="buttons">
                            <b-button native-type="submit" type="is-primary is-rounded">Login
                              <!-- <span class="ml-1 icon">
                                <i class="fas fa-file-signature"></i>
                              </span> -->
                            </b-button>
                          </div>
                        </b-field>
                      </form>
                    </ValidationObserver>
                    <br>
                    Not Admin?  <router-link to="/users-page" style="color: green" >Click here</router-link> to go to users page
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
import { authHeader } from '@/auth-header.js'
export default {
  name: "Login",
  components: { ValidationObserver, ValidationProvider },
  data() {
    return {
      email: "",
      password: "",
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
                password: this.password,
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
          sessionStorage.setItem('token', response.token)
          this.getProfile()
        }
      } catch (error) {
        this.$buefy.snackbar.open({ message: 'An error occured, try again later.', position: 'is-bottom-left' })
        this.isLoading = false
      }
    },
    async getProfile () {
      try {
        let response = await fetch('http://localhost:8080/api/auth/oneuser', {
          method: 'GET',
          headers: authHeader()
        })
        response = await response.json()
        const user = response.user
        if (response.success === true) {
          sessionStorage.setItem('name', user.name)
          sessionStorage.setItem('picture', user.picture)
          sessionStorage.setItem('email', user.email)
          setTimeout(() => {
            this.routerNav()
            this.$buefy.snackbar.open({ message: `${response.message ? response.message : 'Successfully Logged In.'}`, position: 'is-bottom-left' })
          }, 500)
        }
        this.isLoading = false
      } catch (error) {
        this.$buefy.snackbar.open({ message: 'An error occured, try again later.', position: 'is-bottom-left' })
        this.isLoading = false
      }
    },
    routerNav () {
      this.$router.push('/')
    }
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
