<template>
  <div class="app">
    <modal-component v-model:show="visibleModal">
      <form-component @create="addPost" />
    </modal-component>
    <div class="search">
      <input-component
        style="margin-bottom: 20px"
        v-model="searchTitle"
        placeholder="Search"
      />
    </div>
    <div class="toolbar">
      <button-component @click="visibleModal = true"
        >Create Post</button-component
      >
      <select-component v-model="selectedSort" :options="selectOptions" />
    </div>
    <list-component
      v-if="!isLoadingPosts"
      :posts="sortedSearchedPosts"
      @remove="onDelete"
    />
  </div>
  <!-- <div class="observer" v-intersection="{ fetch: fetchMorePosts, page, totalCount }"></div> -->
</template>
<script>
import FormComponent from "../components/Form.vue";
import ListComponent from "../components/List.vue";
import SelectComponent from "../components/ui/SelectComponent.vue";
import { usePosts } from "../hooks/usePosts";
import { useSortedPosts } from "../hooks/useSortedPosts";
import { useSortedSearchedPosts } from "../hooks/useSortedSearchedPosts";
export default {
  components: {
    FormComponent,
    ListComponent,
    SelectComponent,
  },
  data() {
    return {
      visibleModal: false,
       selectOptions: [
        { name: "Title", value: "title" },
        { name: "Body", value: "body" },
        { name: "ID", value: "id" },
      ],
    };
  },
  setup(props) {
    const { posts, totalCount, isLoadingPosts } = usePosts(10);
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { searchTitle, sortedSearchedPosts } =
      useSortedSearchedPosts(sortedPosts);

    return {
      posts,
      totalCount,
      isLoadingPosts,
      searchTitle,
      selectedSort,
      sortedSearchedPosts,
    };
  },
  methods: {
    addPost(post) {
      this.posts.push(post);
      this.visibleModal = false;
    },
    onDelete(post) {
      this.posts = this.posts.filter((current) => current.id !== post.id);
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // },
  },
};
</script>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
.pagination-item {
  padding: 6px 8px;
  border: 1px solid black;
  cursor: pointer;
}
.pagination-item-current {
  border: 1px solid turquoise;
  color: turquoise;
}
.observer {
  display: block;
  width: 100%;
  height: 1px;
  background-color: transparent;
}
</style>
