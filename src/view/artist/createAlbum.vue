<template>
  <div class="container-album">
    <div class="container">
      <img @click="goToIndex" :src="require('/src/assets/x-mark.png')" alt="" />
      <span>Tạo album</span>

      <input type="text" placeholder="Nhập tên album" v-model="albumName" />
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
        <img-crop-album
          v-if="showCropImgStory"
          @crop-complete="handleCropComplete"
          @close="handleCloseCropperStory"
          :visibl="showCropperStory"
        />
        <img class="imgTitle" v-if="imgTitle" :src="imgTitle" alt="" />
      </div>
      <div class="container-select-music">
        <span> Chọn nhạc </span>
        <select
          v-model="selectedMusicId"
          @change="addMusicToPlaylist"
          class="select-music"
        >
          <option v-for="music in mySongs" :key="music.id" :value="music.id">
            {{ music.musicName }}
          </option>
        </select>
      </div>

      <div class="added-songs">
        <h3>Các bài nhạc đã thêm:</h3>
        <ul>
          <li class="container-nameAndButton" v-for="(music, index) in selectedSongs" :key="index">
            <div class="container-music-name">
              <span class="music-name"> {{ music.musicName }} </span>
            </div>
            <button @click="removeSong(index)" class="remove-btn">Xóa</button>
          </li>
        </ul>
      </div>
      <!-- Nút tạo album -->
      <button class="button-createalbum" @click="createAlbum">Tạo album</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import imgCropAlbum from "./components/imgCropAlbum.vue";
export default {
  components: { imgCropAlbum },
  created() {
    this.fetchSongs(); 
  },
  data() {
    return {
      albumName: "", 
      mySongs: [], 
      selectedMusicId: null, 
      selectedSongs: [], 
      albumId: "",
      showCropImgStory: false,
      img: "",
      imgCover: "",
    };
  },
  methods: {
    goToIndex() {
      this.$router.push({ path: "/informationArtist" });
    },
    async fetchSongs() {
      try {
        const artistId = localStorage.getItem("userId"); // Lấy User ID hiện tại
        const response = await fetch(
          `http://localhost:8080/api/music/musicForAlbumByArtist/${artistId}`
        );
        if (response.ok) {
          this.mySongs = await response.json();
        } else {
          console.error("Lỗi tải danh sách bài nhạc.");
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    },
    showCropStory() {
      this.showCropImgStory = true;
    },
    addMusicToPlaylist() {
      const selectedMusic = this.mySongs.find(
        (music) => music.id === this.selectedMusicId
      );

      if (
        selectedMusic &&
        !this.selectedSongs.some((s) => s.id === selectedMusic.id)
      ) {
        this.selectedSongs.push(selectedMusic);
      } else {
        alert("Bài nhạc này đã được thêm.");
      }

      this.selectedMusicId = null;
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
    removeSong(index) {
      this.selectedSongs.splice(index, 1);
    },
    async createAlbum() {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          "http://localhost:8080/api/auth/check-token",
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (response.status === 200) {
          const userId = response.data.userId;
          if (userId == localStorage.getItem("userId")) {
            if (!this.albumName.trim() || this.selectedSongs.length === 0) {
              alert("Vui lòng nhập tên album và chọn ít nhất một bài nhạc.");
              return;
            }
            try {
              const artistId = localStorage.getItem("userId");
              const formData = new FormData();
              formData.append("album_name", this.albumName); // Thêm tên bài hát
              formData.append("img", this.imgCover); // Nếu ảnh từ crop
              formData.append("user_id", artistId);

              const albumIdResponse = await fetch(
                "http://localhost:8080/api/album/createAlbum",
                {
                  method: "POST",
                  body: formData,
                }
              );
              if (!albumIdResponse) {
                throw new Error("Lỗi khi tạo album.");
              }
              this.albumId = await albumIdResponse.json();

              const songUpdates = this.selectedSongs.map((song) => ({
                musicId: song.id,
                albumId: this.albumId,
              }));
              songUpdates.forEach((update, index) => {
                console.log(`Phần tử ${index + 1}:`, update);
             
              });
              const patchResponse = await fetch(
                "http://localhost:8080/api/music/updateAlbumIdforMusic",
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json", 
                  },
                  body: JSON.stringify(songUpdates),
                }
              );

              if (!patchResponse.status == 200) {
                throw new Error("Lỗi khi cập nhật albumId cho các bài nhạc.");
              }

              alert("Album và các bài nhạc đã được cập nhật thành công.");
              this.albumName = "";
              this.selectedSongs = [];
              this.mySongs = [];
              this.$router.push({ path: "/informationArtist" });
            } catch (error) {
              console.error("Lỗi:", error);
              alert(error);
            }
          }
        }
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>


<style scoped>
.container-album {
  height: 1000px;
  justify-items: center;
}
.container {
  margin: 20px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 750px;
  background: #121212;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 10px;
  border: 2px solid #545454;
}
img {
  width: 20px;
  display: block;
  margin: 0 0 0 250px;
  cursor: pointer;
}
.choose-img {
  width: 200px;
  display: flex;
  align-items: center;
}
.input-infomation {
  margin: 10px 0 0 0;
}
.img-add {
  background: #ffffff;
  width: 20px;
  margin: 0 0 0 5px;
  cursor: pointer;
  border-radius: 90px;
  border: 1px solid #ffffff;
}
.added-songs ul {
  list-style: none;
  padding: 0;
  height: 150px;
  width: 250px;
  max-height: 150px; 
  overflow-y: auto;
  border: 1px solid #ccc; 
  margin: 10px 0;
  padding: 5px;
  display: flex;
  flex-direction: column;
}
.imgMusic {
  margin: 0 0 0 5px;
  width: 240px;
  height: 240px;
}
.container-music-name {
  width: 220px;
}
.container-img {
  display: flex;
  align-items: center;
  width: 250px;
  height: 250px;
  margin: 10px 0 0 0px;
  border: 1px solid #ffffff;
}
.music-name {
  width: 240px;
}
li {
  font-size: 13px;
  text-align: left;
  padding: 2px 0 0 0;
  display: flex;
  flex-direction: row;
  height: 20px;
  width: 250px;
}
input {
  width: 200px;
  height: 30px;
  border: 1px solid #4e4b4b;
  border-radius: 5px;
  padding: 0 0 0 10px;
  margin: 10px 0 0 0;
  background: #121212;
  color: #ffffff;
}
.container-nameAndButton{
  display: flex;
  align-content: center;
}
.container-select-music {
  margin: 10px 0 0 0;
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 250px;
}
.select-music {
  margin: 10px 0 0 0;
}
.imgTitle {
  margin: 5px 0 0 0;
  height: 200px;
  width: 100px;
  border-radius: 10px;
}
input:hover {
  background: #211d1d;
}
input:focus {
  background-color: #000000;
  border: 1px solid #ffffff;
  outline: none;
}
.remove-btn {
  border: 1px solid #545454;
  font-size: 10px;
  border-radius: 2px;
  height: 20px;
  margin: -5px 0 0 0 ;
}
.button-createalbum {
  margin: 10px 0 0 0;
  height: 30px;
  width: 210px;
  border-radius: 5px;
  border: 1px solid #000000;
  background: #0e6e11;
}
.button-createalbum:hover {
  background: #2e9c32;
}
.button-createalbum:active {
  background: #0e6e11;
}
</style>