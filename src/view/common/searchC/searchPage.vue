<template>
  <div>
    <SearchMenu />
    <!-- Thanh menu điều hướng -->
    <div class="router">
      <router-view />
    </div>
    <!-- Hiển thị trang con như AlbumPage, TrackPage -->
  </div>
</template>
<script>
import SearchMenu from ".//searchMenu.vue";
export default {
  components: {
    SearchMenu,
  },
};
</script>
<style scoped>
.router{
  padding: 50px 0 0 0;
}
</style>
