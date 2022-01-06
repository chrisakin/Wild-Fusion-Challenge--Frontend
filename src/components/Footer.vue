<template>
  <footer class="bg-color" v-if="userName">
    <div class="container is-max-widescreen margin-footer">
      <div class="columns is-centered is-mobile">
        <div class="column">
          <p class="has-text-centered">
            &copy; Event - XYX {{currentYear}}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.bg-color{
    background-color: #a3d8f0;
}
</style>

<script>
export default {
  name: "Footer",
  data() {
    return {
      currentYear: new Date().getFullYear(),
       userName: sessionStorage.getItem('name')
    };
  },
};
</script>
