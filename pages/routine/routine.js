Page({
  data: {
    running: false,
    paused: false,
    progress: 0,
    currentStep: 0,
    steps: [
      { name: "肤前雾化", tool: "气压喷枪", duration: "00:40", state: "pending" },
      { name: "粉底喷涂", tool: "气压喷枪", duration: "01:20", state: "pending" },
      { name: "遮瑕晕染", tool: "硅胶微震头", duration: "01:10", state: "pending" },
      { name: "眉形绘制", tool: "柔性微导画笔", duration: "01:35", state: "pending" },
      { name: "T区定妆", tool: "气压喷枪", duration: "00:55", state: "pending" }
    ],
    telemetry: [
      { label: "接触力", value: "0.18N" },
      { label: "采样", value: "1000Hz" },
      { label: "退让", value: "10ms" },
      { label: "剩余", value: "05:22" }
    ],
    logs: ["工具塔归零完成", "双通道微流控预热", "安全边界已锁定"]
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
  start() {
    if (this.data.running && !this.data.paused) return;
    this.clearTimer();
    this.setData({ running: true, paused: false });
    this.timer = setInterval(() => {
      const progress = Math.min(this.data.progress + 2, 100);
      const currentStep = Math.min(Math.floor(progress / 20), this.data.steps.length - 1);
      const steps = this.data.steps.map((step, index) => ({
        ...step,
        state: index < currentStep ? "done" : index === currentStep ? "active" : "pending"
      }));
      const telemetry = this.data.telemetry.map((item) => {
        if (item.label === "剩余") {
          const seconds = Math.max(0, 322 - Math.floor(progress * 3.22));
          const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
          const ss = String(seconds % 60).padStart(2, "0");
          return { ...item, value: `${mm}:${ss}` };
        }
        return item;
      });
      this.setData({ progress, currentStep, steps, telemetry });
      if (progress >= 100) {
        this.clearTimer();
        this.setData({ running: false });
      }
    }, 260);
  },
  pause() {
    this.clearTimer();
    this.setData({ paused: true, running: true });
  },
  reset() {
    this.clearTimer();
    const steps = this.data.steps.map((step) => ({ ...step, state: "pending" }));
    this.setData({
      running: false,
      paused: false,
      progress: 0,
      currentStep: 0,
      steps,
      telemetry: [
        { label: "接触力", value: "0.18N" },
        { label: "采样", value: "1000Hz" },
        { label: "退让", value: "10ms" },
        { label: "剩余", value: "05:22" }
      ]
    });
  }
});
