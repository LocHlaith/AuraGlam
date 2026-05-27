# AuraGlam 微信小程序原型

AuraGlam 是桌面级全自动智能美妆机器人。当前工程实现了微信小程序前端原型，覆盖妆容推荐、3D 骨相扫描、肤况分析、自动上妆执行、耗材与设备状态管理。

## 打开项目

1. 安装微信开发者工具。
2. 选择“导入项目”，目录选择本文件夹。
3. AppID 暂用 `touristappid`，正式申请后在 `project.config.json` 中替换。

## 页面

- `pages/index`：首页工作台，按美图秀秀式大图首屏、深色工具区、圆角入口组织。
- `pages/scan`：摄像头/样张扫描，模拟 468 点骨相与肤况分析。
- `pages/recommend`：自然语音妆容描述、妆前照、AI 定妆预览。
- `pages/routine`：6 轴协作臂自动上妆进度与安全状态。
- `pages/device`：耗材仓、RFID/NFC 识别、硬件与安全模块状态。

## 作弊视频

AI 定妆页固定读取：

```text
assets/videos/cheat_makeup_result.mp4
```

按 `docs/NanoBanana作弊视频提示词.md` 生成并命名后，当前所有用户输入都会播放这同一段视频。

## 人脸点云 demo

虚拟环境创建后运行：

```powershell
.venv\python.exe tools\face_mesh_demo\face_mesh_demo.py
```

输出 `output_mesh.png` 与 `output_mesh.json`。
