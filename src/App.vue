<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

  export default {
    name: "App",
    async created () {
      if (this.$router.history.current.name !== 'Login' && this.$router.history.current.name !== 'Registration' ) {
        try {
          await this.$store.dispatch('user/getUser');
        } catch {
            this.$router.push({name: 'Login'})
          }
        }
    }
  }

</script>
