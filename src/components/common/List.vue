<template>
<div :class="`w-100 h-100 bg-${bgVariant} overflow-auto`" >
  <b-list-group :variant="bgVariant" v-if="data.length">
    <b-list-group-item
      v-for="(item, index) in data"
      :id="item._id"
      @click="$emit('click', item)"
      :class="`
        d-flex
        flex-row
        bg-${activeId === item._id ? 'info' : bgVariant}
        text-${textVariant}
        border-secondary
        border-right-0
        border-left-0 
        rounded-0
        p-3
      `"
      :key="index">
        <AvatarContainer
            :imageUrl="item.avatar"
            class="mr-3"
        />
      <p clas="mb-0">{{item.name}}</p>
      <b-badge v-if="item.unreadCount" class="badge d-felx align-items-center" variant="info" pill>
        {{item.unreadCount}}
      </b-badge>
    </b-list-group-item>
  </b-list-group>
  <p v-else :class="`text-center mt-3 text-${textVariant}`">{{ emptyArrayText }}</p>
</div>
</template>

<script>
  import AvatarContainer from './AvatarContainer';

  export default {
    name: 'List',
    props: {
      bgVariant: {
        type: String,
        default: "dark",
      },
      textVariant: {
        type: String,
        default: "light",
      },
      emptyArrayText: {
        type: String,
        default: "Your chats will apear here",
      },
      data: {
        type: Array,
        required: true,
        default: () => [],
      },
      activeId: {
        type: String,
      }
    },
    components: { AvatarContainer },
  }
</script>

<style lang="scss" scoped>
  .badge {
    line-height: normal;
    position: absolute;
    top: 16px;
    right: 8px;
  }
</style>
