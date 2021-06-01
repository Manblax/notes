<template>
  <div>
    <div class="content">
      <section>
        <div class="img-cropper">
          <vue-cropper
              ref="cropper"
              :aspect-ratio="NaN"
              :src="imgSrc"
              preview=".preview"
          />
        </div>
        <div class="actions">
          <button type="button" class="button is-link is-small mr-4 mb-4" @click="zoom(0.2)">
            Zoom In
          </button>
          <button type="button" class="button is-link is-small mr-4 mb-4" @click="zoom(-0.2)">
            Zoom Out
          </button>
          <button type="button" class="button is-link is-small mr-4 mb-4" @click="move(-10, 0)">
            Move Left
          </button>
          <button type="button" class="button is-link is-small mr-4 mb-4" @click="move(10, 0)">
            Move Right
          </button>
          <button type="button" class="button is-link is-small mr-4 mb-4" @click="move(0, -10)">
            Move Up
          </button>
          <button type="button" class="button is-link is-small mr-4 mb-4" @click="move(0, 10)">
            Move Down
          </button>
          <button type="button" class="button is-link is-small mr-4 mb-4" @click="rotate(90)">
            Rotate +90deg
          </button>
          <button type="button" class="button is-link is-small mr-4 mb-4" @click="rotate(-90)">
            Rotate -90deg
          </button>
          <button type="button" class="button is-link is-small mr-4 mb-4" ref="flipX" @click="flipX">
            Flip X
          </button>
          <button type="button" class="button is-link is-small mr-4 mb-4" ref="flipY" @click="flipY">
            Flip Y
          </button>
          <button type="button" class="button is-link is-small mr-4 mb-4" @click="cropImage">
            Crop
          </button>
          <button type="button" class="button is-link is-small mr-4 mb-4" @click="reset">
            Reset
          </button>
        </div>
        <FileInput @file-changed="setImage"  class="mt-4"></FileInput>

      </section>
      <section>
        <p class="is-size-5">Предосмотр</p>
        <div class="preview"/>
        <p class="is-size-5 mt-4">Результат</p>
        <div>
          <img
              v-if="cropImg"
              :src="cropImg"
              class="cropped-image"
              alt="Cropped Image"
          />
          <div v-else class="crop-placeholder"/>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import FileInput from "./FileInput";
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
  name: "CropperBox",
  components: {
    VueCropper,
    FileInput
  },
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      imgSrc: this.src,
      cropImg: '',
      fileName: '',
    };
  },
  methods: {
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      console.log('this.cromImg', this.cropImg)
      this.$emit('cropped', {src: this.cropImg, name: this.fileName});
    },
    flipX() {
      const dom = this.$refs.flipX;
      let scale = dom.getAttribute('data-scale');
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleX(scale);
      dom.setAttribute('data-scale', scale);
    },
    flipY() {
      const dom = this.$refs.flipY;
      let scale = dom.getAttribute('data-scale');
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleY(scale);
      dom.setAttribute('data-scale', scale);
    },
    move(offsetX, offsetY) {
      this.$refs.cropper.move(offsetX, offsetY);
    },
    reset() {
      this.$refs.cropper.reset();
    },
    rotate(deg) {
      this.$refs.cropper.rotate(deg);
    },
    setImage(e) {
      const file = e.target.files[0];
      if (file.type.indexOf('image/') === -1) {
        alert('Please select an image file');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        this.imgSrc = event.target.result;
        // rebuild cropperjs with the updated source
        this.$refs.cropper.replace(event.target.result);
        this.fileName = e.target.files[0].name;
        this.$emit('cropped', {src: this.imgSrc, name: this.fileName});
      };
      reader.readAsDataURL(file);
    },
    zoom(percent) {
      this.$refs.cropper.relativeZoom(percent);
    },
  },
  watch: {
    src() {
      this.imgSrc = this.src;
      this.$refs.cropper.replace(this.imgSrc);
    }
  }
};
</script>

<style scoped>
.content {
  display: grid;
  justify-content: space-between;
  grid-template-columns: 614px 307px;
  grid-gap: 40px;
}

.actions {
  margin-top: 1rem;
}

.preview {
  width: 100%;
  height: calc(372px * (9 / 16));
  overflow: hidden;
}

.crop-placeholder {
  width: 100%;
  height: 200px;
  background: #ccc;
}

</style>