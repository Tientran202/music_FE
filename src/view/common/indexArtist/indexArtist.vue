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
          <span @click="goToAllAlbumArtist"
            >{{ artists.album_count }} album</span
          >
          |
          <span @click="goToAllPlaylistArtist"
            >{{ artists.playlist_count }} danh sách phát</span
          >
          | <span>{{ artists.flow_count }} người theo dõi</span> |
          <span @click="goToAllMusicArtist"
            >{{ artists.music_count }} bài nhạc</span
          >
        </div>
        <button
          class="btn-flow"
          @click="isFollowing ? unflowArtist() : flowArtist()"
        >
          {{ isFollowing ? "Bỏ theo dõi" : "Theo dõi" }}
        </button>
        <div class="setting-container"></div>
      </div>
    </div>
    <div class="info-playlist">
      <div class="title1">
        <span class="topic" @click="goToAllAlbumArtist"> Album </span>
      </div>
      <div class="container">
        <div
          v-for="(album, index) in albums"
          :key="index"
          class="item"
          @click="navigateToAlbum(album.album_id)"
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
        <span class="topic" @click="goToAllPlaylistArtist"
          >Danh sách phát công khai</span
        >
      </div>
      <div class="container">
        <div
          v-for="(list, index) in playlists.slice(0, 7)"
          :key="index"
          class="item"
          @click="navigateTopPlaylist(list.playlist_id)"
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
        <span @click="goToAllMusicArtist" class="topic">Bài nhạc</span>
      </div>
      <div class="container">
        <div
          v-for="(music, index) in musics.slice(0, 7)"
          :key="index"
          class="item"
          @click="goToIndexMusic(music.music_id)"
        >
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
export default {
  data() {
    return {
      isFollowing: false,
      playlists: [],
      musics: [],
      artists: [],
      albums: [],
      userId: "",
      limit: 7,
      artistId: "",
    };
  },
  created() {
    this.getIndexArtist();
    this.getAlbumByArtistId();
    this.getPlaylistByArtistId();
    this.getMusicByArtistId();
    this.getFollowStatus();
  },
  computed: {
    visiblePlaylists() {
      return this.showAll
        ? this.playlists
        : this.playlists.slice(0, this.limit);
    },
  },
  methods: {
    async flowArtist() {
      const artistId = this.$route.params.id;
      const userId = localStorage.getItem("userId");
      const response = await axios.post(
        "http://localhost:8080/api/follow/followArtist",
        null,
        {
          params: {
            artistId: artistId,
            userId: userId,
          },
        }
      );
      if (response.status == 200) {
        this.isFollowing = !this.isFollowing;
        alert("Đã theo dõi");
      }
    },
    navigateToAlbum(albumId) {
      this.$router.push(`/indexAlbum/${albumId}`);
    },
    async getFollowStatus() {
      this.artistId = this.$route.params.id;
      const userId = localStorage.getItem("userId"); 
      try {
        const response = await axios.get(
          "http://localhost:8080/api/follow/getFollow",
          {
            params: {
              userId: userId,
              artistId: this.artistId,
            },
          }
        );

        if (response.status === 200) {
          const isFollowing = response.data; 
          console.log("Follow status:", isFollowing);
          this.isFollowing = isFollowing;
        }
      } catch (error) {
        console.error("Error while checking follow status:", error);
        alert("Failed to get follow status.");
      }
    },

    async unflowArtist() {
      const artistId = this.$route.params.id;
      const userId = localStorage.getItem("userId");
      const response = await axios.patch(
        "http://localhost:8080/api/follow/unFlowArtist",
        null,
        {
          params: {
            userId: userId,
            artistId: artistId,
          },
        }
      );
      if (response.status == 200) {
        this.isFollowing = !this.isFollowing;
        alert("Đã bỏ theo dõi");
      }
    },
    navigateTopPlaylist(playlist) {
      this.$router.push(`/playlist/${playlist}`);
    },
    goToAllPlaylistArtist() {
      this.$router.push({ path: `/allPlaylistArtist/${this.artistId}` });
    },
    goToAllAlbumArtist() {
      this.$router.push({ path: `/allAlbumArtist/${this.artistId}` });
    },
    goToAllMusicArtist() {
      this.$router.push({ path: `/allMusicArtist/${this.artistId}` });
    },
    goToSetting() {
      this.$router.push({ path: "/settingInfoArtist" });
    },
    

    async getIndexArtist() {
      this.userId = this.$route.params.id;
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
        "http://localhost:8080/api/album/getAlbumByArtistIdlimit",
        {
          params: { artistId: this.userId },
        }
      );
      this.albums = response.data;
    },
    goToIndexMusic(musicId) {
      this.$router.push(`/index/${musicId}`);
    },
    async getPlaylistByArtistId() {
      const response = await axios.get(
        "http://localhost:8080/api/playlist/getPlaylistByArtistIdLimit",
        {
          params: { artistId: this.userId },
        }
      );
      this.playlists = response.data;
    },
    async getMusicByArtistId() {
      const response = await axios.get(
        "http://localhost:8080/api/music/getMusicByArtistId",
        {
          params: { artistId: this.userId },
        }
      );
      this.musics = response.data;
    },
  },
};
</script>

<style scoped>
.info-container {
  height: 1400px;
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
.btn-flow {
  background: #009959;
  border-radius: 7.5px;
  width: 120px;
  height: 35px;
  border: 0px;
  color: rgb(255, 255, 255);
  cursor: pointer;
}

.btn-flow:active {
  background: #037545;
  border: 1px solid #000000;
  font-size: 13px;
}
.dsp-ntd-container{
  cursor: pointer;
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
  cursor: pointer;
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
  margin: 10px 0 0 0;
  display: flex;
  width: 100%;
  gap: 15px;
  text-align: left;
  cursor: pointer;
}

.item {
  display: flex;
  flex-direction: column;
  padding: 10px 10px 40px 10px;
  border-radius: 10px;
}
.item:hover {
  background: #323131;
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