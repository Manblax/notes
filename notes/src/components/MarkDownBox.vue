<template>
  <label class="label">Текст</label>
  <div class="columns">
    <div class="column is-6">
      <div class="field">
        <div class="control">
          <textarea v-model="text" class="textarea" placeholder="Введите текст" required></textarea>
        </div>
      </div>
    </div>
    <div class="column is-6" v-if="text">
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
    propText: {
      type: String,
      default: ''
    },
  },
  emits: ['text-updated'],
  data() {
    return {
      text: this.propText
    }
  },
  computed: {
    compiledMarkdown() {
      return marked(this.text);
    }
  },
  watch: {
    text() {
      this.$emit('text-updated', this.text);
    },
    propText() {
      this.text = this.propText;
    }
  }
}
</script>

<style scoped>

</style>