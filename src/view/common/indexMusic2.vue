<template>
  <div class="index-music-container">
  
    <div class="information">
      <img class="img-music" :src="require('/src/assets/mtp.jpeg')" alt="" />
      <div class="info-music-artist">
        <span class="name-music">Chung ta cua hien tai</span>
        <span class="name-artist">Son Tung MTP</span>
      </div>
    </div>
    <div class="control-container">
      <input type="range" class="range-music" />
      <div class="control-button">
        <div class="control-button1">
          <img
            class="img-mix"
            :src="require('/src/assets/mix.png')"
            alt=""
            srcset=""
          />
          <img
            class="img-play"
            :src="require('/src/assets/play.png')"
            alt=""
            srcset=""
          />
          <img
            class="img-loop"
            :src="require('/src/assets/loop.png')"
            alt=""
            srcset=""
          />
        </div>

        <div class="control-button2">
          <img
            :src="require('/src/assets/volume.png')"
            alt=""
            class="img-volume"
          />
          <input type="range" class="range-volume" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.index-music-container {
  height: 300px;
  padding: 450px 0 0 0;
  background: #646161;
}
.information {
  display: flex;
  margin: 0 0 0 70px;
}
.img-music {
  width: 120px;
  border-radius: 5px;
}
.info-music-artist {
  margin: 20px 0 0 20px;
  color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
}
.name-music {
  font-size: 60px;
}
.control-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; /* Loại bỏ kiểu mặc định */
  width: 10px; /* Đặt kích thước của nút kéo */
  height: 10px; /* Đặt kích thước của nút kéo */
  background: #ffffff; /* Màu nền của nút kéo */
  border-radius: 50%; /* Bo góc tròn cho nút kéo */
  cursor: pointer; /* Thay đổi con trỏ khi di chuột qua */
}
.range-music {
  margin: 20px 0 0 0;
  appearance: none;
  width: 1300px;
  height: 4px;
}
.control-button {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  width: 100%;
}
.control-button1 {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 46%;
}
.img-mix {
  width: 30px;
}
.img-play {
  width: 60px;
}
.img-loop {
  width: 30px;
}
.control-button2 {
  margin: 0 0 0 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 78%;
  margin: 15px 0 0 0;
}
.img-volume {
  width: 20px;
  height: 20px;
}
.range-volume {
  appearance: none;
  width: 150px;
  height: 4px;
  margin: 0 0 0 10px;
}
</style>
