<template>
  <div id="app">
    <h1>Music Player</h1>
    <div v-if="audioSrc">
      <audio class="audio" controls>
        <source :src="audioSrc" type="audio/mpeg" />
      </audio>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      audioSrc: null,
    };
  },
  methods: {
    async fetchAudio() {
      try {
        const response = await axios.get("http://localhost:8080/api/music/1001", {
          responseType: "arraybuffer",
        });
        const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
        this.audioSrc = URL.createObjectURL(audioBlob);
      } catch (error) {
        console.error("Error fetching audio:", error);
      }
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
  width: 1000px;
  height: 100px;
  background: #db2727;
}
</style>
