<template>
  <div class="cropper-container">
    <button @click="closeFileChooser" class="close-button">Close</button>
    <input type="file" @change="onFileChange" accept="image/*" />
    <div v-if="imageSrc" class="cropper-wrapper">
      <button @click="cropImage" class="confirm-button">Crop & Confirm</button>
      <button @click="cancelCrop" class="cancel-button">Cancel</button>
      <img ref="cropperImage" :src="imageSrc" alt="To be cropped" />
    </div>
  </div>
</template>
<script>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
export default {
  props: {
    visibl: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      imageSrc: null,
      cropper: null,
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageSrc = reader.result;
          this.initializeCropper();
        };
        reader.readAsDataURL(file);
      }
    },
    initializeCropper() {
      this.$nextTick(() => {
        const imageElement = this.$refs.cropperImage;
        if (imageElement) {
          if (this.cropper) {
            this.cropper.destroy();
          }
          this.cropper = new Cropper(imageElement, {
            aspectRatio: 1 / 2,
            viewMode: 1,
            dragMode: "move",
            cropBoxResizable: true,
          });
        }
      });
    },
    cropImage() {
      if (this.cropper) {
        const canvas = this.cropper.getCroppedCanvas({
          width: 400,
          height: 800,
        });
        const croppedImage = canvas.toDataURL("image/png");
        this.$emit("crop-complete", croppedImage);
        this.imageSrc = null;
        this.cropper.destroy();
      }
      this.$emit("close");
    },
    cancelCrop() {
      this.imageSrc = null;
      if (this.cropper) {
        this.cropper.destroy();
      }
      this.$emit("crop-cancelled");
    },
    closeFileChooser() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.cropper-container {
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: 80%;
  max-width: 600px;
  max-height: 80%;
  overflow: auto;
}

.cropper-wrapper {
  position: relative;
}

.confirm-button {
  position: absolute;
  top: 10px;
  left:35%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  z-index: 10;
}
.cancel-button {
  position: absolute;
  top: 10px;
  left: 70%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  z-index: 10;
}

.confirm-button:hover {
  background-color: #45a049;
}

.cancel-button {
  background-color: #f44336;
}

.cancel-button:hover {
  background-color: #e53935;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
  background-color: #555;
  color: white;
  border: none;
  cursor: pointer;
  z-index: 10;
}

.close-button:hover {
  background-color: #333;
}

img {
  display: block;
  width: 100%;
}
</style>
