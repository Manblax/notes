<template>
  <div class="container is-max-desktop">
    <h1 class="title is-1">Вход</h1>
    <form @submit.prevent="submit" class="box">
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
      <p v-if="errorMsg" class="help is-danger">{{ errorMsg }}</p>
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
        const result = await login(user);
        if (result.success) {
          await this.$router.push({name: 'Home'});
        } else {
          this.errorMsg = result.error;
        }
        console.log(result);
      } catch (err) {
        console.error(err);
        this.errorMsg = 'Неизвестная ошибка';
      }
    }
  }
}
</script>

<style scoped>

</style>