<template>
  <label class="label">Текст</label>
  <div class="columns">
    <div class="column is-6">
      <div class="field">
        <div class="control">
          <textarea :value="desc" @input="onInput" class="textarea" placeholder="Введите текст" required></textarea>
        </div>
      </div>
    </div>
    <div class="column is-6" v-if="desc">
      <div class="box">
        <div v-html="compiledMarkdown" class="content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import marked from "marked/lib/marked.esm";

export default {
  name: "MarkDownBox",
  props: {
    desc: {
      type: String,
      default: ''
    },
  },
  emits: ['update:desc'],
  computed: {
    compiledMarkdown() {
      return marked(this.desc);
    }
  },
  methods: {
    onInput(event) {
      this.$emit('update:desc', event.target.value);
    }
  },
}
</script>

<style scoped>

</style>