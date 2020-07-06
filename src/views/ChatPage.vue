<template>
<div>
  <Header/>
  <div class="d-flex position-relative content-container align-items-stretch">
    <ChatList/>
    <Chat/>
  </div>
  </div>
</template>

<script>
  import Chat from '../components/Chat'
  import ChatList from '../components/ChatList'
  import Header from '../components/common/Header';

export default {
  name: 'ChatPage',
  components: {Chat, ChatList, Header}
}
</script>
