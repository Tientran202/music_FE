<template>
  <div id="background">
    <div id="envelop">
      <img :src="require('/src/assets/z02.png')" alt="Logo" id="logo" />
      <h1>LOGIN</h1>
      <div id="gg-container">
        <img id="gg-img" :src="require('/src/assets/gg.png')" alt="" />
        <span id="gg-login">Đăng nhập với tài khoản google</span>
      </div>
      <div class="line"></div>
      <div id="login">
        <label for="email">Email hoặc tên đăng nhập</label>
        <input
          type="text"
          v-model="username"
          id="email"
          placeholder="Tên đăng nhập"
          @keydown.enter="login"
        />
        <label for="password">Mật khẩu</label>
        <div id="password-container">
          <input
            :type="passwordVisible ? 'text' : 'password'"
            v-model="password"
            id="pass"
            placeholder="Mật khẩu"
            :key="passwordVisible"
            @keydown.enter="login"
          />
          <img
            id="eye"
            @click="togglePasswordVisibility"
            :src="
              passwordVisible
                ? require('/src/assets/eye.png')
                : require('/src/assets/eye-crossed.png')
            "
            alt=""
          />
        </div>
        <button @click="login">Đăng nhập</button>
        <a id="forgot-password" href="#">Forgot password?</a>
      </div>
      <p id="signup">
        Bạn chưa có tài khoản
        <a href="/signup">đăng kí ngay</a>
      </p>
      <div v-if="errorMessage" id="message">
        <img
          :src="require('/src/assets/icon_warn.png')"
          alt="sfwef"
          id="icon-warn"
        />
        <span id="error-message">{{ errorMessage }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      username: "",
      password: "",
      errorMessage: "",
      passwordVisible: false,
    };
  },
  methods: {
    async login() {
      if (!this.username || !this.password) {
        this.errorMessage = "Nhập đầy đủ thông tin";
      } else {
        const payload = {
          username: this.username,
          password: this.password,
        };
        try {
          await axios
            .post("http://localhost:8080/api/auth/login", payload)
            .then((response) => {
              if (response.status == 200) {
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem(
                  "refreshToken",
                  response.data.refreshToken
                );
                const role = response.data.role;
                if (role == "admin") {
                  this.$router.push("/dashboard/statisticalManage");
                } else {
                  this.$router.push("/");
                }
              }
            });
        } catch (error) {
          alert("Tên đăng nhập hoặc mật khẩu không đúng");
        }
      }
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
  },
};
</script>


<style scoped>
#background {
  background-color: #4e9350;
  height: 1000px;
  padding: 30px 0 0 0;
}

#logo {
  width: 300px;
  margin-top: 70px;
}
#gg-container {
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 350px;
  border-radius: 90px;
  margin: 0 auto 20px auto;
}
#gg-img {
  width: 30px;
}
#gg-login {
  margin: 0 10px 0 10px;
}
.line {
  background-color: #4e4b4b;
  width: 450px;
  height: 1px;
  margin: 0 auto 15px auto;
}
#envelop {
  background-color: #121212;
  text-align: center;
  width: 50%;
  height: 750px;
  margin: auto auto;
  border-radius: 8px;
}
#login {
  background-color: #121212;
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0px auto 0px auto;
}
h1 {
  color: #ffffff;
  font-family: "Montserrat", Arial, sans-serif;
}
label {
  text-align: left;
  font-family: Arial, sans-serif;
  color: #ffffff;
}
input {
  border: 1px solid #4e4b4b;
  border-radius: 4px;
  background-color: #000000;
  height: 50px;
  text-size-adjust: 100px;
  margin: 10px 0px;
  appearance: none;
  color: #ffffff;
  padding-left: 10px;
}
input:hover {
  border-color: #ffffff;
}
input:focus {
  height: 48px;
  background-color: #000000;
  border: 2px solid #ffffff;
  outline: none;
  padding-left: 9px;
}
button {
  height: 45px;
  margin: 10px 0 10px 0;
  border-radius: 4px;
  border: #000000;
  background-color: #0e6e11;
  font-size: 15px;
  font-weight: bold;
}
button:hover {
  background-color: #2e9c32;
  transform: scale(1.01);
}
button:active {
  transform: scale(0.99);
}
#forgot-password {
  color: #ffffff;
  font-family: var(--fallback-fonts, sans-serif);
}
#forgot-password:hover {
  color: #1bd760;
  font-family: var(--fallback-fonts, sans-serif);
}
#signup {
  color: #ffffff;
}

a {
  color: #ffffff;
}
a:hover {
  color: #1bd760;
}

#message {
  background-color: #e91528;
  color: #ffffff;
  font-family: "Montserrat", Arial, sans-serif;
  width: 450px;
  height: 30px;
  display: flex;
  margin: 0 auto 0 auto;
  padding: 10px 0 0 10px;
}
#icon-warn {
  width: 20px;
  height: 20px;
}
#error-message {
  margin-left: 10px;
}
#password-container {
  display: flex;
  position: relative;
  display: flex;
  align-items: center;
}
#pass {
  width: 450px;
  padding-right: 40px;
}
#eye {
  position: absolute;
  right: 10px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  z-index: 1;
}
</style>
