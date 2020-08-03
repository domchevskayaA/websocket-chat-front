<template>
  <b-container fluid class="p-0 d-flex flex-column h-100">
    <Header/>
    <b-container fluid class="p-0 flex-grow-1">
      <b-row no-gutters class="align-items-stretch h-100">
        <b-col sm="3" class="flex-grow-1">
          <ChatsList />
        </b-col>
        <b-col sm="9" class="flex-grow-1 mb-4 d-flex flex-column align-items-center p-3">
          <p class="text-white">Please, select chat to start messaging</p>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
  import ChatsList from '../components/ChatsList'
  import Header from '../components/common/Header';

  export default {
    name: 'Home',
    components: {
      ChatsList,
      Header,
      },
    data() {
      return {
        users: [],
      }
    },
  }
</script>
