<template>
  <div class="container">
    <div class="container-search">
      <span class="title">Tất cả bài nhạc đã được ẩn</span>
    
    </div>
    <ul>
      <li class="index">#</li>
      <li class="name-music">Tên bài nhạc</li>
      <li class="name-artist">Tên nghệ sĩ</li>
      <li class="namOfUserReporting">Tên người báo cáo</li>
      <li class="time">Thời gian bị báo cáo</li>
      <li class="contentReported">Nội dung</li>
      <li class="timeHide">Bị ẩn</li>
      <li class="btn-appear"></li>
    </ul>
    <div class="line"></div>
    <ul
      class="sp-content"
      v-for="(hiddenMuisc, index) in hiddenMuiscs"
      :key="index"
    >
      <li class="index">{{ index + 1 }}</li>
      <li class="name-music" @click="goToIndexMusic(hiddenMuisc.music_id)">
        {{ hiddenMuisc.music_name }}
      </li>
      <li class="name-artist">
        {{ hiddenMuisc.artist }}
      </li>
      <li class="namOfUserReporting">
        {{ hiddenMuisc.reported_name }}
      </li>
      <li class="time">{{ formatDate(hiddenMuisc.day) }}</li>
      <li class="contentReported">{{ hiddenMuisc.report_content }}</li>
      <li class="timeHide">{{ formatDate(hiddenMuisc.hidden_time) }}</li>
      <li class="btn-appear" @click="cancelHidden(hiddenMuisc.music_id)">
        <button>Bỏ ẩn</button>
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
    goToIndexMusic(musicId) {
      this.$router.push(`/indexMusicHidden/${musicId}`);
    },
    async fetchHiddenUsers() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/admin/getAllHiddenMusic"
        );
        this.hiddenMuiscs = response.data;
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
    async cancelHidden(musicId) {
      try {
        const formData = new FormData();
        formData.append("musicId", musicId);
        const response = await fetch(
          "http://localhost:8080/api/admin/cancelHiddenMusic",
          {
            method: "POST",
            body: formData,
          }
        );
        if (response.ok) {
          alert("Bài nhạc đã không còn bị ẩn");
          this.fetchHiddenUsers();
        } else {
          alert("Huỷ báo cáo không thành công");
        }
      } catch (error) {
        console.error("Error uploading music:", error);
      }
    },
  },
  data() {
    return {
      hiddenMuiscs: [],
    };
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
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
  width: 5%;
  justify-content: center;
  display: flex;
}
.name-music {
  width: 13%;
  cursor: pointer;
}
.name-artist {
  width: 12%;
}
.namOfUserReporting {
  width: 12%;
}
.time {
  width: 12%;
}
.contentReported {
  display: flex;
  width: 26%;
  justify-content: center;
}
.timeHide {
  width: 10%;
  display: flex;
  justify-content: center;
}
.btn-appear {
  width: 10%;
  display: flex;
  justify-content: center;
}
button {
  font-size: 13px;
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
