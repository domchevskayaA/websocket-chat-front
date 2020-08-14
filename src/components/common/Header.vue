<template>
  <header class="bg-dark d-flex align-items-center justify-content-end px-3 header-height">
    <AvatarContainer
      :image-url="user.avatar"
      default-image-url="/images/admin-no-avatar.png"
      class="mr-3"
      :size="40"
    />
    <b-button
      size="sm"
      variant="dark"
      @click="logout"
    >
      Logout
    </b-button>
  </header>
</template>

<script>
import AvatarContainer from './AvatarContainer';

export default {
    components: {
        AvatarContainer,
    },
    data() {
        return {
            name: 'Header',
        }
    },
    computed: {
        user() {
            return this.$store.getters['auth/user'] || {};
        },
    },
    methods: {
        async logout() {
            try {
                await this.$store.dispatch('auth/logout');
                await this.$router.push({name: 'Login'})
            } catch (error) {
                console.log(error)
            }
        },
    },
}
</script>>

<style>
  .header-height {
    height: 64px;
  }
</style>