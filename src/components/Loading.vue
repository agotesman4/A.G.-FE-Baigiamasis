<template>
  <div class="loading">
    <span></span>
  </div>
</template>

<script>
export default {
  name: "loading",
};
</script>

<style lang="scss" scoped>
.loading {
  top: 0;
  left: 0;
  z-index: 101;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.731);
  position: absolute;
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
    width: 77px;
    height: 77px;
    margin: 0 auto;
    border: 5px solid transparent;
    border-top-color: rgb(187, 176, 76);
    border-bottom-color: rgb(173, 86, 86);
    border-radius: 50%;
    animation: spin 989ms infinite;
  }
}
</style>
