<template>
 <post-component :key="post.id" :post="post" v-for="post in posts" @remove="onDelete"/>
</template>

<script>
 import PostComponent from "./Post.vue"
    export default {
        components: {PostComponent},
        props:{
            posts: {
                type: Array,
                required: true
            }
        },
        methods:{
            onDelete(post){
                this.$emit("remove", post)
            }
        }
    }
</script>

<style>

</style>