<template>
  <div class="file has-name">
    <label class="file-label">
      <input class="file-input" type="file" name="file" accept="image/*" @change="changeFileName">
      <span class="file-cta">
        <span class="file-label">
          <slot>Выберите файл</slot>
        </span>
      </span>
      <span class="file-name">{{ filename }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: "FileInput",
  emits: ['file-changed'],
  data() {
    return {
      filename: 'Файл не выбран',
    }
  },
  methods: {
    changeFileName(event) {
      this.filename = event.target.value.split('\\').pop() || 'Файл не выбран';
      this.$emit('file-changed', event);
    },
  }
}
</script>

<style scoped>
.file-label {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>