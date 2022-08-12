import axios from "axios";
export const postModule = {
  state: () => ({
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
  }),
  getters: {
    sortedPosts(state) {
      if (state.selectedSort === "id") {
        return [
          ...state.posts.sort(
            (post1, post2) =>
              post1[state.selectedSort] - post2[state.selectedSort]
          ),
        ];
      }
      return [
        ...state.posts.sort((post1, post2) =>
          post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
        ),
      ];
    },
    sortedSearchedPosts(state, getters) {
      return [
        ...getters.sortedPosts.filter((post) =>
          post.title?.toLowerCase().includes(state.searchTitle?.toLowerCase())
        ),
      ];
    },
  },
  mutations: {
    setIsloadingPosts(state, isLoadingPosts) {
      state.isLoadingPosts = isLoadingPosts;
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
    setTotalCount(state, totalCount) {
      state.totalCount = totalCount;
    },
    setPerPagePost(state, perPagePosts) {
      state.perPagePosts = perPagePosts;
    },
    setPage(state, page) {
      state.page = page;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setSearchTitle(state, searchTitle) {
      state.searchTitle = searchTitle;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit("setIsloadingPosts", true);
        const posts = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _limit: state.perPagePosts,
              _page: state.page,
            },
          }
        );
        commit(
          "setTotalCount",
          Math.ceil(posts.headers["x-total-count"] / this.perPagePosts)
        );
        commit("setPosts", posts.data);
      } catch (e) {
        console.log(e);
      } finally {
        commit("setIsloadingPosts", false);
      }
    },
    async fetchMorePosts({ state, commit }) {
      try {
        commit("setPage", state.page + 1);
        const posts = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _limit: state.perPagePosts,
              _page: state.page,
            },
          }
        );
        commit(
          "setTotalCount",
          Math.ceil(posts.headers["x-total-count"] / state.perPagePosts)
        );
        commit("setPosts", [...state.posts, ...posts.data]);
      } catch (e) {
        console.log(e);
      }
    },
  },
  namespaced: true,
};
