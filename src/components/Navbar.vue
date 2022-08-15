<template>
  <div class="navbar">
    <span class="logo" @click="$router.push('/')">Logo</span>
    <nav class="btns">
      <ul>
        <li style="margin-right: 15px"><button-component @click="$router.push('/')">Main</button-component></li>
        <li style="margin-right: 15px"><button-component @click="$router.push('/posts-vuex')">Posts Vuex</button-component></li>
        <li style="margin-right: 15px"><button-component @click="$router.push('/posts-composition')">Posts Composition</button-component></li>
        <li><button-component @click="$router.push('/posts')">Posts</button-component></li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.navbar {
  width: 100%;
  height: 60px;
  background-color: whitesmoke;
  box-shadow: 2px 2px 4px black;
  display: flex;
  align-items: center;
  padding: 0 30px;
}
.logo {
  font-size: 20px;
  cursor: pointer;
}
.btns {
  margin-left: auto;
}
.btns ul{
    list-style: none;
    display: flex;
}
</style>
