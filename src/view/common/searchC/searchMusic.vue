<template>
  <div class="music-container">
    <ul>
      <li class="stt">#</li>
      <li class="title-container">Tiêu đề</li>
      <li class="duration">Thời lượng</li>
    </ul>
    <ul v-for="(music, index) in musics" :key="index">
      <li class="stt">{{ music.stt }}</li>
      <li class="title-container">
        <img class="img-music" :src="require('/src/assets/mtp.jpeg')" alt="" />
        <div class="info-music">
          <span class="title">{{ music.music_name }}</span>
          <span class="name-artist">{{ music.name_artist }}</span>
        </div>
      </li>
      <li class="duration">{{ music.duration }}</li>
    </ul>
  </div>
</template>
<style scoped>
.music-container {
  display: flex;
  flex-direction: column;
  gap:0;
  font-family: Arial, Helvetica, sans-serif;
}
ul {
  display: flex;
  flex-direction: row;
  margin: 8px;
}
ul:hover {
  display: flex;
  list-style: none;
  align-items: center;
  background: #42424260;
}
li {
  display: flex;
  list-style: none;
  align-items: center;
}
.stt {
  width: 100px;
}
.title-container {
  display: flex;
  flex-direction: row;
  width: 1100px;
}

.img-music {
  width: 40px;
  border-radius: 5px;
}
.info-music{
    display: flex;
    flex-direction: column;
}
.info-music{
    margin: 0 0 0 10px;
}
.title {
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.name-artist{
    color: #b8b8b8;
    font-size: 13px;
}
</style>
<script>
export default {
  data() {
    return {
      musics: [
        {
          stt: 1,
          music_name: "chung ta cua hien tai",
          duration: "4'30",
          name_artist: "Son Tung MTP",
        },
        {
          stt: 2,
          music_name: "chung ta cua hien tai",
          duration: "4'30",
          name_artist: "Son Tung MTP",
        },
        {
          stt: 3,
          music_name: "chung ta cua hien tai",
          duration: "4'30",
          name_artist: "Son Tung MTP",
        },
        {
          stt: 4,
          music_name: "chung ta cua hien tai",
          duration: "4'30",
          name_artist: "Son Tung MTP",
        },
        {
          stt: 5,
          music_name: "chung ta cua hien tai",
          duration: "4'30",
          name_artist: "Son Tung MTP",
        },
        {
          stt: 6,
          music_name: "chung ta cua hien tai",
          duration: "4'30",
          name_artist: "Son Tung MTP",
        },
        {
          stt: 7,
          music_name: "cjhwgefhiwifiwiufhouhgiheuirghuiehugiiuergiuheiurghiheiuhguiheiuhgiuehrig",
          duration: "4'30",
          name_artist: "Son Tung MTP",
        },
        {
          stt: 8,
          music_name: "chung ta cua hien tai",
          duration: "4'30",
          name_artist: "Son Tung MTP",
        },
      ],
    };
  },
};
</script>