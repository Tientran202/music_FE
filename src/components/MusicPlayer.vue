<template>
  <div class="music-player" v-if="audioSrc != null">
    <h1 class="name-artist">
      {{ currentSong.name }} - {{ currentSong.artist }}
    </h1>
    <audio
      ref="audio"
      class="audio"
      @timeupdate="updateTime"
      @loadedmetadata="loadMetadata"
      @ended="playNext"
    >
      <source :src="audioSrc" type="audio/mpeg" />
    </audio>
    <div class="controls">
      <div class="controls-button">
        <!-- <img class="mix-music" :src="require('/src/assets/mix.png')" alt="" /> -->
        <img
          class="previous-music"
          :src="require('/src/assets/previous.png')"
          alt=""
          @click="playPrevious"
        />
        <img
          :src="
            isPlaying
              ? require('/src/assets/pause.png')
              : require('/src/assets/play-buttonTrangDen.png')
          "
          alt="Play/Pause"
          class="play-pause"
          @click="togglePlayPause"
        />

        <img
          class="next-music"
          :src="require('/src/assets/next.png')"
          alt=""
          @click="playNext"
        />
        <!-- <img
          :src="require('/src/assets/loop.png')"
          alt="Loop"
          class="loop-button"
          @click="toggleLoop"
        /> -->
      </div>

      <input
        type="range"
        class="music-range"
        v-model="currentTime"
        @input="seekAudio"
        :max="duration"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      isPlaying: false,
      duration: 0,
      currentTime: 0,
    };
  },
  computed: {
    ...mapGetters(["currentSong", "audioSrc", "isPlaying"]),
    currentSong() {
      return this.$store.getters.currentSong; // Lấy thông tin bài hát từ store
    },
    audioSrc() {
      return this.$store.getters.audioSrc; // Lấy URL của âm thanh từ store
    },
  },
  watch: {
    audioSrc(newSrc) {
      const audio = this.$refs.audio;
      if (newSrc && audio) {
        audio.load(); // Load lại audio mới
        this.currentTime = 0; // Reset thời gian phát lại về đầu
        this.$nextTick(() => {
          if (this.isPlaying) audio.play(); // Nếu đang phát, phát lại bài mới
        });
      }
    },
    // Đồng bộ trạng thái phát
    isPlaying(newValue) {
      const audio = this.$refs.audio;
      if (audio) {
        newValue ? audio.play() : audio.pause();
      }
    },
  },
  methods: {
    ...mapActions(["togglePlayPause"], ["playNext"], ["playPrevious"]),
    playNext() {
      this.$store.dispatch("playNext");
    },
    playPrevious() {
      this.$store.dispatch("playPrevious"); // Gọi action để chuyển bài nhạc trước
      const audio = this.$refs.audio;
      if (audio && this.isPlaying) {
        audio.play(); // Tiếp tục phát bài trước đó nếu đang phát
      }
    },
    togglePlayPause() {
      const audio = this.$refs.audio;
      if (this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      this.isPlaying = !this.isPlaying;
    },

    updateTime() {
      if (this.$refs.audio) {
        this.currentTime = this.$refs.audio.currentTime;
      }
      // const audio = this.$refs.audio;
      // this.currentTime = audio.currentTime;
    },

    seekAudio() {
      const audio = this.$refs.audio;
      audio.currentTime = this.currentTime;
    },

    loadMetadata() {
      const audio = this.$refs.audio;
      this.duration = audio.duration;
    },

    toggleLoop() {
      const audio = this.$refs.audio;
      audio.loop = !audio.loop;
    },
  },
};
</script>
<style scoped>
.music-player {
  position: fixed; /* Giữ cố định thanh phát nhạc ở cuối màn hình */
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #1e1e1e; /* Màu nền của thanh phát nhạc */
  color: white; /* Màu chữ */
  display: flex; /* Sử dụng flexbox để căn chỉnh các phần tử */
  align-items: center; /* Căn giữa theo chiều dọc */
  padding: 2px 0 2px 10px; /* Khoảng cách bên trong */
  z-index: 1000; /* Đảm bảo thanh phát nhạc nằm trên các phần tử khác */
  font-family: Arial, Helvetica, sans-serif;
  justify-content: center;
}
.album-cover {
  width: 45px;
  height: 45px;
  border-radius: 4px;
  object-fit: cover; /* Đảm bảo ảnh không bị méo */
}
.song-info {
  display: flex;
  align-items: center;
}
.details {
  margin-left: 10px; /* Khoảng cách giữa ảnh và thông tin bài hát */
}
.name-artist {
  font-size: 13px;
  flex: 1; /* Chiếm không gian ở bên trái */
  text-align: left;
  margin: 0 0 0 20px;
}

.controls {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 2; /* Đảm bảo controls nằm giữa */
  margin: 0 0 0 -750px;
}
.audio {
  position: absolute; /* Tách rời khỏi luồng bình thường */
  top: -9999px; /* Giấu phần tử khỏi mắt */
}
.mix-button {
  padding: 2px;
  width: 22px;
}
.play-pause {
  width: 35px;
  height: 35px;
}
.controls-button {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 0 0 0;
}
.loop-button {
  width: 18px;
  height: 18px;
}
.mix-music {
  width: 18px;
  height: 18px;
}
.previous-music {
  height: 20px;
  width: 20px;
}
.next-music {
  height: 20px;
  width: 20px;
}
.controls input[type="range"] {
  width: 400px; /* Chiều rộng của thanh tiến trình */
  appearance: none;
  height: 4px;
  margin: 10px;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; /* Loại bỏ kiểu mặc định */
  width: 10px; /* Đặt kích thước của nút kéo */
  height: 10px; /* Đặt kích thước của nút kéo */
  background: #ffffff; /* Màu nền của nút kéo */
  border-radius: 50%; /* Bo góc tròn cho nút kéo */
  cursor: pointer; /* Thay đổi con trỏ khi di chuột qua */
}
.volume-container {
  display: flex;
  align-items: center;
}
img {
  cursor: pointer;
}
.img-volume {
  padding: 0 10px 0 0;
  width: 18px;
  margin: 0 0 0 300px;
}

.volume-range {
  appearance: none;
  height: 4px;
  width: 100px;
}
</style>



    <!-- <div class="song-info">
      <img :src="require('/src/assets/mtp.jpeg')" class="album-cover" />
      <div class="details">
        <span class="song-name">{{ currentSong.name }}</span
        >,
        <span class="artist-name">{{ currentSong.artist }}</span>
      </div>
    </div> -->

    <!-- <div class="controls">
      <div>
        <img :src="require('/src/assets/mix.png')" class="mix-button" />
        <img
          :src="require('/src/assets/play-buttonTrangDen.png')"
          alt="Play/Pause"
          class="play-pause"
        />
        <img
          :src="require('/src/assets/loop.png')"
          class="loop-button"
        />
      </div>
      <input type="range" class="music-range" />
    </div> -->
    <!-- <div class="volume-container">
      <img class="img-volume" :src="require('/src/assets/volume.png')" alt="" />
      <input type="range" class="volume-range" />
    </div> -->