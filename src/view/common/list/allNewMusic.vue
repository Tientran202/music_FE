<template>
  <div class="title">Tất cả bài nhạc mới hàng đầu cho bạn</div>
  <div class="container">
    <div
      v-for="(playlist, index) in listNewMusics"
      :key="index"
      class="playlist-container"
      @click="navigateToMusic(playlist.id)"
    >
      <img :src="'data:image/jpeg;base64,' + playlist.img" alt="" />
      <div class="information-playlist">
        <span class="title1">{{ playlist.name_music }}</span>
        <span class="title2">{{ playlist.artist_id }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      listNewMusics: [],
    };
  },
  created() {
    this.getNewMusic();
  },
  methods: {
    async getNewMusic() {
      const response = await axios.get(
        "http://localhost:8080/api/music/getNewMusic"
      );
      this.listNewMusics = response.data;
    },
    navigateToMusic(musicId) {
      this.$router.push(`/index/${musicId}`);
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
  overflow: hidden; 
  text-overflow: ellipsis;
  display: block; 
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
