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
            :src="imgCover"
            alt="Cropped Image"
          />
        </div>
      </div>

      <!-- Nhập tiêu đề -->
      <div class="input-infomation">
        <span>Tiêu đề tin</span>
        <input
          v-model="musicName"
          class="input-music"
          type="text"
          placeholder="Nhập tên bài hát"
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
import { FFmpeg } from "@ffmpeg/ffmpeg";

// FFmpeg for handling music cutting

export default {
  components: {
    imgCropStory,
    AudioCutter,
  },
  data() {
    return {
      cutSegment: null, // Lưu đoạn nhạc được cắt
      showCropImgStory: false,
      selectedFile: null, // File nhạc được chọn
      musicName: "", // Tên bài nhạc
      imgCover: "", // Ảnh bìa
      mySongs: [], // Danh sách nhạc từ backend
      selectedMusicId: null, // ID bài nhạc được chọn
      selectedMusicFile: null, // File bài nhạc sau khi tải xuống từ backend
      ffmpeg: null, // FFmpeg instance
    };
  },
  created() {
    this.loadFFmpeg(); // Load FFmpeg khi component được tạo
    this.fetchSongs(); // Tải danh sách bài nhạc khi tải trang
  },
  methods: {
    // Tải FFmpeg vào bộ nhớ
    async loadFFmpeg() {
      try {
        // Kiểm tra nếu FFmpeg chưa được khởi tạo
        if (!this.ffmpeg) {
          this.ffmpeg = FFmpeg.createFFmpeg({ log: true }); // Khởi tạo FFmpeg nếu chưa có
        }
        await this.ffmpeg.load(); // Tải FFmpeg vào bộ nhớ
        console.log("FFmpeg loaded successfully.");
      } catch (error) {
        console.error("Error loading FFmpeg:", error);
      }
    },

    // Fetch danh sách bài hát từ backend
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
          const response = await fetch(
            `http://localhost:8080/api/music/downloadAudioMusicByMusicId/${selectedSong.id}`
          );
          if (response.ok) {
            const blob = await response.blob(); // Nhận file bài nhạc từ backend
            this.selectedMusicFile = blob; // Gắn file vào trình cắt nhạc

            // Cập nhật bài nhạc cho Audio Cutter component
            this.$nextTick(() => {
              this.$refs.audioCutter && this.$refs.audioCutter.updateFile(blob);
            });
          } else {
            alert("Lỗi tải bài nhạc.");
          }
        } catch (error) {
          console.error("Error downloading song:", error);
        }
      }
    },

    // Lưu đoạn nhạc đã cắt
    async handleCutMusicSave(segment) {
      const { file, start, end } = segment;

      const cutAudioFile = await this.cutAudio(file, start, end);

      if (cutAudioFile) {
        alert("Cắt nhạc thành công");
        console.log("File cắt:", cutAudioFile);
        // Thực hiện xử lý thêm như upload file đã cắt lên backend
      } else {
        alert("Cắt nhạc không thành công");
      }
    },

    async cutAudio(file, start, end) {
      try {
        // Kiểm tra FFmpeg có được tải không
        if (!this.ffmpeg || !this.ffmpeg.isLoaded()) {
          console.error("FFmpeg is not loaded.");
          return null;
        }

        console.log("Tải file audio...");
        const fileData = await fetch(URL.createObjectURL(file))
          .then((response) => response.arrayBuffer())
          .catch((error) => {
            console.error("Lỗi khi tải file:", error);
            return null;
          });

        if (!fileData) {
          console.error("Không thể tải file.");
          return null;
        }

        // Viết file đầu vào vào bộ nhớ ảo của FFmpeg
        this.ffmpeg.FS("writeFile", "input.mp3", new Uint8Array(fileData));
        console.log("File đã được tải vào FFmpeg.");

        // Chạy lệnh FFmpeg để cắt audio
        console.log("Thực hiện cắt audio...");
        await this.ffmpeg.run(
          "-i",
          "input.mp3", // Đường dẫn file đầu vào
          "-ss",
          start.toString(), // Thời gian bắt đầu
          "-t",
          (end - start).toString(), // Độ dài đoạn cắt
          "output.mp3" // Đường dẫn file đầu ra
        );

        // Đọc file đầu ra từ FFmpeg
        const outputData = this.ffmpeg.FS("readFile", "output.mp3");

        console.log("Đã cắt xong audio.");

        // Tạo Blob từ dữ liệu đầu ra
        const cutBlob = new Blob([outputData.buffer], { type: "audio/mp3" });

        return cutBlob; // Trả về file đã cắt
      } catch (error) {
        console.error("Lỗi khi cắt audio:", error);
        return null;
      }
    },

    // Lưu thông tin bài nhạc sau khi cắt
    async saveMusic() {
      // if (!this.cutSegment || !this.imgCover || !this.musicName) {
      //   alert("Vui lòng chọn đầy đủ thông tin (bài hát và ảnh bìa).");
      //   return;
      // }
      const artistId = localStorage.getItem("userId");
      const formData = new FormData();
      formData.append("file", this.cutSegment); // Thêm file bài hát đã cắt
      formData.append("music_name", this.musicName); // Thêm tên bài hát
      formData.append("img", this.imgCover); // Nếu ảnh từ crop
      formData.append("artist_id", artistId);
      alert("luwu");
      alert(this.cutSegment);
      alert(this.imgCover);
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

    // Mở màn hình crop ảnh
    showCropStory() {
      this.showCropImgStory = true;
    },

    // Đóng màn hình crop ảnh khi xong
    handleCropComplete(croppedImage) {
      this.imgCover = croppedImage;
      this.showCropImgStory = false;
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