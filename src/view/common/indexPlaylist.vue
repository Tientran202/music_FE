<template>
  <div class="container">
    <div class="header">
      <img
        class="img-playlist"
        :src="'data:image/jpeg;base64,' + playlist.img"
        alt=""
      />
      <div class="info-user-container">
        <span class="album-title">Playlist</span>
        <span class="name-playlist">{{ playlist.album_name }}</span>
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
          <span class="music-name-span" @click="goToIndexMusic(music.id)">{{ music.music_name }}</span>
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
      playlistId: "",
      playlist: {},
      audioMusics: [],
    };
  },
  computed: {
    ...mapGetters(["currentSong"]), // Lấy bài hát hiện tại từ store
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
        // Gửi bài nhạc hiện tại vào Vuex Store
        this.playSong(music);
      }
    },

    goToIndexMusic(musicId) {
      this.$router.push(`/index/${musicId}`);
    },
    async initMusicPlayer() {
      await this.getIndexMusic(); // Lấy dữ liệu bài hát
      if (this.musics && this.musics.musicAudio) {
        // Kiểm tra nếu dữ liệu hợp lệ
        this.playThisSong(); // Gọi phát nhạc
      }
    },
    async togglePlay() {
      const musicId = this.$route.params.id;
      // Lấy thông tin bài hát từ API
      const response = await axios.get(
        `http://localhost:8080/api/music/getIndexMusicArtist/${musicId}`
      );
      const musicData = response.data;
      if (musicData && musicData.musicAudio) {
        // Tạo dữ liệu bài hát mới và gửi tới store
        const newMusic = {
          audio: musicData.musicAudio,
          name: musicData.music_name,
          artist: musicData.artist_name,
        };
        // Gọi action trong Vuex để phát bài hát mới
        await this.$store.dispatch("playSong", newMusic);

        // Đổi trạng thái "isPlaying" nếu cần
        this.toggleIsPlaying();
      } // Đổi trạng thái isPlaying
    },
    async getIndexAlbum() {
      const playlistId = this.$route.params.id;
      const response = await axios.get(
        `http://localhost:8080/api/playlist/getIndexPlaylist/${playlistId}`
      );
      this.playlist = response.data;
      this.playlistId = this.playlist.id;
    },
    formatDate(date) {
      const options = {
        year: "numeric",
      };
      return new Date(date).toLocaleString("vi-VN", options);
    },

    async getMusicByAlbumId() {
      if (this.playlistId) {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/music/getMusicByPlaylistId",
            {
              params: { playlistId: this.playlistId },
            }
          );
          this.indexMusicResults = response.data;
          for (let i = 0; i < this.indexMusicResults.length; i++) {
            this.audioMusics.push(this.indexMusicResults[i].audio); // Thêm từng phần tử vào audioMusics
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
.name-playlist {
  font-size: 40px;
  font-weight: bold;
  text-align: left;
}
.album-title {
  text-align: left;
}
.music-name-span:hover{
color: #ffffff;
}
.info2 {
  text-align: left;
}
.control {
  margin: 70px 0 0 0;
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
  background: #383838; /* Màu nền khi bài hát đang phát */
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