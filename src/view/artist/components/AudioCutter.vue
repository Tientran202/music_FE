<template>
  <div class="audio-cutter-container">
    <!-- Thanh kéo với 2 nút -->
    <div class="timeline" ref="timeline">
      <!-- Nút bắt đầu -->
      <div
        class="slider-button start"
        ref="startButton"
        :style="{ left: startLeft + '%' }"
        @mousedown="startDrag('start')"
      ></div>

      <!-- Nút kết thúc -->
      <div
        class="slider-button end"
        ref="endButton"
        :style="{ left: endLeft + '%' }"
        @mousedown="startDrag('end')"
      ></div>

      <!-- Thanh kéo -->
      <div class="slider-track"></div>
    </div>

    <div class="time-info">
      <span>{{ formatTime(startTime) }} - {{ formatTime(endTime) }}</span>
    </div>

    <button @click="saveCutAudio" class="btn-save">Lưu đoạn nhạc cắt</button>
  </div>
</template>

<script>
export default {
  props: {
    file: {
      type: Blob,
      required: true,
    },
  },
  data() {
    return {
      audioFile: null, // Đối tượng file nhạc
      audioContext: null, // Đối tượng audio context để phát nhạc
      audioBuffer: null, // Bộ đệm âm thanh
      audioSource: null, // Đối tượng audio source
      startTime: 0, // Thời gian bắt đầu
      endTime: 0, // Thời gian kết thúc
      startLeft: 0, // Vị trí bắt đầu trên thanh kéo (tính theo %)
      endLeft: 100, // Vị trí kết thúc trên thanh kéo (tính theo %)
      dragging: null, // Theo dõi đang kéo nút nào
      musicId: "",
      titleStory: "",
      imgCover: "",
      userId: "",
    };
  },
  watch: {
    file: "updateFile", // Khi có file mới từ parent, cập nhật file
  },
  methods: {
    // Cập nhật file nhạc được chọn
    updateFile(newFile, musicId, titleStory, imgCover, userId) {
      this.audioFile = URL.createObjectURL(newFile);
      this.musicId = musicId; // Lưu musicId vào một biến để sử dụng sau này
      this.titleStory = titleStory;
      this.imgCover = imgCover;
      this.userId = userId;
      this.loadAudio();
    },
    loadAudio() {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      this.audioContext = context;

      const reader = new FileReader();
      reader.onload = (e) => {
        context.decodeAudioData(e.target.result, (buffer) => {
          this.audioBuffer = buffer;
          this.endTime = buffer.duration; 
          this.playFromStart();
        });
      };
      reader.readAsArrayBuffer(this.file);
    },

    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs.toString().padStart(2, "0")}`;
    },

    startDrag(position) {
      this.dragging = position;

      const timeline = this.$refs.timeline;
      const onMouseMove = (e) => this.handleMouseMove(e, timeline);
      const onMouseUp = () => this.stopDrag(onMouseMove, onMouseUp);

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },

    // Xử lý khi di chuyển chuột
    handleMouseMove(e, timeline) {
      const rect = timeline.getBoundingClientRect();
      const percent = Math.min(
        Math.max((e.clientX - rect.left) / rect.width, 0),
        1
      );

      if (this.dragging === "start") {
        this.startLeft = percent * 100;
        this.startTime = percent * this.audioBuffer.duration;
        this.playFromStart();
      } else if (this.dragging === "end") {
        this.endLeft = percent * 100;
        this.endTime = percent * this.audioBuffer.duration;
        this.playFromStart();
      }
    },

    // Dừng kéo và loại bỏ các sự kiện
    stopDrag(onMouseMove, onMouseUp) {
      this.dragging = null;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    },

    // Phát lại bài nhạc từ startTime và dừng ở endTime
    playFromStart() {
      if (this.audioContext && this.audioBuffer) {
        // Dừng nếu đang phát bài nhạc trước đó
        if (this.audioSource) {
          this.audioSource.stop();
        }

        this.audioSource = this.audioContext.createBufferSource();
        this.audioSource.buffer = this.audioBuffer;

        // Đặt thời gian bắt đầu và kết thúc
        this.audioSource.start(0, this.startTime);

        // Dừng nhạc khi đến thời gian kết thúc
        const duration = this.endTime - this.startTime;
        setTimeout(() => {
          if (this.audioSource) {
            this.audioSource.stop();
          }
        }, duration * 1000);

        // Tăng cường kết nối audio và đích phát (output)
        this.audioSource.connect(this.audioContext.destination);
      }
    },

    // Lưu đoạn nhạc đã cắt
    async saveCutAudio() {
      const formData = new FormData();
      formData.append("startTime", parseInt(this.startTime, 10));
      formData.append("endTime", parseInt(this.endTime, 10));
      formData.append("musicId", this.musicId);
      formData.append("titleStory", this.titleStory);
      formData.append("imgCover", this.imgCover);
      formData.append("userId", this.userId);

      try {
        const response = await fetch(
          "http://localhost:8080/api/story/createStory",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          alert("create story successfully!");
        } else {
          alert("Upload failed!");
        }
      } catch (error) {
        console.error(error);
      }
      this.$router.push(`informationArtist`);
    },
  },
};
</script>

<style scoped>
.audio-cutter-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline {
  position: relative;
  width: 80%;
  height: 10px;
  background-color: #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.slider-button {
  position: absolute;
  top: -5px;
  width: 10px;
  height: 20px;
  background-color: #4caf50;
  border-radius: 5px;
  cursor: pointer;
}

.slider-button.start {
  left: 0;
}

.slider-button.end {
  right: 0;
}

.slider-track {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: rgba(76, 175, 80, 0.3);
  border-radius: 5px;
}

.time-info {
  margin-top: 10px;
}

button.btn-save {
  margin-top: 20px;
  padding: 10px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button.btn-save:hover {
  background-color: #45a049;
}
</style>
