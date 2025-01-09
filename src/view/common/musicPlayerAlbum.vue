<template>
  <div class="player">
    <div v-if="currentSong" class="player-container">
      <img
        class="album-cover"
        :src="'data:image/jpeg;base64,' + currentSong.img"
        alt="Album cover"
      />
      <div class="song-details">
        <h3 class="song-title">{{ currentSong.music_name }}</h3>
        <p class="song-artist">{{ currentSong.artist_name }}</p>
        <div class="controls">
          <button @click="togglePlayPause">{{ isPlaying ? 'Pause' : 'Play' }}</button>
          <button @click="playNextSong">Next</button>
        </div>
      </div>
      <audio ref="audio" :src="audioSrc" v-if="audioSrc" @ended="playNextSong" controls />
    </div>
    <div v-else class="no-song">No song is playing</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      audioSrc: null,
    };
  },
  computed: {
    ...mapState(['currentSong', 'isPlaying', 'queue']),
  },
  methods: {
    ...mapActions(['togglePlayPause', 'playNextSong', 'setSong']),

    // Đổi audioSrc khi thay đổi bài hát
    setAudioSource(song) {
      let audioBlob;
      if (typeof song.audio === 'string') {
        audioBlob = new Blob([new Uint8Array(atob(song.audio).split('').map(c => c.charCodeAt(0)))], { type: 'audio/mpeg' });
      } else if (Array.isArray(song.audio)) {
        audioBlob = new Blob([new Uint8Array(song.audio)], { type: 'audio/mpeg' });
      }
      this.audioSrc = URL.createObjectURL(audioBlob);
    },

    // Kêu gọi hành động playNextSong khi bài hát kết thúc
    playNextSong() {
      if (this.queue.length > 0) {
        this.$store.dispatch('playNext');
        this.setAudioSource(this.currentSong);
      }
    },

    togglePlayPause() {
      this.$store.dispatch('togglePlayPause');
      if (this.isPlaying) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
  },
  watch: {
    currentSong(newSong) {
      if (newSong) {
        this.setAudioSource(newSong);
      }
    },
  },
};
</script>

<style scoped>
.player {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.player-container {
  text-align: center;
}

.album-cover {
  max-width: 200px;
  border-radius: 10px;
}

.song-title {
  font-size: 1.5em;
  font-weight: bold;
}

.song-artist {
  font-size: 1em;
  color: grey;
}

.controls button {
  margin: 5px;
  padding: 10px 20px;
  background-color: #1db954;
  color: white;
  border: none;
  cursor: pointer;
}

.controls button:hover {
  background-color: #1ed760;
}

.no-song {
  font-size: 1.5em;
  color: grey;
}
</style>
