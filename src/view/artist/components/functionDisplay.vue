<template>
  <div class="music-actions">
    <button @click="createAlbum">Tạo Album</button>
    <button @click="createPlaylist">Tạo Playlist</button>
    <button @click="addMusic">Thêm Nhạc</button>
    <button @click="createStory">Tạo Story</button>
  </div>
</template>

<script>
export default {
  name: "functionDisplay",
  methods: {
    createAlbum() {
      this.$router.push({ path: "/createAlbum" });
    },
    createPlaylist() {
      this.$emit("create-playlist");
    },
    addMusic() {
      console.log("Thêm nhạc");
      this.$router.push({ path: "/createMusic" });
    },
    createStory() {
      this.$router.push({ path: "/createStory" });
    },
  },
};
</script>
<style scoped>
.music-actions {
  margin: -35px 0 0 90px;
  padding: 2px;
  background: #5ba876;
  border: 1px solid #36a54e;
  width: 80px;
  height: 145px;
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