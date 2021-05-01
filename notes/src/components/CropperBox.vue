<template>
  <div>
    <input
        ref="input"
        type="file"
        name="image"
        accept="image/*"
        @change="setImage"
    />

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
          <button type="button" class="button is-link is-small mr-4 mb-4" @click="getData">
            Get Data
          </button>
          <button type="button" class="button is-link is-small mr-4 mb-4" @click="setData">
            Set Data
          </button>
          <button type="button" class="button is-link is-small mr-4 mb-4" @click="getCropBoxData">
            Get CropBox Data
          </button>
          <button type="button" class="button is-link is-small mr-4 mb-4" @click="setCropBoxData">
            Set CropBox Data
          </button>
          <button type="button" class="button is-link is-small mr-4 mb-4" @click="showFileChooser">
            Upload Image
          </button>
        </div>

        <textarea v-model="data" class="textarea"/>
      </section>
      <section>
        <p class="is-size-5">Предосмотр</p>
        <div class="preview"/>
        <p class="is-size-5 mt-4">Результат</p>
        <div class="cropped-image">
          <img
              v-if="cropImg"
              :src="cropImg"
              alt="Cropped Image"
          />
          <div v-else class="crop-placeholder"/>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
  name: "CropperBox",
  components: {
    VueCropper,
  },
  props: {
    src: {
      type: String,
      default: 'https://bulma.io/images/placeholders/256x256.png'
    }
  },
  data() {
    return {
      imgSrc: this.src,
      cropImg: '',
      data: null,
    };
  },
  methods: {
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.$emit('cropped', this.cropImg);
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
    getCropBoxData() {
      this.data = JSON.stringify(this.$refs.cropper.getCropBoxData(), null, 4);
    },
    getData() {
      this.data = JSON.stringify(this.$refs.cropper.getData(), null, 4);
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
    setCropBoxData() {
      if (!this.data) return;
      this.$refs.cropper.setCropBoxData(JSON.parse(this.data));
    },
    setData() {
      if (!this.data) return;
      this.$refs.cropper.setData(JSON.parse(this.data));
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
      };
      reader.readAsDataURL(file);
    },
    showFileChooser() {
      this.$refs.input.click();
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
body {
  font-family: Arial, Helvetica, sans-serif;
  width: 1024px;
  margin: 0 auto;
}

input[type="file"] {
  display: none;
}

.content {
  display: grid;
  justify-content: space-between;
  grid-template-columns: 614px 307px;
  grid-gap: 40px;
}

.actions {
  margin-top: 1rem;
}

.textarea {
  width: 100%;
  height: 100px;
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

.cropped-image img {
  max-width: 100%;
}
</style>