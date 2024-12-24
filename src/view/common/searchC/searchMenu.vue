<template>
  <div class="header-container">
    <router-link to="/searchC/">
      <button class="btn-header">Tất cả</button>
    </router-link>
    <router-link to="/searchC/searchMusic">
      <button class="btn-header">Bài hát</button>
    </router-link>
    <router-link to="/searchC/searchArtist">
      <button class="btn-header">Nghệ sĩ</button>
    </router-link>
    <router-link to="/searchC/searchPlaylist">
      <button class="btn-header">Playlist</button>
    </router-link>
    <router-link to="/searchC/searchAlbum">
      <button class="btn-header">Album</button>
    </router-link>
    <router-link to="/searchC/searchUser">
      <button class="btn-header">Hồ sơ</button>
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchArtistShow: false,
    };
  },
};
</script>

<style scoped>
.header-container {
  display: flex;
  background: #0f0f0f;
  padding: 10px 0 10px 40px;
  gap: 10px;
  border-radius: 10px 10px 0 0;
  font-family: Arial, Helvetica, sans-serif;
}
.btn-header {
  padding: 6px 15px 6px 15px;
  border-radius: 20px;
  border: 1px solid #373737;
  background: #363636;
  color: rgb(194, 194, 194);
  cursor: pointer;
}
.btn-header:hover {
  background: #4f4f4f;
  color: rgb(194, 194, 194);
}
</style>