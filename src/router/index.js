// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import testPlay from '../components/MusicPlayer.vue';
import testToken from '../components/testToken.vue';
import testImg from '../components/testGD.vue';
import testAudio from '../components/testAudio2.vue';
import manageHome from '../view/common/home/manageHome.vue';
import Home from '../view/common/home/homePage.vue';
import genre from '../view/common/home/genrePage.vue';
import index from '../view/common/indexMusic/indexMusic.vue';
import index2 from '../view/common/indexMusic2.vue';
import informationActor from '../view/user/informationUser.vue'
import signup from '../view/auth/signupM.vue'
import login from '../view/auth/loginM.vue'
import settingU from '../view/user/settingU.vue'
import playlist from '../view/common/indexPlaylist.vue'
import informationArtist from '../view/artist/informationArtist.vue'
import searchC from '../view/common/searchC/searchPage.vue'
import searchMusic from '../view/common/searchC/searchMusic.vue'
import searchArtist from '../view/common/searchC/searchArtist.vue'
import searchPlaylist from '../view/common/searchC/searchPlaylist.vue'
import searchAlbum from '../view/common/searchC/searchAlbum.vue'
import becomArtist from '../view/user/becomeArtist.vue'
import createPlaylist from '../view/artist/createPlaylist.vue'
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
import allNewMusic from '../view/common/list/allNewMusic.vue'
import allAlbum from '../view/common/list/allTopAlbum.vue'
import indexAlbum from '../view/common/indexAlbum.vue'
import allRecentMusic from '../view/common/list/allRecentMusic.vue'
import allPopularArtist from '../view/common/list/allPopularArtist.vue'
import functionDisplay from '../view/artist/components/functionDisplay.vue'
import createMusic from '../view/artist/createMusic.vue'
import createAlbum from '../view/artist/createAlbum.vue'
import settingInfoArtist from '../view/artist/settingInfoArtist.vue'
import testCutStory from '../view/artist/testCutStory.vue'
import allMusicUnconfirmed from '../view/admin/dashBoard/allMusicUnconfirmed.vue'
import IndexMusicForAdmin from '../view/admin/IndexMusicForAdmin.vue'
import functionDisplayUser from '../view/user/components/functionDisplayUser.vue'
import indexArtist from '../view/common/indexArtist/indexArtist.vue'
import createPlaylistUser from '../view/user/createPlaylist.vue'
import allMusicArtist from '../view/common/indexArtist/allMusicArtist.vue'
import addMusicToPlaylist from '../view/common/indexMusic/components/addMusicToPlaylist.vue'
import reportMusic from '../view/common/indexMusic/components/reportMusic.vue'
import allAlbumArtist from '../view/common/indexArtist/allAlbumArtist.vue'
import allPlaylistArtist from '../view/common/indexArtist/allPlaylistArtist.vue'
import allPlaylistUser from '../view/user/allPlaylist.vue'
import indexMusicHidden from '../view/admin/indexMusicHidden.vue'
import indexStory from '../view/common/indexStory.vue'
import logoutH from '../components/logoutH.vue'





