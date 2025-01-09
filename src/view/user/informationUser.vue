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
        <div class="setting-container">
          <button @click="requestBecomeArtist" class="button-request-artist">
            Yêu cầu thành nghệ sĩ
          </button>
          <img
            class="img-setting"
            :src="require('/src/assets/setting.png')"
            alt=""
            @click="FunctionDisplay"
          />
          <functionDisplay
            v-if="isFunctionDisplay"
            @create-playlist="onCreatePlaylist"
            @create-story="onCreateStory"
          />
        </div>
      </div>
    </div>

    <div class="info">
      <div class="title">
        <div class="title1">
          <span class="topic">Danh sách phát công khai</span>
        </div>
        <span class="more" @click="goToAllPlaylistUser">xem tất cả</span>
      </div>
      <div class="container">
        <div
          v-for="(playlist, index) in playlists"
          :key="index"
          class="item"
          @click="goToIndexPlaylist(playlist.playlist_id)"
        >
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
        </div>
        <span class="more">xem tất cả</span>
      </div>
      <div class="container">
        <div
          v-for="(flowing, index) in flowings"
          :key="index"
          class="item-artist"
          @click="indexArtist(flowing.artist_id)"
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
import functionDisplay from "./components/functionDisplayUser.vue";
export default {
  components: { functionDisplay },
  created() {
    this.getIndexUser();
    this.getPlaylistByUserId();
    this.getFlowingByUserId();
  },
  data() {
    return {
      userId: localStorage.getItem("userId"),
      user: {},
      playlists: {},
      flowings: {},
      isFunctionDisplay: false,
    };
  },
  methods: {
    async getIndexUser() {
      const response = await axios.get(
        "http://localhost:8080/api/user/getIndexUser",
        {
          params: { userId: this.userId },
        }
      );
      this.user = response.data;
    },
    goToAllPlaylistUser() {
      this.$router.push(`/allPlaylistUser`);
    },
    indexArtist(artistId) {
      this.$router.push(`/indexArtist/${artistId}`);
    },
    goToIndexPlaylist(playlistId) {
      this.$router.push(`/playlist/${playlistId}`);
    },
    FunctionDisplay() {
      this.isFunctionDisplay = !this.isFunctionDisplay;
    },
    requestBecomeArtist() {
      this.$router.push({ path: "/becomArtist" });
    },
    async getPlaylistByUserId() {
      const response = await axios.get(
        "http://localhost:8080/api/playlist/getPlaylistByUserIdLimit",
        {
          params: { userId: this.userId },
        }
      );
      this.playlists = response.data;
    },
    async getFlowingByUserId() {
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
  height: 1000px;
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
.countPlaylist{
  cursor: pointer;
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
.more{
  cursor: pointer;
}
.container {
  display: flex;
  width: 100%;
}
.item {
  display: flex;
  flex-direction: column;
  margin: 10px 20px 10px 20px;
  cursor: pointer;
}
.name-playlist {
  margin: 10px 0 0 0;
}
.item-artist {
  margin: 10px 20px 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.setting-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0 0 0;
}
.img-setting {
  cursor: pointer;
  width: 25px;
  margin: 0 0 0 10px;
}
.button-request-artist {
  padding: 8px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background: #d545ba;
  color: #ffffff;
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
  height: 160px;
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