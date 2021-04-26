<template>
  <div class="container is-max-desktop">
    <NavBar></NavBar>
    <h1 class="title is-1 mt-4">Редактировать заметку</h1>
    <form @submit.prevent="editNote" class="box">
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

export default {
  name: 'EditNote',
  components: {
    NavBar
  },
  data() {
    return {
      note: {},
    }
  },
  computed: {
    compiledMarkdown() {
      return marked(this.note.text);
    }
  },
  methods: {
    editNote() {
      if (!this.note.text) return;
      const note = {
        id: this.note.id,
        src: '',
        text: this.note.text,
      };
      try {
        updateNote(note);
        this.$router.push({name: 'Home'});
      } catch (e) {
        console.error(e);
      }
    },
    setNote() {
      const id = this.$route.params.id;
      this.note = fetchNote(id);
    }
  },
  created() {
    this.setNote();
  }
}
</script>
