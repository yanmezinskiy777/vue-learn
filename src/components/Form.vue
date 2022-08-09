<template>
    <form @submit.prevent>
        <h2>Create post</h2>
        <input-component v-model="post.title" placeholder="Title" />
        <input-component v-model="post.body" placeholder="Body" />
        <button-component style="margin-top: 15px;" @click="createPost">Add</button-component>
    </form>
</template>
<script>
export default {
    data() {
        return {
            post: {
                title: "",
                body: ""
            }
        }
    },
    methods: {
        createPost() {
            this.post.id = Date.now()
            this.$emit("create", this.post)
            this.post = {
                title: "",
                body: ""
            }
        }
    }
}
</script>