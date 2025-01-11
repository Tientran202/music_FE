<template>
  <div id="home">
    <div class="container-lists">
      <div class="playlist-container">
        <div class="title-container">
          <div class="title">Album hàng đầu cho bạn</div>
          <a v-if="!showAll" @click="goToTopAlbum" class="view-all"
            >Xem tất cả</a
          >
        </div>
        <div class="playlist-wrapper">
          <div
            v-for="(TopAlbum, index) in listTopAlbums.slice(0, 8)"
            :key="index"
            class="playlist-item"
            @click="indexAlbum(TopAlbum.id)"
          >
            <img
              :src="'data:image/jpeg;base64,' + TopAlbum.img"
              alt="playlist cover"
              class="playlist-cover"
            />
            <p class="album_name">album: {{ TopAlbum.album_name }}</p>
            <p class="stage-name">{{ TopAlbum.stage_name }}</p>
          </div>
        </div>
      </div>
      <div class="playlist-container">
        <div class="title-container">
          <div class="title">Bài nhạc mới</div>
          <a v-if="!showAll" @click="goToNewMusic" class="view-all"
            >Xem tất cả</a
          >
        </div>
        <div class="playlist-wrapper">
          <div
            v-for="(listNewMusic, index) in listNewMusics.slice(0, 8)"
            :key="index"
            class="playlist-item"
            @click="navigateToMusic(listNewMusic.id)"
          >
            <img
              :src="'data:image/jpeg;base64,' + listNewMusic.img"
              alt="playlist cover"
              class="playlist-cover"
            />
            <p>{{ listNewMusic.name_music }}</p>
          </div>
        </div>
      </div>
      <div class="playlist-container">
        <div class="title-container">
          <div class="title">Bài nhạc gần đây</div>
          <a v-if="!showAll" @click="goRecentMusic" class="view-all"
            >Xem tất cả</a
          >
        </div>
        <div class="playlist-wrapper">
          <div
            v-for="(recentlyMusic, index) in recentlyMusics.slice(0, 8)"
            :key="index"
            class="playlist-item"
            @click="navigateToMusic(recentlyMusic.id)"
          >
            <img
              :src="'data:image/jpeg;base64,' + recentlyMusic.img"
              alt="playlist cover"
              class="playlist-cover"
            />
            <p>{{ recentlyMusic.music_name }}</p>
          </div>
        </div>
      </div>
     
      <div class="playlist-container">
        <div class="title-container">
          <div class="title">Nghệ sĩ gần đây</div>
          <a v-if="!showAll" @click="goToAllPopularArtist" class="view-all"
            >Xem tất cả</a
          >
        </div>
        <div class="playlist-wrapper">
          <div
            v-for="(popularArtist, index) in popularArtists.slice(0, 8)"
            :key="index"
            class="playlist-item"
            @click="indexArtist(popularArtist.id)"
          >
            <img
              :src="'data:image/jpeg;base64,' + popularArtist.avatar"
              alt="playlist cover"
              class="img-artist"
            />
            <p>{{ popularArtist.stage_name }}</p>
          </div>
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
      listTopAlbums: [],
      listNewMusics: [],
      recentlyMusics: [],
      popularArtists: [],
      imageSrc: null,
      categories: ["pop", "rap", "O&B"],
      showAll: false, 
      limit: 8, 
    };
  },

  computed: {
    visiblePlaylists() {
      return this.showAll
        ? this.listNewMusics
        : this.listNewMusics.slice(0, this.limit);
    },
  },
  methods: {
    async getAllTopAlbum() {
      const response = await axios.get(
        "http://localhost:8080/api/album/getTopAlbum"
      );
      this.listTopAlbums = response.data;
    },
    goToTopAlbum() {
      this.$router.push({ path: "/AllAlbum" });
    },
    goToNewMusic() {
      this.$router.push({ path: "/allNewMusic" });
    },
    goRecentMusic() {
      this.$router.push({ path: "/allRecentMusic" });
    },
    goToArtistDetail(artistId) {
      this.$router.push({ name: "informationA", params: { id: artistId } });
    },
    goPopulartionArtist() {
      this.$router.push({ path: "/allPopularArtist" });
    },

    async getNewMusic() {
      const response = await axios.get(
        "http://localhost:8080/api/music/getNewMusic"
      );
      this.listNewMusics = response.data;
    },
    async getRecentlyMusic() {
      const response = await axios.post(
        "http://localhost:8080/api/listening-history/recently-music",
        {
          id: localStorage.getItem("userId"),
        }
      );
      this.recentlyMusics = response.data;
    },

    async getPopularArtist() {
      const response = await axios.post(
        "http://localhost:8080/api/user/popularArtist",
        {
          id: localStorage.getItem("accountId"),
        }
      );
      this.popularArtists = response.data;
    },

    async fetchGenres() {
      try {
        const response = await axios.get("http://localhost:8080/api/genres");
        this.genres = response.data; 
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thể loại nhạc:", error);
      }
    },
    showAllPlaylists() {
      this.showAll = true; 
    },
    goToAllPopularArtist() {
      this.$router.push({ path: "/allPopularArtist" });
    },
    indexMusic() {
      this.$router.push({ path: "/" });
    },
    indexAlbum(albumId) {
      this.$router.push(`/indexAlbum/${albumId}`);
    },
    indexArtist(artistId) {
      this.$router.push(`/indexArtist/${artistId}`);
    },
    navigateToMusic(musicId) {
      this.$router.push(`/index/${musicId}`);
    },
    async fetchImage() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/auth/img/2`,
          {
            responseType: "arraybuffer",
          }
        );
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        this.imageSrc = `data:image/jpeg;base64,${base64}`;
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    },
  },
  created() {
    this.getAllTopAlbum();
    this.getNewMusic();
    this.getRecentlyMusic();
    this.getPopularArtist();
  },
  mounted() {
    this.fetchImage();
  },
};
</script>

<style scoped>
button {
  cursor: pointer; 
}

#home {
  overflow-x: hidden;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #121212;
  border-radius: 10px;
  height: 1600px;
}
.playlist-container {
  width: 99%;
  margin: 0 0 0 10px;
}
.album_name {
  color: rgb(255, 255, 255);
  text-align: left;
  font-size: 16px;
  margin: 0;
}
.stage-name {
  font-size: 12px;
  margin: 0px 0 0 0;
  text-align: left;
  color: #817474;
}
.container-lists {
  padding: 70px 0 0 0;
}
.title-container {
  color: rgb(255, 255, 255);
  width: 1410px;
  display: flex;
  justify-content: space-between;
}
.title {
  margin: 0 0 0 10px;
}
.view-all {
  cursor: pointer; 
}
.playlist-item {
  width: 300px;
  padding: 10px;
}
.playlist-item:hover {
  width: 300px;
  padding: 10px;
  background-color: #88888860;
  border-radius: 8px;
  cursor: pointer; 
}
.playlist-cover {
  border-radius: 5px;
  width: 150px;
  height: 150px;
}
.img-artist {
  border-radius: 90px;
  width: 150px;
  height: 150px;
}
.playlist-wrapper {
  display: flex;
  margin: 5px 0 0 0;
  padding: 15px 0px;
}
</style>
