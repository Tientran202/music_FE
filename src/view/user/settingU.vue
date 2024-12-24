<template>
  <div class="setting-container">
    <div class="setting-components">
      <span class="title-info"> Hồ sơ </span>
      <div class="input2">
        <img
          v-if="croppedImage"
          :src="croppedImage"
          alt="Cropped Image"
          style="margin-top: 20px; max-width: 300px"
        />
        <ImageCropper
          v-if="showCropperComponent"
          @crop-complete="handleCropComplete"
          @close="handleCloseCropper"
          :visibl="showCropperComponent"
        />
        <img
          class="img-edit"
          :src="require('/src/assets/edit.png')"
          alt=""
          @click="showCropper"
        />
      </div>
      <div class="input1">
        <span>Tên</span>
        <input type="text" placeholder="Nhập tên mới" />
      </div>
      <div class="input1">
        <span>Link liên kết mạng xã hội</span>
        <input type="text" placeholder="Nhập link mới" />
      </div>
      <div class="input2">
        <div class="dob-container">
          <label for="dob-day">Ngày sinh:</label>
          <div class="dob-picker">
            <select class="select2" v-model="selectedDay" id="dob-day">
              <option disabled value="">Ngày</option>
              <option v-for="day in days" :key="day" :value="day">
                {{ day }}
              </option>
            </select>

            <select
              class="select1"
              v-model="selectedMonth"
              @change="updateDays"
              id="dob-month"
            >
              <option disabled value="">Tháng</option>
              <option
                v-for="(month, index) in months"
                :key="index"
                :value="index + 1"
              >
                {{ month }}
              </option>
            </select>

            <select
              class="select1"
              v-model="selectedYear"
              @change="updateDays"
              id="dob-year"
            >
              <option disabled value="">Năm</option>
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="input1">
        <span>Giới tính</span>
        <select class="select-gender" name="gender" id="gender">
          <option value="male">Nam</option>
          <option value="female">Nữ</option>
          <option value="other">Khác</option>
        </select>
      </div>
      <button class="button-edit">Cập nhật</button>
    </div>

    <div class="setting-components">
      <span class="title-info">Thay đổi mật khẩu</span>
      <div class="input1">
        <span>Nhập mật khẩu cũ</span>
        <input type="text" placeholder="Nhập mật khẩu cũ" />
      </div>
      <div class="input1">
        <span>Nhập mật khẩu mới</span>
        <input type="text" placeholder="Nhập mật khẩu mới" />
      </div>
      <div class="input1">
        <span>Nhập lại mật khẩu mới</span>
        <input type="text" placeholder="Nhập lại mật khẩu mới" />
      </div>
      <button class="button-edit">Cập nhật</button>
    </div>
  </div>
</template>
<style scoped>
.setting-container {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  width: 370px;
  height: 1880px;
  margin: 0 0 0 39%;
  color: #dadada;
}
.setting-components {
  margin: 30px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.button-upload-img {
  margin: 0 0 0 0;
}
.img-edit {
  border-radius: 0;
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.input1 {
  display: flex;
  flex-direction: column;
}
.input2 {
  align-items: cen;

  gap: 10px;
}
.select-gender {
  width: 80px;
}
.select1 {
  margin: 0 10px 0 10px;
}
img {
  height: 150px;
  width: 150px;
  border-radius: 90px;
}
select {
  margin: 5px 0 0 0;
}
button {
  background: #0c510d;
  border: none;
  border-radius: 5px;
  height: 30px;
  width: 120px;
  margin: 0 0 0 187px;
  color: #cbffcb;
  cursor: pointer;
}
input {
  padding: 0 0 0 10px;
  border: 1px solid #585858;
  height: 40px;
  width: 300px;
  margin: 5px 0 0 0;
  border-radius: 8px;
  background: #121212;
  color: rgb(255, 255, 255);
}

.title-info {
  font-size: 28px;
}
</style>
<script>
import ImageCropper from "/src/components/ImageCropper.vue";

export default {
  components: {
    ImageCropper,
  },
  created() {
    this.populateYears();
    this.updateDays();
  },
  data() {
    return {
      showCropperComponent: false,
      croppedImage: require("@/assets/mtp.jpeg"),
      imageSrc: null,
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
  methods: {
    handleCloseCropper() {
      this.showCropperComponent = false; // Ẩn cropper khi sự kiện đóng được phát ra
    },
    showCropper() {
      this.showCropperComponent = true;
    },
    handleCropComplete(croppedImage) {
      this.croppedImage = croppedImage;
      this.showCropperComponent = false;
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
