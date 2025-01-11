<template>
  <div class="container">
    <div class="container-story">
      <span class="title"> Tạo playlist </span>
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

        <image-crop-playlist
          v-if="showCropImgStory"
          @crop-complete="handleCropComplete"
          @close="handleCloseCropperStory"
          :visibl="showCropperStory"
        />
        <img class="imgTitle" v-if="imgTitle" :src="imgTitle" alt="" />
      </div>
      <div class="input-infomation">
        <span>Tên playlist</span>
        <input
          v-model="playlist_name"
          class="input-music"
          type="text"
          placeholder="Nhập tên playlist"
        />
      </div>
      <button @click="saveMusic" class="btn-createStory">Tạo playlist</button>
    </div>
  </div>
</template>

<script>
import ImageCropPlaylist from "./components/ImageCropPlaylist.vue";
export default {
  components: {
    ImageCropPlaylist,
  },

  data() {
    return {
      showCropImgStory: false,
      selectedFile: null, // File nhạc được chọn
      playlist_name: "", // Tên bài nhạc
      img: "",
      imgCover: "",
      genres: [],
      genreId: "",
      selectedGenre: "",
    };
  },
  methods: {
    onGenreChange() {
      this.genreId = this.selectedGenre;
    },
    async saveMusic() {
      if (!this.imgCover || !this.playlist_name) {
        alert("Vui lòng chọn đầy đủ thông tin.");
        return;
      }
      const artistId = localStorage.getItem("userId");
      // const payload = {
      //   playlist_name: this.playlist_name,
      //   img: this.imgCover,
      //   user_id: artistId, // Ép kiểu thành số
      // };
      const formData = new FormData();

      formData.append("playlist_name", this.playlist_name);
      formData.append("user_id", artistId);
      formData.append("image", this.imgCover); // Lưu file ảnh đã crop

      alert(this.playlist_name);
      alert(this.imgCover);
      alert(artistId);

      try {
        const response = await fetch(
          "http://localhost:8080/api/playlist/createPlaylist",
          {
            method: "POST",
            body: formData, 
          }
        );

        if (response.ok) {
          alert("Playlist created successfully!");
          this.$router.push({ path: "/informationArtist" });
        } else {
          const errorMessage = await response.text();
          alert(`Upload failed: ${errorMessage}`);
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
      const byteString = atob(croppedImg.split(",")[1]); 
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([uint8Array], { type: "image/png" }); 
      const file = new File([blob], "cropped-image.png", { type: "image/png" });
      this.imgCover = file;
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
  margin: 50px 0 0 0;
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