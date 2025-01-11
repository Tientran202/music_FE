<template>
  <div class="container">
    <span>Nhập thông tin báo cáo</span>
    <textarea
      v-model="contentReport"
      placeholder="Nội dung báo cáo..."
      class="text-area"
    ></textarea>
    <button @click="report">Báo cáo</button>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      contentReport: "",
    };
  },
  methods: {
    closeReport() {
      this.$emit("close");
    },
    async report() {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        "http://localhost:8080/api/auth/check-token",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (response.status === 200) {
        const accountId = response.data.accountId;
        if (accountId == localStorage.getItem("accountId")) {
          const contentReport = this.contentReport;
          const announcer_id = localStorage.getItem("userId");
          const musicId = this.$route.params.id;
          const response = await axios.post(
            "http://localhost:8080/api/music/reportMusic",
            null,
            {
              params: {
                report_content: contentReport,
                announcer_id: announcer_id,
                musicId: musicId,
              },
            }
          );
          if (response.status == 200) {
            this.isFollowing = !this.isFollowing;
            this.closeReport();
            alert("Đã báo cáo");
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  position: fixed;
  z-index: 99;
  border-radius: 10px;
  margin: 290px 0 0 90px;
  width: 200px;
  height: 250px;
  display: flex;
  flex-direction: column;
  background: #0d4f43;
  align-items: center;
}
span {
  margin: 10px 0;
}
textarea {
  padding: 5px;
  height: 160px;
  width: 180px;
  border-radius: 5px;
  border: none;
}
button {
  border-radius: 5px;
  width: 100px;
  height: 30px;
  border: none;
}
</style>