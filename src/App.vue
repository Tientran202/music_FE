<template>
  <HelloWorld msg="Welcome to Your Vue.js App" />
  <MusicPlayer />
</template>

<script>
import HelloWorld from "./components/menu.vue";
import MusicPlayer from "./components/MusicPlayer.vue";

export default {
  name: "App",

  components: {
    HelloWorld,
    MusicPlayer,
  },
  mounted() {
    this.$store.dispatch("loadStoredAudio");
  },
};
</script>
