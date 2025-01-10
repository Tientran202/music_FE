<template>
  <div class="container">
    <div class="container-search">
      <span class="title">Danh sách nghệ sĩ</span>
     
    </div>
    <ul>
      <li class="index">#</li>
      <li class="name-artist">Nghệ sĩ</li>
      <li class="album">SL album</li>
      <li class="playlist">SL bài nhạc</li>
      <li class="time">Thời gian debut</li>
    </ul>
    <dir class="line"></dir>
    <ul class="content1" v-for="(listMusic, index) in listMusics" :key="index">
      <li class="index">{{ index + 1 }}</li>
      <li class="name-artist">
        <a href="">{{ listMusic.user_name }}</a>
      </li>
      <li class="album">{{ listMusic.album_count }}</li>
      <li class="playlist">{{ listMusic.music_count }}</li>
      <li class="time">{{ formatDate(listMusic.time_debut) }}</li>
     
    </ul>
  </div>
</template>
<script>
import axios from "axios";
export default {
  created() {
    this.fetchListArtist();
  },
  data() {
    return {
      listMusics: [],
    };
  },
  methods: {
    async fetchListArtist() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/admin/findAllArtist"
        );
        this.listMusics = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    formatDate(date) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(date).toLocaleString("vi-VN", options);
    },
  },
};
</script>

<style scoped>
.container {
  background: #ffffff;
  color: #000000;
  font-family: Arial, Helvetica, sans-serif;
}
ul {
  display: flex;
  padding: 5px 0;
}
li {
  list-style: none;
}
.container-search {
  padding: 10px 0 0 0;
}
.title {
  font-weight: bold;
  font-size: 18px;
}
.sp-search {
  padding: 0 10px 0 0;
  margin: 0 0 0 594px;
}
.input-search {
  width: 200px;
  height: 30px;
  border-radius: 5px;
  border: 2px solid #000000;
  padding: 0 0 0 10px;
}
.line {
  width: 95%;
  height: 1px;
  background: #000000;
}
.content1 {
  padding: 5p 0;
}
.content1:hover {
  background: #a58686;
}
.index {
  display: flex;
  width: 10%;
  justify-content: center;
}
.name-artist {
  width: 35%;
}
a {
  text-decoration: none;
}
.album {
  width: 15%;
}
.playlist {
  width: 15%;
}
.time {
  width: 15%;
}
.btn {
  width: 10%;
  display: flex;
  justify-content: center;
}
button {
  width: 40px;
  height: 25px;
  border: 1px solid #000000;
  border-radius: 5px;
  background: #ffffff;
  cursor: pointer;
}
</style>
