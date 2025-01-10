<template>
  <div class="container">
    <div class="container-search">
      <span class="title">Danh sách người dùng yêu cầu trở thành nghệ sĩ</span>
     
    </div>
    <ul>
      <li class="index">#</li>
      <li class="name-user">Tên người dùng</li>
      <li class="stage-name">Nghệ danh</li>
      <li class="time">Thời gian</li>
      <li class="btn"></li>
    </ul>
    <div class="line"></div>
    <ul
      class="content1"
      v-for="(requestToBecomeArtist, index) in requestToBecomeArtists"
      :key="index"
    >
      <li class="index">{{ index + 1 }}</li>
      <li class="name-user">{{ requestToBecomeArtist.name }}</li>
      <li class="stage-name">{{ requestToBecomeArtist.stage_name }}</li>
      <li class="time">{{ requestToBecomeArtist.time_request_artist }}</li>
      <li class="btn">
        <button @click="acceptRequestArtist(requestToBecomeArtist.id)">Chấp nhận</button>
        <button>Huỷ</button>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
export default {
  created() {
    this.fetchRequestToBecomeArtist();
  },
  methods: {
    async acceptRequestArtist(reportId) {
      try {
        const formData = new FormData();
        formData.append("userId", reportId);
        const response = await fetch(
          "http://localhost:8080/api/admin/acceptRequestArtist",
          {
            method: "POST",
            body: formData,
          }
        );
        if (response.ok) {
          alert("Đã chấp nhận yêu cầu");
          this.fetchRequestToBecomeArtist();
        } else {
          alert("lỗi");
        }
      } catch (error) {
        console.error("Error uploading music:", error);
        alert("Có lỗi xảy ra khi tải bài hát lên.");
      }
    },
    async fetchRequestToBecomeArtist() {
      try {
        const response = await axios.get(
          "  http://localhost:8080/api/admin/requestToBecomeArtist"
        );
        this.requestToBecomeArtists = response.data;
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
  data() {
    return {
      requestToBecomeArtists: [],
    };
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

.content1:hover {
  background: #9b8181;
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
  margin: 0 0 0 330px;
}
.input-search {
  width: 200px;
  height: 30px;
  border-radius: 5px;
  border: 2px solid #000000;
  padding: 0 0 0 10px;
}
.line {
  background: #000000;
  width: 98%;
  height: 1px;
}
.index {
  width: 10%;
}

.name-user {
  width: 25%;
}
.stage-name {
  width: 25%;
}
.time {
  width: 20%;
}
.btn {
  display: flex;
  width: 20%;
  gap: 10px;
  justify-content: center;
}
button {
  height: 25px;
  border: 1px solid #000000;
  background: #ffffff;
  border-radius: 4px;
}
</style>

