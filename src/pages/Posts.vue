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
  <div class="observer" v-intersection="{ fetch: fetchMorePosts, page, totalCount }"></div>
</template>
<script>
import FormComponent from "../components/Form.vue";
import ListComponent from "../components/List.vue";
import axios from "axios";
import SelectComponent from "../components/ui/SelectComponent.vue";
export default {
  components: {
    FormComponent,
    ListComponent,
    SelectComponent,
  },
  data() {
    return {
      visibleModal: false,
      isLoadingPosts: false,
      posts: [],
      totalCount: 10,
      perPagePosts: 10,
      page: 1,
      selectOptions: [
        { name: "Title", value: "title" },
        { name: "Body", value: "body" },
        { name: "ID", value: "id" },
      ],
      selectedSort: "",
      searchTitle: "",
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
    changePage(pageNumber) {
      this.page = pageNumber;
    },
    async fetchPosts() {
      try {
        this.isLoadingPosts = true;
        const posts = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _limit: this.perPagePosts,
              _page: this.page,
            },
          }
        );
        this.totalCount = Math.ceil(
          posts.headers["x-total-count"] / this.perPagePosts
        );
        this.posts = posts.data;
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoadingPosts = false;
      }
    },
    async fetchMorePosts() {
      try {
        this.page += 1;
        const posts = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _limit: this.perPagePosts,
              _page: this.page,
            },
          }
        );
        this.totalCount = Math.ceil(
          posts.headers["x-total-count"] / this.perPagePosts
        );
        this.posts = [...this.posts, ...posts.data];
      } catch (e) {
        console.log(e);
      }
    },
    //   setObserver() {
    //     const options = {
    //       rootMargin: "0px",
    //       threshold: 1.0,
    //     };
    //     const callback = (entries, observer) => {
    //       if (entries[0].isIntersecting && this.page < this.totalCount) {
    //         this.fetchMorePosts();
    //       }
    //     };
    //     const observer = new IntersectionObserver(callback, options);
    //     observer.observe(this.$refs.observer);
    //   },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      if (this.selectedSort === "id") {
        return [
          ...this.posts.sort(
            (post1, post2) =>
              post1[this.selectedSort] - post2[this.selectedSort]
          ),
        ];
      }
      return [
        ...this.posts.sort((post1, post2) =>
          post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
        ),
      ];
    },
    sortedSearchedPosts() {
      return [
        ...this.sortedPosts.filter((post) =>
          post.title?.toLowerCase().includes(this.searchTitle?.toLowerCase())
        ),
      ];
    },
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
