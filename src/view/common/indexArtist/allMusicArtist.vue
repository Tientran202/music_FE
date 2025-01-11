<template>
  <div class="title">
    Tất cả bài nhạc của
    <span class="artist-name-span" @click="goToIndexArtist">{{
      artists.artist_name
    }}</span>
  </div>
  <div class="container">
    <div
      v-for="(music, index) in musics"
      :key="index"
      class="playlist-container"
      @click="navigateToMusic(music.music_id)"
    >
      <img :src="'data:image/jpeg;base64,' + music.music_img" alt="" />
      <div class="information-playlist">
        <span class="title1">{{ music.music_name }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      musics: "",
      userId: "",
      artists: [],
    };
  },
  created() {
    this.getMusicByArtistId();
    this.getIndexArtist();
  },
  methods: {
    navigateToMusic(musicId) {
      this.$router.push(`/index/${musicId}`);
    },
    goToIndexArtist() {
      this.$router.push(`/indexArtist/${this.$route.params.id}`);
    },
    async getIndexArtist() {
      this.userId = this.$route.params.id;
      const response = await axios.get(
        "http://localhost:8080/api/user/getIndexArtist",
        {
          params: { artistId: this.userId },
        }
      );
      this.artists = response.data;
    },
    async getMusicByArtistId() {
      this.userId = this.$route.params.id;
      const response = await axios.get(
        "http://localhost:8080/api/music/getAllMusicByArtistId",
        {
          params: { artistId: this.userId },
        }
      );
      this.musics = response.data;
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
.artist-name-span {
  cursor: pointer;
}
.artist-name-span:hover {
  color: rgb(255, 255, 255);
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
