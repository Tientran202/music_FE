<template>
  <div class="container-menu">
    <router-link
      class="router"
      to="/dashboard/statisticalManage"
      :class="{ active: $route.name === 'statisticalManage' }"
    >
      <img :src="require('/src/assets/dashboard.png')" alt="" />
      <span> Thống kê</span>
    </router-link>

    <router-link
      class="router"
      to="/dashboard/userReported"
      :class="{ active: $route.name === 'userReported' }"
    >
      <img :src="require('/src/assets/report.png')" alt="" />
      <span>Người dùng bị báo cáo</span>
    </router-link>

    <router-link
      class="router"
      to="/dashboard/userHide"
      :class="{ active: $route.name === 'userHide' }"
    >
      <img :src="require('/src/assets/hide-user.png')" alt="" />
      <span>Người dùng bị ẩn</span>
    </router-link>

    <router-link
      class="router"
      to="/dashboard/musicReported"
      :class="{ active: $route.name === 'musicReported' }"
    >
      <img :src="require('/src/assets/musicReport.png')" alt="" />
      <span>Bài nhạc bị báo cáo</span>
    </router-link>

    <router-link
      class="router"
      to="/dashboard/musicHide"
      :class="{ active: $route.name === 'musicHide' }"
    >
      <img :src="require('/src/assets/musicReport.png')" alt="" />
      <span>Bài nhạc bị ẩn</span>
    </router-link>

    <router-link
      class="router"
      to="/dashboard/requestArtist"
      :class="{ active: $route.name === 'requestArtist' }"
    >
      <img :src="require('/src/assets/musical-note.png')" alt="" />
      <span>Yêu cầu thành nghệ sĩ</span>
    </router-link>

    <router-link
      class="router"
      to="/dashboard/artistList"
      :class="{ active: $route.name === 'artistList' }"
    >
      <img :src="require('/src/assets/mic.png')" alt="" />
      <span>Danh sách nghệ sĩ</span>
    </router-link>

    <router-link
      class="router"
      to="/dashboard/userList"
      :class="{ active: $route.name === 'userList' }"
    >
      <img :src="require('/src/assets/user1.png')" alt="" />
      <span>Danh sách người nghe</span>
    </router-link>
    <router-link
      class="router"
      to="/dashboard/allMusicUnconfirmed"
      :class="{ active: $route.name === 'allMusicUnconfirmed' }"
    >
      <img :src="require('/src/assets/musical-note.png')" alt="" />
      <span>Danh sách bài nhạc cần duyệt</span>
    </router-link>
  </div>
</template>
<style scoped>
.container-menu {
  background: #ffffff;
  display: flex;
  flex-direction: column;
  font-family: Arial, Helvetica, sans-serif;
}
.router {
  display: flex;
  align-items: center;
  height: 45px;
  text-decoration: none;
  border: 1px solid #c1c1c1;
  width: 300px;
  margin: 10px 0;
  border-radius: 5px;
}
.router:hover {
  background: #7f69693f;
}
.router.active {
  background-color: #7f69693f; /* Màu nền tùy ý */
}
img {
  width: 20px;
  margin: 0 0 0 50px;
}
span {
  margin: 0 0 0 10px;
  color: #896262;
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
}
</style>