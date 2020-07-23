<template>
    <div
        class="image-container rounded-circle border border-info"
        :style="{
            height: `${size}px`,
            width: `${size}px`,
        }"    
    >
      <b-img
        class="image"
        :src="imageUrl || defaultImageUrl"
        rounded="circle"
      />
    </div>
</template>

<script>
export default {
    name: 'AvatarContainer',
    props: {
        size: {
            type: Number,
            default: 40,
        },
        imageUrl: {
            required: true,
            type: String,
            default: '',
        },
        defaultImageUrl: {
            type: String,
            default: '/images/user-no-avatar.png',
        }
    },
    data: () =>  {
        return {
            
        }
    },
}
</script>

<style lang="scss">
    .image-container {
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        .image {
            height: 100%;
        }
    }
</style>