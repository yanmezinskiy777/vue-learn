import { ref, onMounted } from "vue";
import axios from "axios";

export function usePosts(perPagePosts) {
  const isLoadingPosts = ref(true);
  const totalCount = ref(0);
  const posts = ref([]);
  const fetch = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _limit: perPagePosts,
            _page: 1,
          },
        }
      );
      totalCount.value = Math.ceil(
        response.headers["x-total-count"] / perPagePosts
      );
      posts.value = response.data;
    } catch (e) {
      console.log(e);
    } finally {
      isLoadingPosts.value = false;
    }
  };
  onMounted(fetch);
  return { posts, totalCount, isLoadingPosts };
}
