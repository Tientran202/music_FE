<template>
  <div class="container">
    <div
      class="artist-container"
      v-for="(searchResult, index) in searchResults"
      :key="index"
      @click="goToIndexArtist(searchResult.id)"
    >
      <img
        class="img-artist"
        :src="'data:image/jpeg;base64,' + searchResult.img"
        alt=""
      />
      <span class="name-artist">{{ searchResult.name }}</span>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 10px;
  padding: 10px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
  padding: 20px 0 150px 0;
}
.artist-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 250px;
  border-radius: 10px;
  cursor: pointer;
}
.artist-container:hover {
  background: #42424260;
}
img {
  width: 160px;
  height: 160px;
  border-radius: 50%;
}
.name-artist {
  margin: 10px 0 0 0;
}
</style>
<script>
import axios from "axios";
export default {
  created() {
    this.fetchSearchResults();
  },
  watch: {
    // Khi keyword thay đổi, gọi lại fetchSearchResults
    "$route.query.keyword"(newKeyword) {
      this.keyword = newKeyword; // Cập nhật keyword
      this.fetchSearchResults(); // Gọi lại API khi keyword thay đổi
    },
  },
  methods: {
    async fetchSearchResults() {
      if (this.keyword) {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/user/searchArtist",
            {
              params: { keyword: this.keyword },
            }
          );
          this.searchResults = response.data;
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      }
    },
    goToIndexArtist(artistId) {
      this.$router.push(`/indexArtist/${artistId}`);
    },
  },

  data() {
    return {
      keyword: this.$route.query.keyword || "",
      searchResults: [],
    };
  },
};
</script>
