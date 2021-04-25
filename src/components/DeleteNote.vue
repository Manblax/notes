<template>
  <vue-final-modal
      v-model="showModal"
      name="delete-note"
      classes="modal-container"
      content-class="modal-content"
      @beforeOpen="getParamsData"
  >
    <button @click="hide" type="button" class="delete modal__close"></button>
    <span class="modal__title">
      Вы уверены что хотите удалить заметку {{ truncatedTitle }} ?
    </span>
    <div class="modal__content">

    </div>
    <div class="modal__action">
      <button class="button is-small is-primary mr-4" @click="deleteNoteHandler">Да</button>
      <button class="button is-small" @click="hide">Нет</button>
    </div>

  </vue-final-modal>
</template>

<script>

export default {
  name: "DeleteNote",
  data() {
    return {
      showModal: false,
      id: '',
      title: '',
    }
  },
  computed: {
    truncatedTitle() {
      return this.title.length > 30 ? this.title.slice(0, 30) + '...' : this.title;
    }
  },
  methods: {
    hide() {
      this.$modal.hide('delete-note');
    },
    deleteNoteHandler() {
      this.$emit('delete-note', this.id);
      this.$modal.hide('delete-note');
    },
    getParamsData(event) {
      this.id = event.ref.params.value.id;
      this.title = event.ref.params.value.title;
    }
  },
  mounted() {
    //this.$modal.show('delete-note');
  }
}
</script>

<style scoped>
::v-deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep(.modal-content) {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}

.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.modal__content {
  flex-grow: 1;
  overflow-y: auto;
}

.modal__action {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}

.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

</style>

