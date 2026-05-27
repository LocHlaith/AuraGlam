Page({
  data: {
    deviceState: "在线",
    consumables: [
      { name: "柔雾粉底 N02", type: "低粘度", channel: "气压通道", percent: 82, color: "#F4C6B5", shots: 21 },
      { name: "舒缓爽肤水", type: "低粘度", channel: "气压通道", percent: 64, color: "#8FB5FF", shots: 34 },
      { name: "自然棕眉胶", type: "高粘度", channel: "蠕动泵", percent: 47, color: "#5A3E37", shots: 18 },
      { name: "提亮遮瑕 C01", type: "高粘度", channel: "蠕动泵", percent: 58, color: "#EBC8B5", shots: 16 }
    ],
    hardware: [
      { label: "6轴协作臂", value: "校准完成" },
      { label: "三工位工具塔", value: "清洁完成" },
      { label: "六轴力矩传感", value: "0.01N" },
      { label: "深度摄像头", value: "10s扫描" }
    ],
    safety: [
      { label: "主动退让", value: "开启" },
      { label: "RTOS响应", value: "10ms" },
      { label: "采样频率", value: "1000Hz" }
    ]
  },
  refresh() {
    wx.showToast({ title: "状态已刷新", icon: "success" });
  }
});
