<template>
  <div class="container is-max-widescreen">
    <NavBar></NavBar>
    <h1 class="title is-1 mt-4">Редактировать заметку</h1>
    <form @submit.prevent="editNote" class="box">
      <CropperBox :src="note.src" @cropped="changeSrc"></CropperBox>
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <textarea v-model="note.text" class="textarea" placeholder="Note" required></textarea>
        </div>
      </div>
      <div class="box">
        <div v-html="compiledMarkdown" class="content"></div>
      </div>
      <button type="submit" class="button is-link">Редактировать</button>
    </form>
  </div>
</template>

<script>

import marked from "marked/lib/marked.esm";
import {updateNote, fetchNote} from "../api";
import NavBar from "../components/NavBar";
import CropperBox from "../components/CropperBox";

export default {
  name: 'EditNote',
  components: {
    NavBar,
    CropperBox
  },
  data() {
    return {
      note: {
        text: '',
        src: '',
      },
    }
  },
  computed: {
    compiledMarkdown() {
      return marked(this.note.text);
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
