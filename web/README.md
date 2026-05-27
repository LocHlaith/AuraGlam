# AuraGlam Web

这是从微信小程序迁移出的静态网站版本，保留首页、扫描、AI 定妆、自动执行、设备管理五个核心视图。

## 预览

直接打开：

```text
web/index.html
```

也可以从项目根目录启动一个静态服务：

```powershell
python -m http.server 8080
```

然后访问：

```text
http://localhost:8080/web/
```

摄像头能力需要浏览器授权；如果不可用，扫描流程会自动切换到样张演示。
