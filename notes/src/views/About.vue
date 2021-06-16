<template>
  <ul class="my-3">
    <li v-if="me.email">Email: {{ me.email }}</li>
    <li v-if="me.username">Имя пользователя: {{ me.username }}</li>
    <li v-if="me.id">Id: {{ me.id }}</li>
  </ul>
</template>

<script>
import {me} from "@/api";

export default {
  name: "About",
  data() {
    return {
      me: {}
    }
  },
  methods: {
    async getMe() {
      try {
        this.me = await me();
      } catch (err) {
        console.error(err);
      }
    }
  },
  created() {
    this.getMe();
  }
}
</script>

<style scoped>

</style>