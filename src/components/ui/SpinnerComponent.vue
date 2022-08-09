<template>
<div class="wrapper">
    <div class="lds-dual-ring"></div>
</div>
</template>

<script>
export default {
    name: "SpinnerComponent"
};
</script>

<style>
.lds-dual-ring {
  display: inline-block;
  width: 50px;
  height: 50px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid teal;
  border-color: teal transparent teal transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.wrapper{
    width: 100%;
    display: flex;
    align-items: center;
}
</style>
