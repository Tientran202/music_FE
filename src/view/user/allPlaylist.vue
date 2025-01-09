<template>
  <div class="title">
    Tất cả danh sách nhạc của
    <span class="artist-name-span" @click="goToIndexArtist">bạn</span>
  </div>
  <div class="container">
    <div
      v-for="(playlist, index) in playlists"
      :key="index"
      class="playlist-container"
      @click="navigateTopPlaylist(playlist.playlist_id)"
    >
      <img :src="'data:image/jpeg;base64,' + playlist.playlist_img" alt="" />
      <div class="information-playlist">
        <span class="title1">{{ playlist.playlist_name }}</span>
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
      user: [],
      userId: localStorage.getItem("userId"),
    };
  },
  created() {
    this.getPlaylistByUserId();
    this.getIndexUser();
  },
  methods: {
    navigateTopPlaylist(playlist) {
      this.$router.push(`/playlist/${playlist}`);
    },

    async getPlaylistByUserId() {
      const response = await axios.get(
        "http://localhost:8080/api/playlist/getPlaylistByUserId",
        {
          params: { userId: this.userId },
        }
      );
      this.playlists = response.data;
    },
    goToIndexArtist() {
      this.$router.push(`/informationActor`);
    },
    async getIndexUser() {
      const response = await axios.get(
        "http://localhost:8080/api/user/getIndexUser",
        {
          params: { userId: this.userId },
        }
      );
      this.user = response.data;
    },
  },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  width: 97%;
  margin: 0 0 0 30px;
  font-family: Arial, Helvetica, sans-serif;
  padding: 20px 0 0 0;
  cursor: pointer;
  padding: 0 0 100px;
}
.title {
  margin: 20px 0 0 50px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 25px;
  font-weight: bold;
  text-align: left;
  color: #cdcdcd;
}
.artist-name-span {
  cursor: pointer;
}
.artist-name-span:hover {
  color: rgb(255, 255, 255);
}
.playlist-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 0px 0;
  border-radius: 5px;
  width: 190px;
  height: 250px;
}
.playlist-container:hover {
  background: #42424260;
}
img {
  width: 150px;
  height: 150px;
  border-radius: 5px;
}
.information-playlist {
  display: flex;
  flex-direction: column;
  margin: 10px 0 0 0;
}

.title1 {
  text-align: left;
  font-size: 14px;
  width: 150px;
  overflow: hidden; /* Ẩn phần văn bản tràn ra ngoài */
  text-overflow: ellipsis; /* Thêm dấu ba chấm khi văn bản bị cắt */
  display: block; /* Đảm bảo phần tử là block để các thuộc tính trên hoạt động */
}
.title2 {
  font-size: 12px;
  width: 150px;
  color: #7a7a7a;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}
</style>

