<template>
  <div class="container-menu-mannagement" v-if="isAuthenticated">
    <menuGenreVue class="menu" />
    <router-view class="content" />
  </div>
</template>
<script>
import menuGenreVue from "./menuGenre.vue";
export default {
  components: {
    menuGenreVue,
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>
<style scoped>
.menu {
    margin: -10px 0 0 0 ;
    padding: 30px 0 20px 0;
  position: fixed;
  background: #121212;
  width: 100%; /* Chiều rộng bằng với toàn bộ màn hình */
  z-index: 1000; /* Đảm bảo menu nằm trên các phần tử khác */
}

</style>
