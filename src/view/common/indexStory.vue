<template>
  <div class="container">
    <div class="container-img">
      <div class="container-img-next">
        <img
          class="img-next"
          :src="require('/src/assets/right-arrow 2(1).png')"
          alt=""
        />
      </div>

      <img
        class="img-story"
        :src="'data:image/jpeg;base64,' + story.img"
        alt="Album Image"
      />
      <div class="container-img-next">
        <img
          class="img-next"
          :src="require('/src/assets/right-arrow2.png')"
          alt=""
        />
      </div>

      <audio v-if="audioSrc" :src="audioSrc" controls autoplay></audio>
    </div>
    <div class="container-title">
      <span>{{ story.title }}</span> - <span>{{ story.music_name }}</span> -
      <span>{{ story.artist_name }}</span>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  created() {
    this.getIndexStoryByStoryId();
  },
  data() {
    return {
      story: [],
      audioSrc: null,
    };
  },
  methods: {
    async getIndexStoryByStoryId() {
      const storyId = this.$route.params.id;
      const response = await axios.get(
        `http://localhost:8080/api/story/getIndexStoryByStoryId/${storyId}`,
      );
      this.story = response.data;

      const blob = new Blob([this.story.audio], { type: "audio/mpeg" });
      this.audioSrc = URL.createObjectURL(blob); 

      alert(this.audioSrc);
    },
  },
};
</script>
<style scoped>
.container {
  padding: 50px 0 0 0;
  display: flex;
  align-items: center;
}
.container-img {
  display: flex;
  align-items: center;
  gap: 10px;
}
.container-img-next {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 90px;
  height: 45px;
  width: 45px;
  background: #c0a4a434;
}
img {
  border-radius: 20px;
  width: 300px;
  height: 600px;
}
.img-next {
  width: 30px;
  height: 30px;
}
.container-title {
  padding: 10px 0 0 0;
}
</style>
