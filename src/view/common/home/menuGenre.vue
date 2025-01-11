<template>
  <ul>
    <li><router-link class="router" to="/">Trang Chủ</router-link></li>
    <li class="router" v-for="item in genres" :key="item.id">
      <router-link :to="`/genre/${item.id}`">
        {{ item.genre }}
      </router-link>
    </li>
  </ul>
</template>

<style scoped>
ul {
  display: flex;
  gap: 20px;
  list-style: none;
  padding: 0 0 15px 0;
}

ul li a {
  text-decoration: none; 
  color: inherit; 
  font-size: 14px; 
  background: #393838;
  padding: 10px 20px ;
  border-radius: 20px;
}
a:hover{
  background: #635454;
}
</style>


<script>
import axios from "axios";
export default {
  data() {
    return {
      genres: [],
    };
  },

  created() {
    this.getAllGenre(); 
  },
  computed: {
    visiblePlaylists() {
      return this.showAll
        ? this.playlists
        : this.playlists.slice(0, this.limit);
    },
  },
  methods: {
    async getAllGenre() {
      const response = await axios.get(
        "http://localhost:8080/api/genre/getAllGenre"
      );
      this.genres = response.data;
    },
    showAllPlaylists() {
      this.showAll = true; 
    },
    indexMusic() {
      this.$router.push({ path: "/" });
    },
   
  },
 
};
</script>