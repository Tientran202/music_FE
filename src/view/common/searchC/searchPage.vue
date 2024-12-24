<template>
  <div>
    <SearchMenu />
    <!-- Thanh menu điều hướng -->
    <router-view />
    <!-- Hiển thị trang con như AlbumPage, TrackPage -->
  </div>
</template>
<script>
import SearchMenu from ".//searchMenu.vue";
export default {
    components:{
        SearchMenu,
    },
};
</script>