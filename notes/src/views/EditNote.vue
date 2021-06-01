<template>
  <h1 class="title is-1 mt-4">Редактировать заметку</h1>
  <form @submit.prevent="editNote" class="box">
    <CropperBox :src="note.src" @cropped="changeSrc" class="mb-6"></CropperBox>
    <MarkDownBox v-model:desc="note.code"></MarkDownBox>
    <button type="submit" class="button is-link">Редактировать</button>
  </form>
</template>

<script>

import {updateNote, fetchNote} from "../api";
import CropperBox from "../components/CropperBox";
import MarkDownBox from "../components/MarkDownBox";

export default {
  name: 'EditNote',
  components: {
    CropperBox,
    MarkDownBox
  },
  data() {
    return {
      note: {
        code: '',
        src: '',
      },
    }
  },
  methods: {
    async editNote() {

      if (!this.note.code) return;

      const formData = new FormData();
      formData.append('code', this.note.code);

      if (this.src) {
        const res = await fetch(this.src);
        const blob = await res.blob();
        formData.append('file', blob, this.fileName);
      }

      if (!this.note.code) return;
      const note = {
        code: this.note.code,
        src: this.note.src,
      };
      try {
        await updateNote(this.note.id, note);
        await this.$router.push({name: 'Home'});
      } catch (e) {
        console.error(e);
      }
    },
    async getNote() {
      const id = this.$route.params.id;
      this.note = await fetchNote(id);
    },
    changeSrc(src) {
      this.note.src = src;
    }
  },
  created() {
    this.getNote();
  }
}
</script>
