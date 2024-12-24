<template>
  <div class="info-container">
    <div class="info1">
      <img class="img-user" :src="require('/src/assets/mtp.jpeg')" alt="" />
      <div class="info">
        <div>
          <span>Nghệ sĩ</span>
        </div>
        <div>
          <span class="name">TranNgocTien</span>
        </div>
        <div class="dsp-ntd-container">
          <span>1 danh sách phát</span> | <span>1 album</span> |
          <span>8 người theo dõi</span> |
          <span>10 đang theo dõi</span>
        </div>
        <div class="setting-container">
          <img
            class="img-setting"
            :src="require('/src/assets/setting.png')"
            alt=""
          />
          <img
            class="img-add"
            :src="require('/src/assets/add.png')"
            alt=""
          />
        </div>
      </div>
    </div>

    <div class="info-playlist">
      <div>
        <span class="topic">Album</span>
      </div>
      <div class="container">
        <div v-for="(album, index) in albums" :key="index" class="item">
          <img
            class="img-item-playlist"
            :src="require('/src/assets/mtp.jpeg')"
            alt=""
          />
          <span class="name-playlist">{{ album.name }}</span>
        </div>
      </div>
    </div>

    <div class="info-playlist">
      <div>
        <span class="topic">Danh sách phát công khai</span>
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
      <div>
        <span class="topic">Dang theo doi</span>
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
  height: 1040px;
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
  margin: 10px 0 0 30px;
}

.topic {
  font-size: 20px;
  font-weight: bold;
  width: 100%;
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
.info-playlist {
  margin: 20px 0 0 50px;
}
.container {
  display: flex;
  width: 100%;
  gap: 40px;
}
.item {
  display: flex;
  flex-direction: column;
  margin: 10px 0 10px 0;
}
.item-artist {
  margin: 10px 20px 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.name-playlist {
  margin: 5px 0 0 0;
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
.img-add{
  margin: 0 0 0 10px;
  width: 35px;
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
.more {
  margin: 0 0 0 1045px;
}
</style>
<script>
export default {
  data() {
    return {
      lists: [
        { name: "playlist1" },
        { name: "playlist2" },
        { name: "playlist1" },
        { name: "playlist2" },
        { name: "playlist1" },
        { name: "playlist2" },
        { name: "playlist1" },
        
        
      ],
      albums: [
        { name: "album1" },
        { name: "album2" },
        { name: "album1" },
        { name: "album2" },
        { name: "album1" },
        { name: "album1" },
        { name: "album2" },
      ],
      artists: [{ name: "artist2" }, { name: "artist3" }],
    };
  },
};
</script>
