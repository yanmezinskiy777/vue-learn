<template>
  <div class="app">
    <modal-component v-model:show="visibleModal">
      <form-component @create="addPost" />
    </modal-component>
    <div class="search">
      <input-component
        style="margin-bottom: 20px"
        @update:model-value="setSearchTitle"
        placeholder="Search"
      />
    </div>
    <div class="toolbar">
      <button-component @click="visibleModal = true"
        >Create Post</button-component
      >
      <select-component @update:model-value="setSelectedSort" :options="selectOptions" />
    </div>
    <list-component
      v-if="!isLoadingPosts"
      :posts="sortedSearchedPosts"
      @remove="onDelete"
    />
    <!-- <spinner-component v-else-if="isLoadingPosts"></spinner-component> -->
    <!-- <div v-if="!isLoadingPosts" class="pagination">
      <span
        :class="{
          'pagination-item-current': curPage === page,
        }"
        @click="changePage(curPage)"
        class="pagination-item"
        :key="curPage"
        v-for="curPage in totalCount"
        >{{ curPage }}</span
      >
    </div> -->
  </div>
  <div
    class="observer"
    v-intersection="{ fetch: fetchMorePosts, page, totalCount }"
  ></div>
</template>
<script>
import FormComponent from "../components/Form.vue";
import ListComponent from "../components/List.vue";
import SelectComponent from "../components/ui/SelectComponent.vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  components: {
    FormComponent,
    ListComponent,
    SelectComponent,
  },
  data() {
    return {
      visibleModal: false,
    };
  },
  methods: {
    ...mapMutations({
      setPage: "post/setPage",
      setSelectedSort: "post/setSelectedSort",
      setSearchTitle: "post/setSearchTitle",
    }),
    ...mapActions({
      fetchPosts: "post/fetchPosts",
      fetchMorePosts: "post/fetchMorePosts",
    }),
    addPost(post) {
      this.posts.push(post);
      this.visibleModal = false;
    },
    onDelete(post) {
      this.posts = this.posts.filter((current) => current.id !== post.id);
    },
    changePage(pageNumber) {
      this.page = pageNumber;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      isLoadingPosts: (state) => state.post.isLoadingPosts,
      posts: (state) => state.post.posts,
      totalCount: (state) => state.post.totalCount,
      perPagePosts: (state) => state.post.perPagePosts,
      page: (state) => state.post.page,
      selectOptions: (state) => state.post.selectOptions,
      selectedSort: (state) => state.post.selectedSort,
      searchTitle: (state) => state.post.searchTitle,
    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      sortedSearchedPosts: "post/sortedSearchedPosts",
    }),
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
