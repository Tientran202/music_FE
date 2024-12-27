<template>
  <div class="info-container">
    <div class="info1">
      <img
        class="img-user"
        :src="'data:image/jpeg;base64,' + artists.artist_image"
        alt=""
      />
      <div class="info">
        <div>
          <span>Nghệ sĩ</span>
        </div>
        <div>
          <span class="name">{{ artists.artist_name }}</span>
        </div>
        <div class="dsp-ntd-container">
          <span>{{ artists.playlist_count }} danh sách phát</span> |
          <span>{{ artists.album_count }} album</span> |
          <span>{{ artists.flow_count }} người theo dõi</span>
        </div>
        <div class="setting-container">
          <img
            class="img-setting"
            :src="require('/src/assets/setting.png')"
            alt=""
          />
          <img class="img-add" :src="require('/src/assets/add.png')" alt="" />
        </div>
      </div>
    </div>
    <div class="info-playlist">
      <div class="title1">
        <span class="topic">Album</span>
      </div>
      <div class="container">
        <div v-for="(album, index) in albums" :key="index" class="item">
          <img
            class="img-item-playlist"
            :src="'data:image/jpeg;base64,' + album.album_img"
            alt=""
          />
          <span class="name-playlist">{{ album.album_name }}</span>
        </div>
      </div>
    </div>
    <div class="info-playlist">
      <div class="title1">
        <span class="topic">Danh sách phát công khai</span>
      </div>
      <div class="container">
        <div v-for="(list, index) in playlists" :key="index" class="item">
          <img
            class="img-item-playlist"
            :src="'data:image/jpeg;base64,' + list.playlist_img"
            alt=""
          />
          <span class="name-playlist">{{ list.playlist_name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    this.getIndexArtist();
    this.getAlbumByArtistId();
    this.getPlaylistByArtistId();
  },
  data() {
    return {
      artistId: "",
      playlists: {},
      artists: {},
      albums: {},
    };
  },
  methods: {
    async getIndexArtist() {
      this.artistId = this.$route.params.id;
      const response = await axios.get(
        "http://localhost:8080/api/user/getIndexArtist",
        {
          params: { artistId: this.artistId },
        }
      );
      this.artists = response.data;
    },

    async getAlbumByArtistId() {
      this.artistId = this.$route.params.id;
      const response = await axios.get(
        "http://localhost:8080/api/album/getAlbumByArtistId",
        {
          params: { artistId: this.artistId },
        }
      );
      this.albums = response.data;
    },

    async getPlaylistByArtistId() {
      this.artistId = this.$route.params.id;
      const response = await axios.get(
        "http://localhost:8080/api/playlist/getPlaylistByArtistId",
        {
          params: { artistId: this.artistId },
        }
      );
      this.playlists = response.data;
    },
  },
};
</script>

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
  text-align: left;
  margin: 10px 0 0 30px;
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
.title1 {
  text-align: left;
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
  text-align: left;
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
.img-add {
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
.more {
  margin: 0 0 0 1045px;
}
</style>