<template>
  <div class="info-container">
    <div class="info1">
      <img class="img-user" :src="require('/src/assets/mtp.jpeg')" alt="" />
      <div class="info">
        <div>
          <span>Hồ sơ</span>
        </div>
        <div>
          <span class="name">TranNgocTien</span>
        </div>
        <div class="dsp-ntd-container">
          <span>1 danh sách phát</span> |
          <span>8 đang theo dõi</span>
        </div>
        <div class="setting-container">
          <button class="button-request-artist">Yêu cầu thành nghệ sĩ</button>
          <img
            class="img-setting"
            :src="require('/src/assets/setting.png')"
            alt=""
          />
        </div>
      </div>
    </div>

    <div class="info">
      <div class="title">
        <div class="title1">
          <span class="topic">Danh sách phát công khai</span>
          <img class="img-add2" :src="require('/src/assets/add2.png')" alt="" />
        </div>
        <span class="more">xem tất cả</span>
      </div>
      <div class="container">
        <div v-for="(list, index) in lists" :key="index" class="item">
          <img
            class="img-item-playlist"
            :src="require('/src/assets/mtp.jpeg')"
            alt=""
          />
          <span class="name-playlist">{{ list.name }}</span>
        </div>
      </div>
    </div>

    <div class="info">
      <div class="title">
        <div class="title1">
          <span class="topic">Dang theo doi</span>
          <img class="img-add2" :src="require('/src/assets/add2.png')" alt="" />
        </div>
        <span class="more">xem tất cả</span>
      </div>
      <div class="container">
        <div
          v-for="(artist, index) in artists"
          :key="index"
          class="item-artist"
        >
          <img
            class="img-item-artist"
            :src="require('/src/assets/mtp.jpeg')"
            alt=""
          />
          <span class="name-artist">{{ artist.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.info-container {
  height: 840px;
  flex-direction: column;
  display: flex;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  background: #191919;
  border-radius: 10px;
}
.info1 {
  width: 100%;
  display: flex;
  height: 230px;
  padding: 40px 0 0 0px;
  border-radius: 10px 10px 0 0;
  flex-direction: row;
}
.info {
  margin: 10px 0 0 20px;
}
.topic {
  font-size: 20px;
  font-weight: bold;
}
.img-user {
  height: 200px;
  width: 200px;
  border-radius: 50%;
  margin: 0 0 0 40px;
}
.name {
  font-size: 6rem;
  font-weight: bold;
}

.container {
  display: flex;
  width: 100%;
}
.item {
  margin: 10px 0 10px 0;
}
.item-artist {
  margin: 10px 20px 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.setting-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0 0 0;
}
.img-setting {
  width: 25px;
  margin: 0 0 0 10px;
}
.button-request-artist {
  padding: 8px;
  border-radius: 5px;
  border: none;
}
.name-artist {
  margin: 10px 0 0 0;
}
.img-item-playlist {
  width: 160px;
  border-radius: 10px;
}
.img-item-artist {
  width: 160px;
  border-radius: 50%;
}
.info2 {
  padding: 0 0 0 20px;
  background: #4d4a4a;
  width: 100%;
}
.title {
  display: flex;
  width: 97%;
  justify-content: space-between;
}
.img-add2 {
  width: 20px;
  height: 20px;
  margin: 0 0 0 10px;
}
.title1 {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
<script>
export default {
  data() {
    return {
      lists: [
        { name: "playlist1" },
        { name: "playlist2" },
        { name: "playlist3" },
        { name: "playlist4" },
        { name: "playlist5" },
        { name: "playlist6" },
        { name: "playlist7" },
        
      ],
      artists: [
        { name: "artist2" },
        { name: "artist3" },
        { name: "artist4" },
        { name: "artist5" },
        { name: "artist6" },
        { name: "artist7" },
        { name: "artist8" },
      ],
    };
  },
};
</script>
