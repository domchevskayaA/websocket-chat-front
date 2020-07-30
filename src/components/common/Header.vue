<template>
    <header class="bg-light w-100 p-2 px-3 d-flex align-items-center justify-content-between">
        <CustomInput type="search" @input="searchUsers" />
        <div class="d-flex align-items-center">
            <AvatarContainer
                :imageUrl="user.avatar"
                defaultImageUrl="/images/admin-no-avatar.png"
                class="mr-3"
                :size="50"
            />
        <b-button size="sm" variant="dark" @click="logout">Logout</b-button>
      </div>
    </header>
</template>

<script>
import AvatarContainer from './AvatarContainer';
import CustomInput from './CustomInput';

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
        },
        searchUsers(value) {
            console.log(value)
        }
    },
    components: {
        AvatarContainer,
        CustomInput
    },
}
</script>>