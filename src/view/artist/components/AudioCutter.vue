<template>
  <div class="audio-cutter-container">
    <div class="timeline" ref="timeline">
      <div
        class="slider-button start"
        ref="startButton"
        :style="{ left: startLeft + '%' }"
        @mousedown="startDrag('start')"
      ></div>

      <div
        class="slider-button end"
        ref="endButton"
        :style="{ left: endLeft + '%' }"
        @mousedown="startDrag('end')"
      ></div>

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
      audioFile: null, 
      audioContext: null,
      audioBuffer: null, 
      audioSource: null,
      startTime: 0,
      endTime: 0, 
      startLeft: 0, 
      endLeft: 100, 
      dragging: null, 
      musicId: "",
      titleStory: "",
      imgCover: "",
      userId: "",
    };
  },
  watch: {
    file: "updateFile", 
  },
  methods: {
    
    updateFile(newFile, musicId, titleStory, imgCover, userId) {
      this.audioFile = URL.createObjectURL(newFile);
      this.musicId = musicId; 
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

    stopDrag(onMouseMove, onMouseUp) {
      this.dragging = null;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    },

    playFromStart() {
      if (this.audioContext && this.audioBuffer) {
        if (this.audioSource) {
          this.audioSource.stop();
        }

        this.audioSource = this.audioContext.createBufferSource();
        this.audioSource.buffer = this.audioBuffer;

        this.audioSource.start(0, this.startTime);

        const duration = this.endTime - this.startTime;
        setTimeout(() => {
          if (this.audioSource) {
            this.audioSource.stop();
          }
        }, duration * 1000);

        this.audioSource.connect(this.audioContext.destination);
      }
    },

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
