<template>
  <div class="container">
    <div class="container-search">
      <span class="title">Tất cả bài nhạc cần duyệt</span>
   
    </div>
    <ul>
      <li class="index">#</li>
      <li class="name-music">Tên bài nhạc</li>
      <li class="name-artist">Tên nghệ sĩ</li>
      <li class="btn-appear"></li>
    </ul>
    <div class="line"></div>
    <ul
      class="sp-content"
      v-for="(musicConfiramtion, index) in musicConfiramtions"
      :key="musicConfiramtion.id"
    >
      <li class="index">{{ index + 1 }}</li>
      <li class="name-music">
        <a @click="goToIndexMusic(musicConfiramtion.id)" href="">{{
          musicConfiramtion.music_name
        }}</a>
      </li>
      <li class="name-artist">
        <a href="">{{ musicConfiramtion.name }}</a>
      </li>
      <li class="btn-appear">
        <button @click="confir(musicConfiramtion.id)">
          {{ isConfirmed(musicConfiramtion.id) ? "Đã xác nhận" : "Xác nhận" }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    this.fetchHiddenUsers();
  },
  methods: {
    isConfirmed(id) {
      return this.confirmedMusicIds.includes(id);
    },
    goToIndexMusic(musicId) {
      this.$router.push(`/IndexMusicForAdmin/${musicId}`);
    },
    // Xác nhận bài hát
    async confir(musicId) {
      await axios.patch(
        "http://localhost:8080/api/music/confirmationMusicById",
        null,
        {
          params: { musicId }, // Dữ liệu RequestParam
        }
      );
      // Thêm id bài hát vào mảng confirmedMusicIds
      this.confirmedMusicIds.push(musicId);
    },

    // Lấy dữ liệu bài hát chưa xác nhận
    async fetchHiddenUsers() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/music/getAllMusicUnconfirmed"
        );
        this.musicConfiramtions = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    // Định dạng lại ngày giờ
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
  data() {
    return {
      musicConfiramtions: [],
      confirmation: true,
      // Mảng lưu trữ các id bài hát đã được xác nhận
      confirmedMusicIds: [],
    };
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 1000px;
  background: #ffffff;
  color: #000000;
  font-family: Arial, Helvetica, sans-serif;
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
  margin: 0 0 0 519px;
}
.input-search {
  width: 200px;
  height: 30px;
  border-radius: 5px;
  border: 2px solid #000000;
  padding: 0 0 0 10px;
}
ul {
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 5px 0;
}
.line {
  background: #000000;
  width: 99%;
  height: 1px;
}
.sp-content:hover {
  background: #c2adad;
}
li {
  list-style: none;
}
.index {
  width: 10%;
  justify-content: center;
  display: flex;
}
.name-music {
  width: 50%;
}
.name-artist {
  width: 20%;
}

.btn-appear {
  width: 20%;
  display: flex;
  justify-content: center;
}
button {
  font-size: 10px;
  border: 1px solid #000000e2;
  border-radius: 4px;
  height: 25px;
  width: 60px;
  cursor: pointer;
  background: #ffffff;
}
a {
  text-decoration: none;
}
</style>
