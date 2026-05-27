Page({
  data: {
    heroImage: "/assets/images/hero-aura.svg",
    quickActions: [
      {
        title: "AI定妆",
        subtitle: "语音妆容推荐",
        icon: "/assets/icons/sparkle.svg",
        tone: "blue",
        url: "/pages/recommend/recommend"
      },
      {
        title: "面部扫描",
        subtitle: "3D骨相提取",
        icon: "/assets/icons/scan.svg",
        tone: "aqua",
        url: "/pages/scan/scan"
      },
      {
        title: "自动上妆",
        subtitle: "6轴协作执行",
        icon: "/assets/icons/arm.svg",
        tone: "rose",
        url: "/pages/routine/routine"
      },
      {
        title: "耗材管理",
        subtitle: "RFID余量识别",
        icon: "/assets/icons/cartridge.svg",
        tone: "violet",
        url: "/pages/device/device"
      }
    ],
    modules: [
      { name: "骨相建模", value: "468点", icon: "/assets/icons/scan.svg" },
      { name: "肤况诊断", value: "T区重点", icon: "/assets/icons/sparkle.svg" },
      { name: "主动退让", value: "10ms", icon: "/assets/icons/shield.svg" },
      { name: "工具塔", value: "3工位", icon: "/assets/icons/device.svg" },
      { name: "物料闭环", value: "双通道", icon: "/assets/icons/cartridge.svg" },
      { name: "语音意图", value: "自然描述", icon: "/assets/icons/mic.svg" }
    ],
    routines: [
      {
        title: "极速通勤",
        desc: "柔雾底妆 / 野生眉 / T区定妆",
        time: "03:20",
        image: "/assets/images/makeup-commute.svg"
      },
      {
        title: "会议清透",
        desc: "低饱和腮红 / 黑眼圈遮瑕",
        time: "05:40",
        image: "/assets/images/makeup-soft.svg"
      },
      {
        title: "晚宴光影",
        desc: "立体修容 / 微亮唇色 / 轮廓增强",
        time: "08:10",
        image: "/assets/images/makeup-dinner.svg"
      }
    ],
    consumables: [
      { label: "粉底", percent: 82, color: "#F4C6B5" },
      { label: "爽肤水", percent: 64, color: "#8FB5FF" },
      { label: "眉胶", percent: 47, color: "#5A3E37" }
    ]
  },
  go(event) {
    const { url } = event.currentTarget.dataset;
    wx.redirectTo({ url });
  }
});
