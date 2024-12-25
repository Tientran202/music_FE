<template>
  <div class="header-container">
    <router-link :to="getMenuLink('searchMusic')">
      <button class="btn-header">Bài hát</button>
    </router-link>
    <router-link :to="getMenuLink('searchArtist')">
      <button class="btn-header">Nghệ sĩ</button>
    </router-link>
    <router-link :to="getMenuLink('searchPlaylist')">
      <button class="btn-header">Playlist</button>
    </router-link>
    <router-link :to="getMenuLink('searchAlbum')">
      <button class="btn-header">Album</button>
    </router-link>
  </div>
</template>
<script>
export default {
  computed: {
    // Lấy keyword từ query param
    searchKeyword() {
      return this.$route.query.keyword || "";
    },
  },
  data() {
    return {
      searchArtistShow: false,
    };
  },
  methods: {
    getMenuLink(menuType) {
      return {
        path: `/searchC/${menuType}`,
        query: { keyword: encodeURIComponent(this.searchKeyword) },
      };
    },
  },
};
</script>

<style scoped>
.header-container {
  position: fixed;

  width: 100%; /* Chiều rộng bằng với toàn bộ màn hình */
  z-index: 1000; /* Đảm bảo menu nằm trên các phần tử khác */

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