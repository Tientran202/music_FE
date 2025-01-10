<template>
  <div class="container">
    <div class="container-search">
      <span class="title"> Người dùng đã bị ẩn</span>
    
    </div>
    <ul>
      <li class="index">#</li>
      <li class="nameUser">Tên người dùng</li>
      <li class="namOfUserReporting">Tên người báo cáo</li>
      <li class="time">Thời gian bị báo cáo</li>
      <li class="contentReported">Nội dung</li>
      <li class="timeHide">Bị ẩn</li>
      <li class="btn-appear"></li>
    </ul>
    <div class="line"></div>
    <ul class="sp-content" v-for="(hiddenUser, index) in hiddenUsers" :key="index">
      <li class="index">{{ index + 1 }}</li>
      <li class="nameUser">
        <a href="">{{ hiddenUser.user_name }}</a>
      </li>
      <li class="namOfUserReporting">
        <a href="">{{ hiddenUser.reportUserName }}</a>
      </li>
      <li class="time">{{ formatDate(hiddenUser.reporting_time) }}</li>
      <li class="contentReported">{{ hiddenUser.content }}</li>
      <li class="timeHide">{{ formatDate(hiddenUser.hidden_time) }}</li>
      <li class="btn-appear"><button>Bỏ ẩn</button></li>

    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {

  data() {
    return {
      hiddenUsers: [],
    };
  },
  created(){
    this.fetchHiddenUsers();
  },
  methods: {
    async fetchHiddenUsers() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/admin/hiddenUser"
        );
        this.hiddenUsers = response.data;
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
.title {
  font-size: 18px;
  font-weight: bold;
}
.container-search {
  padding: 10px 0 0 0;
}
.sp-search {
  padding: 0 10px 0 0;
  margin: 0 0 0 576px;
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
.nameUser {
  width: 15%;
}
.namOfUserReporting {
  width: 15%;
}
.time {
  width: 10%;
}
.timeHide {
  width: 10%;
}
.contentReported {
  display: flex;
  width: 35%;
  justify-content: center;
}

.container-btn {
  display: flex;
  width: 11%;
  flex-direction: row;
  gap: 10px;
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
