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
      <div class="image-user-container">
        <img
          :src="require('/src/assets/user.png')"
          alt=""
          class="image-user"
          @click="goToIndex"
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
      searchKeyword: decodeURIComponent(this.$route.query.keyword || ""), // Lấy từ query param nếu có
    };
  },
  methods: {
    async goHome() {
      // Chuyển hướng tới trang Home
      this.$router.push("/");
    },
    async goToIndex() {
      const role = localStorage.getItem("role");
      if (role == "artist") {
        alert("lo");
        this.$router.push("/indexArtist");
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
}
.content {
  margin: 60px -20px -20px -10px;
  background: #121212;
  min-height: 1000px;
}
</style>