<template>
  <div class="container">
    <div
      v-for="(music, index) in musicList"
      :key="index"
      class="album-container"
      @click="navigateToMusic(music.musicId)"
    >
      <img
        :src="'data:image/jpeg;base64,' + music.musicImg"
        alt="Music Image"
        v-if="music.musicImg"
      />
      <div class="information-playlist">
        <div class="title4">
          <span class="title1">{{ music.musicName }}</span>
        </div>
        <div class="title3">
          <span class="title2">{{ music.userName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      musicList: [], 
      loading: false, 
      error: null, 
      genreId: null, 
    };
  },
  watch: {
    "$route.params.id": {
      handler(newId) {
        this.genreId = newId; 
        this.getMusicByGenre(); 
      },
      immediate: true, 
    },
  },
  methods: {
    navigateToMusic(musicId) {
      this.$router.push(`/index/${musicId}`);
    },
    async getMusicByGenre() {
      if (!this.genreId) {
        this.musicList = []; 
        this.error = "Genre ID is invalid.";
        return;
      }

      this.loading = true;
      this.error = null; 

      try {
        const response = await axios.get(
          `http://localhost:8080/api/genre/getGenreAndMusic/${this.genreId}`
        );

        this.musicList = response.data;
      } catch (err) {
        this.error = "Failed to fetch music data. Please try again later.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>


<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  width: 98%;
  margin: 0 0 0 10px;
  font-family: Arial, Helvetica, sans-serif;
  padding: 50px 0 100px 0 ;
}
a {
  cursor: pointer;
}
.title {
  margin: 20px 0 0 50px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 25px;
  font-weight: bold;
}
.album-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 0px 0;
  border-radius: 5px;
  width: 173px;
  height: 250px;
  cursor: pointer;
  margin: 10px 0 0 0;
}
.album-container:hover {
  background: #88888860;
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
  margin: 0;
  font-size: 13px;
  width: 150px;
  overflow: hidden; 
  text-overflow: ellipsis; 
  display: block; 
}

.title2 {
  font-size: 12px;
  color: #7a7a7a;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  text-align: left; 
  margin: 5px 0 0 0;
}
.title2:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>