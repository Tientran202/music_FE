<template>
  <div class="container">
    <div
      v-for="(music, index) in musicList"
      :key="index"
      class="album-container"
      @click="navigateToMusic(music.musicId)"
    >
      <img
        :src="'data:image/jpeg;base64,' + music.musicImg"
        alt="Music Image"
        v-if="music.musicImg"
      />
      <div class="information-playlist">
        <div class="title4">
          <span class="title1">{{ music.musicName }}</span>
        </div>
        <div class="title3">
          <span class="title2">{{ music.userName }}</span>
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
      musicList: [], // Danh sách bài hát
      loading: false, // Trạng thái loading khi gọi API
      error: null, // Lưu trữ lỗi (nếu có)
      genreId: null, // ID của genre
    };
  },
  watch: {
    // Theo dõi thay đổi trong URL params
    "$route.params.id": {
      handler(newId) {
        this.genreId = newId; // Cập nhật giá trị genreId
        this.getMusicByGenre(); // Gọi lại API khi ID thay đổi
      },
      immediate: true, // Thực hiện handler ngay khi component được tạo
    },
  },
  methods: {
    navigateToMusic(musicId) {
      // Dẫn tới trang hiển thị chi tiết music với index
      this.$router.push(`/index/${musicId}`);
    },
    async getMusicByGenre() {
      // Kiểm tra genreId, nếu không hợp lệ thì bỏ qua
      if (!this.genreId) {
        this.musicList = []; // Reset danh sách nhạc
        this.error = "Genre ID is invalid.";
        return;
      }

      this.loading = true;
      this.error = null; // Reset lỗi trước khi gọi API

      try {
        // Gọi API để lấy danh sách bài hát theo thể loại
        const response = await axios.get(
          `http://localhost:8080/api/genre/getGenreAndMusic/${this.genreId}`
        );

        // Lưu kết quả trả về
        this.musicList = response.data;
      } catch (err) {
        // Xử lý lỗi API
        this.error = "Failed to fetch music data. Please try again later.";
        console.error(err);
      } finally {
        // Dừng trạng thái loading
        this.loading = false;
      }
    },
  },
};
</script>


<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  width: 99%;
  margin: 0 0 0 10px;
  font-family: Arial, Helvetica, sans-serif;
}
a {
  cursor: pointer;
}
.title {
  margin: 20px 0 0 50px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 25px;
  font-weight: bold;
}
.album-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 0px 0;
  border-radius: 5px;
  width: 173px;
  height: 250px;
  cursor: pointer;
}
.album-container:hover {
  background: #88888860;
}
.playlist-container:hover {
  background: #42424260;
}
img {
  width: 150px;
  height: 150px;
  border-radius: 5px;
}
.information-playlist {
  display: flex;
  flex-direction: column;
  margin: 10px 0 0 0;
}

.title1 {
  text-align: left;
  margin: 0;
  font-size: 13px;
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
  text-align: left; /* Căn sang phải */
  margin: 5px 0 0 0;
}
.title2:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>