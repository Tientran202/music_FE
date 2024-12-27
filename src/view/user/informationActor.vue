<template>
  <div class="info-container">
    <div class="info1">
      <img
        class="img-user"
        :src="'data:image/jpeg;base64,' + user.user_img"
        alt=""
      />
      <div class="info">
        <div>
          <span>Hồ sơ</span>
        </div>
        <div>
          <span class="name">{{ user.user_name }}</span>
        </div>
        <div class="dsp-ntd-container">
          <span>{{ user.total_playlist }} danh sách phát</span>
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
        <div v-for="(playlist, index) in playlists" :key="index" class="item">
          <img
            class="img-item-playlist"
            :src="'data:image/jpeg;base64,' + playlist.playlist_img"
            alt=""
          />
          <span class="name-playlist">{{ playlist.playlist_name }}</span>
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
          v-for="(flowing, index) in flowings"
          :key="index"
          class="item-artist"
        >
          <img
            class="img-item-artist"
            :src="'data:image/jpeg;base64,' + flowing.artist_img"
            alt=""
          />
          <span class="name-artist">{{ flowing.artist_name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    this.getIndexUser();
    this.getPlaylistByUserId();
    this.getFlowingByUserId();
  },
  data() {
    return {
      userId: "",
      user: {},
      playlists:{},
      flowings:{}
    };
  },
  methods: {
    async getIndexUser() {
      this.userId = this.$route.params.id;
      const response = await axios.get(
        "http://localhost:8080/api/user/getIndexUser",
        {
          params: { userId: this.userId },
        }
      );
      this.user = response.data;
    },
    async getPlaylistByUserId() {
      this.userId = this.$route.params.id;
      const response = await axios.get(
        "http://localhost:8080/api/playlist/getPlaylistByUserId",
        {
          params: { userId: this.userId },
        }
      );
      this.playlists = response.data;
    },
    async getFlowingByUserId() {
      this.userId = this.$route.params.id;
      const response = await axios.get(
        "http://localhost:8080/api/user/getFlowingByUserId",
        {
          params: { userId: this.userId },
        }
      );
      this.flowings = response.data;
    },
  },
};
</script>
F
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
  text-align: left;
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
  height: 160px;
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