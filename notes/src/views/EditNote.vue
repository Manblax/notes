<template>
  <div class="container is-max-widescreen">
    <NavBar></NavBar>
    <h1 class="title is-1 mt-4">Редактировать заметку</h1>
    <form @submit.prevent="editNote" class="box">
      <CropperBox :src="note.src" @cropped="changeSrc" class="mb-6"></CropperBox>
      <MarkDownBox v-model:desc="note.text"></MarkDownBox>
      <button type="submit" class="button is-link">Редактировать</button>
    </form>
  </div>
</template>

<script>

import {updateNote, fetchNote} from "../api";
import NavBar from "../components/NavBar";
import CropperBox from "../components/CropperBox";
import MarkDownBox from "../components/MarkDownBox";

export default {
  name: 'EditNote',
  components: {
    NavBar,
    CropperBox,
    MarkDownBox
  },
  data() {
    return {
      note: {
        text: '',
        src: '',
      },
    }
  },
  methods: {
    async editNote() {
      if (!this.note.text) return;
      const note = {
        text: this.note.text,
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
