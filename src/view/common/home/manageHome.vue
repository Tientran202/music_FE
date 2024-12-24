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