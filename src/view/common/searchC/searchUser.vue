<template>
  <div class="container">
    <div
      class="artist-container"
      v-for="(artist, index) in artists"
      :key="index"
    >
      <img class="img-artist" :src="require('/src/assets/mtp.jpeg')" alt="" />
      <span class="name-artist">{{ artist.name }}</span>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 10px;
  padding: 10px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
}
.artist-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 250px;
  border-radius: 10px;
}
.artist-container:hover {
  background: #42424260;
}
img {
  width: 160px;
  height: 160px;
  border-radius: 50%;
}
.name-artist {
  margin: 10px 0 0 0;
}
</style>
<script>
export default {
  data() {
    return {
      artists: [
        { name: "Tran Ngoc Tien" },
        { name: "Tran Ngoc Tien" },
        { name: "Tran Ngoc Tien" },
        { name: "Tran Ngoc Tien" },
        { name: "Tran Ngoc Tien" },
        { name: "Tran Ngoc Tien" },
        { name: "Tran Ngoc Tien" },
        { name: "Tran Ngoc Tien" },
        { name: "Tran Ngoc Tien" },
        { name: "Tran Ngoc Tien" },
        { name: "Tran Ngoc Tien" },
        { name: "Tran Ngoc Tien" },
        { name: "Tran Ngoc Tien" },
        { name: "Tran Ngoc Tien" },
        { name: "Tran Ngoc Tien" },
        { name: "Tran Ngoc Tien" },
        { name: "Tran Ngoc Tien" },
        { name: "Tran Ngoc Tien" },
        { name: "Tran Ngoc Tien" },
        { name: "Tran Ngoc Tien" },
        { name: "Tran Ngoc Tien" },
      ],
    };
  },
};
</script>
