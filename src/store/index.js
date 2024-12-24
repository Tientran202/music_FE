import { createStore } from 'vuex';

export default createStore({
  state: {
    currentSong: null,
    isPlaying: false,
    audioSrc: null, // Chứa URL đối tượng của audio
    isAuthenticated: true, // Trạng thái xác thực
  },

  mutations: {
    SET_AUTHENTICATED(state, value) {
      state.isAuthenticated = value; // Cập nhật trạng thái trang chu "/"
    },

    resetPlayer(state) {
      state.currentSong = null;
      state.isPlaying = false;
      state.audioSrc = null;
    },
    setIsPlaying(state, status) {
      state.isPlaying = status;
    },
    setSong(state, song) {
      state.currentSong = song;

      if (song.audio) {
        // Chuyển dữ liệu audio (byte array hoặc base64) thành Blob và tạo URL từ Blob
        let audioBlob;
        if (typeof song.audio === 'string') {  // Nếu song.audio là base64
          audioBlob = new Blob([new Uint8Array(atob(song.audio).split('').map(c => c.charCodeAt(0)))], { type: 'audio/mpeg' });
        } else if (Array.isArray(song.audio)) {  // Nếu song.audio là byte array
          audioBlob = new Blob([new Uint8Array(song.audio)], { type: 'audio/mpeg' });
        }

        state.audioSrc = URL.createObjectURL(audioBlob);  // Tạo đối tượng URL cho audio
      }

      state.isPlaying = true;
    },

    togglePlayPause(state) {
      state.isPlaying = !state.isPlaying;
    },

  },

  actions: {

    setAuthenticated({ commit }, value) {
      commit("SET_AUTHENTICATED", value); // Gọi mutation để cập nhật cho "/"
    },
    resetPlayer({ commit }) {
      commit('resetPlayer');
    },

    toggleIsPlaying({ commit, state }) {
      commit("setIsPlaying", !state.isPlaying);
    },
    playSong({ commit }, song) {
      commit('setSong', song);
    },
    togglePlayPause({ commit }) {
      commit('togglePlayPause'); // Gọi mutation togglePlayPause
    },

    stopSong({ commit }) {
      commit('clearSong'); // Gọi mutation để dừng và xóa bài hát
    },
  },

  getters: {
    isAuthenticated: (state) => state.isAuthenticated, // Lấy trạng thái xác thực "/"

    currentSong: (state) => state.currentSong,
    isPlaying: (state) => state.isPlaying,
    audioSrc: (state) => state.audioSrc,
  },
});
