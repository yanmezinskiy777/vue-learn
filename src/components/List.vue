<template>
  <transition-group name="posts">
    <post-component
      :key="post.id"
      :post="post"
      v-for="post in posts"
      @remove="onDelete"
    />
  </transition-group>
</template>

<script>
import PostComponent from "./Post.vue";
export default {
  components: { PostComponent },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onDelete(post) {
      this.$emit("remove", post);
    },
  },
};
</script>

<style scoped>
.posts-item {
  display: inline-block;
  margin-right: 10px;
}
.posts-enter-active,
.posts-leave-active {
  transition: all 0.3s;
}
.posts-enter, .posts-leave-to {
  opacity: 0;
  transform: translateX(70px);
}
.posts-move {
  transition: transform 0.3s;
}
</style>
