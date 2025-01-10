<template>
  <div class="container">
    <!-- Hình nền -->
    <img class="img-z02" :src="require('@/assets/z02.png')" alt="" />

    <div class="container-story">
      <span class="title">Đăng tin của riêng bạn</span>

      <!-- Chọn ảnh -->
      <div class="input-infomation">
        <div class="choose-img">
          <span>Chọn ảnh</span>
          <img
            class="img-add"
            @click="showCropStory"
            :src="require('@/assets/add3.png')"
          />
          <imgCropStory
            v-if="showCropImgStory"
            @crop-complete="handleCropComplete"
            @close="handleCloseCropperStory"
            :visibl="showCropperStory"
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
      </div>

      <!-- Nhập tiêu đề -->
      <div class="input-infomation">
        <span>Tiêu đề tin</span>
        <input
          v-model="titleStory"
          class="input-music"
          type="text"
          placeholder="Nhập tiêu đề"
        />
      </div>

      <!-- Chọn và cắt nhạc -->
      <div class="input-infomation">
        <span>Chọn nhạc</span>
        <div class="music-uploader">
          <!-- Danh sách bài nhạc -->
          <div class="input-infomation1">
            <span>Chọn bài nhạc</span>
            <select
              v-model="selectedMusicId"
              @change="onMusicSelect"
              class="select-music"
            >
              <option
                v-for="music in mySongs"
                :key="music.id"
                :value="music.id"
              >
                {{ music.musicName }}
              </option>
            </select>
          </div>

          <!-- Component Audio Cutter -->
          <div class="music-cutter" v-if="selectedMusicFile">
            <span>Cắt nhạc:</span>
            <audio-cutter
              ref="audioCutter"
              :file="selectedMusicFile"
              @on-save="handleCutMusicSave"
            />
          </div>
        </div>
      </div>
      <!-- Nút tạo tin -->
      <button @click="saveMusic" class="btn-createStory">Tạo tin</button>
    </div>
  </div>
</template>
<script>
import AudioCutter from "/src/view/artist/components/AudioCutter.vue"; // Component xử lý cắt nhạc
import imgCropStory from "/src/view/artist/components/ImageCropStory.vue";
export default {
  components: {
    imgCropStory,
    AudioCutter,
  },
  data() {
    return {
      img: "",
      cutSegment: null, // Lưu đoạn nhạc được cắt
      showCropImgStory: false,
      selectedFile: null, // File nhạc được chọn
      titleStory: "", // Tên bài nhạc
      imgCover: "", // Ảnh bìa
      mySongs: [], // Danh sách nhạc từ backend
      selectedMusicId: null, // ID bài nhạc được chọn
      selectedMusicFile: null, // File bài nhạc sau khi tải xuống từ backend
      ffmpeg: null, // FFmpeg instance
    };
  },
  created() {
    // this.loadFFmpeg(); // Load FFmpeg khi component được tạo
    this.fetchSongs(); // Tải danh sách bài nhạc khi tải trang
  },
  methods: {
    async fetchSongs() {
      try {
        const artistId = localStorage.getItem("userId"); // Lấy User ID hiện tại
        const response = await fetch(
          `http://localhost:8080/api/music/artist-songs/${artistId}`
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

    // Khi chọn bài nhạc
    async onMusicSelect() {
      const selectedSong = this.mySongs.find(
        (song) => song.id === this.selectedMusicId
      );
      if (selectedSong) {
        try {
          const userId = localStorage.getItem("userId");
          const response = await fetch(
            `http://localhost:8080/api/music/downloadAudioMusicByMusicId/${selectedSong.id}`
          );
          if (response.ok) {
            const blob = await response.blob(); // Nhận file bài nhạc từ backend
            this.selectedMusicFile = blob; // Gắn file vào trình cắt nhạc

            // Cập nhật bài nhạc cho Audio Cutter component
            this.$nextTick(() => {
              this.$refs.audioCutter &&
                this.$refs.audioCutter.updateFile(
                  blob,
                  selectedSong.id,
                  this.titleStory,
                  this.imgCover,
                  userId
                );
            });
          } else {
            alert("Lỗi tải bài nhạc.");
          }
        } catch (error) {
          console.error("Error downloading song:", error);
        }
      }
    },

    showCropStory() {
      this.showCropImgStory = true;
    },

    // Đóng màn hình crop ảnh khi xong
    // handleCropComplete(croppedImage) {
    //   this.imgCover = croppedImage;
    //   this.showCropImgStory = false;
    // },

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
      this.showCropImgStory = false;
    },

    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
      }
    },

    // Đóng màn hình crop nếu không lưu ảnh
    handleCloseCropperStory() {
      this.showCropImgStory = false;
    },
  },
};
</script>

<style scoped>
.container {
  background: #ffffff;
  height: 1200px;
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
.container-img {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 320px;
  margin: 10px 0 0 0px;
  border: 1px solid #000000;
}
.select-music {
  margin: 0 0 0 20px;
}
.imgMusic {
  width: 150px;
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