<template>
  <div class="container">
    <img :src="require('/src/assets/x-mark.png')" alt="" />
    <span>Tạo playlist</span>
    <input type="text" placeholder="Nhập tên playlist" />
    <button>Tạo playlist</button>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 150px;
  background: #121212;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 10px;
  border: 2px solid #545454;
  top: 50%;
  left: 50%;
  position: fixed;
  transform: translate(-50%, -50%);
}
img {
  width: 20px;
  display: block;
  margin: 0 0 0 250px;
  cursor: pointer;
}

input {
  width: 200px;
  height: 30px;
  border: 1px solid #4e4b4b;
  border-radius: 5px;
  padding: 0 0 0 10px;
  margin: 10px 0 0 0;
  background: #121212;
  color: #ffffff;
}
input:hover {
  background: #211d1d;
}
input:focus {
  background-color: #000000;
  border: 1px solid #ffffff;
  outline: none;
}
button {
  margin: 10px 0 0 0;
  height: 30px;
  width: 210px;
  border-radius: 5px;
  border: 1px solid #000000;
  background: #0e6e11;
}
button:hover {
  background: #2e9c32;
}
button:active {
  background: #0e6e11;
}
</style>