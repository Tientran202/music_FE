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
        <img-crop-info
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
        <input type="text" v-model="name" placeholder="Nhập tên mới" />
      </div>
      <div class="input1">
        <span>Nghệ danh</span>
        <input type="text" v-model="artistName" placeholder="Nhập tên mới" />
      </div>
      <button class="button-edit" @click="updateProfile">Cập nhật</button>
    </div>
    <div class="setting-components">
      <span class="title-info">Thay đổi mật khẩu</span>
      <div class="input1">
        <span>Nhập mật khẩu cũ</span>
        <input v-model="oldPass" type="text" placeholder="Nhập mật khẩu cũ" />
      </div>
      <div class="input1">
        <span>Nhập mật khẩu mới</span>
        <input v-model="newPass" type="text" placeholder="Nhập mật khẩu mới" />
      </div>
      <div class="input1">
        <span>Nhập lại mật khẩu mới</span>
        <input
          v-model="reNewPass"
          type="text"
          placeholder="Nhập lại mật khẩu mới"
        />
      </div>
      <button @click="updatePass" class="button-edit">Cập nhật</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ImgCropInfo from "./components/imgCropInfo.vue";

export default {
  components: {
    ImgCropInfo,
  },
  created() {
    this.getIndexArtist();
  },
  data() {
    return {
      showCropperComponent: false,
      croppedImage: null, // Hình ảnh đã cắt
      imageSrc: null, // Dữ liệu gốc hình ảnh
      name: "", // Tên người dùng
      artistName: "", // Nghệ danh
      newPass: "",
      reNewPass: "",
      oldPass: "",
      artists: "",
    };
  },

  methods: {
    async getIndexArtist() {
      this.userId = localStorage.getItem("userId");
      const response = await axios.get(
        "http://localhost:8080/api/user/getIndexArtist",
        {
          params: { artistId: this.userId },
        }
      );
      this.artists = response.data;
      this.croppedImage = 'data:image/jpeg;base64,' + this.artists.artist_image
    },
    handleCloseCropper() {
      this.showCropperComponent = false; // Ẩn cropper khi sự kiện đóng được phát ra
    },
    showCropper() {
      this.showCropperComponent = true;
    },
    handleCropComplete(croppedImage) {
      this.croppedImage = croppedImage; // Lưu ảnh đã cắt
      this.showCropperComponent = false; // Đóng cropper
    },

    async updatePass() {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
          "http://localhost:8080/api/auth/check-token",
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (response.status === 200) {
          const accountId = response.data.accountId;
          if (accountId == localStorage.getItem("accountId")) {
            const payload = {
              account_id: parseInt(accountId, 10), // ID tài khoản
              oldPass: this.oldPass, // Mật khẩu cũ
              newPass: this.newPass, // Mật khẩu mới
            };
            if (this.newPass == this.reNewPass) {
              const responseUpdatePass = await fetch(
                "http://localhost:8080/api/auth/updatePass",
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(payload),
                }
              );
              if (responseUpdatePass.status == 200) {
                alert("Cập nhật mật khẩu thành công");
              }
              if (responseUpdatePass.status == 500) {
                alert("Nhập sai mật khẩu cũ");
              }
            } else {
              alert("Nhập lại mật khẩu không khớp");
            }
          }
        }
      } catch (error) {
        alert(error);
      }
    },
    // Phương thức gửi thông tin lên backend
    async updateProfile() {
      try {
        const userId = localStorage.getItem("userId");
        const formData = new FormData();
        formData.append("userId", userId); // Thêm tên người dùng
        formData.append("name", this.name); // Thêm tên người dùng
        formData.append("artistName", this.artistName); // Thêm nghệ danh

        // Nếu có ảnh đã cắt, gửi ảnh dưới dạng base64 hoặc file
        if (this.croppedImage) {
          const imageFile = this.base64ToFile(this.croppedImage, "image.png");
          formData.append("image", imageFile);
          alert("id: " + imageFile);
        }

        alert("id: " + userId);
        alert("id: " + this.name);
        alert("id: " + this.artistName);
        // Gửi request POST lên server
        const response = await fetch(
          "http://localhost:8080/api/user/updateProfile",
          {
            method: "PATCH",
            body: formData,
          }
        );

        const result = await response.json();
        if (response.ok) {
          alert("Cập nhật thành công!");
        } else {
          alert("Cập nhật thất bại: " + result.message);
        }
      } catch (error) {
        alert(error);
      }
    },

    // Chuyển đổi Base64 sang File (nếu cần)
    base64ToFile(base64Data, fileName) {
      const byteCharacters = atob(base64Data.split(",")[1]);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
        const slice = byteCharacters.slice(offset, offset + 1024);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        byteArrays.push(new Uint8Array(byteNumbers));
      }

      return new File(byteArrays, fileName, { type: "image/png" });
    },
  },
};
</script>


<style scoped>
.setting-container {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  width: 370px;
  height: 1000px;
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
  text-align: left;
  display: flex;
  flex-direction: column;
}
.input2 {
  align-items: center;
  width: 315px;
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
  text-align: left;
  font-size: 28px;
}
</style>