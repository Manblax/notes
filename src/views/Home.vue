<template>
  <div class="container is-max-desktop">
    <NavBar></NavBar>
    <h1 class="title is-1 mt-4">Список заметок</h1>
    <ul class="mt-3" v-if="notes.length">
      <li v-for="note in notes" :key="note.id" class="notification">
        <figure class="image is-48x48">
          <img src="https://bulma.io/images/placeholders/48x48.png">
        </figure>
        <button class="delete"></button>
        <div v-html="compiledMarkdown(note.text)" class="content mt-3"></div>
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
  </div>
</template>

<script>
// const notes = [{
//   text: `Lorem ipsum dolor sit amet, consectetur
//       adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec
//       nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a>
//       efficitur.`
// }, {text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias beatae, consequatur consequuntur, delectus deserunt doloribus enim est exercitationem fugiat maxime necessitatibus praesentium quas quibusdam sit! Adipisci alias, aliquam aliquid commodi deleniti dolores eaque facere incidunt ipsa iste itaque iure maiores, maxime molestiae molestias mollitia nisi reiciendis suscipit velit vitae.`},
//   {text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, asperiores aspernatur consectetur doloremque eius impedit maxime pariatur porro possimus quod temporibus ullam? Animi doloribus eaque magnam, nesciunt pariatur suscipit voluptates!`}]

import {fetchNotes} from "../api";
import NavBar from "@/components/NavBar";
import marked from "marked/lib/marked.esm";

export default {
  name: 'Home',
  components: {
    NavBar
  },
  data() {
    return {
      notes: []
    }
  },
  methods: {
    compiledMarkdown(text) {
      return marked(text);
    },
    formatDate(timestamp) {
      if (!timestamp) return;
      const formatter = new Intl.DateTimeFormat("ru", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      });

      return formatter.format(timestamp);
    }
  },
  created() {
    this.notes = fetchNotes();
  },
}
</script>

