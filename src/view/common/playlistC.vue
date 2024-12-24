<template>
  <div class="container">
    <div class="header">
      <img class="img-playlist" :src="require('/src/assets/mtp.jpeg')" alt="" />
      <div class="info-user-container">
        <span>Playlist</span>
        <span class="name-playlist">Tên danh sách phát</span>
        <div>
          <span>Số lượng bài hát</span> |
          <span>Thời lượng</span>
        </div>
        <div class="control">
          <img class="img-play" :src="require('/src/assets/play.png')" alt="" />
          <img
            class="img-3dot"
            :src="require('/src/assets/3dot2.png')"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="playlist-container">
      <ul class="table-header">
        <li class="stt">#</li>
        <li class="name-music">Tiêu đề</li>
        <li  class="name-artist">Nghệ sĩ</li>
        <li class="time">Ngày thêm</li>
        <li class="duration">Thời lượng</li>
      </ul>
      <ul class="table-row" v-for="(list, index) in playlists" :key="index">
        <li class="stt">{{ list.stt }}</li>
        <li class="name-music">
          <img
            class="img-artist"
            :src="require('/src/assets/mtp.jpeg')"
            alt=""
          />
          {{ list.title }}
        </li>
        <li class="name-artist">
          <span>{{ list.artist }}</span>
        </li>
        <li class="time">{{ list.time }}</li>
        <li class="duration">{{ list.duration }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      playlists: [
        {
          stt: "1",
          title: "chung ta cua hien tai",
          artist: "Son Tung MTP",
          time: "16/5/2022",
          duration: "14'35",
        },
        {
          stt: "2",
          title: "chung ta cua hien tai",
          artist: "Son Tung MTP",
          time: "16/5/2022",
          duration: "14'35",
        },
        {
          stt: "3",
          title: "chung ta cua hien tai",
          artist: "Son Tung MTP",
          time: "16/5/2022",
          duration: "14'35",
        },
        {
          stt: "4",
          title: "chung ta cua hien tai",
          artist: "Son Tung MTP",
          time: "16/5/2022",
          duration: "14'35",
        },
        {
          stt: "5",
          title: "chung ta cua hien tai",
          artist: "Son Tung MTP",
          time: "16/5/2022",
          duration: "14'35",
        },
        {
          stt: "6",
          title: "chung ta cua hien tai",
          artist: "Son Tung MTP",
          time: "16/5/2022",
          duration: "14'35",
        },
        {
          stt: "7",
          title: "chung ta cua hien tai",
          artist: "Son Tung MTP",
          time: "16/5/2022",
          duration: "14'35",
        },
        {
          stt: "8",
          title: "chung ta cua hien tai",
          artist: "Son Tung MTP",
          time: "16/5/2022",
          duration: "14'35",
        },
        {
          stt: "9",
          title: "chung ta cua hien tai",
          artist: "Son Tung MTP",
          time: "16/5/2022",
          duration: "14'35",
        },
        {
          stt: "10",
          title: "chung ta cua hien tai",
          artist: "Son Tung MTP",
          time: "16/5/2022",
          duration: "14'35",
        },
        {
          stt: "11",
          title: "chung ta cua hien tai",
          artist: "Son Tung MTP",
          time: "16/5/2022",
          duration: "14'35",
        },
      ],
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
  padding: 20px 0 10px 0 ;
  margin: 0 0 -10px 0 ;
  background: #191919;
  border-radius:20px 20px 0 0  ;
}
.header {
  display: flex;
  margin: 0 0 0 50px;
}
.info-user-container {
  display: flex;
  flex-direction: column;
  margin: 0 0 0 20px;
}
img {
  width: 200px;
  border-radius: 8px;
}
.name-playlist {
  font-size: 40px;
  font-weight: bold;
}
.control {
  margin: 35px 0 0 0;
  display: flex;
  align-items: center;
}
.img-play {
  width: 70px;
}
.img-3dot {
  width: 50px;
  height: 50px;
}
.playlist-container {
  margin: 20px 0 0 50px;
}
ul {
  display: flex;
  list-style-type: none;
}
ul:hover {
  display: flex;
  list-style-type: none;
  background: #b3b3b3;
}
ul li {
  display: flex;
  color: #b3b3b3;
  align-items: center;
}
.stt {
  width: 30px;
}
.name-music{
    width: 400px;
}
.img-artist {
  width: 40px;
  border-radius: 5px;
}
.name-artist{
  width: 400px;
}
.time{
  width: 300px;
}
.duration{
  width: 200px;
}
.name-music {
  gap: 10px;
}
</style>