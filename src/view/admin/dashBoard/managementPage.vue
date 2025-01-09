<template>
  <div class="container-menu-mannagement">
    <menuManagementVue class="menu" />
    <router-view class="content" />
  </div>
</template>
<script>
import menuManagementVue from "./menuManagement.vue";
export default {
  components: {
    menuManagementVue,
  },
};
</script>
<style scoped>
.container-menu-mannagement {
  display: flex;
  flex-direction: row;
}
.menu {
  width: 350px;
  position: fixed;
  top: 68px; /* Căn trên */
  left: 0; /* Căn trái */
  z-index: 10; /* Đảm bảo menu nằm trên cùng */
  height: 100%; /* Chiều cao menu */
  border-right: 1px solid #c1c1c1;
  align-items: center;
}
.content {
  height: 2000px;
  width: 100%;
  padding: 0 0 100px 360px;
  background: #008fa2a6;
  position: relative;
  z-index: 1; 
  font-size: 13px;
}
</style>
