<template>
  <div class="container is-max-desktop">
    <NavBar></NavBar>
    <h1 class="title is-1 mt-4">Редактировать заметку</h1>
    <form @submit.prevent="editNote" class="box">
      <div class="file has-name mb-4">
        <label class="file-label">
          <input class="file-input" type="file" name="resume" @change="onChange">
          <span class="file-cta">
            <span class="file-label">
              Выберите файл
            </span>
          </span>
          <span class="file-name">
            {{ note.filename }}
          </span>
        </label>
      </div>
      <figure v-if="note.src" class="image is-128x128">
        <img :src="note.src" alt="thumbnail">
      </figure>
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
      note: {
        text: '',
        file: '',
        filename: 'Файл не выбран',
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
    setThumbnail(event) {
      if (event.target.files) {
        const file = event.target.files[0];

        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.addEventListener('load', () => {
          this.src = reader.result;
        });

        reader.addEventListener('error', () => {
          console.log('Ошибка при загрузке файла')
        });
      }
    },
    onChange(event) {
      this.changeFileName(event);
      this.setThumbnail(event);
    },
    changeFileName(event) {
      this.note.filename = event.target.value.split('\\').pop() || 'Файл не выбран';
    }
  },
  created() {
    this.getNote();
  }
}
</script>
