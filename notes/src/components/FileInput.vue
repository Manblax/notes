<template>
  <div class="file has-name">
    <label class="file-label">
      <input class="file-input" type="file" name="resume" accept="image/*" @change="changeFileName">
      <span class="file-cta">
        <span class="file-label">
          <slot></slot>
        </span>
      </span>
      <span class="file-name">
        {{ filename }}
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: "FileInput",
  data() {
    return {
      filename: '',
    }
  },
  methods: {
    changeFileName(event) {
      this.filename = event.target.value.split('\\').pop() || 'Файл не выбран';
      this.$emit('file-changed', event.target.files);
    },
  }
}
</script>

<style scoped>

</style>