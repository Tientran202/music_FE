<template>
  <div class="music-container">
    <ul>
      <li class="stt">#</li>
      <li class="title-container">Tiêu đề</li>
      <li class="duration">Thời lượng</li>
    </ul>
    <ul
      class="music"
      v-for="(searchResult, index) in searchResults"
      :key="index"
      @click="goToIndexMusic(searchResult.id)"
    >
      <li class="stt">{{ index + 1 }}</li>
      <li class="title-container">
        <img
          class="img-music"
          :src="'data:image/jpeg;base64,' + searchResult.img"
          alt=""
        />
        <div class="info-music">
          <span class="title">{{ searchResult.musicName }}</span>
          <span class="name-artist">{{ searchResult.name }}</span>
        </div>
      </li>
      <li class="duration">{{ searchResult.duration }}</li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      keyword: this.$route.query.keyword || "",
      searchResults: [],
    };
  },
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
            "http://localhost:8080/api/music/searchMusic",
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
    goToIndexMusic(musicId) {
      this.$router.push(`/index/${musicId}`);
    },
  },
};
</script>

<style scoped>
.music-container {
  padding: 50px 0 100px 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  font-family: Arial, Helvetica, sans-serif;
  color: #a5a5a5;
  font-size: 14px;
}
ul {
  display: flex;
  flex-direction: row;
  margin: 8px;
}
ul:hover {
  display: flex;
  list-style: none;
  align-items: center;
  background: #42424260;
}
.music {
  display: flex;
}
li {
  display: flex;
  list-style: none;
  align-items: center;
}
.stt {
  width: 100px;
}
.title-container {
  flex-direction: row;
  width: 1100px;
}

.img-music {
  width: 40px;
  border-radius: 5px;
}
.info-music {
  display: flex;
  flex-direction: column;
  margin: 0 0 0 20px;
  justify-content: flex-start;
}

.title {
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
}
.title:hover {
  color: #ffffff;
}
.name-artist {
  margin: 5px 0 0 0;
  text-align: left;
  color: #b8b8b8;
  font-size: 12px;
}
</style>