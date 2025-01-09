<template>
  <div>
    <h1>Audio Cutter</h1>
    <input type="file" accept="audio/*" @change="handleFileUpload" />
    <div v-if="audioUrl">
      <p>File đã tải lên: {{ audioName }}</p>
      <audio controls :src="audioUrl"></audio>
      <div>
        <label>Start Time (giây):</label>
        <input type="number" v-model="startTime" />
        <label>End Time (giây):</label>
        <input type="number" v-model="endTime" />
      </div>
      <button @click="trimAudio">Cắt File</button>
    </div>
    <div v-if="trimmedAudioUrl">
      <h2>File sau khi cắt:</h2>
      <audio controls :src="trimmedAudioUrl"></audio>
      <a :href="trimmedAudioUrl" download="trimmed_audio.mp3">Tải về</a>
    </div>
  </div>
</template>

<script>
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

export default {
  data() {
    return {
      audioFile: null,
      audioUrl: '',
      audioName: '',
      startTime: 0,
      endTime: 0,
      trimmedAudioUrl: '',
    };
  },
  methods: {
    async handleFileUpload(event) {
      this.audioFile = event.target.files[0];
      this.audioName = this.audioFile.name;
      this.audioUrl = URL.createObjectURL(this.audioFile);
    },
    async trimAudio() {
      if (!this.audioFile || this.startTime >= this.endTime) {
        alert('Thông tin không hợp lệ.');
        return;
      }

      // Khởi tạo FFmpeg
      const ffmpeg = createFFmpeg({ log: true });
      await ffmpeg.load();

      // Đọc file và nạp vào bộ nhớ FFmpeg
      const fileName = this.audioFile.name;
      const outputFile = `trimmed_${fileName}`;
      ffmpeg.FS('writeFile', fileName, await fetchFile(this.audioFile));

      // Chạy lệnh cắt file âm thanh
      await ffmpeg.run(
        '-i',
        fileName,
        '-ss',
        `${this.startTime}`,
        '-to',
        `${this.endTime}`,
        '-c',
        'copy',
        outputFile
      );

      // Lấy file kết quả từ bộ nhớ FFmpeg
      const data = ffmpeg.FS('readFile', outputFile);

      // Tạo URL blob cho file đã cắt
      this.trimmedAudioUrl = URL.createObjectURL(new Blob([data.buffer], { type: 'audio/mp3' }));

      // Dọn dẹp bộ nhớ FFmpeg
      ffmpeg.FS('unlink', fileName);
      ffmpeg.FS('unlink', outputFile);
    },
  },
};
</script>

<style>
button {
  margin: 10px 0;
}
audio {
  display: block;
  margin: 10px 0;
}
</style>
