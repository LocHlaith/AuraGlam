const app = getApp();

Page({
  data: {
    cameraActive: false,
    capturedImage: app.globalData.demoBeforeImage,
    scanState: "ready",
    progress: 0,
    metrics: [
      { label: "面部点云", value: "468", unit: "点" },
      { label: "骨相对称", value: "92", unit: "%" },
      { label: "T区油光", value: "中", unit: "" },
      { label: "眼下暗沉", value: "轻", unit: "" }
    ],
    landmarks: [
      { left: 38, top: 35 },
      { left: 48, top: 34 },
      { left: 58, top: 36 },
      { left: 44, top: 48 },
      { left: 53, top: 48 },
      { left: 41, top: 62 },
      { left: 50, top: 64 },
      { left: 59, top: 62 }
    ],
    recommendations: [
      "鼻翼两侧降低喷涂流量",
      "眼下遮瑕采用微震晕染",
      "眉峰轨迹向外延展 4mm"
    ]
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
  startCamera() {
    wx.authorize({
      scope: "scope.camera",
      success: () => {
        this.setData({ cameraActive: true, scanState: "camera" });
      },
      fail: () => {
        wx.showModal({
          title: "摄像头未授权",
          content: "可在微信设置中开启摄像头权限，当前继续使用样张演示。",
          showCancel: false
        });
        this.useDemo();
      }
    });
  },
  takePhoto() {
    if (!this.data.cameraActive) {
      this.useDemo();
      return;
    }
    const context = wx.createCameraContext();
    context.takePhoto({
      quality: "high",
      success: (res) => {
        this.setData({ capturedImage: res.tempImagePath, cameraActive: false });
        this.startScan();
      },
      fail: () => this.useDemo()
    });
  },
  useDemo() {
    this.setData({
      capturedImage: app.globalData.demoBeforeImage,
      cameraActive: false
    });
    this.startScan();
  },
  startScan() {
    this.clearTimer();
    this.setData({ scanState: "scanning", progress: 4 });
    this.timer = setInterval(() => {
      const next = Math.min(this.data.progress + 8, 100);
      this.setData({ progress: next });
      if (next >= 100) {
        this.clearTimer();
        this.setData({ scanState: "done" });
      }
    }, 160);
  }
});
