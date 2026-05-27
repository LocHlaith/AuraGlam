Component({
  properties: {
    active: {
      type: String,
      value: "index"
    }
  },
  data: {
    tabs: [
      {
        key: "index",
        text: "首页",
        url: "/pages/index/index",
        icon: "/assets/icons/home.svg"
      },
      {
        key: "scan",
        text: "扫描",
        url: "/pages/scan/scan",
        icon: "/assets/icons/scan.svg"
      },
      {
        key: "recommend",
        text: "定妆",
        url: "/pages/recommend/recommend",
        icon: "/assets/icons/sparkle.svg"
      },
      {
        key: "routine",
        text: "执行",
        url: "/pages/routine/routine",
        icon: "/assets/icons/arm.svg"
      },
      {
        key: "device",
        text: "设备",
        url: "/pages/device/device",
        icon: "/assets/icons/device.svg"
      }
    ]
  },
  methods: {
    go(event) {
      const { key, url } = event.currentTarget.dataset;
      if (key === this.properties.active) return;
      wx.redirectTo({ url });
    }
  }
});
