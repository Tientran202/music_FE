<template>
  <div class="container">
    <img class="img-z02" :src="require('/src/assets/z02.png')" alt="" />
    <div class="container-story">
      <span class="title"> Tạo tin của riêng bạn </span>
      <div class="input-infomation">
        <div class="choose-img">
          <span>Chọn ảnh </span>
          <img
            class="img-add"
            @click="showCropStory"
            :src="require('/src/assets/add3.png')"
          />
        </div>
        <img
          class="imgStory"
          v-if="croppedImageStory"
          :src="croppedImageStory"
          alt="Cropped Image"
        />
        <imgCropStory
          v-if="showCropImgStory"
          @crop-complete="handleCropComplete"
          @close="handleCloseCropperStory"
          :visibl="showCropperStory"
        />
        <img class="imgTitle" v-if="imgTitle" :src="imgTitle" alt="" />
      </div>
      <div class="input-infomation">
        <span>Tiêu đề</span>
        <input type="text" placeholder="Nhập tiêu đề" />
      </div>
      <div class="input-infomation">
        <span>Chọn nhạc</span>
        <div class="music-uploader">
          <input type="file" @change="onFileChange" accept="audio/mp3" />
          <p v-if="musicName">Selected: {{ musicName }}</p>
        </div>
      </div>
      <button class="btn-createStory">Tạo tin</button>
    </div>
  </div>
</template>
<style scoped>
.container {
  background: #ffffff;
  height: 750px;
  display: flex;
  align-items: center;
  color: #000000;
  font-family: Arial, Helvetica, sans-serif;
}
.img-z02 {
  width: 150px;
  margin: 50px 0 0 0;
}
.container-story {
  margin: 20px 0 0 0;
  width: 400px;
  display: flex;
  flex-direction: column;
  border: 2px solid #000000;
  border-radius: 10px;
}
.imgStory {
  width: 150px;
  height: 300px;
  margin: 10px 0 0 0;
}
.title {
  margin: 10px 0 0 10px;
  font-weight: bold;
  font-size: 15px;
}
.choose-img {
  display: flex;
  align-items: center;
}
.img-add {
  width: 20px;
  margin: 0 0 0 5px;
  cursor: pointer;
}
.imgTitle {
  margin: 5px 0 0 0;
  height: 200px;
  width: 100px;
  border-radius: 10px;
}
span {
  font-size: 13px;
}
.input-infomation {
  display: flex;
  flex-direction: column;
  margin: 10px 0 0 10px;
}
input {
  margin: 5px 0 0 0;
  height: 35px;
  width: 250px;
  padding: 0 0 0 10px;
  border-radius: 5px;
  border: 2px solid #000000;
}
.btn-choose-music {
  width: 80px;
  height: 20px;
  font-size: 12px;
  border: 1px solid #000000;
  border-radius: 2px;
}
.name-music {
  margin: 0 0 0 10px;
}
button {
  cursor: pointer;
}

.btn-createStory {
  width: 200px;
  height: 30px;
  margin: 10px 0 10px 100px;
  border: 2px solid;
  border-radius: 5px;
}
.btn-createStory:hover {
  background: #ccc8c8;
}
</style>
<script>
import imgCropStory from "/src/components/imgCropStory.vue";
export default {
  components: {
    imgCropStory,
  },
  data() {
    return {
      croppedImageStory: require("@/assets/mtp.jpeg"),
      showCropImgStory: false,
      selectedFile: null, // File nhạc được chọn
      musicName: "", // Tên bài nhạc
    };
  },
  methods: {
    showCropStory() {
      this.showCropImgStory = true;
    },
    handleCloseCropperStory() {
      this.showCropImgStory = false;
    },
    handleCropComplete(croppedImageStory) {
      this.croppedImageStory = croppedImageStory;
      this.showCropperComponent = false;
    },

    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.musicName = file.name; // Hiển thị tên bài nhạc
      }
    },
    // async uploadMusic() {
    //   if (!this.selectedFile) {
    //     alert("Please select a music file!");
    //     return;
    //   }

    //   const formData = new FormData();
    //   formData.append("file", this.selectedFile);

    //   try {
    //     const response = await fetch("http://localhost:8080/api/upload-music", {
    //       method: "POST",
    //       body: formData,
    //     });
    //     if (response.ok) {
    //       alert("Music uploaded successfully!");
    //     } else {
    //       alert("Upload failed!");
    //     }
    //   } catch (error) {
    //     console.error("Error uploading music:", error);
    //   }
    // },
  },
};
</script>