# AuraGlam 人脸点云识别 Demo

这个工具基于 `others/main.py` 的 MediaPipe Face Mesh 方案整理而来，默认读取小程序样张 `assets/images/demo-before.png`，输出网格叠加图和 468 点坐标 JSON。

```powershell
.venv\python.exe tools\face_mesh_demo\face_mesh_demo.py
```

常用参数：

```powershell
.venv\python.exe tools\face_mesh_demo\face_mesh_demo.py --image assets\images\demo-before.png --output output_mesh.png --json output_mesh.json
.venv\python.exe tools\face_mesh_demo\face_mesh_demo.py --camera
```
