<!-- src/App.vue -->
<template>
  <div class="container">
    <div class="top">
      <header class="navbar" v-if="search">
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
        <span class="loginD" @click="gotToLogin"> Đăng nhập </span>
      </header>
      <div
        v-if="admin === 'user'"
        class="image-user-container"
        @click="goToIndex"
      >
        <img :src="require('/src/assets/user.png')" alt="" class="image-user" />
      </div>
      <div
        v-if="admin === 'admin'"
        class="image-user-container"
        @click="goToDashboard"
      >
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
      admin: "",
      search: true,
      searchKeyword: decodeURIComponent(this.$route.query.keyword || ""),
    };
  },
  watch: {
    $route() {
      this.showAdmin(); // Gọi lại khi route thay đổi
    },
  },
  methods: {
    showAdmin() {
      const role = localStorage.getItem("role");
      const token = localStorage.getItem("accessToken");
      if (role == "admin" && token != "") {
        this.admin = "admin";
      } else {
        if ((role == "user" || role == "artist") && token != "") {
          this.admin = "user";
        } else {
          this.admin = "";
          this.search = false;
        }
      }
    },
    gotToLogin() {
      this.$router.push("/login");
    },
    async goToDashboard() {
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
.logout {
  position: absolute;
  margin: -32px 0 0 680px;
  width: 20px;
  height: 20px;
}
.logoutH {
  position: absolute;
}
.loginD {
  cursor: pointer;
  position: absolute;
  margin: 10px 0 0 1100px;
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