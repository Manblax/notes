<template>
  <div class="container is-max-desktop">
    <h1 class="title is-1">Вход</h1>
    <form @submit.prevent="submit">
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input v-model="email" class="input" type="email" placeholder="Email">
        </div>
      </div>
      <div class="field">
        <label class="label">Пароль</label>
        <div class="control">
          <input v-model="password" class="input" type="password" placeholder="password">
        </div>
      </div>
      <p v-if="errorFields" class="help is-danger">Поля пустые или что-то не так</p>
      <button class="button is-link">Войти</button>
      <router-link :to="{name: 'Reg'}" class="button is-link is-outlined ml-4">Регистрация</router-link>
    </form>
  </div>
</template>

<script>
import {login} from '/src/api';

export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
      errorFields: '',
    }
  },
  methods: {
    async submit() {
      if (!this.email && !this.password) {
        return this.errorFields = true;
      }
      try {
        const result = await login();
        console.log(result);
      } catch (err) {
        console.error(err);
      }
    }
  }
}
</script>

<style scoped>

</style>