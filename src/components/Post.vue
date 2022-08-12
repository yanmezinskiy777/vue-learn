<template>
    <div class="post">
        <div>
            <h2>Title: {{ post.title }}</h2>
            <p>Body: {{ post.body }}</p>
        </div>
        <div>
            <button-component @click="$router.push(`/posts/${post.id}`)">open</button-component>
            <button-component @click="onDelete">delete</button-component>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    methods:{
        onDelete(){
            this.$emit("remove", this.post);
        }
    }
}
</script>

<style>
.post {
    padding: 15px;
    border: 3px solid turquoise;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>