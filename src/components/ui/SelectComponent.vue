<template>
  <select class="select" v-model="modelValue" @change="onChange">
    <option disabled value="">Choose</option>
    <option :key="option.value" :value="option.value" v-for="option in options">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "SelectComponent",
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onChange(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style>
.select {
  padding: 6px 9px;
  color: turquoise;
  border: 1px solid turquoise;
}
</style>
