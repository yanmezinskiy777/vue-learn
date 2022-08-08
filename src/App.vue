<template>
  <div class="app">
    <form-component @create="addPost" />
    <list-component :posts="posts" @remove="onDelete" />
  </div>
</template>
<script>
import FormComponent from "./components/Form.vue"
import ListComponent from "./components/List.vue"
export default {
  components: {
    FormComponent, ListComponent
  },
  data() {
    return {
      posts: [{ id: 1, title: "Post", body: "Simple Post" },
      { id: 2, title: "Post2", body: "Simple Post2" }]
    }
  },
  methods: {
    addPost(post) {
      this.posts.push(post)
    },
    onDelete(post) {
      this.posts = this.posts.filter(current => current.id !== post.id)
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}
</style>