<template>
  <div class="container is-max-desktop">
    <h1 class="title is-1">Регистрация</h1>
    <form @submit.prevent="submit">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input v-model="name" class="input" type="text" placeholder="Name">
        </div>
      </div>

      <div class="field">
        <label class="label">Username</label>
        <div class="control">
          <input v-model="userName" class="input" type="text" placeholder="Username">
        </div>
      </div>

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
      <button class="button is-link">Зарегистрироваться</button>
      <router-link :to="{name: 'Login'}" class="button is-link is-outlined ml-4">Ко входу</router-link>
    </form>
  </div>
</template>

<script>
import {reg} from "../../api";

export default {
  name: "Register",
  data() {
    return {
      name: '',
      userName: '',
      email: '',
      password: '',
      errorMsg: false,
    }
  },
  methods: {
    async submit() {
      if (!this.name && !this.userName && !this.email && !this.password) {
        return this.errorMsg = 'Поля пустые или что-то не так';
      }
      const user = {
        name: this.name,
        userName: this.userName,
        email: this.email,
        password: this.password
      };
      try {
        const result = await reg(user);
        if (result.success) {
          await this.$router.push({name: 'Home'});
        } else {
          this.errorMsg = result.error;
        }
      } catch (err) {
        this.errorMsg = 'Неизвестная ошибка при регистрации';
      }
    }
  }
}
</script>

<style scoped>

</style>