<template>
  <div class="container is-max-desktop">
    <NavBar></NavBar>
    <h1 class="title is-1 mt-4">Список заметок</h1>
    <ul class="mt-3" v-if="notes.length">
      <li v-for="note in notes" :key="note.id" class="notification">
        <button
            @click="$modal.show('delete-note', {id: note.id, title: note.text})"
            type="button"
            class="delete"
        />
        <div v-html="compiledMarkdown(note.text)" class="content mt-3"></div>
        <figure v-if="note.src" class="image is-48x48">
          <img :src="note.src" alt="image">
        </figure>
        <time datetime="2016-1-1">{{ formatDate(note.date) }}</time>
        <div class="mt-3">
          <router-link
              :to="{name: 'EditNote', params: {id: note.id}}"
              type="button"
              class="button is-small is-primary is-outlined"
          >
            Редактировать
          </router-link>
        </div>
      </li>
    </ul>
    <div v-else>Нет заметок</div>
    <DeleteNote @delete-note="deleteNoteHandler"></DeleteNote>
  </div>
</template>

<script>

import {formatDate} from "../utils";
import {fetchNotes, deleteNote} from "../api";
import NavBar from "../components/NavBar";
import marked from "marked/lib/marked.esm";
import DeleteNote from "../components/DeleteNote";

export default {
  name: 'Home',
  components: {
    NavBar,
    DeleteNote,
  },
  data() {
    return {
      notes: []
    }
  },
  methods: {
    formatDate(timestamp){
      return formatDate(timestamp);
    },
    compiledMarkdown(text) {
      return marked(text);
    },
    async deleteNoteHandler(id) {
      try {
        const response = await deleteNote(id);
        if (response.status !== 200) {
          throw new Error('Ошибка при удалении заметки');
        }
        await this.getNotes();
      } catch (e) {
        console.log(e);
      }
    },
    async getNotes() {
      this.notes = await fetchNotes();
    }
  },
  watch: {
    notes() {
      localStorage.setItem('notes', JSON.stringify(this.notes));
    }
  },
  created() {
    this.getNotes();
  },
}
</script>

