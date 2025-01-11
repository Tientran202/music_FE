<template>
  <div class="container">
    <div
      v-for="(playlist, index) in playlists"
      :key="index"
      class="playlist-container"
    >
      <img :src="require('/src/assets/mtp.jpeg')" alt="" />
      <div class="information-playlist">
        <span class="title1">{{ playlist.playlist_name }}</span>
        <span class="title2">{{ playlist.user_name }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      keyword: this.$route.query.keyword || "",
      playlists: [],
    };
  },
  created() {
    this.fetchSearchResults();
  },
  watch: {
    "$route.query.keyword"(newKeyword) {
      this.keyword = newKeyword; 
      this.fetchSearchResults(); 
    },
  },
  methods: {
    async fetchSearchResults() {
      if (this.keyword) {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/playlist/searchPlaylist",
            {
              params: { keyword: this.keyword },
            }
          );
          this.playlists = response.data;
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  width: 97%;
  margin: 0 0 0 30px;
  font-family: Arial, Helvetica, sans-serif;
  padding: 20px 0 0 0;
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
  border-radius: 5px;
}
.information-playlist {
  display: flex;
  flex-direction: column;
  margin: 10px 0 0 0;
}

.title1 {
  font-size: 14px;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis; 
  display: block; 
  text-align: left;
}
.title2 {
  font-size: 12px;
  width: 150px;
  color: #7a7a7a;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  text-align: left;
}
</style>

