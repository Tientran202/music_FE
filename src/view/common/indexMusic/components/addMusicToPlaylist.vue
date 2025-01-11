<template>
  <div class="container">
    <span class="title">Chọn danh sách phát của bạn</span>
    <div class="playlist-container">
      <div
        v-for="(playlist, index) in playlists"
        :key="index"
        class="playlist-item"
      >
        <span class="playlist-name">{{ playlist.playlist_name }}</span>
        <button @click="addToPlaylist(playlist.playlist_id)">Chọn</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      playlists: [],
    };
  },
  mounted() {
    this.getPlaylistByUserIdAddMusic();
  },
  created() {},
  methods: {
    async getPlaylistByUserIdAddMusic() {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(
        "http://localhost:8080/api/playlist/getPlaylistByUserIdAddMusic",
        {
          params: { userId: userId },
        }
      );
      this.playlists = response.data;
    },

    async addToPlaylist(playlistId) {
      const musicId = this.$route.params.id;
      const response = await axios.post(
        "http://localhost:8080/api/music/addToPlaylist",
        null,
        {
          params: {
            musicId: musicId,
            playlistId: playlistId,
          },
        }
      );
      if (response.status == 200) {
        this.isFollowing = !this.isFollowing;
        alert("Đã thêm");
      }
    },

  },
};
</script>
<style scoped>
.container {
  margin: 220px 0 0 300px;
  padding: 10px;
  position: fixed;
  z-index: 99;
  width: 200px;
  max-width: 400px;
  background: #333131;
  border: 1px solid #ffffff;
  border-radius: 10px;
}

.playlist-container {
  max-height: 100px; 
  overflow-y: auto; 
  border-radius: 8px;
  padding: 10px;
}

.playlist-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  border-radius: 4px;
}
.title {
  margin: 100px 10px 0 0;
}
.playlist-name {
  font-size: 10px;
}

button {
  background-color: #12a43200;
  color: #fff;
  border: 1px solid #ffffff;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;

}

button:hover {
  background-color: #15872e;
}
</style>
