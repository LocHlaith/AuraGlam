const app = getApp();

Page({
  data: {
    beforeImage: app.globalData.demoBeforeImage,
    poster: "/assets/images/result-poster.svg",
    cheatVideoPath: app.globalData.cheatVideoPath,
    prompt: "今天有早会，希望妆面清透、有精神，遮一下黑眼圈，保留自然眉形。",
    recording: false,
    selectedStyle: "commute",
    selectedScene: "morning",
    generating: false,
    resultReady: false,
    videoMissing: false,
    progress: 0,
    styles: [
      { key: "commute", label: "通勤", color: "#8FB5FF" },
      { key: "soft", label: "清透", color: "#68D5C8" },
      { key: "glow", label: "光影", color: "#FF7AA2" },
      { key: "dinner", label: "晚宴", color: "#B7A2FF" }
    ],
    scenes: [
      { key: "morning", label: "早会" },
      { key: "date", label: "约会" },
      { key: "photo", label: "拍照" }
    ],
    plan: [
      { title: "底妆", desc: "柔雾粉底喷涂，鼻翼低流量补偿" },
      { title: "遮瑕", desc: "眼下区域微震点涂，边缘自动晕染" },
      { title: "眉形", desc: "沿眉骨方向生成野生眉轨迹" },
      { title: "定妆", desc: "T区强化，脸颊保留自然光泽" }
    ]
  },
  onLoad() {
    this.recorder = wx.getRecorderManager();
    this.recorder.onStop(() => {
      this.setData({
        recording: false,
        prompt: "想要一个适合上班的清透妆，眼下更干净，整体不要太浓。"
      });
    });
  },
  onUnload() {
    this.clearTimer();
  },
  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  chooseImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ["image"],
      sourceType: ["camera", "album"],
      camera: "front",
      success: (res) => {
        const file = res.tempFiles && res.tempFiles[0];
        if (file && file.tempFilePath) {
          this.setData({ beforeImage: file.tempFilePath, resultReady: false });
        }
      }
    });
  },
  startRecord() {
    wx.authorize({
      scope: "scope.record",
      success: () => {
        this.setData({ recording: true });
        this.recorder.start({ duration: 6000, format: "mp3" });
      },
      fail: () => {
        this.mockVoice();
      }
    });
  },
  stopRecord() {
    if (!this.data.recording) return;
    this.recorder.stop();
  },
  mockVoice() {
    this.setData({
      recording: false,
      prompt: "想要一个适合上班的清透妆，眼下更干净，整体不要太浓。"
    });
  },
  onPromptInput(event) {
    this.setData({ prompt: event.detail.value });
  },
  selectStyle(event) {
    this.setData({ selectedStyle: event.currentTarget.dataset.key });
  },
  selectScene(event) {
    this.setData({ selectedScene: event.currentTarget.dataset.key });
  },
  generateResult() {
    this.clearTimer();
    this.setData({
      generating: true,
      resultReady: false,
      videoMissing: false,
      progress: 5
    });
    this.timer = setInterval(() => {
      const next = Math.min(this.data.progress + 11, 100);
      this.setData({ progress: next });
      if (next >= 100) {
        this.clearTimer();
        this.setData({
          generating: false,
          resultReady: true
        });
      }
    }, 180);
  },
  onVideoError() {
    this.setData({ videoMissing: true });
  },
  goRoutine() {
    wx.redirectTo({ url: "/pages/routine/routine" });
  }
});
