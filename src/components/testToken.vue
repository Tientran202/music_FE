<template>
  <div class="profile">
    <h1>User Profile</h1>

    <div v-if="error" class="error">
      <p>Error: {{ error }}</p>
    </div>
    
    <div v-else-if="profile">
      <p><strong>Username:</strong> {{ profile }}</p>
    </div>

    <div v-else>
      <p>Click the button below to fetch profile data.</p>
    </div>

    <button @click="fetchProfile">Fetch Profile</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      profile: null, // Lưu username trả về
      error: null,   // Lưu thông báo lỗi nếu xảy ra vấn đề
    };
  },
  methods: {
    async fetchProfile() {
      try {
        this.error = null; // Xóa lỗi trước đó
        this.profile = null; // Xóa profile cũ

        // Lấy token từ LocalStorage (giả sử đã lưu khi đăng nhập)
        const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aWVuIiwiaWF0IjoxNzM0MjcyMjEzLCJleHAiOjE3MzQyNzMxMTN9.Xr7dh7mfgPN34UDlrc9FiAiJg3HOQduCJNOUPSa42Eg"; 
        if (!token) {
          this.error = "Token not found. Please log in!";
          return;
        }

        // Gọi API tới back-end với header Authorization
        const response = await axios.get("http://localhost:8080/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Đính kèm token
          },
        });

        // Token hợp lệ => lưu thông tin profile trả về
        this.profile = response.data; 
      } catch (error) {
        // Bắt các lỗi từ response hoặc lỗi liên quan token
        if (error.response && error.response.status === 403) {
          this.error = "Token invalid or expired. Access forbidden!";
        } else if (error.response && error.response.status === 404) {
          this.error = "User profile not found.";
        } else {
          this.error = "An unexpected error occurred.";
        }
      }
    },
  },
};
</script>

<style>
.profile {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
}
.error {
  color: red;
}
</style>
