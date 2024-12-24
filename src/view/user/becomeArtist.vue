<template>
  <div class="container">
    <div class="title-container">
      <span class="title"> Bạn muốn trở thành</span>
      <span class="title"> nghệ sĩ của</span>
      <img :src="require('/src/assets/z02.png')" alt="" />
      <div class="title3">
        <span class="title1">Hãy điền thông tin </span>
        <img
          class="img-right-arrow"
          :src="require('/src/assets/right-arrow.png')"
          alt=""
        />
      </div>
    </div>
    <div class="request-container">
      <div class="title2">
        <span class="stage-name">Nhập nghệ danh của bạn</span>
        <input type="text" placeholder="Nhập nghệ danh" />
      </div>
      <div class="btn-container">
        <button>Tôi muốn thành ca sĩ</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: row;
  font-family: Arial, Helvetica, sans-serif;
  background: #ffffff;
  height: 700px;
}
.title-container {
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
  justify-content: center;
  background: #ce28b0e1;
}
.title {
  font-size: 50px;
  font-weight: bold;
}

img {
  margin: 20px 0 0 0;
  width: 200px;
}
.title1 {
  font-size: 30px;
  font-weight: bold;
  margin: 10px 0 0 0;
}
.title3 {
  display: flex;
  align-items: center;
}
.img-right-arrow {
  margin: 10px 0 0 20px;
  width: 100px;
}
.request-container {
  display: flex;
  flex-direction: column;
  width: 50%;
  color: #202020;
  align-items: center;
  justify-content: center;
  color: #ce28b0e1;
  font-weight: bold;
}
.title2 {
  display: flex;
  flex-direction: column;
}
.stage-name {
  font-size: 18px;
}
input {
  width: 200px;
  height: 35px;
  border-radius: 8px;
  border: 1px solid #ce28b0e1;
  padding: 0 0 0 10px;
  margin: 10px 0 0 0;
}
button {
  margin: 10px 0 0 0;
  padding: 10px 15px 10px 15px;
  border-radius: 5px;
  border: 1px solid #ce28b0e1;
  background: #ce28b0e1;
  color: #ffffff;
  cursor: pointer;
}
.btn-container {
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
button:active {
  padding: 9px 14px;
}
button:hover {
  background: #ea36c9e1;
}
</style>