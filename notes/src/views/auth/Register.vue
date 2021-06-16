<template>
  <h1 class="title is-1">Регистрация</h1>
  <form @submit.prevent="submit" class="box">
    <div class="field">
      <label class="label">Имя пользователя</label>
      <div class="control">
        <input
            v-model="username"
            :class="{'is-danger': errors.username}"
            class="input"
            type="text"
            placeholder="Username"
            required
        >
      </div>
      <p v-if="errors.username" class="help is-danger">
        <span v-for="error in errors.username" :key="error">{{ error }}</span>
      </p>
    </div>

    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input
            v-model="email"
            :class="{'is-danger': errors.email}"
            class="input"
            type="email"
            placeholder="Email"
            required
        >
      </div>
      <p v-if="errors.email" class="help is-danger">
        <span v-for="error in errors.email" :key="error">{{ error }}</span>
      </p>
    </div>

    <div class="field">
      <label class="label">Пароль</label>
      <div class="control">
        <input
            v-model="password"
            :class="{'is-danger': errors.password}"
            class="input"
            type="password"
            placeholder="password"
            minlength="4"
            required
        >
      </div>
      <p v-if="errors.password" class="help is-danger">
        <span v-for="error in errors.password" :key="error">{{ error }}</span>
      </p>
    </div>

    <p v-if="errors.non_field_errors" class="help is-danger my-2">
      <span v-for="error in errors.non_field_errors" :key="error">{{ error }}</span>
    </p>

    <button class="button is-link" :class="{'is-loading': isLoading}">Зарегистрироваться</button>
    <router-link :to="{name: 'Login'}" class="button is-link is-outlined ml-4">Ко входу</router-link>
  </form>
</template>

<script>
import {reg} from '@/api';

export default {
  name: "Register",
  data() {
    return {
      username: '',
      email: '',
      password: '',
      errors: {},
      isLoading: false,
    }
  },
  methods: {
    async submit() {
      if (!this.username.trim() || !this.email.trim() || !this.password.trim()) {
        return this.errors = {non_field_errors: ['Некоторые поля не заполнены']};
      }
      this.isLoading = true;

      const user = {
        username: this.username,
        email: this.email,
        password: this.password
      };

      try {
        try {
          await reg(user);
          await this.$router.push({name: 'Home'});
        } catch (err) {
          console.error(err);
          this.errors = JSON.parse(err.message || '{}');
        }
      } catch (err) {
        console.error(err);
        this.errors = {non_field_errors: ['Неизвестная ошибка']};
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>

</style>