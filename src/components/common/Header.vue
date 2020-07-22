<template>
    <header class="bg-light w-100 p-2 px-3 d-flex align-items-center justify-content-end">
      <b-img
        width="50"
        height="50"
        class="mr-3 border border-light"
        :src="user.avatar || 'images/admin-no-avatar.png'"
        rounded="circle"
      />
      <b-button size="sm" variant="dark" @click="logout">Logout</b-button>
    </header>
</template>

<script>
export default {
    data() {
        return {
            name: 'Header',
        }
    },
    computed: {
        user() {
            return this.$store.getters['user/user'] || {};
        }
    },
    methods: {
        async logout() {
            try {
                await this.$store.dispatch('user/logout');
                await this.$router.push({name: 'Login'})
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>>