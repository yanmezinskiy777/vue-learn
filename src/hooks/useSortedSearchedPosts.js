import { ref, computed } from "vue";

export function useSortedSearchedPosts(sortedPosts) {
  const searchTitle = ref("");

  const sortedSearchedPosts = computed(() => [
    ...sortedPosts.value.filter((post) =>
      post.title?.toLowerCase().includes(searchTitle.value?.toLowerCase())
    ),
  ]);
  return { searchTitle, sortedSearchedPosts };
}
