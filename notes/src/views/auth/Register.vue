<template>
  <h1 class="title is-1">Регистрация</h1>
  <form @submit.prevent="submit" class="box">
    <div class="field">
      <label class="label">Имя пользователя</label>
      <div class="control">
        <input v-model="username" class="input" type="text" placeholder="Username" required>
      </div>
    </div>

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
    <button class="button is-link">Зарегистрироваться</button>
    <router-link :to="{name: 'Login'}" class="button is-link is-outlined ml-4">Ко входу</router-link>
  </form>
</template>

<script>
import {reg} from "../../api";

export default {
  name: "Register",
  data() {
    return {
      username: '',
      email: '',
      password: '',
      errorMsg: false,
    }
  },
  methods: {
    async submit() {
      if (!this.name && !this.username && !this.email && !this.password) {
        return this.errorMsg = 'Некоторые поля не заполнены';
      }
      const user = {
        username: this.username,
        email: this.email,
        password: this.password
      };
      try {
        await reg(user);
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