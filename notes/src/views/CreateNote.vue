<template>
  <h1 class="title is-1 mt-4">Создать заметку</h1>
  <form @submit.prevent="createNote" class="box">
    <CropperBox @cropped="changeFile" class="mb-6"></CropperBox>
    <MarkDownBox v-model:desc="code"></MarkDownBox>
    <button type="submit" class="button is-link">Создать</button>
  </form>
</template>

<script>

import {sendNote} from "../api";
import CropperBox from "../components/CropperBox";
import MarkDownBox from "../components/MarkDownBox";

export default {
  name: 'CreateNote',
  components: {
    CropperBox,
    MarkDownBox
  },
  data() {
    return {
      code: '',
      src: '',
      fileName: '',
    }
  },
  methods: {
    async createNote() {
      if (!this.code) return;

      const formData = new FormData();
      formData.append('code', this.code);

      if (this.src) {
        try {
          const res = await fetch(this.src);
          const blob = await res.blob();
          formData.append('file', blob, this.fileName);
        } catch (e) {
          console.log(e);
        }
      }

      try {
        await sendNote(formData);
        await this.$router.push({name: 'Home'});
      } catch (e) {
        console.error(e);
      }
    },
    changeFile(file) {
      this.src = file.src;
      this.fileName = file.name;
    }
  }
}
</script>
