<template>
    <button class="btn"><slot></slot></button>
</template>

<script>
export default {
    name: "ButtonComponent",
}
</script>

<style scoped>
.btn {
    display: block;
    padding: 6px 9px;
    font-size: 17px;
    color: turquoise;
    border: 1px solid turquoise;
    background: transparent;
}
</style>