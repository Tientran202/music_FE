<template>
  <div class="index-container">
    <div class="information">
      <img
        class="img-music"
        v-if="musics.musicImg"
        :src="'data:image/jpeg;base64,' + musics.musicImg"
        alt="Album Image"
      />
      <div class="title">
        <span class="genre"></span>
        <span class="name-music">{{ musics.music_name }}</span>
        <div class="name">
          <span class="name-artist">{{ musics.artist_name }}  </span>  |
          <span class="stage-name"> {{ musics.stage_name }} </span>
          <img
            class="more-function"
            :src="require('/src/assets/3dot2.png')"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="function">
      <!-- <img
        class="play-function"
        :src="require('/src/assets/play.png')"
        alt=""
        @click="togglePlay"
      />
      egerg -->
    </div>
    <div class="recommend">
      <div class="heading-recommend">
        <span class="recommend">Những bài nhạc gợi ý</span>
        <span class="more-recommend">Xem thêm</span>
      </div>
      <div class="list-recommend">
        <div class="item-recommend" v-for="(list, index) in lists" :key="index">
          <img
            class="img-item-recommend"
            :src="require('/src/assets/mtp.jpeg')"
            alt=""
          />
          <img
            class="img-play-recommend"
            :src="require('/src/assets/play2.png')"
          />
          <span class="name-item-recommend">{{ list.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      audioSrc: null,
      musics: {},
      song: {
        name: "Hết thương cạn gió",
        artist: "CCMK",
        image: "/src/assets/cover1.jpeg",
        duration: 240,
      },
      lists: [
        { name: "Playlist 2" },
        { name: "Playlist 2" },
        { name: "Playlist 2" },
        { name: "Playlist 2" },
        { name: "Playlist 2" },
        { name: "Playlist 2" },
        { name: "Playlist 2" },
        { name: "Playlist 2" },
      ],
    };
  },
  mounted() {
    this.initMusicPlayer();
  },
  methods: {
    ...mapActions(["playSong", "toggleIsPlaying", "togglePlayPause"]),

    async initMusicPlayer() {
      await this.getIndexMusic(); // Lấy dữ liệu bài hát
      if (this.musics && this.musics.musicAudio) {
        // Kiểm tra nếu dữ liệu hợp lệ
        this.playThisSong(); // Gọi phát nhạc
      }
    },
    async togglePlay() {
      const musicId = this.$route.params.id;
      // Lấy thông tin bài hát từ API
      const response = await axios.get(
        `http://localhost:8080/api/music/getIndexMusicArtist/${musicId}`
      );
      const musicData = response.data;
      if (musicData && musicData.musicAudio) {
        // Tạo dữ liệu bài hát mới và gửi tới store
        const newMusic = {
          audio: musicData.musicAudio,
          name: musicData.music_name,
          artist: musicData.artist_name,
        };
        // Gọi action trong Vuex để phát bài hát mới
        await this.$store.dispatch("playSong", newMusic);

        // Đổi trạng thái "isPlaying" nếu cần
        this.toggleIsPlaying();
      } // Đổi trạng thái isPlaying
    },

    async playThisSong() {
      const musicData = {
        audio: this.musics.musicAudio,
        name: this.musics.music_name,
        artist: this.musics.artist_name,
      };

      await this.$store.dispatch("playSong", musicData);
    },
    async getIndexMusic() {
      const musicId = this.$route.params.id;
      // Kiểm tra genreId, nếu không hợp lệ thì bỏ qua
      const response = await axios.get(
        `http://localhost:8080/api/music/getIndexMusicArtist/${musicId}`
      );
      this.musics = response.data;
    },
  },
};
</script>

<style scoped>
.hide {
  background: #d30000;
  height: 100px;
}
.index-container {
  background: #2e2e2e;
  height: 1000px;
  border-radius: 10px;
}
.img-music {
  height: 200px;
  width: 200px;
  margin: 30px 0 0 30px;
  border-radius: 10px;
}
.information {
  display: flex;
}
.title {
  color: #ffffff;
  display: flex;
  flex-direction: column;
  margin: 110px 0 0 20px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  text-align: left;
}
.name {
  display: flex;
  align-items: center;
  margin: 10px 0 0 0;
}
.stage-name {
  margin: 0 0 0 10px;
}
.name-music {
  font-size: 60px;
}
.function {
  display: flex;
  padding: 0 0 0 20px;
  content: center;
  align-items: center;
}
.play-function {
  width: 70px;
  cursor: pointer;
}
.more-function {
  width: 40px;
  height: 40px;
}
.recommend {
  margin: 10px 0 0 0;
}
.heading-recommend {
  font-family: Arial, Helvetica, sans-serif;
  color: #ffffff;
  font-size: 14px;
  padding: 0 10px 0 15px;
}
.more-recommend {
  margin: 0 0 0 1190px;
}
.list-recommend {
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
  color: #ffffff;
  font-size: 13px;
  margin: 5px 0 0 10px;
  gap: 6px;
  position: relative;
}
.item-recommend {
  height: 170px;
  justify-content: center;
  justify-items: center;
  padding: 10px;
  width: 150px;
}
.item-recommend:hover {
  background: #c5bebe;
  height: 170px;
  justify-content: center;
  justify-items: center;
  border-radius: 10px;
}
.img-item-recommend {
  width: 150px;
  height: 150px;
  border-radius: 5px;
}
.img-play-recommend {
  width: 50px;
  height: 50px;
  margin: 50px 0 0 -95px;
  position: absolute;
  opacity: 0; /* Ẩn đi ban đầu */
  transition: opacity 0.1s ease; /* Thêm hiệu ứng mượt khi hiện ra */
}
.item-recommend:hover .img-play-recommend {
  opacity: 1; /* Hiện ra khi di chuột vào item-recommend */
}
</style>
