<template>
<div>
  <Header/>
  <div class="d-flex flex-row position-relative align-items-stretch content-container">
    <ChatList />
    <div class="flex-grow-1 mb-4 d-flex flex-column align-items-center p-3">
      <p class="text-white">Please, select chat to start messaging</p>
    </div>
  </div>
</div>
</template>

<script>
  import ChatList from '../components/ChatList'
  import Header from '../components/common/Header';

  export default {
    name: 'home',
    components: {
      ChatList,
      Header,
      },
    data() {
      return {
        users: [],
      }
    },
  }
</script>
