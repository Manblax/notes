<template>
  <div class="container is-max-desktop">
    <NavBar></NavBar>
    <slot></slot>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";

export default {
  name: "AppLayoutDefault",
  components: {
    NavBar
  }
}
</script>

<style scoped>

</style>