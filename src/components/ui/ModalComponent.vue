<template>
    <div class="wrapper" @click="onClose" v-if="show">
        <div @click.stop class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "ModalComponent",
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onClose(){
            this.$emit("update:show", false)
        }
    }
}
</script>

<style>
.wrapper {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    top: 0;
    left: 0;
    position: fixed;
    background-color: rgba(0, 0, 0, .2);
    display: flex;
    align-items: center;
    justify-content: center;
}

.content {
    min-height: 100px;
    min-width: 200px;
    display: flex;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
}
</style>