<template>
  <div class="container is-max-desktop">
    <NavBar></NavBar>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import NavBar from "@/components/NavBar";

export default {
  name: 'Home',
  components: {
    HelloWorld,
    NavBar
  }
}
</script>
