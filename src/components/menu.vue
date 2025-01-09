<!-- src/App.vue -->
<template>
  <div class="container">
    <div class="top">
      <header class="navbar">
        <div class="icon-home-container" @click="goHome">
          <img
            :src="require('/src/assets/home.png')"
            alt="sfwef"
            id="icon-home"
            to="/"
            @click="clearSearch"
          />
        </div>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          class="search-bar"
          v-model="searchKeyword"
          @keydown.enter="onSearch"
        />
      </header>
      <div v-if="!admin" class="image-user-container" @click="goToIndex">
        <img :src="require('/src/assets/user.png')" alt="" class="image-user" />
      </div>
      <div v-if="admin" class="image-user-container" @click="goToDashboard">
        <img
          :src="require('/src/assets/data-analytics.png')"
          alt=""
          class="image-data"
        />
      </div>
    </div>
    <main class="content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      admin: false,
      searchKeyword: decodeURIComponent(this.$route.query.keyword || ""), // Lấy từ query param nếu có
    };
  },
  created() {
    this.showAdmin();
  },
  methods: {
    showAdmin() {
      const role = localStorage.getItem("role");
      if (role == "admin") {
        this.admin = true;
      }
    },
    async goToDashboard() {
      // Chuyển hướng tới trang Home
      this.$router.push("/dashboard/musicReported");
    },
    async goHome() {
      // Chuyển hướng tới trang Home
      this.$router.push("/");
    },
    async goToIndex() {
      const role = localStorage.getItem("role");
      if (role == "artist") {
        this.$router.push("/informationArtist");
      } else {
        if (role == "user") {
          this.$router.push("/informationActor");
        }
        this.$router.push("/informationActor");
      }
    },
    // async goToIndex() {
    //   const accessToken = localStorage.getItem("accessToken");
    //   const refreshToken = localStorage.getItem("refreshToken");

    //   // Kiểm tra token
    //   if (!accessToken) {
    //     alert("Đăng nhập trước khi thực hiện");
    //     this.$router.push("/login");
    //     return; // Dừng nếu accessToken không tồn tại
    //   }
    //   try {
    //     // Gửi yêu cầu xác thực token
    //     const response = await axios.get(
    //       "http://localhost:8080/api/auth/check-token",
    //       { headers: { Authorization: `Bearer ${accessToken}` } }
    //     );
    //     if (response.status === 200) {
    //       const role = response.data.role;
    //       if (role === "artist") {
    //         const userId = response.data.userId;
    //         alert(userId);
    //         this.$router.push({
    //           name: "informationA",
    //         });
    //         localStorage.setItem("userId", userId);
    //         return; // Dừng lại sau khi điều hướng
    //       }
    //     }
    //   } catch (error) {
    //     // Xử lý lỗi nếu token không hợp lệ hoặc hết hạn
    //     if (error.response && error.response.status === 401) {
    //       alert("Access token hết hạn hoặc không hợp lệ.");
    //       try {
    //         // Yêu cầu làm mới token
    //         const refreshResponse = await axios.post(
    //           "http://localhost:8080/api/auth/refresh-token",
    //           { refresh_token: refreshToken }
    //         );

    //         if (refreshResponse.status === 200) {
    //           const newAccessToken = refreshResponse.data.access_token;
    //           localStorage.setItem("accessToken", newAccessToken);
    //           this.$router.push("/indexArtist");
    //         }
    //       } catch (refreshError) {
    //         console.error("Không thể làm mới token:", refreshError.message);
    //         alert("Vui lòng đăng nhập lại.");
    //         this.$router.push("/login");
    //       }
    //     } else {
    //       // Xử lý lỗi khác
    //       console.error("Đã xảy ra lỗi:", error);
    //       alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    //       this.$router.push("/login");
    //     }
    //   }
    // },

    onSearch() {
      // Điều hướng khi nhấn Enter
      if (this.searchKeyword.trim()) {
        this.$router.push({
          path: "/searchC/searchMusic",
          query: { keyword: encodeURIComponent(this.searchKeyword) }, // Lưu giá trị vào query param
        });
      }
    },
    clearSearch() {
      // Làm trống giá trị input khi click vào ảnh
      this.searchKeyword = "";
    },
  },
};
</script>
<style scoped>
.top {
  position: fixed;
  width: 1444px;
  margin: -10px -10px 0 -10px;
  font-family: Arial, Helvetica, sans-serif;
  height: 70px;
  background: #121212;
  z-index: 9999;
}
.container {
  color: #ffffff;
  display: flex;
  flex-direction: column;
  margin: -10px 0 0 -10px;
}
.navbar {
  padding: 15px;
  justify-content: center;
  display: flex;
  justify-content: center;
  gap: 10px;
}
.icon-home-container {
  background: #2c2c2c;
  border-radius: 90px;
  padding: 10px;
  width: 20px;
  height: 20px;
  justify-content: center;
  display: flex;
  cursor: pointer;
}
.search-bar {
  color: #ffffff;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #606060;
  box-sizing: border-box;
  width: 400px;
  border-radius: 90px;
  background: #121212;
}
.search-bar:hover {
  border: 1px solid #e8e5e5;
}
.search-bar:focus {
  border: 1px solid #e8e5e5;
  outline: none;
}
/* input:focus {
  height: 48px;
  background-color: #000000;
  border: 2px solid #ffffff;
  padding-left: 9px;
} */
.image-user-container {
  cursor: pointer;
  width: 40px;
  height: 40px;
  background: #2c2c2c;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 90px;
  margin: -55px 0 0 1350px;
}
.image-user {
  width: 20px;
  height: 20px;
  object-fit: cover;
  cursor: pointer;
}
.content {
  margin: 60px -20px -20px -10px;
  background: #121212;
  min-height: 1000px;
}
.image-data {
  width: 30px;
  height: 30px;
}
</style>