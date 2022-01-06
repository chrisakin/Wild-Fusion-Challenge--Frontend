<template>
  <section id="header" class="mainheader homepage" >
    <b-navbar v-if="userName"
      wrapper-class="container is-max-widescreen nnnbar"
      :transparent="true"
      :shadow="false"
      :fixed-top="true"
    >
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <h4 class="title has-text-black is-4 logo-title">EVENT-XYX </h4> 
        </b-navbar-item>
      </template>
      <template #end>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          Dashboard
        </b-navbar-item>
        <b-navbar-item @click="userspage">
          Users Page
        </b-navbar-item>
        <b-navbar-item tag="div">
          <div class="buttons">
            <router-link to="/create-event" class="button is-black is-rounded button-color">
            Create New Event
              <span class="ml-1 icon">
                <i class="fas fa-file-signature"></i>
              </span>
            </router-link> 
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <b-navbar v-if="!userName"
      wrapper-class="container is-max-widescreen nnnbar"
      :transparent="true"
      :shadow="false"
      :fixed-top="true"
    >
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <h4 class="title has-text-black is-4 logo-title">EVENT-XYX </h4> 
        </b-navbar-item>
      </template>
      <template #end>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          Admin Page
        </b-navbar-item>
      </template>
    </b-navbar>
  </section>
</template>

<style lang="scss">
#header {
  .navbar {
    background-color: #bce6f8;

    .button.is-primary.is-outlined {
      background-color: $white;
      border-color: $primary;
      color: $primary;
    }

    .navbar-item img {
      max-height: 4rem;
    }

    .navbar-item,
    .navbar-burger {
      color: $black;
      font-weight: 550;
      font-size: 16px;
      color: #333333
    }

    .navbar-item:focus,
    .navbar-item:focus-within,
    .navbar-item:hover,
    .navbar-item.is-active,
    .navbar-link:focus,
    .navbar-link:focus-within,
    .navbar-link:hover,
    .navbar-link.is-active {
      background-color: transparent;
      color: green;
    }

    .navbar-burger {
      margin-top: 1rem;
    }
  }
  @media (max-width: 1023px) {
    .navbar-menu {
      background-color: #a3d8f0;
      text-align: center;
      .navbar-item .buttons {
        text-align: center;
        display: flex;
        justify-content: center;
      }
    }
  }
   @media (max-width: 992px) {
    .logo-title{
      font-size: 18px;
    }
  }
  // .button-color{
  //   padding-right: 10px;
  //   padding-left: 12px;
  // }
}
</style>

<script>
export default {
  data () {
    return {
      userName: sessionStorage.getItem('token')
    }
  },
  methods: {
    userspage (){
      sessionStorage.clear()
        this.$router.push("users-page") 
        window.location.reload()
    }
  }
}
</script>
