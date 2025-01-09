<template>
  <div class="title">Tất cả album hàng đầu cho bạn</div>
  <div class="container">
    <div v-for="(album, index) in albums" @click="indexAlbum(album.id)" :key="index" class="album-container">
      <img :src="'data:image/jpeg;base64,' + album.img" alt="" />
      <div class="information-playlist">
        <span class="title1">{{ album.album_name }}</span>
        <div class="title3">
          <span class="title2">{{ formatDate(album.release_day) }}.</span>
          <span class="title2">{{ album.stage_name }}</span>
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
      albums: {},
    };
  },
  created() {
    this.getAllAlbum();
  },
  methods: {
    async getAllAlbum() {
      const response = await axios.get(
        "http://localhost:8080/api/album/getTopAlbum"
      );
      this.albums = response.data;
    },
    indexAlbum(albumId) {
      this.$router.push(`/indexAlbum/${albumId}`);
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
<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  width: 97%;
  margin: 0 0 100px 30px;
  font-family: Arial, Helvetica, sans-serif;
  padding: 20px 0 0 0;
}
.title {
  margin: 20px 0 0 50px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 25px;
  font-weight: bold;
  text-align: left;
}
.album-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 0px 0;
  border-radius: 5px;
  width: 190px;
  height: 250px;
  cursor: pointer;
}
.album-container:hover{
  background: #42424260;
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
  text-align: left;
  display: flex;
  flex-direction: column;
  margin: 10px 0 0 0;
}

.title1 {
  
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

