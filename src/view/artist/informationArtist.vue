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
          <span>Hồ sơ của bạn - Nghệ sĩ</span>
        </div>
        <div>
          <span class="name">{{ artists.artist_name }}</span>
        </div>
        <div class="dsp-ntd-container">
          <span>{{ artists.album_count }} album</span> |
          <span>{{ artists.playlist_count }} danh sách phát</span> |
          <span>{{ artists.music_count }} bài nhạc</span> |
          <span>{{ artists.flow_count }} người theo dõi</span>
        </div>
        <div class="setting-container">
          <img
            class="img-setting"
            :src="require('/src/assets/setting.png')"
            alt=""
            @click="goToSetting"
          />
          <img
            @click="FunctionDisplay"
            class="img-add"
            :src="require('/src/assets/add.png')"
            alt=""
          />
        </div>
        <functionDisplay
          v-if="isFunctionDisplay"
          @create-album="onCreateAlbum"
          @create-playlist="onCreatePlaylist"
          @add-music="onAddMusic"
          @create-story="onCreateStory"
        />
      </div>
    </div>
   
    <div class="info-playlist">
      <div class="title1">
        <span class="topic">Album</span>
      </div>
      <div class="container">
        <div
          v-for="(album, index) in albums"
          :key="index"
          class="item"
          @click="goToAlbum(album.album_id)"
        >
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
        <div
          v-for="(list, index) in playlists.slice(0, 7)"
          :key="index"
          class="item"
          @click="goToPlayList(list.playlist_id)"
        >
          <img
            class="img-item-playlist"
            :src="'data:image/jpeg;base64,' + list.playlist_img"
            alt=""
          />
          <span class="name-playlist">{{ list.playlist_name }}</span>
        </div>
      </div>
    </div>
    <div class="info-playlist">
      <div class="title1">
        <span class="topic">Bài nhạc</span>
      </div>
   
      <div class="container">
        <div
          v-for="(music, index) in musics.slice(0, 7)"
          :key="index"
          class="item"
          @click="goToMusic(music.music_id)"
        >
          <img
            v-if="music.hidden"
            class="flag-img"
            :src="require('/src/assets/finish.png')"
            alt=""
          />
          <img
            v-if="!music.confir"
            class="block-img"
            :src="require('/src/assets/block.png')"
            alt=""
          />

          <img
            class="img-item-playlist"
            :src="'data:image/jpeg;base64,' + music.music_img"
            alt=""
          />
          <span class="name-playlist">{{ music.music_name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import functionDisplay from "./components/functionDisplay.vue";
export default {
  components: { functionDisplay },
  data() {
    return {
      playlists: [],
      musics: [],
      artists: [],
      albums: [],
      storys: [],
      userId: "",
      limit: 7,
      isFunctionDisplay: false,
    };
  },
  created() {
    this.getIndexArtist();
    this.getAlbumByArtistId();
    this.getPlaylistByArtistId();
    this.getMusicByArtistId();
    this.getStoryByArtistId();
  },
  computed: {
    visiblePlaylists() {
      return this.showAll
        ? this.playlists
        : this.playlists.slice(0, this.limit);
    },
  },
  methods: {
    goToSetting() {
      this.$router.push({ path: "/settingInfoArtist" });
    },
    goToStory(storyId){
      this.$router.push(`/indexStory/${storyId}`)
    },
    goToAlbum(albumId) {
      this.$router.push(`/indexAlbum/${albumId}`);
    },
    goToPlayList(playlistId) {
      this.$router.push(`/playlist/${playlistId}`);
    },
    goToMusic(musicId) {
      this.$router.push(`/index/${musicId}`);
    },
    FunctionDisplay() {
      this.isFunctionDisplay = !this.isFunctionDisplay;
    },

    async getIndexArtist() {
      this.userId = localStorage.getItem("userId");
      const response = await axios.get(
        "http://localhost:8080/api/user/getIndexArtist",
        {
          params: { artistId: this.userId },
        }
      );
      this.artists = response.data;
    },

    async getAlbumByArtistId() {
      const response = await axios.get(
        "http://localhost:8080/api/album/getAlbumByArtistId",
        {
          params: { artistId: this.userId },
        }
      );
      this.albums = response.data;
    },

    async getPlaylistByArtistId() {
      const response = await axios.get(
        "http://localhost:8080/api/playlist/getPlaylistByArtistId",
        {
          params: { artistId: this.userId },
        }
      );
      this.playlists = response.data;
    },
    async getMusicByArtistId() {
      const response = await axios.get(
        "http://localhost:8080/api/music/getAllMusicCByArtistId",
        {
          params: { artistId: this.userId },
        }
      );
      this.musics = response.data;
    },
    async getStoryByArtistId() {
      const response = await axios.get(
        "http://localhost:8080/api/story/getAllStoryByArtistId",
        {
          params: { artistId: this.userId },
        }
      );
      this.storys = response.data;
    },
  },
};
</script>

<style scoped>
.info-container {
  height: 1600px;
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
  cursor: pointer;
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
  cursor: pointer;
}
.img-setting {
  width: 25px;
  margin: 0 0 0 10px;
}
.img-add {
  margin: 0 0 0 10px;
  width: 35px;
  cursor: pointer;
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
.img-item-story {
  width: 160px;
  height: 320px;
  border-radius: 10px;
}
.flag-img {
  position: absolute;
  width: 20px;
  height: 20px;
  margin: 5px 0 0 5px;
}
.block-img {
  position: absolute;
  width: 20px;
  height: 20px;
  margin: 5px 0 0 5px;
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