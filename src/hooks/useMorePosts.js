import axios from "axios";
import { computed } from "vue";

export function useMorePosts(page, sortedSearchedPosts, perPagePosts) {
  let morePosts = [];
  let result = [];
  const fetch = async () => {
    try {
      page.value += 1;
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _limit: perPagePosts,
            _page: page.value,
          },
        }
      );
      // totalCount = Math.ceil(
      //     response.headers["x-total-count"] / perPagePosts
      // );
      result = response.data
      morePosts = computed(() => [...result, ...sortedSearchedPosts.value]);
    } catch (e) {
      console.log(e);
    }
  };
  morePosts = computed(() => [...result, ...sortedSearchedPosts.value]);
  return { fetchMorePosts: fetch, morePosts };
}
