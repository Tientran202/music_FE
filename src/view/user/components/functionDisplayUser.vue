<template>
  <div class="music-actions">
    <button @click="createPlaylist">Tạo Playlist</button>
    <button @click="setting">Chỉnh sửa</button>
  </div>
</template>

<script>
export default {
  name: "functionDisplay",
  methods: {
    createPlaylist() {
      this.$router.push({ path: "/createPlaylistUser" });
    },
    setting() {
      this.$router.push({ path: "/settingU" });
    },
  },
};
</script>
<style scoped>
.music-actions {
  margin: 50px 0 0 190px;
  padding: 2px;
  background: #5ba876;
  border: 1px solid #36a54e;
  width: 80px;
  height: 75px;
  border-radius: 10px;
  position: absolute;
  z-index: 999;
}
button {
  cursor: pointer;
  margin: 3px 0;
  width: 80px;
  height: 30px;
  font-size: 12px;
  border-radius: 5px;
  border: none;
  background: #126724;
  color: #ffffff;
}
</style>