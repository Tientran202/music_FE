<template>
  <ul>
    <li><router-link class="router" to="/">Trang Chủ</router-link></li>
    <li class="router" v-for="item in genres" :key="item.id">
      <router-link :to="`/genre/${item.id}`">
        {{ item.genre }}
      </router-link>
    </li>
  </ul>
</template>

<style scoped>
ul {
  display: flex; /* Sắp xếp các mục trong sidebar theo hàng ngang */
  gap: 20px; /* Khoảng cách giữa các mục */
  list-style: none; /* Loại bỏ dấu chấm đầu dòng */
  padding: 0 0 15px 0;
}

ul li a {
  text-decoration: none; /* Bỏ gạch chân */
  color: inherit; /* Giữ nguyên màu chữ */
  font-size: 14px; /* Cỡ chữ */
  background: #393838;
  padding: 10px 20px ;
  border-radius: 20px;
}
a:hover{
  background: #635454;
}
</style>


<script>
import axios from "axios";
export default {
  data() {
    return {
      genres: [],
    };
  },

  created() {
    this.getAllGenre(); // Gọi API khi component được tạo
  },
  computed: {
    visiblePlaylists() {
      // Nếu showAll là true, hiển thị tất cả playlist
      return this.showAll
        ? this.playlists
        : this.playlists.slice(0, this.limit);
    },
  },
  methods: {
    async getAllGenre() {
      const response = await axios.get(
        "http://localhost:8080/api/genre/getAllGenre"
      );
      this.genres = response.data;
    },
    showAllPlaylists() {
      this.showAll = true; // Thay đổi trạng thái để hiển thị tất cả playlist
    },
    indexMusic() {
      this.$router.push({ path: "/" });
    },
    // async fetchGenres() {
    //   try {
    //     const response = await axios.get("http://localhost:8080/api/genres");
    //     this.genres = response.data; // Gán dữ liệu API vào biến genres
    //   } catch (error) {
    //     console.error("Lỗi khi lấy dữ liệu thể loại nhạc:", error);
    //   }
    // },

    // async fetchImage() {
    //   try {
    //     const response = await axios.get(
    //       `http://localhost:8080/api/auth/img/2`,
    //       {
    //         responseType: "arraybuffer",
    //       }
    //     );
    //     const base64 = btoa(
    //       new Uint8Array(response.data).reduce(
    //         (data, byte) => data + String.fromCharCode(byte),
    //         ""
    //       )
    //     );
    //     this.imageSrc = `data:image/jpeg;base64,${base64}`;
    //   } catch (error) {
    //     console.error("Error fetching image:", error);
    //   }
    // },
  },
  // async mounted() {
  //   this.fetchImage();
  // },
};
</script>