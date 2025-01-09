<template>
  <div class="container">
    
    <img class="img-z02" :src="require('/src/assets/z02.png')" alt="" />
    <div class="container-story">
      
      <span class="title"> Đăng nhạc của riêng bạn </span>
      <div class="input-infomation">
        <div class="choose-img">
          <span>Chọn ảnh </span>
          <img
            class="img-add"
            @click="showCropStory"
            :src="require('/src/assets/add3.png')"
          />
        </div>
        <div class="container-img">
          <img
            class="imgMusic"
            v-if="imgCover"
            :src="img"
            alt="Cropped Image"
          />
        </div>

        <imgCropMusic
          v-if="showCropImgStory"
          @crop-complete="handleCropComplete"
          @close="handleCloseCropperStory"
          :visibl="showCropperStory"
        />
        <img class="imgTitle" v-if="imgTitle" :src="imgTitle" alt="" />
      </div>
      <div class="input-infomation">
        <span>Tên bài hát</span>
        <input
          v-model="musicName"
          class="input-music"
          type="text"
          placeholder="Nhập tên bài hát"
        />
      </div>
      <div class="container-select-genre">
        <span class="select-genre">Thể loại</span>
        <select
          v-model="selectedGenre"
          @change="onGenreChange"
          class="genre-select"
        >
          <option v-for="genre in genres" :key="genre.id" :value="genre.id">
            {{ genre.genre }}
          </option>
        </select>
      </div>

      <div class="input-infomation">
        <span>Chọn nhạc</span>
        <div class="music-uploader">
          <input
            class="choose-music"
            type="file"
            @change="onFileChange"
            accept="audio/mp3"
          />
        </div>
      </div>
      <button @click="saveMusic" class="btn-createStory">Tạo bài nhạc</button>
    </div>
  </div>
</template>

<script>
import imgCropMusic from "/src/view/artist/components/imgCropMusic.vue";
export default {
  components: {
    imgCropMusic,
  },
  created() {
    this.fetchGenres();
  },
  data() {
    return {
      showCropImgStory: false,
      selectedFile: null, // File nhạc được chọn
      musicName: "", // Tên bài nhạc
      img: "",
      imgCover: "",
      genres: [],
      genreId: "",
      selectedGenre: "",
      // Dữ liệu ảnh bìa đã crop
    };
  },
  methods: {
    async fetchGenres() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/genre/getAllGenre`
        );
        if (response.ok) {
          this.genres = await response.json();
        } else {
          console.error("Lỗi khi tải danh sách thể loại.");
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    },
    onGenreChange() {
      this.genreId = this.selectedGenre;
    },
    async saveMusic() {
      if (!this.selectedFile || !this.imgCover || !this.musicName) {
        alert("Vui lòng chọn đầy đủ thông tin (bài hát và ảnh bìa).");
        return;
      }
      const artistId = localStorage.getItem("userId");
      const formData = new FormData();
      formData.append("genreId", this.genreId); // Thêm file bài hát
      formData.append("file", this.selectedFile); // Thêm file bài hát
      formData.append("music_name", this.musicName); // Thêm tên bài hát
      formData.append("img", this.imgCover); // Nếu ảnh từ crop
      formData.append("artist_id", artistId);

      try {
        const response = await fetch(
          "http://localhost:8080/api/music/upload-music",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          alert("Music uploaded successfully!");
          this.$router.push({ path: "/informationArtist" });
        } else {
          alert("Upload failed!");
        }
      } catch (error) {
        console.error("Error uploading music:", error);
        alert("Có lỗi xảy ra khi tải bài hát lên.");
      }
    },
    showCropStory() {
      this.showCropImgStory = true;
    },
    handleCloseCropperStory() {
      this.showCropImgStory = false;
    },
    handleCropComplete(croppedImg) {
      this.img = croppedImg;
      // Nếu ảnh được trả về là base64 (string), ta cần tạo một tệp từ base64
      const byteString = atob(croppedImg.split(",")[1]); // Loại bỏ phần prefix của base64 (data:image/png;base64,)
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([uint8Array], { type: "image/png" }); // Chọn kiểu ảnh tùy thuộc vào định dạng thực tế của ảnh
      const file = new File([blob], "cropped-image.png", { type: "image/png" });
      this.imgCover = file; // Lưu tệp vào imgCover thay vì base64
    },

    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
      }
    },
  },
};
</script>
<style scoped>
.container {
  background: #ffffff;
  height: 1000px;
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
.container-select-genre {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 10px 0 0 10px;
}
.select-genre {
  padding: 0 0 5px 0;
}
.genre-select {
  width: 265px;
}
.container-img {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 320px;
  height: 320px;
  margin: 10px 0 0 0px;
  border: 1px solid #000000;
}
.imgMusic {
  width: 300px;
  height: 300px;
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
  text-align: left;
  flex-direction: column;
  margin: 10px 0 0 10px;
}
.input-music {
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