<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-menu">
      <div class="navbar-start">
        <router-link :to="{name: 'Home'}" class="navbar-item">Главная</router-link>
        <router-link :to="{name: 'CreateNote'}" class="navbar-item">Создать</router-link>
        <router-link :to="{name: 'About'}" class="navbar-item">Обо мне</router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <span v-if="currentUser" class="mb-2 mr-4">{{ currentUser }}</span>
            <button @click="logOut" class="button is-light">
              Выйти
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import {getAuthUser, removeAuthUser} from '../api';

export default {
  name: "NavBar",
  data() {
    return {
      currentUser: ''
    }
  },
  methods: {
    setCurrentUser() {
      try {
        const user = getAuthUser();
        this.currentUser = user.email;
      } catch (e) {
        console.error(e);
      }
    },
    async logOut() {
      try {
        removeAuthUser();
        await this.$router.push({name: 'Login'});
      } catch (e) {
        console.error(e);
      }
    }
  },
  created() {
    this.setCurrentUser();
  }
}
</script>

<style scoped>

</style>