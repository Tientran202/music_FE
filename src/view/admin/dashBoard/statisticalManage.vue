<template>
  <div id="chart-container">
    <span class="title">Thống kê</span>
    <div ref="chart"></div>
    <div class="container-info1">
      <div class="info1">
        <span>{{ numberMusic }} bài hát</span>
      </div>
      <div class="info1">
        <span>{{ numberArtist }} nghệ sĩ</span>
      </div>
      <div class="info1">
        <span>{{ numberUser }} người dùng</span>
      </div>
      <div class="info1">
        <span>{{ numberAlbum }} album</span>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      numberMusic: "",
      numberArtist: "",
      numberUser: "",
      numberAlbum: "",
    };
  },

  name: "GoogleChart",
  props: {
    chartData: {
      type: Array,
      required: true,
      default: () => [
        ["Year", "Người dùng", "Thời lượng nghe"],
        ["2020", 660, 400],
        ["2021", 1000, 460],
        ["2022", 1170, 1120],
      ],
    },
    chartTitle: {
      type: String,
      default: "Số lượng người dùng và thời lượng nghe",
    },
  },
  created() {
    this.getNumberOfMusic();
    this.getNumberOfArtist();
    this.getNumberOfUser();
    this.getNumberOfAlbum();
  },
  mounted() {
    // Load Google Charts
    // eslint-disable-next-line no-undef
    google.charts.load("current", { packages: ["corechart"] });
    // eslint-disable-next-line no-undef
    google.charts.setOnLoadCallback(this.drawChart);
  },
  methods: {
    drawChart() {
      // eslint-disable-next-line no-undef
      const data = google.visualization.arrayToDataTable(this.chartData);

      const options = {
        title: this.chartTitle,
        hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
        vAxis: { minValue: 0 },
        with: 600,
      };

      // eslint-disable-next-line no-undef
      const chart = new google.visualization.ColumnChart(this.$refs.chart);
      chart.draw(data, options);
    },
    async getNumberOfMusic() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/music/getNumberOfMusic"
        );
        this.numberMusic = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getNumberOfArtist() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/getNumberOfArtist"
        );
        this.numberArtist = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getNumberOfUser() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/getNumberOfUser"
        );
        this.numberUser = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getNumberOfAlbum() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/album/getNumberOfAlbum"
        );
        this.numberAlbum = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
#chart-container {
  background: #ffffff;
  height: 1000px;
  color: #000000;
  padding: 10px 0 0 350px;
  font-family: Arial, Helvetica, sans-serif;
}
.title {
  font-size: 18px;
  font-weight: bold;
}
.container-info1 {
  display: flex;
}
.info1 {
  font-size: 25px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  width: 240px;
  margin: 10px;
  height: 100px;
  border-radius: 10px;
  align-items: center;
  justify-items: center;
  color: #000000;
  border: 5px solid #3cd988;
  display: flex;
  justify-content: center;
}
</style>
