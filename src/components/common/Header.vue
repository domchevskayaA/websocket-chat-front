<template>
    <header class="bg-dark">
        <b-container fluid class="px-3">
            <b-row class="h-100 align-items-stretch">
                <b-col sm="3" class="d-flex align-items-center justify-content-end border-right border-secondary py-2">
                    <!-- <CustomInput
                        type="search"
                        placeholder="Search..."
                        @input="searchUsers"
                        @changeState="changeSearchState"
                    /> -->
                    <b-button
                    variant="outline-info"
                    @click="changeSearchState"
                    size="sm"
                    >
                        {{ isSearchActive ? 'Back to chats' : 'Add chat'}}
                    </b-button>
                </b-col>
                <b-col sm="9" class="d-flex align-items-center justify-content-end py-2">
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
            return this.$store.getters['auth/user'] || {};
        },
        isSearchActive() {
            return this.$store.getters['users/isSearchActive'];
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
        changeSearchState(state) {
            this.$store.dispatch('users/setSearchState', !this.isSearchActive);
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