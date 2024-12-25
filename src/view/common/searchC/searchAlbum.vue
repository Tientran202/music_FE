<template>
  <div class="container">
    <div
      v-for="(album, index) in albums"
      :key="index"
      class="playlist-container"
    >
      <img :src="require('/src/assets/mtp.jpeg')" alt="" />
      <div class="information-playlist">
        <span class="title1">{{ album.album_name }}</span>
        <div class="title3">
          <span class="title2">{{formatDate(album.replease_day)}}.</span>
          <span class="title2">{{ album.artist_name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  width: 97%;
  margin: 0 0 30px;
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
  text-align: left;
  font-size: 14px;
  width: 150px;
  overflow: hidden; /* Ẩn phần văn bản tràn ra ngoài */
  text-overflow: ellipsis; /* Thêm dấu ba chấm khi văn bản bị cắt */
  display: block; /* Đảm bảo phần tử là block để các thuộc tính trên hoạt động */
}
.title2 {
  font-size: 12px;
  color: #7a7a7a;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}
.title3 {
  display: flex;
}
</style>
<script>
import axios from "axios";
export default {
  data() {
    return {
      keyword: this.$route.query.keyword || "",
      albums: [],
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
            "http://localhost:8080/api/album/getSearchAlbum",
            {
              params: { keyword: this.keyword },
            }
          );
          this.albums = response.data;
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      }
    },
    formatDate(date) {
      const options = {
        year: "numeric",
      };
      return new Date(date).toLocaleString("vi-VN", options);
    },
  },
};
</script>
