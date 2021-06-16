<template>
  <h1 class="title is-1 mt-4">Редактировать заметку</h1>
  <form @submit.prevent="editNote" class="box">
    <CropperBox :src="note.file" @cropped="changeSrc" class="mb-6"></CropperBox>
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
      },
      src: '',
      fileName: '',
    }
  },
  methods: {
    async editNote() {
      if (!this.note.code) return;

      const formData = new FormData();
      formData.append('code', this.note.code);

      if (this.src) {
        try {
          const res = await fetch(this.src);
          const blob = await res.blob();

          this.fileName = this.note.file.match(/[^/]*$/);
          formData.append('file', blob, this.fileName);
        } catch (e) {
          console.log(e);
        }
      }

      try {
        await updateNote(this.note.id, formData);
        await this.$router.push({name: 'Home'});
      } catch (e) {
        console.error(e);
      }
    },
    async getNote() {
      const id = this.$route.params.id;
      try {
        this.note = await fetchNote(id);
      } catch (e) {
        console.log(e);
      }
    },
    changeSrc(file) {
      this.src = file.src;
      this.fileName = file.name;
    },
  },
  created() {
    this.getNote();
    console.log('EditNote.created');
  }
}
</script>
