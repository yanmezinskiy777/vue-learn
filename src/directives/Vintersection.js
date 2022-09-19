export default {
  mounted(el, binding) {
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback = (entries, observer) => {
      if (
        entries[0].isIntersecting &&
        binding.value.page < binding.value.totalCount
      ) {
        console.log("OBSERVER");
        console.log(binding.value.page);
        console.log(binding.value.totalCount);
        binding.value.fetch();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
  },
  name: "intersection",
};
