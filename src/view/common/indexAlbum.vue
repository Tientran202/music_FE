<template>
  <div class="container">
    <div class="header">
      <img
        class="img-playlist"
        :src="'data:image/jpeg;base64,' + album.img"
        alt=""
      />
      <div class="info-user-container">
        <span class="album-title">Album</span>
        <span class="name-playlist">{{ album.album_name }}</span>
        <div class="info2">
          <span>{{ formatDate(album.replease_day) }}</span>
          |
          <span>{{ album.artist_name }}</span>
        </div>
        <div class="control">
          <img
            @click="playAllSongs"
            class="img-play"
            :src="require('/src/assets/play.png')"
            alt=""
          />
          <img
            class="img-3dot"
            :src="require('/src/assets/3dot2.png')"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="playlist-container">
      <ul class="table-header">
        <li class="stt">#</li>
        <li class="name-music">Tiêu đề</li>
        <li class="duration">Thời lượng</li>
      </ul>
      <ul
        class="table-row"
        :class="{ active: currentSong && currentSong.id === music.id }"
        v-for="(music, index) in indexMusicResults"
        :key="index"
        @click="playSelectedSong(music)"
      >
        <li class="stt">{{ index + 1 }}</li>
        <li class="name-music">
          <img
            class="img-artist"
            :src="'data:image/jpeg;base64,' + music.img"
            alt=""
          />
          <span class="link-music-name">{{ music.music_name }}</span>
        </li>
        <li class="duration">{{ music.duration }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      indexMusicResults: {},
      albumId: "",
      album: {},
      audioMusics: [],
    };
  },
  computed: {
    ...mapGetters(["currentSong"]), 
  },
  created() {
    this.getIndexAlbum().then(() => {
      this.getMusicByAlbumId();
    });
  },

  methods: {
    ...mapActions(["playSong", "toggleIsPlaying", "togglePlayPause"]),

    playAllSongs() {
      if (this.indexMusicResults.length > 0) {
        this.$store.dispatch("playAllSongs", this.indexMusicResults);
      } else {
        console.error("Danh sách bài hát trống!");
      }
    },
    playSelectedSong(music) {
      if (music) {
        this.playSong(music);
      }
    },

    async initMusicPlayer() {
      await this.getIndexMusic(); 
      if (this.musics && this.musics.musicAudio) {
        this.playThisSong(); 
      }
    },
    async togglePlay() {
      const musicId = this.$route.params.id;
      const response = await axios.get(
        `http://localhost:8080/api/music/getIndexMusicArtist/${musicId}`
      );
      const musicData = response.data;
      if (musicData && musicData.musicAudio) {
        const newMusic = {
          audio: musicData.musicAudio,
          name: musicData.music_name,
          artist: musicData.artist_name,
        };


        await this.$store.dispatch("playSong", newMusic);

        this.toggleIsPlaying();
      }
    },
    async getIndexAlbum() {
      const albumId = this.$route.params.id;
      const response = await axios.get(
        `http://localhost:8080/api/album/getIndexAlbum/${albumId}`
      );
      this.album = response.data;
      this.albumId = this.album.id;
    },
    formatDate(date) {
      const options = {
        year: "numeric",
      };
      return new Date(date).toLocaleString("vi-VN", options);
    },

    async getMusicByAlbumId() {
      if (this.albumId) {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/music/getMusicByAlbumId",
            {
              params: { albumId: this.albumId },
            }
          );
          this.indexMusicResults = response.data;
          for (let i = 0; i < this.indexMusicResults.length; i++) {
            this.audioMusics.push(this.indexMusicResults[i].audio); 
          }
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
  padding: 20px 0 10px 0;
  margin: 0 0 -10px 0;
  background: #191919;
  border-radius: 20px 20px 0 0;
  padding: 20px 0 100px 0;
}
.header {
  display: flex;
  margin: 0 0 0 50px;
}
.info-user-container {
  display: flex;
  flex-direction: column;
  margin: 0 0 0 20px;
}
.table-row {
  padding: 10px;
  border-radius: 10px 0 0 10px;
}
img {
  width: 200px;
  border-radius: 8px;
}
.link-music-name:hover {
  color: rgb(60, 57, 255);
}
.name-playlist {
  font-size: 40px;
  font-weight: bold;
  text-align: left;
}
.album-title {
  text-align: left;
}
.info2 {
  text-align: left;
}
.control {
  margin: 35px 0 0 0;
  display: flex;
  align-items: center;
}
.img-play {
  width: 70px;
  cursor: pointer;
}
.img-3dot {
  width: 50px;
  height: 50px;
}
.playlist-container {
  margin: 20px 0 0 50px;
}
ul {
  display: flex;
  list-style-type: none;
  cursor: pointer;
}
ul:hover {
  display: flex;
  list-style-type: none;
  background: #383838;
}
.table-row.active {
  background: #383838; 
}
ul li {
  display: flex;
  color: #b3b3b3;
  align-items: center;
}
.stt {
  width: 30px;
}
.name-music {
  width: 1200px;
}
.img-artist {
  width: 40px;
  border-radius: 5px;
}
.name-artist {
  width: 400px;
}
.time {
  width: 300px;
}
.duration {
  justify-content: center;
  width: 200px;
}
.name-music {
  gap: 10px;
}
</style>