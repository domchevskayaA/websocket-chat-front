<template>
  <div
    id="app"
    class="overflow-hidden"
  >
    <router-view />
  </div>
</template>

<script>

  export default {
    name: "App",
    async created () {
      if (this.$router.history.current.name !== 'Login' && this.$router.history.current.name !== 'Registration' ) {
        try {
          await this.$store.dispatch('auth/getUser');
        } catch (error) {
            this.$router.push({name: 'Login'})
          }
        }
    }
  }

</script>

<style>
  #app {
    height: 100vh;
  }
</style>>
