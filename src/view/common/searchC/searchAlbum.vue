<template>
  <div class="container">
    <div
      v-for="(playlist, index) in playlists"
      :key="index"
      class="playlist-container"
    >
      <img :src="require('/src/assets/mtp.jpeg')" alt="" />
      <div class="information-playlist">
        <span class="title1">{{ playlist.title }}</span>
        <div class="title3">
          <span class="title2">{{ playlist.year }}.</span>
          <span class="title2">{{ playlist.user }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  width: 97%;
  margin: 0 0 0 30px;
  font-family: Arial, Helvetica, sans-serif;
  padding: 20px 0 0 0;
}
.playlist-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 0px 0;
  border-radius: 5px;
  width: 190px;
  height: 250px;
}
.playlist-container:hover {
  background: #42424260;
}
img {
  width: 150px;
  border-radius: 5px;
}
.information-playlist {
  display: flex;
  flex-direction: column;
  margin: 10px 0 0 0;
}

.title1 {
  font-size: 14px;
  width: 150px;
  overflow: hidden; /* Ẩn phần văn bản tràn ra ngoài */
  text-overflow: ellipsis; /* Thêm dấu ba chấm khi văn bản bị cắt */
  display: block; /* Đảm bảo phần tử là block để các thuộc tính trên hoạt động */
}
.title2 {
  font-size: 12px;
  color: #7a7a7a;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}
.title3{
    display: flex;
}
</style>
<script>
export default {
  data() {
    return {
      playlists: [
        { title: "Chung Ta Cua Hien Tai", year: "2024", user: "Son Tung MTP" },
        { title: "Chung Ta Cua Hien Tai", year: "2024", user: "Son Tung MTP" },
        { title: "Chung Ta Cua Hien Tai", year: "2024", user: "Son Tung MTP" },
        { title: "Chung Ta Cua Hien Tai", year: "2024", user: "Son Tung MTP" },
        { title: "Chung Ta Cua Hien Tai", year: "2024", user: "Son Tung MTP" },
        { title: "Chung Ta Cua Hien Tai", year: "2024", user: "Son Tung MTP" },
        { title: "Chung Ta Cua Hien Tai", year: "2024", user: "Son Tung MTP" },
        { title: "Chung Ta Cua Hien Tai", year: "2024", user: "Son Tung MTP" },
        { title: "Chung Ta Cua Hien Tai", year: "2024", user: "Son Tung MTP" },
        { title: "Chung Ta Cua Hien Tai", year: "2024", user: "Son Tung MTP" },
        { title: "Chung Ta Cua Hien Tai", year: "2024", user: "Son Tung MTP" },
        { title: "Chung Ta Cua Hien Tai", year: "2024", user: "Son Tung MTP" },
        { title: "Chung Ta Cua Hien Tai", year: "2024", user: "Son Tung MTP" },
        { title: "Chung Ta Cua Hien Tai", year: "2024", user: "Son Tung MTP" },
        { title: "Chung Ta Cua Hien Tai", year: "2024", user: "Son Tung MTP" },
        { title: "Chung Ta Cua Hien Tai", year: "2024", user: "Son Tung MTP" },
        { title: "Chung Ta Cua Hien Tai", year: "2024", user: "Son Tung MTP" },
        { title: "Chung Ta Cua Hien Tai", year: "2024", user: "Son Tung MTP" },
        { title: "Chung Ta Cua Hien Tai", year: "2024", user: "Son Tung MTP" },
        { title: "Chung Ta Cua Hien Tai", year: "2024", user: "Son Tung MTP" },
        { title: "Chung Ta Cua Hien Tai", year: "2024", user: "Son Tung MTP" },
        { title: "Chung Ta Cua Hien Tai", year: "2024", user: "Son Tung MTP" },
        { title: "Chung Ta Cua Hien Tai", year: "2024", user: "Son Tung MTP" },
        { title: "Chung Ta Cua Hien Tai", year: "2024", user: "Son Tung MTP" },
        { title: "Chung Ta Cua Hien Tai", year: "2024", user: "Son Tung MTP" },
        { title: "Chung Ta Cua Hien Tai", year: "2024", user: "Son Tung MTP" },
        { title: "Chung Ta Cua Hien Tai", year: "2024", user: "Son Tung MTP" },
      ],
    };
  },
};
</script>
