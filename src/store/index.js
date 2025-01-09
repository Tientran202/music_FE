import { createStore } from "vuex";

export default createStore({
  state: {
    currentSong: null, // Bài hát hiện tại
    isPlaying: false, // Trạng thái phát nhạc
    audioSrc: null, // URL nguồn audio
    isAuthenticated: true, // Trạng thái xác thực
    queue: [], // Hàng đợi bài hát
  },

  mutations: {
    setQueue(state, songs) {
      state.queue = songs; // Đặt danh sách bài hát
    },
    setCurrentSong(state, song) {
      state.currentSong = song; // Đặt bài hát hiện tại
      if (song.audio) {
        let audioBlob;
        if (typeof song.audio === "string") {
          audioBlob = new Blob(
            [new Uint8Array(atob(song.audio).split("").map((c) => c.charCodeAt(0)))],
            { type: "audio/mpeg" }
          );
        } else if (Array.isArray(song.audio)) {
          audioBlob = new Blob([new Uint8Array(song.audio)], { type: "audio/mpeg" });
        }

        state.audioSrc = URL.createObjectURL(audioBlob); // Tạo URL từ Blob
      }
      state.isPlaying = true; // Bắt đầu phát nhạc
    },
    togglePlayPause(state) {
      state.isPlaying = !state.isPlaying; // Chuyển đổi trạng thái phát nhạc
    },
    resetPlayer(state) {
      state.currentSong = null;
      state.isPlaying = false;
      state.audioSrc = null;
    },
  },

  actions: {
    playSong({ commit }, song) {
      commit("setCurrentSong", song); // Phát bài hát mới
    },
    playNext({ commit, state }) {
      const currentIndex = state.queue.findIndex((song) => song.id === state.currentSong.id);
      if (currentIndex !== -1 && currentIndex < state.queue.length - 1) {
        const nextSong = state.queue[currentIndex + 1];
        commit("setCurrentSong", nextSong); // Phát bài hát tiếp theo
      } else {
        console.warn("Không còn bài hát tiếp theo!");
      }
    },
    playPrevious({ commit, state }) {
      const currentIndex = state.queue.findIndex((song) => song.id === state.currentSong.id);
      if (currentIndex > 0) {
        const previousSong = state.queue[currentIndex - 1];
        commit("setCurrentSong", previousSong); // Phát bài hát trước đó
      } else {
        console.warn("Không còn bài hát trước đó!");
      }
    },
    playAllSongs({ commit }, albumSongs) {
      commit("setQueue", albumSongs); // Đặt album vào hàng đợi
      commit("setCurrentSong", albumSongs[0]); // Phát bài hát đầu tiên trong album
    },
    addSongsToQueue({ commit, state }, songs) {
      const updatedQueue = [...state.queue, ...songs];
      commit("setQueue", updatedQueue); // Thêm bài hát vào hàng đợi
    },
    togglePlayPause({ commit }) {
      commit("togglePlayPause"); // Dừng hoặc tiếp tục phát
    },
    resetPlayer({ commit }) {
      commit("resetPlayer"); // Reset trình phát nhạc
    },
  },

  getters: {
    isAuthenticated: (state) => state.isAuthenticated, // Trạng thái xác thực
    currentSong: (state) => state.currentSong, // Lấy bài hát hiện tại
    isPlaying: (state) => state.isPlaying, // Trạng thái phát nhạc
    audioSrc: (state) => state.audioSrc, // URL nguồn âm thanh
    queue: (state) => state.queue, // Hàng đợi bài hát
  },
});
