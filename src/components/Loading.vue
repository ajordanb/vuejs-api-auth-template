<template>
  <div class="loading">
    <span></span>
  </div>
</template>

<script>
export default {
  name: "loadingAnimation",
};
</script>

<style lang="scss" scoped>
$main-color: #031624;
$secondary-color: rgb(145, 149, 197);
$accent-color: #5c4bda;
$accent-color-two: #e1c940;
$neutral-two: #575777;
$neutral-color: #f2f2f2;
.loading {
  top: 0;
  z-index: 101;
  height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  @keyframes spin {
    to {
      transform: rotateZ(360deg);
    }
  }
  span {
    display: block;
    width: 60px;
    height: 60px;
    margin: 0 auto;
    border: 3px solid transparent;
    border-top-color: $accent-color;
    border-bottom-color: $secondary-color;
    border-radius: 50%;
    animation: spin ease 1000ms infinite;
  }
}
</style>
