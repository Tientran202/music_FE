<template>
  <div id="app">
    <h1>Music Player</h1>
    <div v-if="audioSrc">
      <audio
        ref="audio"
        class="audio"
        @timeupdate="updateTime"
        @loadedmetadata="loadMetadata"
      >
        <source :src="audioSrc" type="audio/mpeg" />
      </audio>
      <div class="controls">
        <img
          :src="
            isPlaying
              ? require('/src/assets/play-buttonTrangDen.png')
              : require('/src/assets/play-buttonTrangDen.png')
          "
          alt="Play/Pause"
          class="play-pause"
          @click="togglePlayPause"
        />
        <img
          :src="require('/src/assets/loop.png')"
          alt="Loop"
          class="loop-button"
          @click="toggleLoop"
        />
        <input
          type="range"
          class="music-range"
          v-model="currentTime"
          @input="seekAudio"
          :max="duration"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      audioSrc: null,
      isPlaying: false,
      duration: 0,
      currentTime: 0,
    };
  },
  methods: {
    async fetchAudio() {
      try {
        const response = await axios.get("http://localhost:8080/api/music/1000", {
          responseType: "arraybuffer",
        });
        const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
        this.audioSrc = URL.createObjectURL(audioBlob);
      } catch (error) {
        console.error("Error fetching audio:", error);
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
      const audio = this.$refs.audio;
      this.currentTime = audio.currentTime;
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
  mounted() {
    this.fetchAudio();
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 20px;
  text-align: center;
}
.audio {
  display: none; /* Ẩn phần tử audio mặc định */
}
.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.play-pause,
.loop-button {
  cursor: pointer;
  width: 50px; /* Kích thước của nút */
  height: 50px;
}
.music-range {
  flex: 1;
  margin: 0 10px;
}
.music-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background: #4caf50; /* Màu của nút kéo */
  border-radius: 50%;
}
.music-range::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  background: #ddd; /* Màu nền của thanh */
  border-radius: 5px;
}
</style>