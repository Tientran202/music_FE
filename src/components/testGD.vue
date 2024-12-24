<template>
  <div>
    slkefjoi
    <img :src="imageSrc" alt="Image from DB" v-if="imageSrc" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      imageSrc: null,
    };
  },
  methods: {
    async fetchImage() {
      try {
        const response = await axios.get(`http://localhost:8080/api/auth/img/500`, {
          responseType: "arraybuffer",
        });
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        this.imageSrc = `data:image/jpeg;base64,${base64}`;
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    },
  },
  mounted() {
    this.fetchImage();
  },
};
</script>
