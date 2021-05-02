<template>
  <div class="container is-max-desktop">
    <h1 class="title is-1">Вход</h1>
    <form @submit.prevent="submit" class="box">
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input v-model="email" class="input" type="email" placeholder="Email" required>
        </div>
      </div>
      <div class="field">
        <label class="label">Пароль</label>
        <div class="control">
          <input v-model="password" class="input" type="password" placeholder="password" required minlength="4">
        </div>
      </div>
      <p v-if="errorMsg" class="help is-danger">{{ errorMsg }}</p>
      <button class="button is-link">Войти</button>
      <router-link :to="{name: 'Reg'}" class="button is-link is-outlined ml-4">Регистрация</router-link>
    </form>
  </div>
</template>

<script>
import {login} from '../../api';

export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
      errorMsg: '',
    }
  },
  methods: {
    async submit() {
      if (!this.email && !this.password) {
        return this.errorMsg = 'Не заполнены поля логин или пароль';
      }

      const user = {
        email: this.email,
        password: this.password
      };

      try {
        await login(user);
        await this.$router.push({name: 'Home'});
      } catch (err) {
        console.error(err);
        this.errorMsg = err.message;
      }
    }
  }
}
</script>

<style scoped>

</style>