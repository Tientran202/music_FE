<template>
  <div>
    <SearchMenu />
    <div class="router">
      <router-view />
    </div>
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
