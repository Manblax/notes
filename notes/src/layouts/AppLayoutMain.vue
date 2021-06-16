<template>
  <div class="container is-max-widescreen">
    <NavBar></NavBar>
    <slot/>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";

export default {
  name: "AppLayoutMain",
  components: {
    NavBar
  }
}
</script>

<style scoped>

</style>