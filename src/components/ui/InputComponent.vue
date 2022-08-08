<template>
    <input :value="modelValue" class="input" type="text" @input="onChange" />
</template>
<script>
 export default {
    name: "InputComponent",
    props:{
        modelValue: [String, Number]
    },
    methods: {
        onChange(event){
            this.$emit("update:modelValue", event.target.value)
        }
    }
 }
</script>
<style>
.input {
    display: block;
    padding: 5px 9px;
    border: 1px solid turquoise;
    width: 100%;
    font-size: 16px;
    margin-top: 10px;
}
</style>