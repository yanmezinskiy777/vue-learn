<template>
  <div class="app">
    <modal-component v-model:show="visibleModal">
      <form-component @create="addPost" />
    </modal-component>
    <div class="toolbar">
      <button-component @click="visibleModal = true">Create Post</button-component>
      <select-component v-model="selectedSort" :options="selectOptions" />
    </div>
    <list-component v-if="!isLoadingPosts" :posts="posts" @remove="onDelete" />
    <spinner-component v-else></spinner-component>
  </div>
</template>
<script>
import FormComponent from "./components/Form.vue"
import ListComponent from "./components/List.vue"
import axios from "axios"
import SelectComponent from "./components/ui/SelectComponent.vue"
export default {
  components: {
    FormComponent,
    ListComponent,
    SelectComponent
},
  data() {
    return {
      visibleModal: false,
      isLoadingPosts: false,
      posts: [],
      selectOptions: [{ name: "Title", value: "title" }, {name: "Body", value: "body"}, {name: "ID", value: "id"}],
      selectedSort: "",
    }
  },
  methods: {
    addPost(post) {
      this.posts.push(post)
      this.visibleModal = false;
    },
    onDelete(post) {
      this.posts = this.posts.filter(current => current.id !== post.id)
    },
    async fetchPosts(){
      try{
        this.isLoadingPosts = true;
        const posts = await axios.get("https://jsonplaceholder.typicode.com/posts?_start=0&_limit=10")
        this.posts = posts.data
      } catch(e){
        console.log(e)
        this.isLoadingPosts = false;
      } finally {
        this.isLoadingPosts = false;
      }
    },
  },
   mounted(){
      this.fetchPosts();
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
.toolbar{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>