<template>
  <div class="audio-cutter">
    <!-- Hiển thị waveform (hình sóng âm thanh) -->
    <div id="waveform" :class="{ hidden: !isWaveformVisible }"></div>

    <!-- Thanh kéo dùng để chọn khoảng thời gian -->
    <div id="slider"></div>

    <!-- Hiển thị thời gian bắt đầu và kết thúc của đoạn nhạc cắt -->
    <div class="time-display">
      <span>Start: {{ startTime }}</span>
      <span>End: {{ endTime }}</span>
    </div>

    <!-- Nút Cắt, khi nhấn sẽ gọi phương thức cutMusic() -->
    <button @click="cutMusic">Cắt</button>
  </div>
</template>

<script>
import WaveSurfer from "wavesurfer.js";
import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.min.css";
import { WaveFile } from "wavefile";

export default {
  props: {
    file: {
      type: Blob,
      required: true,
    },
  },
  data() {
    return {
      wavesurfer: null,
      slider: null,
      startTime: 0,
      endTime: 0,
      isWaveformVisible: true,
    };
  },
  mounted() {
    this.initializeWaveSurfer();
    this.initializeSlider();
  },
  methods: {
    initializeWaveSurfer() {
      this.wavesurfer = WaveSurfer.create({
        container: "#waveform",
        waveColor: "#A8DBA8",
        progressColor: "#3B8686",
        barWidth: 2,
        cursorColor: "red",
      });

      this.wavesurfer.load(URL.createObjectURL(this.file));

      this.wavesurfer.on("ready", () => {
        const duration = this.wavesurfer.getDuration();
        this.slider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: duration,
          },
        });
        this.endTime = duration;
      });
    },
    initializeSlider() {
      this.slider = document.getElementById("slider");
      noUiSlider.create(this.slider, {
        start: [0, 10],
        connect: true,
        range: {
          min: 0,
          max: 0,
        },
      });

      this.slider.noUiSlider.on("update", (values) => {
        this.startTime = parseFloat(values[0]);
        this.endTime = parseFloat(values[1]);
      });
    },
    async cutMusic() {
      const audioContext = new AudioContext();
      const arrayBuffer = await this.file.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      const startSample = Math.floor(this.startTime * audioBuffer.sampleRate);
      const endSample = Math.floor(this.endTime * audioBuffer.sampleRate);

      const trimmedBuffer = audioContext.createBuffer(
        audioBuffer.numberOfChannels,
        endSample - startSample,
        audioBuffer.sampleRate
      );

      for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
        trimmedBuffer
          .getChannelData(i)
          .set(
            audioBuffer.getChannelData(i).slice(startSample, endSample)
          );
      }

      const wavBlob = this.bufferToWav(trimmedBuffer);
      this.$emit("on-save", wavBlob);
    },
    bufferToWav(buffer) {
      const wav = new WaveFile();
      const interleaved = new Float32Array(
        buffer.length * buffer.numberOfChannels
      );

      for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
        const data = buffer.getChannelData(channel);
        for (let i = 0; i < data.length; i++) {
          interleaved[i * buffer.numberOfChannels + channel] = data[i];
        }
      }

      wav.fromScratch(
        buffer.numberOfChannels,
        buffer.sampleRate,
        "16",
        interleaved
      );

      return new Blob([wav.toBuffer()], { type: "audio/wav" });
    },
  },
};
</script>


<style scoped>
.audio-cutter {
  width: 92%;
  text-align: center;
}
#waveform {
  height: 10px;
}
#slider {
  margin: 10px;
  width: 100%;
}

.time-display {
  margin: 10px 0;
  font-size: 16px;
}

button {
  margin-top: 20px;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}

.hidden {
  visibility: hidden; /* Ẩn phần tử mà không ảnh hưởng đến layout */
}
</style>
