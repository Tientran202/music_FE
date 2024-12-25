<template>
  <div id="home">
    <div class="container-lists">
      <div class="playlist-container">
        <div class="title-container">
          <div class="title">Album</div>
          <a v-if="!showAll" class="view-all">Xem tất cả</a>
        </div>
        <div class="playlist-wrapper">
          <div
            v-for="(TopAlbum, index) in listTopAlbums"
            :key="index"
            class="playlist-item"
            @click="indexAlbum(TopAlbum.id)"
          >
            <img
              :src="'data:image/jpeg;base64,' + TopAlbum.img"
              alt="playlist cover"
              class="playlist-cover"
            />
            <p>{{ TopAlbum.album_name }}</p>
          </div>
        </div>
      </div>
      <div class="playlist-container">
        <div class="title-container">
          <div class="title">Bài nhạc mới</div>
          <a v-if="!showAll" class="view-all">Xem tất cả</a>
        </div>
        <div class="playlist-wrapper">
          <div
            v-for="(listNewMusic, index) in listNewMusics"
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
          <a v-if="!showAll" class="view-all">Xem tất cả</a>
        </div>
        <div class="playlist-wrapper">
          <div
            v-for="(recentlyMusic, index) in recentlyMusics"
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
          <div class="title">Hàng đầu cho bạn</div>
          <a v-if="!showAll" class="view-all">Xem tất cả</a>
        </div>
        <div class="playlist-wrapper">
          <div
            v-for="(playlist, index) in visiblePlaylists"
            :key="index"
            class="playlist-item"
            @click="indexMusic(playlist.id)"
          >
            <img
              :src="playlist.cover"
              alt="playlist cover"
              class="playlist-cover"
            />
            <p>{{ playlist.name }}</p>
          </div>
        </div>
      </div>
      <div class="playlist-container">
        <div class="title-container">
          <div class="title">Nghệ sĩ gần đây</div>
          <a v-if="!showAll" class="view-all">Xem tất cả</a>
        </div>
        <div class="playlist-wrapper">
          <div
            v-for="(popularArtist, index) in popularArtists"
            :key="index"
            class="playlist-item"
            @click="indexMusic(popularArtist.id)"
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
      genres: [
        { genre_id: 1, genre: "Trữ tình" },
        { genre_id: 2, genre: "Pop" },
        { genre_id: 3, genre: "Rock" },
        { genre_id: 4, genre: "Jazz" },
      ], // Chứa danh sách thể loại nhạc
      imageSrc: null,
      categories: ["pop", "rap", "O&B"],
      showAll: false, // Trạng thái hiển thị (giới hạn hoặc tất cả)
      playlists: [
        { name: "Playlist 1", cover: "https://via.placeholder.com/150" },
        { name: "Playlist 2", cover: "https://via.placeholder.com/150" },
        { name: "Playlist 3", cover: "https://via.placeholder.com/150" },
        { name: "Playlist 4", cover: "https://via.placeholder.com/150" },
        { name: "Playlist 5", cover: "https://via.placeholder.com/150" },
        { name: "Playlist 6", cover: "https://via.placeholder.com/150" },
        { name: "Playlist 7", cover: "https://via.placeholder.com/150" },
        { name: "Playlist 8", cover: "https://via.placeholder.com/150" },
        { name: "Playlist 1", cover: "https://via.placeholder.com/150" },
        { name: "Playlist 2", cover: "https://via.placeholder.com/150" },
        { name: "Playlist 3", cover: "https://via.placeholder.com/150" },
        { name: "Playlist 4", cover: "https://via.placeholder.com/150" },
        { name: "Playlist 5", cover: "https://via.placeholder.com/150" },
        { name: "Playlist 6", cover: "https://via.placeholder.com/150" },
        { name: "Playlist 7", cover: "https://via.placeholder.com/150" },
        { name: "Playlist 8", cover: "https://via.placeholder.com/150" },
        // Thêm nhiều playlist ở đây
      ],
      limit: 8, // Số lượng playlist hiển thị ban đầu
    };
  },
  // created() {
  //   this.fetchGenres(); // Gọi API khi component được tạo
  // },
  computed: {
    visiblePlaylists() {
      // Nếu showAll là true, hiển thị tất cả playlist
      return this.showAll
        ? this.playlists
        : this.playlists.slice(0, this.limit);
    },
  },
  methods: {
    async getAllTopAlbum() {
      const response = await axios.get(
        "http://localhost:8080/api/album/getTopAlbum"
      );
      this.listTopAlbums = response.data;
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
          id: localStorage.getItem("userId"),
        }
      );
      this.popularArtists = response.data;
    },

    async fetchGenres() {
      try {
        const response = await axios.get("http://localhost:8080/api/genres");
        this.genres = response.data; // Gán dữ liệu API vào biến genres
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thể loại nhạc:", error);
      }
    },
    showAllPlaylists() {
      this.showAll = true; // Thay đổi trạng thái để hiển thị tất cả playlist
    },
    indexMusic() {
      this.$router.push({ path: "/" });
    },
    indexAlbum(albumId){
      this.$router.push(`/indexAlbum/${albumId}`);
    },
    navigateToMusic(musicId) {
      // Dẫn tới trang hiển thị chi tiết music với index
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
  cursor: pointer; /* Thay đổi con trỏ thành dạng chỉ tay khi hover */
}

#home {
  overflow-x: hidden;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #121212;
  border-radius: 10px;
}

p {
  color: rgb(204, 194, 194);
  text-align: left;
}
.container-lists{
  padding: 70px 0 0 0;
}
.title-container {
  color: rgb(255, 255, 255);
  width: 1424px;
  display: flex;
  justify-content: space-between;
}
.title {
  margin: 0 0 0 10px;
}
.view-all {
  cursor: pointer; /* Thay đổi con trỏ thành dạng chỉ tay khi hover */
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
  cursor: pointer; /* Thay đổi con trỏ thành dạng chỉ tay khi hover */
}
.playlist-cover {
  border-radius: 5px;
  width: 150px;
  height: 150px;
}
.img-artist{
  border-radius: 90px;
  width: 150px;
  height: 150px;
}
.playlist-wrapper {
  display: flex;
  margin: 5px 0 0 0;
}
</style>
