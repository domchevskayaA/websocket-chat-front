<template>
    <header class="bg-light py-2">
        <b-container fluid class="px-3">
            <b-row>
                <b-col sm="3" class="d-flex align-items-center">
                    <CustomInput type="search" placeholder="Search..." @input="searchUsers" />
                </b-col>
                <b-col sm="9" class="d-flex align-items-center justify-content-end">
                    <AvatarContainer
                        :imageUrl="user.avatar"
                        defaultImageUrl="/images/admin-no-avatar.png"
                        class="mr-3"
                        :size="50"
                    />
                    <b-button size="sm" variant="dark" @click="logout">Logout</b-button>
                </b-col>
            </b-row>
        </b-container>
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