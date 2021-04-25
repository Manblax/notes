<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item">
          Home
        </a>

        <a class="navbar-item">
          Documentation
        </a>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            More
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item">
              About
            </a>
            <a class="navbar-item">
              Jobs
            </a>
            <a class="navbar-item">
              Contact
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item">
              Report an issue
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <span v-if="currentUser" class="mr-4">{{ currentUser }}</span>
            <button @click="logOut" class="button is-light">
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import {getAuthUser, removeAuthUser} from '/src/api';

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