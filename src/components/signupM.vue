<template>
  <div id="background">
    <div id="envelop">
      <img :src="require('/src/assets/z02.png')" alt="Logo" id="logo" />
      <h1>SIGN UP</h1>
      <div id="gg-container">
        <img id="gg-img" :src="require('/src/assets/gg.png')" alt="" />
        <span id="gg-signup">Đăng ký với tài khoản google</span>
      </div>
      <div class="line"></div>
      <div id="signup">
        <label for="email">Nhập email</label>
        <input
          type="text"
          v-model="email"
          id="email"
          placeholder="name@gmail.com"
        />
        <label for="username">Nhập tên đăng nhập</label>
        <input
          type="text"
          v-model="username"
          id="email"
          placeholder="Tên đăng nhập"
        />
        <label for="pass">Mật khẩu</label>
        <div id="password-container">
          <input
            :type="passwordVisible ? 'text' : 'password'"
            v-model="password"
            id="pass"
            placeholder="Mật khẩu"
            :key="passwordVisible"
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

        <label for="password">Nhập lại mật khẩu</label>
        <div id="re-enter-password-container">
          <input
            :type="re_passwordVisible ? 'text' : 'password'"
            v-model="re_pass"
            id="re-pass"
            placeholder="Nhập lại mật khẩu"
            :key="re_passwordVisible"
          />

          <img
            class="eye"
            @click="retogglePasswordVisibility"
            :src="
              re_passwordVisible
                ? require('/src/assets/eye.png')
                : require('/src/assets/eye-crossed.png')
            "
            alt=""
          />
        </div>
        <label for="name">Nhập tên người dung</label>
        <input
          type="text"
          v-model="name"
          id="name"
          placeholder="Tên người dùng"
        />

        <div class="dob-container">
          <label for="dob-day">Ngày sinh:</label>
          <div class="dob-picker">
            <select v-model="selectedDay" id="dob-day">
              <option disabled value="">Ngày</option>
              <option v-for="day in days" :key="day" :value="day">
                {{ day }}
              </option>
            </select>

            <select v-model="selectedMonth" @change="updateDays" id="dob-month">
              <option disabled value="">Tháng</option>
              <option
                v-for="(month, index) in months"
                :key="index"
                :value="index + 1"
              >
                {{ month }}
              </option>
            </select>

            <select v-model="selectedYear" @change="updateDays" id="dob-year">
              <option disabled value="">Năm</option>
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
        </div>
        <button @click="signup">Đăng ký</button>
      </div>
      <p id="link-login">
        Bạn đã có tài khoản
        <a href="#">đăng nhập</a>
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
<script >
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      username: "",
      re_pass: "",
      errorMessage: "",
      passwordVisible: false,
      re_passwordVisible: false,
      selectedDay: "",
      selectedMonth: "",
      selectedYear: "",
      days: [],
      months: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
      ],
      years: [],
    };
  },
  created() {
    this.populateYears();
    this.updateDays();
  },

  methods: {
    async signup() {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/register",
          {
            username: this.username,
            password: this.password,
            email: this.email,
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    retogglePasswordVisibility() {
      this.re_passwordVisible = !this.re_passwordVisible;
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    populateYears() {
      const currentYear = new Date().getFullYear();
      for (let year = currentYear; year >= 1900; year--) {
        this.years.push(year);
      }
    },
    updateDays() {
      const selectedMonth = this.selectedMonth;
      const selectedYear = this.selectedYear;
      const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
      this.days = [];
      for (let day = 1; day <= daysInMonth; day++) {
        this.days.push(day);
      }
    },
  },
};
</script>


<style scoped>
#background {
  background-color: #4e9350;
  height: 1100px;
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
#gg-signup {
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
  height: 1050px;
  margin: auto auto;
  border-radius: 8px;
}
#signup {
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
#re-enter-password-container {
  display: flex;
  position: relative;
  display: flex;
  align-items: center;
}
#pass {
  width: 450px;
  padding-right: 40px;
}
#re-pass {
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
.eye {
  position: absolute;
  right: 10px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  z-index: 1;
}
select {
  margin: 10px;
}
#link-login {
  color: #fff;
}
</style>
