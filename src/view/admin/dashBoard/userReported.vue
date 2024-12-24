<template>
  <div class="container">
    <div class="container-search">
      <span class="title">Tất cả người dùng bị báo cáo</span>
      <span class="sp-search">Tìm kiếm</span>
      <input class="input-search" type="text" placeholder="Nhập từ khoá" />
    </div>
    <ul>
      <li class="index">#</li>
      <li class="nameUser">Tên người dùng</li>
      <li class="namOfUserReporting">Tên người báo cáo</li>
      <li class="time">Thời gian</li>
      <li class="contentReported">Nội dung</li>
    </ul>
    <div class="line"></div>
    <ul
      class="ul-content"
      v-for="(reportedUsers, index) in reportedUsers"
      :key="index"
    >
      <li class="index">{{ index + 1 }}</li>
      <li class="nameUser">
        <a href="">{{ reportedUsers.userName }}</a>
      </li>
      <li class="namOfUserReporting">
        <a href="">{{ reportedUsers.reportUserName }}</a>
      </li>
      <li class="time">{{ formatDate(reportedUsers.day) }}</li>
      <li class="contentReported">{{ reportedUsers.reportContent }}</li>
      <li class="container-btn">
        <button>Ẩn</button>
        <button>Huỷ</button>
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
      reportedUsers: [],
    };
  },
  methods: {
    async fetchReportedUsers() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/admin/reportedUser"
        );
        this.reportedUsers = response.data;
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
  margin: 0 0 0 500px;
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
  width: 2%;
}
.nameUser {
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
  width: 47%;
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