import axios from "axios";
import store from "@/store";
const goHome = async (to, from, next) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!accessToken) {
        next("/login");
        return; // Dừng nếu accessToken không tồn tại
    }
    try {
        const response = await axios.get(
            "http://localhost:8080/api/auth/check-token",
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (response.status === 200) {
            const role = response.data.role;
            const userId = response.data.userId;
            const accountId = response.data.accountId;
            localStorage.setItem("accountId", accountId);
            localStorage.setItem("role", role);
            localStorage.setItem("userId", userId);
            store.dispatch("setAuthenticated", true);
            next();
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
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
            // if (this.$refs.audio) {
            //     this.$refs.audio.currentTime = 0; // hoặc các thao tác khác
            // }
            next("/login");
        }
    }

};
// import router from "@/router"; 
const goIndexArtist = async (to, from, next) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!accessToken) {
        alert("Đăng nhập trước khi thực hiện");
        next("/login");
        return; // Dừng nếu accessToken không tồn tại
    }
    try {
        const response = await axios.get(
            "http://localhost:8080/api/auth/check-token",
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (response.status === 200) {
            const role = response.data.role;
            const userId = response.data.userId;
            localStorage.setItem("userId", userId);
            if (role == "artist") {
                // const accountId = response.data.accountId;
                // alert(accountId);
                // router.push({ name: "informationArtist" });
                next();
            }
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
            alert(error);
            // if (this.$refs.audio) {
            //     this.$refs.audio.currentTime = 0; // hoặc các thao tác khác
            // }
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
        path: '/informationArtist',
        name: 'informationArtist',
        component: informationArtist,
        beforeEnter: goIndexArtist,
    },
    {
        path: '/signup',
        name: 'signup',
        component: signup,
    },
    {
        path: '/createMusic',
        name: 'createMusic',
        component: createMusic,
    },
    {
        path: '/createAlbum',
        name: 'createAlbum',
        component: createAlbum,
    },
    {
        path: '/createPlaylistUser',
        name: 'createPlaylistUser',
        component: createPlaylistUser,
    },
    {
        path: '/addMusicToPlaylist',
        name: 'addMusicToPlaylist',
        component: addMusicToPlaylist,
    },
    {
        path: '/allPlaylistUser',
        name: 'allPlaylistUser',
        component: allPlaylistUser,
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
        path: '/allMusicArtist/:id',
        name: 'allMusicArtist',
        component: allMusicArtist,
    },
    {
        path: '/logoutH',
        name: 'logoutH',
        component: logoutH,
    },
    

    {
        path: '/functionDisplayUser',
        name: 'functionDisplayUser',
        component: functionDisplayUser,
    },
    {
        path: '/allAlbumArtist/:id',
        name: 'allAlbumArtist',
        component: allAlbumArtist,
    },
    {
        path: '/allPlaylistArtist/:id',
        name: 'allPlaylistArtist',
        component: allPlaylistArtist,
    },

    {
        path: '/playlist/:id',
        name: 'playlist',
        component: playlist,
    },
    {
        path: '/informationActor',
        name: 'informationActor',
        component: informationActor,
    },


    {
        path: '/allPopularArtist',
        name: 'allPopularArtist',
        component: allPopularArtist,
    },
    {
        path: '/allNewMusic',
        name: 'allNewMusic',
        component: allNewMusic,
    },


     {
        path: '/indexStory/:id',
        name: 'indexStory',
        component: indexStory,
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
        path: '/testCutStory',
        name: 'testCutStory',
        component: testCutStory,
    },


    {
        path: '/testToken',
        name: 'testToken',
        component: testToken,
    },
    {
        path: '/settingInfoArtist',
        name: 'settingInfoArtist',
        component: settingInfoArtist,
    },
    {
        path: '/allRecentMusic',
        name: 'allRecentMusic',
        component: allRecentMusic,
    },

    {
        path: '/reportMusic',
        name: 'reportMusic',
        component: reportMusic,
    },

    {
        path: '/indexMusicHidden/:id',
        name: 'indexMusicHidden',
        component: indexMusicHidden,
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
            {
                path: 'allMusicUnconfirmed',
                name: 'allMusicUnconfirmed',
                component: allMusicUnconfirmed,
            },


        ]
    },

    {
        path: '/IndexMusicForAdmin/:id',
        name: 'IndexMusicForAdmin',
        component: IndexMusicForAdmin,
    },
    {
        path: '/indexArtist/:id',
        name: 'indexArtist',
        component: indexArtist,
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
    },
    {
        path: '/functionDisplay',
        name: 'functionDisplay',
        component: functionDisplay,
    },


];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes, // Các route được định nghĩa
});

export default router;
