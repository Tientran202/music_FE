import { createApp } from 'vue'
import App from './App.vue'
import router from './router'; 
import store from './store';
import VueGoogleCharts from "vue-google-charts";
createApp(App)
    .use(VueGoogleCharts)
    .use(store)
    .use(router) 
    .mount('#app');
