<template>
  <div class="container is-max-widescreen">
    <NavBar></NavBar>
    <h1 class="title is-1 mt-4">Создать заметку</h1>
    <form @submit.prevent="createNote" class="box">
      <CropperBox @cropped="changeSrc"></CropperBox>
      <div class="file has-name mb-4">
        <label class="file-label">
          <input class="file-input" type="file" name="resume" @change="onChange">
          <span class="file-cta">
            <span class="file-label">
              Выберите файл
            </span>
          </span>
          <span class="file-name">
            {{ filename }}
          </span>
        </label>
      </div>
      <figure v-if="src" class="image is-128x128">
        <img :src="src" alt="thumbnail">
      </figure>
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <textarea v-model="text" class="textarea" placeholder="Note" required></textarea>
        </div>
      </div>
      <div class="box">
        <div v-html="compiledMarkdown" class="content"></div>
      </div>
      <button type="submit" class="button is-link">Создать</button>
    </form>
  </div>
</template>

<script>

import marked from "marked/lib/marked.esm";
import {sendNote} from "../api";
import NavBar from "../components/NavBar";
import CropperBox from "../components/CropperBox";

export default {
  name: 'CreateNote',
  components: {
    NavBar,
    CropperBox
  },
  data() {
    return {
      text: '',
      file: '',
      filename: 'Выберите файл',
      src: '',
    }
  },
  computed: {
    compiledMarkdown() {
      return marked(this.text);
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
        const result = await sendNote(note);
        console.log('result', result)
        await this.$router.push({name: 'Home'});
      } catch (e) {
        console.error(e);
      }
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
      this.filename = event.target.value.split('\\').pop() || 'Файл не выбран';
    },
    changeSrc(src) {
      console.log('$event', src)
      this.src = src;
    }
  }
}
</script>
