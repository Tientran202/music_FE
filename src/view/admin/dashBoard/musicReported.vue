<template>
  <div class="container">
    <div class="container-search">
      <span class="title">Tất cả bài nhạc bị báo cáo</span>
      <span class="sp-search">Tìm kiếm</span>
      <input class="input-search" type="text" placeholder="Nhập từ khoá" />
    </div>
    <ul>
      <li class="index">#</li>
      <li class="nameMusic">Tên bài nhạc</li>
      <li class="nameArtist">Nghệ sĩ</li>
      <li class="namOfUserReporting">Tên người báo cáo</li>
      <li class="time">Thời gian</li>
      <li class="contentReported">Nội dung</li>
      <li class="container-btn"></li>
    </ul>
    <div class="line"></div>
    <ul
      class="ul-content"
      v-for="(reportedMuisc, index) in reportedMuiscs"
      :key="index"
    >
      <li class="index">{{ index + 1 }}</li>
      <li class="nameMusic" @click="goToIndexMusic(reportedMuisc.music_id)">
        {{ reportedMuisc.music_name }}
      </li>
      <li class="nameArtist">
        {{ reportedMuisc.artist }}
      </li>
      <li class="namOfUserReporting">
        {{ reportedMuisc.reported_name }}
      </li>
      <li class="time">{{ formatDate(reportedMuisc.day) }}</li>
      <li class="contentReported">{{ reportedMuisc.report_content }}</li>
      <li class="container-btn">
        <button @click="hiddenMusic(reportedMuisc.report_id)">Ẩn</button>
        <button @click="hiddenReport(reportedMuisc.report_id)">Huỷ</button>
      </li>
      <div class=""></div>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    this.fetchReportedUsers();
  },
  data() {
    return {
      reportedMuiscs: [],
    };
  },
  methods: {
    async fetchReportedUsers() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/admin/reportedMusic"
        );
        this.reportedMuiscs = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async hiddenReport(reportId) {
      try {
        const formData = new FormData();
        formData.append("reportId", reportId);
        const response = await fetch(
          "http://localhost:8080/api/admin/hiddenReportMusic",
          {
            method: "POST",
            body: formData,
          }
        );
        if (response.ok) {
          alert("Đã huỷ báo cáo");
          this.fetchReportedUsers();
        } else {
          alert("Huỷ báo cáo không thành công");
        }
      } catch (error) {
        console.error("Error uploading music:", error);
        alert("Có lỗi xảy ra khi tải bài hát lên.");
      }
    },
    goToIndexMusic(musicId) {
      this.$router.push(`/index/${musicId}`);
    },
    async hiddenMusic(reportId) {
      try {
        const formData = new FormData();
        formData.append("reportId", reportId);
        const response = await fetch(
          "http://localhost:8080/api/admin/hiddenMusic",
          {
            method: "POST",
            body: formData,
          }
        );
        if (response.ok) {
          alert("Đã ẩn bài nhạc");
          this.fetchReportedUsers();
        } else {
          alert("Huỷ báo cáo không thàh công");
        }
      } catch (error) {
        console.error("Error uploading music:", error);
        alert("Có lỗi xảy ra khi tải bài hát lên.");
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
  font-size: 18px;
  font-weight: bold;
}
.sp-search {
  padding: 0 10px 0 0;
  margin: 0 0 0 529px;
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

.ul-content:hover {
  background: #c2adad;
}
li {
  list-style: none;
}
.index {
  width: 5%;
  display: flex;
  justify-content: center;
}
.nameMusic {
  cursor: pointer;
  width: 15%;
}
.nameArtist {
  width: 15%;
}
.namOfUserReporting {
  width: 15%;
}
.time {
  width: 10%;
}
.contentReported {
  display: flex;
  width: 29%;
  justify-content: center;
}
.container-btn {
  display: flex;
  width: 11%;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
}
button {
  font-size: 13px;
  border: 1px solid #000000e2;
  border-radius: 4px;
  height: 25px;
  width: 40px;
  cursor: pointer;
  background: #ffffff;
}
.line {
  background: #000000;
  width: 99%;
  height: 1px;
}
a {
  text-decoration: none;
}
</style>
