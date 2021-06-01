<template>
  <div class="container is-max-desktop">
    <NavBar></NavBar>
    <h1 class="title is-1 mt-4">Список заметок</h1>
    <ul class="mt-3" v-if="notes">
      <li v-for="note in notes.results" :key="note.id" class="notification">
        <button
            @click="$modal.show('delete-note', {id: note.id, title: note.code})"
            type="button"
            class="delete"
        />
        <div v-html="compiledMarkdown(note.code)" class="content mt-3"></div>
        <figure v-if="note.file" class="image is-48x48">
          <img :src="note.file" alt="image">
        </figure>
        <time datetime="2016-1-1">{{ formatDate(new Date(note.created)) }}</time>
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
      notes: null
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
        if (response.status !== 204) {
          throw new Error('Ошибка при удалении заметки');
        }
        await this.getNotes();
      } catch (e) {
        console.log(e);
      }
    },
    async getNotes() {
      try{
        this.notes = await fetchNotes();
      } catch (e) {
        console.log(e);
      }
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

