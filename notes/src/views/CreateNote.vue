<template>
  <div class="container is-max-widescreen">
    <NavBar></NavBar>
    <h1 class="title is-1 mt-4">Создать заметку</h1>
    <form @submit.prevent="createNote" class="box">
      <CropperBox @cropped="changeSrc" class="mb-6"></CropperBox>
      <MarkDownBox v-model:desc="text"></MarkDownBox>
      <button type="submit" class="button is-link">Создать</button>
    </form>
  </div>
</template>

<script>

import {sendNote} from "../api";
import NavBar from "../components/NavBar";
import CropperBox from "../components/CropperBox";
import MarkDownBox from "../components/MarkDownBox";

export default {
  name: 'CreateNote',
  components: {
    NavBar,
    CropperBox,
    MarkDownBox
  },
  data() {
    return {
      text: '',
      src: '',
    }
  },
  methods: {
    async createNote() {
      if (!this.text) return;
      const note = {
        src: this.src,
        text: this.text,
        date: Date.now()
      };
      try {
        await sendNote(note);
        await this.$router.push({name: 'Home'});
      } catch (e) {
        console.error(e);
      }
    },
    changeSrc(src) {
      this.src = src;
    }
  }
}
</script>
