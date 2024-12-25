// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import testPlay from '../components/MusicPlayer.vue';
import testToken from '../components/testToken.vue';
import testImg from '../components/testGD.vue';
import testAudio from '../components/testAudio2.vue';
import manageHome from '../view/common/home/manageHome.vue';
import Home from '../view/common/home/homePage.vue';
import genre from '../view/common/home/genrePage.vue';
import index from '../view/common/indexMusic.vue';
import index2 from '../view/common/indexMusic2.vue';
import informationActor from '../view/user/informationActor.vue'
import signup from '../view/auth/signupM.vue'
import login from '../view/auth/loginM.vue'
import settingU from '../view/user/settingU.vue'
import playlist from '../view/common/playlistC.vue'
import informationA from '../view/artist/informationA.vue'
import searchC from '../view/common/searchC/searchPage.vue'
import searchMusic from '../view/common/searchC/searchMusic.vue'
import searchArtist from '../view/common/searchC/searchArtist.vue'
import searchPlaylist from '../view/common/searchC/searchPlaylist.vue'
import searchAlbum from '../view/common/searchC/searchAlbum.vue'
import becomArtist from '../view/user/becomeArtist.vue'
import createPlaylist from '../components/createPlaylist.vue'
import createStory from '../view/artist/createStory.vue'
import dashboard from '../view/admin/dashBoard/managementPage.vue'
import statisticalManage from '../view/admin/dashBoard/statisticalManage.vue'
import artistList from '../view/admin/dashBoard/artistList.vue'
import musicReported from '../view/admin/dashBoard/musicReported.vue'
import requestArtist from '../view/admin/dashBoard/requestArtist.vue'
import userList from '../view/admin/dashBoard/userList.vue'
import userReported from '../view/admin/dashBoard/userReported.vue'
import userHide from '../view/admin/dashBoard/userHidden.vue'
import musicHide from '../view/admin/dashBoard/musicHidden.vue'
import allPlaylist from '../view/common/list/allPlaylist.vue'
import allAlbum from '../view/common/list/allAlbum.vue'
import indexAlbum from '../view/common/indexAlbum.vue'



import axios from "axios";
import store from "@/store";
const goHome = async (to, from, next) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!accessToken) {
        next("/login");

        if (this.$refs.audio) {
            this.$refs.audio.currentTime = 0; 
        }
    }
    
    try {
        const response = await axios.get(
            "http://localhost:8080/api/auth/check-token",
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
    
        if (response.status === 200) {
            const userId = response.data.user_id;
            localStorage.setItem("userId", userId);
            store.dispatch("setAuthenticated", true);
            next();
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.warn("Access token hết hạn hoặc không hợp lệ.");
            try {
                const refreshResponse = await axios.post(
                    "http://localhost:8080/api/auth/refresh-token",
                    { refresh_token: refreshToken }
                );
                if (refreshResponse.status === 200) {
                    const newAccessToken = refreshResponse.data.access_token;
                    localStorage.setItem("accessToken", newAccessToken);
                    store.dispatch("setAuthenticated", true);
                    next();
                }
            } catch (refreshError) {
                console.error("Không thể làm mới token:", refreshError.message);
                alert("Vui lòng đăng nhập lại.");
                next("/login");
            }
        } else {
            console.error("Đã xảy ra lỗi:", error);
            if (this.$refs.audio) {
                this.$refs.audio.currentTime = 0; // hoặc các thao tác khác
            }
            next("/login");
        }
    }
    
};

const routes = [

    {
        path: '/',
        name: 'manageHome',
        component: manageHome,
        children: [
            {
                path: '',
                name: 'Home',
                component: Home,
                beforeEnter: goHome,
            },
            {
                path: '/genre/:id',
                name: 'genre',
                component: genre,
            },
        ]
    },
    {
        path: '/index/:id',
        name: 'index',
        component: index,
    },
    {
        path: '/indexAlbum/:id',
        name: 'indexAlbum',
        component: indexAlbum,
    },
    {
        path: '/index2',
        name: 'index2',
        component: index2,
    },
    {
        path: '/information/:id',
        name: 'information',
        component: informationActor,
    },
    {
        path: '/signup',
        name: 'signup',
        component: signup,
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        beforeEnter(to, from, next) {
            // Gọi action trong store để reset player
            store.dispatch('resetPlayer');
            next();
        },
    },
    {
        path: '/settingU',
        name: 'settingU',
        component: settingU,
    },
    {
        path: '/playlist',
        name: 'playlist',
        component: playlist,
    },
    {
        path: '/informationA/:id',
        name: 'informationA',
        component: informationA,
    },
    {
        path: '/allPlaylist',
        name: 'allPlaylist',
        component: allPlaylist,
    },
    {
        path: '/allAlbum',
        name: 'allAlbum',
        component: allAlbum,
    },

    {
        path: '/testImg',
        name: 'testImg',
        component: testImg,
    },

    {
        path: '/testAudio',
        name: 'testAudio',
        component: testAudio,
    },
    {
        path: '/testPlay',
        name: 'testPlay',
        component: testPlay,
    },
    {
        path: '/testToken',
        name: 'testToken',
        component: testToken,
    },




    {
        path: '/searchC',
        name: 'searchC',
        component: searchC,
        children: [
            {
                path: 'searchMusic',
                name: 'searchMusic',
                component: searchMusic,
            },
            {
                path: 'searchArtist',
                name: 'searchArtist',
                component: searchArtist,
            },
            {
                path: 'searchPlaylist',
                name: 'searchPlaylist',
                component: searchPlaylist,
            },

            {
                path: 'searchAlbum',
                name: 'searchAlbum',
                component: searchAlbum,
            },

        ]
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: dashboard,
        children: [
            {
                path: 'statisticalManage',
                name: 'statisticalManage',
                component: statisticalManage,
            },
            {
                path: 'artistList',
                name: 'artistList',
                component: artistList,
            },
            {
                path: 'musicReported',
                name: 'musicReported',
                component: musicReported,
            },
            {
                path: 'requestArtist',
                name: 'requestArtist',
                component: requestArtist,
            },
            {
                path: 'userList',
                name: 'userList',
                component: userList,
            },
            {
                path: 'userReported',
                name: 'userReported',
                component: userReported,
            },
            {
                path: 'userHide',
                name: 'userHide',
                component: userHide,
            },
            {
                path: 'musicHide',
                name: 'musicHide',
                component: musicHide,
            },

        ]
    },
    {
        path: '/becomArtist',
        name: 'becomArtist',
        component: becomArtist,
    },
    {
        path: '/createPlaylist',
        name: 'createPlaylist',
        component: createPlaylist,
    },
    {
        path: '/createStory',
        name: 'createStrory',
        component: createStory,
    }



];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes, // Các route được định nghĩa
});

export default router;
