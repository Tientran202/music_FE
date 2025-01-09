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
          <span class="name-artist">{{ musics.artist_name }} </span>
          <span class="stage-name"> | {{ musics.stage_name }} </span>
          <button class="btn-option" @click="reportMusicHide">báo cáo</button>
          <reportMusic v-if="reportMusic"></reportMusic>
          <button @click="addMusicHide" class="btn-option">
            Thêm vào danh sách phát
          </button>
          <add-music-to-playlist v-if="addMusic"> </add-music-to-playlist>
        </div>
      </div>
    </div>
    <div class="function"></div>
    <div class="recommend">
      <div class="heading-recommend">
        <span class="recommend">Những bài nhạc gợi ý</span>
      </div>
      <div class="list-recommend">
        <div
          class="item-recommend"
          v-for="(SuggestedMusic, index) in SuggestedMusics.slice(0, 8)"
          :key="index"
          @click="goToIndexMusic(SuggestedMusic.music_id)"
        >
          <img
            class="img-play-recommend"
            :src="'data:image/jpeg;base64,' + SuggestedMusic.music_img"
          />
          <span class="name-item-recommend">{{
            SuggestedMusic.music_name
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapActions } from "vuex";
import AddMusicToPlaylist from "./components/addMusicToPlaylist.vue";
import reportMusic from "./components/reportMusic.vue";

export default {
  components: {
    AddMusicToPlaylist,
    reportMusic,
  },
  data() {
    return {
      addMusic: false,
      audioSrc: null,
      musics: {},
      SuggestedMusics: [],
      reportMusic: false,
    };
  },
  computed: {
    musicId() {
      return this.$route.params.id; // Lấy `musicId` từ route
    },
  },
  watch: {
    musicId: {
      immediate: true, // Gọi ngay lần đầu khi component được load
      handler(newId) {
        this.initMusicPlayer(newId); // Gọi hàm khi musicId thay đổi
      },
    },
  },
  // mounted() {
  //   this.initMusicPlayer();
  // },
  methods: {
    ...mapActions(["playSong", "toggleIsPlaying", "togglePlayPause"]),

    async initMusicPlayer() {
      await this.getIndexMusic(); // Lấy dữ liệu bài hát
      if (this.musics && this.musics.musicAudio) {
        // Kiểm tra nếu dữ liệu hợp lệ
        this.playThisSong(); // Gọi phát nhạc
        await this.getSuggestedMusicResponse();
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
        const newMusic = {
          audio: musicData.musicAudio,
          name: musicData.music_name,
          artist: musicData.artist_name,
        };
        await this.$store.dispatch("playSong", newMusic);
        this.toggleIsPlaying();
      }
    },
    addMusicHide() {
      this.addMusic = !this.addMusic;
    },
    reportMusicHide() {
      this.reportMusic = !this.reportMusic;
    },

    goToIndexMusic(musicId) {
      this.$router.push(`/index/${musicId}`);
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

    async getSuggestedMusicResponse() {
      const response = await axios.get(
        "http://localhost:8080/api/music/getSuggestedMusicResponse",
        {
          params: { artistId: this.musics.artist_id },
        }
      );
      this.SuggestedMusics = response.data;
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
.btn-option {
  margin: 0 0 0 10px;
  background: #0b551000;
  padding: 2px 10px;
  color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
}

.recommend {
  margin: 10px 0 0 0;
}
.heading-recommend {
  text-align: left;
  font-family: Arial, Helvetica, sans-serif;
  color: #ffffff;
  font-size: 14px;
  padding: 0 10px 0 15px;
}
.more-recommend {
  margin: 0 0 0 1190px;
}
.list-recommend {
  cursor: pointer;
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
  padding: 10px 10px 50px 10px;
  width: 150px;
}
.item-recommend:hover {
  background: #565656;
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
  width: 150px;
  height: 150px;
}

.img-play-recommend:hover {
  width: 150px;
  height: 150px;
}
</style>
