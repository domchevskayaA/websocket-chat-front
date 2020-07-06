<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

  export default {
    name: "App",
    async created () {
      try {
        await this.$store.dispatch('user/getUser');
      } catch {
        if (this.$router.history.current.name !== 'Login') {
          this.$router.push({name: 'Login'})
        }
      }
    }
  }

</script>
