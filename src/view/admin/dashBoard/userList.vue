<template>
  <div class="container">
    <div class="container-search">
      <span class="title">Danh sách người dùng thường</span>
      <span class="sp-search">Tìm kiếm</span>
      <input class="input-search" type="text" placeholder="Nhập từ khoá" />
    </div>
    <ul>
      <li class="index">#</li>
      <li class="name-user">Tên</li>

      <li class="time">Thời gian tham gia</li>
    </ul>
    <dir class="line"></dir>

    <ul class="content1" v-for="(listUser, index) in listUsers" :key="index">
      <li class="index">{{ index +1}}</li>
      <li class="name-user">
        <a href="">{{ listUser.name }}</a>
      </li>
      <li class="time">{{ formatDate(listUser.register_date) }}</li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
export default {
  created() {
    this.fetchListUsers();
  },
  data() {
    return {
      listUsers: [],
    };
  },
  methods: {
    async fetchListUsers() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/admin/findAllUser"
        );
        this.listUsers = response.data;
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
  margin: 0 0 0 485px;
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
  width: 15%;
  justify-content: center;
}
.name-user {
  width: 45%;
}
a {
  text-decoration: none;
}

.time {
  width: 30%;
}
.btn {
  width: 10%;
  display: flex;
  justify-content: center;
}
button {
  border: 1px solid #000000;
  background: #ffffff;
  border-radius: 5px;
  height: 25px;
  width: 40px;
  font-size: 12px;
  cursor: pointer;
}
</style>