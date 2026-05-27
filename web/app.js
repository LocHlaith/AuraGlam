const assets = {
  image: (name) => `../assets/images/${name}.png`,
  meshJson: "../output_mesh.json",
  video: "../assets/videos/cheat_makeup_result.mp4"
};

const iconPaths = {
  arm: '<path d="M20 47H44M26 47L18 33L27 24L38 35L31 47M38 35L47 26C50 23 50 18.5 47 15.5C44 12.5 39.5 12.5 36.5 15.5L27 24" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M47 26L53 32" stroke="white" stroke-width="5" stroke-linecap="round"/>',
  camera: '<path d="M18 22H25L29 16H35L39 22H46C49.3 22 52 24.7 52 28V46C52 49.3 49.3 52 46 52H18C14.7 52 12 49.3 12 46V28C12 24.7 14.7 22 18 22Z" stroke="white" stroke-width="5" stroke-linejoin="round"/><circle cx="32" cy="37" r="9" stroke="white" stroke-width="5"/>',
  cartridge: '<path d="M23 10H41V20L47 28V51C47 53.8 44.8 56 42 56H22C19.2 56 17 53.8 17 51V28L23 20V10Z" stroke="white" stroke-width="5" stroke-linejoin="round"/><path d="M22 36H42" stroke="white" stroke-width="4" stroke-linecap="round"/>',
  device: '<rect x="14" y="12" width="36" height="44" rx="8" stroke="white" stroke-width="5"/><path d="M24 23H40M24 32H40M24 41H34" stroke="white" stroke-width="4" stroke-linecap="round"/>',
  home: '<path d="M12 30.5L32 14L52 30.5V52C52 53.1 51.1 54 50 54H39V39H25V54H14C12.9 54 12 53.1 12 52V30.5Z" stroke="white" stroke-width="5" stroke-linejoin="round"/>',
  mic: '<rect x="24" y="9" width="16" height="29" rx="8" stroke="white" stroke-width="5"/><path d="M15 32C15 41.4 22.6 49 32 49M49 32C49 41.4 41.4 49 32 49M32 49V57" stroke="white" stroke-width="5" stroke-linecap="round"/>',
  scan: '<path d="M15 24V15H24M40 15H49V24M49 40V49H40M24 49H15V40" stroke="white" stroke-width="5" stroke-linecap="round"/><path d="M21 34C25 43 39 43 43 34M22 27C22.2 23.5 25 20 29 20H35C39 20 41.8 23.5 42 27" stroke="white" stroke-width="4" stroke-linecap="round"/>',
  shield: '<path d="M32 8L51 16V29C51 42 43.2 52 32 56C20.8 52 13 42 13 29V16L32 8Z" stroke="white" stroke-width="5" stroke-linejoin="round"/><path d="M23 32L29 38L42 25" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>',
  sparkle: '<path d="M30 8L36.5 25.5L54 32L36.5 38.5L30 56L23.5 38.5L6 32L23.5 25.5L30 8Z" stroke="white" stroke-width="4.5" stroke-linejoin="round"/><path d="M49 8L51.8 15.2L59 18L51.8 20.8L49 28L46.2 20.8L39 18L46.2 15.2L49 8Z" fill="white"/>'
};

function iconMarkup(name) {
  const paths = iconPaths[name] || iconPaths.sparkle;
  return `<span class="icon" aria-hidden="true"><svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">${paths}</svg></span>`;
}

function hydrateStaticIcons() {
  $$("[data-icon]").forEach((node) => {
    node.innerHTML = `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">${iconPaths[node.dataset.icon] || iconPaths.sparkle}</svg>`;
  });
}

const data = {
  quickActions: [
    { title: "AI定妆", subtitle: "语音妆容推荐", icon: "sparkle", tone: "blue", view: "recommend" },
    { title: "面部扫描", subtitle: "3D骨相提取", icon: "scan", tone: "aqua", view: "scan" },
    { title: "自动上妆", subtitle: "6轴协作执行", icon: "arm", tone: "rose", view: "routine" },
    { title: "耗材管理", subtitle: "RFID余量识别", icon: "cartridge", tone: "violet", view: "device" }
  ],
  modules: [
    { name: "骨相建模", value: "468点", icon: "scan" },
    { name: "肤况诊断", value: "T区重点", icon: "sparkle" },
    { name: "主动退让", value: "10ms", icon: "shield" },
    { name: "工具塔", value: "3工位", icon: "device" },
    { name: "物料闭环", value: "双通道", icon: "cartridge" },
    { name: "语音意图", value: "自然描述", icon: "mic" }
  ],
  routines: [
    { title: "极速通勤", desc: "柔雾底妆 / 野生眉 / T区定妆", time: "03:20", image: "makeup-commute" },
    { title: "会议清透", desc: "低饱和腮红 / 黑眼圈遮瑕", time: "05:40", image: "makeup-soft" },
    { title: "晚宴光影", desc: "立体修容 / 微亮唇色 / 轮廓增强", time: "08:10", image: "makeup-dinner" }
  ],
  homeConsumables: [
    { label: "粉底", percent: 82, color: "#F4C6B5" },
    { label: "爽肤水", percent: 64, color: "#8FB5FF" },
    { label: "眉胶", percent: 47, color: "#5A3E37" }
  ],
  scanMetrics: [
    { label: "面部点云", value: "468", unit: "点" },
    { label: "骨相对称", value: "92", unit: "%" },
    { label: "T区油光", value: "中", unit: "" },
    { label: "眼下暗沉", value: "轻", unit: "" }
  ],
  landmarks: [],
  scanRecommendations: [
    "鼻翼两侧降低喷涂流量",
    "眼下遮瑕采用微震晕染",
    "眉峰轨迹向外延展 4mm"
  ],
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
  ],
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
  logs: ["工具塔归零完成", "双通道微流控预热", "安全边界已锁定"],
  deviceConsumables: [
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
};

const state = {
  scanState: "ready",
  scanProgress: 0,
  cameraStream: null,
  meshImageSize: { width: 817, height: 1455 },
  scanAutoRequested: false,
  scanTimer: null,
  selectedStyle: "commute",
  selectedScene: "morning",
  generating: false,
  resultReady: false,
  recommendProgress: 0,
  recommendTimer: null,
  running: false,
  paused: false,
  routineProgress: 0,
  currentStep: 0,
  routineTimer: null,
  steps: data.steps.map((step) => ({ ...step })),
  telemetry: data.telemetry.map((item) => ({ ...item }))
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function setProgress(element, value) {
  element.style.width = `${Math.max(0, Math.min(value, 100))}%`;
}

function toast(message) {
  const node = $("#toast");
  node.textContent = message;
  node.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => node.classList.remove("show"), 1800);
}

function navigate(view) {
  if (location.hash.slice(1) === view) {
    setView(view);
    return;
  }
  location.hash = view;
}

function setView(view) {
  const target = $(`#view-${view}`) ? view : "index";
  $$(".view").forEach((node) => node.classList.toggle("active", node.dataset.view === target));
  $$("[data-view]").forEach((node) => {
    if (node.classList.contains("view")) return;
    node.classList.toggle("active", node.dataset.view === target);
  });
  document.title = `AuraGlam Web · ${viewTitle(target)}`;
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  if (target !== "scan" && state.cameraStream) {
    stopCamera();
    if (state.scanState === "camera") {
      state.scanState = "ready";
      state.scanAutoRequested = false;
      updateScanUI();
    }
  }
  if (target === "scan") {
    maybeAutoStartCamera();
  }
}

function viewTitle(view) {
  return {
    index: "首页",
    scan: "扫描",
    recommend: "定妆",
    routine: "执行",
    device: "设备"
  }[view] || "首页";
}

function bindNavigation() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-view]");
    if (!button || button.classList.contains("view")) return;
    navigate(button.dataset.view);
  });
  window.addEventListener("hashchange", () => setView(location.hash.slice(1) || "index"));
}

function renderIndex() {
  $("#quickActions").innerHTML = data.quickActions.map((item) => `
    <button class="quick-card ${item.tone}" type="button" data-view="${item.view}">
      ${iconMarkup(item.icon)}
      <span><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.subtitle)}</span></span>
    </button>
  `).join("");

  $("#moduleGrid").innerHTML = data.modules.map((item) => `
    <div class="module-item">
      ${iconMarkup(item.icon)}
      <strong>${escapeHtml(item.name)}</strong>
      <span>${escapeHtml(item.value)}</span>
    </div>
  `).join("");

  $("#homeConsumables").innerHTML = data.homeConsumables.map((item) => `
    <div class="consumable-row">
      <div class="consumable-label">
        <span class="swatch" style="background:${item.color}"></span>
        <strong>${escapeHtml(item.label)}</strong>
      </div>
      <div class="meter">
        <div class="progress-track"><div class="progress-fill" style="width:${item.percent}%"></div></div>
        <span>${item.percent}%</span>
      </div>
    </div>
  `).join("");

  $("#routineCards").innerHTML = data.routines.map((item) => `
    <article class="routine-card">
      <img src="${assets.image(item.image)}" alt="${escapeHtml(item.title)}" />
      <div class="routine-meta">
        <strong>${escapeHtml(item.title)}</strong>
        <p>${escapeHtml(item.desc)}</p>
        <div class="routine-bottom">
          <span>${escapeHtml(item.time)}</span>
          <button type="button" data-view="routine">执行</button>
        </div>
      </div>
    </article>
  `).join("");
}

function renderScan() {
  $("#scanMetrics").innerHTML = data.scanMetrics.map((item) => `
    <div class="metric-card">
      <span class="metric-label">${escapeHtml(item.label)}</span>
      <div class="metric-value">
        <span>${escapeHtml(item.value)}</span>
        <span class="metric-unit">${escapeHtml(item.unit)}</span>
      </div>
    </div>
  `).join("");

  $("#scanRecommendations").innerHTML = data.scanRecommendations.map((item) => `
    <div class="line-row">
      <span class="dot"></span>
      <span>${escapeHtml(item)}</span>
    </div>
  `).join("");

  renderLandmarks(data.landmarks);

  $("#startCamera").addEventListener("click", () => startCamera());
  $("#takePhoto").addEventListener("click", takePhoto);
  $("#useDemo").addEventListener("click", useDemoImage);
  $("#scanImage").addEventListener("load", syncLandmarkLayer);
  $("#cameraFeed").addEventListener("loadedmetadata", syncLandmarkLayer);
  window.addEventListener("resize", syncLandmarkLayer);
  updateScanUI();
}

async function loadMeshData() {
  try {
    const response = await fetch(assets.meshJson, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    const face = payload.faces && payload.faces[0];
    if (!face || !face.length) throw new Error("empty mesh");

    state.meshImageSize = { width: payload.width, height: payload.height };
    data.landmarks = face.map((point) => ({
      left: point.x / payload.width * 100,
      top: point.y / payload.height * 100,
      z: point.z,
      index: point.index,
      kind: point.index % 17 === 0 ? "major" : "soft"
    }));
    const meshMetric = data.scanMetrics.find((item) => item.label === "面部点云");
    if (meshMetric) meshMetric.value = String(face.length);
    renderLandmarks(data.landmarks);
    renderScanMetrics();
    syncLandmarkLayer();
  } catch (error) {
    data.landmarks = [];
    toast("未读取到 output_mesh.json");
    renderLandmarks([]);
    syncLandmarkLayer();
  }
}

function renderScanMetrics() {
  $("#scanMetrics").innerHTML = data.scanMetrics.map((item) => `
    <div class="metric-card">
      <span class="metric-label">${escapeHtml(item.label)}</span>
      <div class="metric-value">
        <span>${escapeHtml(item.value)}</span>
        <span class="metric-unit">${escapeHtml(item.unit)}</span>
      </div>
    </div>
  `).join("");
}

function renderLandmarks(points) {
  $("#landmarks").innerHTML = points.map((item) => `
    <span class="landmark ${item.kind}" title="#${item.index ?? ""}" style="left:${item.left}%;top:${item.top}%"></span>
  `).join("");
}

function syncLandmarkLayer() {
  const layer = $("#landmarks");
  const viewer = $(".scan-viewer");
  const image = $("#scanImage");
  if (!layer || !viewer) return;

  const viewerWidth = viewer.clientWidth;
  const viewerHeight = viewer.clientHeight;
  if (!viewerWidth || !viewerHeight) return;

  if (image && !image.hidden) {
    const naturalWidth = state.meshImageSize.width || image.naturalWidth || 1;
    const naturalHeight = state.meshImageSize.height || image.naturalHeight || 1;
    const scale = Math.min(viewerWidth / naturalWidth, viewerHeight / naturalHeight);
    const width = naturalWidth * scale;
    const height = naturalHeight * scale;
    layer.style.left = `${(viewerWidth - width) / 2}px`;
    layer.style.top = `${(viewerHeight - height) / 2}px`;
    layer.style.width = `${width}px`;
    layer.style.height = `${height}px`;
    return;
  }

  layer.style.left = "0";
  layer.style.top = "0";
  layer.style.width = "100%";
  layer.style.height = "100%";
}

function maybeAutoStartCamera() {
  if (state.scanAutoRequested || state.scanState !== "ready" || state.cameraStream) return;
  state.scanAutoRequested = true;
  startCamera().then((opened) => {
    if (opened) toast("摄像头已打开");
  });
}

async function startCamera({ quiet = false, fallbackToDemo = false } = {}) {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    if (!quiet) toast("浏览器无法调用摄像头，可使用样张演示");
    if (fallbackToDemo) useDemoImage();
    return false;
  }

  try {
    stopCamera();
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
    state.cameraStream = stream;
    const video = $("#cameraFeed");
    video.srcObject = stream;
    video.hidden = false;
    $("#scanImage").hidden = true;
    state.scanState = "camera";
    state.scanProgress = 0;
    updateScanUI();
    syncLandmarkLayer();
    return true;
  } catch (error) {
    if (!quiet) toast("摄像头未授权，可使用样张演示");
    if (fallbackToDemo) useDemoImage();
    return false;
  }
}

function stopCamera() {
  if (state.cameraStream) {
    state.cameraStream.getTracks().forEach((track) => track.stop());
    state.cameraStream = null;
  }
  const video = $("#cameraFeed");
  video.pause();
  video.srcObject = null;
  video.hidden = true;
}

async function takePhoto() {
  if (!state.cameraStream) {
    const opened = await startCamera();
    if (opened) toast("摄像头已打开，对准面部后再点扫描");
    return;
  }

  const video = $("#cameraFeed");
  if (!video.videoWidth) {
    toast("摄像头画面加载中");
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth || 960;
  canvas.height = video.videoHeight || 1280;
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  $("#scanImage").src = canvas.toDataURL("image/jpeg", 0.88);
  $("#scanImage").hidden = false;
  stopCamera();
  syncLandmarkLayer();
  startScan();
}

function useDemoImage() {
  $("#scanImage").src = assets.image("demo-before");
  $("#scanImage").hidden = false;
  stopCamera();
  syncLandmarkLayer();
  startScan();
}

function startScan() {
  clearInterval(state.scanTimer);
  state.scanState = "scanning";
  state.scanProgress = 4;
  updateScanUI();
  state.scanTimer = setInterval(() => {
    state.scanProgress = Math.min(state.scanProgress + 8, 100);
    if (state.scanProgress >= 100) {
      clearInterval(state.scanTimer);
      state.scanState = "done";
    }
    updateScanUI();
  }, 160);
}

function updateScanUI() {
  const done = state.scanState === "done";
  const scanning = state.scanState === "scanning";
  const camera = state.scanState === "camera";
  $("#scanStateText").textContent = done ? "已完成" : camera ? "摄像头" : state.scanState === "ready" ? "待扫描" : "扫描中";
  $("#scanCaption").textContent = scanning ? "正在提取3D面部骨相特征" : done ? "骨相与肤况数据已同步" : camera ? "摄像头已开启，请对准面部后扫描" : "AuraGlam 视觉模组待机";
  $("#scanLine").hidden = !scanning;
  $("#landmarks").hidden = false;
  $("#scanProgressText").textContent = `${state.scanProgress}%`;
  setProgress($("#scanProgress"), state.scanProgress);
  syncLandmarkLayer();
}

function renderRecommend() {
  $("#styleChips").innerHTML = data.styles.map((item) => `
    <button class="chip ${state.selectedStyle === item.key ? "selected" : ""}" type="button" data-style="${item.key}">
      <span class="chip-dot" style="background:${item.color}"></span>
      <span>${escapeHtml(item.label)}</span>
    </button>
  `).join("");

  $("#sceneChips").innerHTML = data.scenes.map((item) => `
    <button class="scene-chip ${state.selectedScene === item.key ? "selected" : ""}" type="button" data-scene="${item.key}">
      ${escapeHtml(item.label)}
    </button>
  `).join("");

  $("#planList").innerHTML = data.plan.map((item, index) => `
    <div class="plan-row">
      <span class="plan-index">0${index + 1}</span>
      <div>
        <span class="plan-title">${escapeHtml(item.title)}</span>
        <span class="plan-desc">${escapeHtml(item.desc)}</span>
      </div>
    </div>
  `).join("");

  $("#chooseImageButton").addEventListener("click", () => $("#photoUpload").click());
  $("#photoUpload").addEventListener("change", chooseImage);
  $("#mockVoice").addEventListener("click", mockVoice);
  $("#styleChips").addEventListener("click", selectStyle);
  $("#sceneChips").addEventListener("click", selectScene);
  $("#generateResult").addEventListener("click", generateResult);
  $("#resultVideo").addEventListener("error", showResultFallback);
  $("#resultVideo").addEventListener("canplay", showResultVideo);
  updateRecommendUI();
}

function chooseImage(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    $("#beforeImage").src = reader.result;
    state.resultReady = false;
    updateRecommendUI();
  };
  reader.readAsDataURL(file);
}

function mockVoice() {
  const button = $("#mockVoice");
  button.classList.add("recording");
  $("#promptInput").value = "想要一个适合上班的清透妆，眼下更干净，整体不要太浓。";
  setTimeout(() => button.classList.remove("recording"), 520);
}

function selectStyle(event) {
  const button = event.target.closest("[data-style]");
  if (!button) return;
  state.selectedStyle = button.dataset.style;
  renderRecommendChips();
}

function selectScene(event) {
  const button = event.target.closest("[data-scene]");
  if (!button) return;
  state.selectedScene = button.dataset.scene;
  renderRecommendChips();
}

function renderRecommendChips() {
  $$("#styleChips .chip").forEach((button) => button.classList.toggle("selected", button.dataset.style === state.selectedStyle));
  $$("#sceneChips .scene-chip").forEach((button) => button.classList.toggle("selected", button.dataset.scene === state.selectedScene));
}

function generateResult() {
  clearInterval(state.recommendTimer);
  state.generating = true;
  state.resultReady = false;
  state.recommendProgress = 5;
  showResultFallback();
  updateRecommendUI();

  state.recommendTimer = setInterval(() => {
    state.recommendProgress = Math.min(state.recommendProgress + 11, 100);
    if (state.recommendProgress >= 100) {
      clearInterval(state.recommendTimer);
      state.generating = false;
      state.resultReady = true;
      prepareResultMedia();
    }
    updateRecommendUI();
  }, 180);
}

function prepareResultMedia() {
  const video = $("#resultVideo");
  video.hidden = true;
  $("#resultFallback").hidden = false;
  video.src = assets.video;
  video.load();
}

function showResultVideo() {
  if (!state.resultReady) return;
  $("#resultFallback").hidden = true;
  const video = $("#resultVideo");
  video.hidden = false;
  video.play().catch(() => {});
}

function showResultFallback() {
  $("#resultVideo").hidden = true;
  $("#resultFallback").hidden = false;
}

function updateRecommendUI() {
  $("#resultStateText").textContent = state.resultReady ? "已生成" : "待生成";
  $("#generateText").textContent = state.generating ? "生成中" : state.resultReady ? "重新生成" : "生成定妆效果";
  $("#generateProgress").hidden = !state.generating;
  $("#resultSection").hidden = !state.resultReady;
  $("#recommendProgressText").textContent = `${state.recommendProgress}%`;
  setProgress($("#recommendProgress"), state.recommendProgress);
}

function renderRoutine() {
  $("#startRoutine").addEventListener("click", startRoutine);
  $("#pauseRoutine").addEventListener("click", pauseRoutine);
  $("#resetRoutine").addEventListener("click", resetRoutine);
  $("#logList").innerHTML = data.logs.map((item) => `
    <div class="line-row">
      <span class="dot"></span>
      <span>${escapeHtml(item)}</span>
    </div>
  `).join("");
  updateRoutineUI();
}

function startRoutine() {
  if (state.running && !state.paused) return;
  clearInterval(state.routineTimer);
  state.running = true;
  state.paused = false;
  updateRoutineUI();

  state.routineTimer = setInterval(() => {
    state.routineProgress = Math.min(state.routineProgress + 2, 100);
    updateRoutineSteps();
    updateRemainingTime();
    if (state.routineProgress >= 100) {
      clearInterval(state.routineTimer);
      state.running = false;
      state.paused = false;
    }
    updateRoutineUI();
  }, 260);
}

function pauseRoutine() {
  if (!state.running && state.routineProgress === 0) return;
  clearInterval(state.routineTimer);
  state.running = true;
  state.paused = true;
  updateRoutineUI();
}

function resetRoutine() {
  clearInterval(state.routineTimer);
  state.running = false;
  state.paused = false;
  state.routineProgress = 0;
  state.currentStep = 0;
  state.steps = data.steps.map((step) => ({ ...step }));
  state.telemetry = data.telemetry.map((item) => ({ ...item }));
  updateRoutineUI();
}

function updateRoutineSteps() {
  if (state.routineProgress >= 100) {
    state.currentStep = data.steps.length - 1;
    state.steps = data.steps.map((step) => ({ ...step, state: "done" }));
    return;
  }
  const currentStep = Math.min(Math.floor(state.routineProgress / 20), data.steps.length - 1);
  state.currentStep = currentStep;
  state.steps = data.steps.map((step, index) => ({
    ...step,
    state: index < currentStep ? "done" : index === currentStep ? "active" : "pending"
  }));
}

function updateRemainingTime() {
  state.telemetry = state.telemetry.map((item) => {
    if (item.label !== "剩余") return item;
    const seconds = Math.max(0, 322 - Math.floor(state.routineProgress * 3.22));
    const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
    const ss = String(seconds % 60).padStart(2, "0");
    return { ...item, value: `${mm}:${ss}` };
  });
}

function updateRoutineUI() {
  const current = state.steps[state.currentStep] || data.steps[0];
  $("#currentStepName").textContent = current.name;
  $("#currentStepTool").textContent = current.tool;
  $("#routineProgressText").textContent = `${state.routineProgress}%`;
  setProgress($("#routineProgress"), state.routineProgress);
  $("#routineStateText").textContent = state.running ? state.paused ? "已暂停" : "执行中" : state.routineProgress === 100 ? "已完成" : "待机";
  $("#startRoutine").textContent = state.paused ? "继续" : state.routineProgress === 100 ? "再次执行" : "开始";

  $("#stepList").innerHTML = state.steps.map((step, index) => `
    <div class="step-row ${step.state}">
      <span class="step-mark">${index + 1}</span>
      <div class="step-copy">
        <span class="step-name">${escapeHtml(step.name)}</span>
        <span class="step-tool">${escapeHtml(step.tool)}</span>
      </div>
      <span class="step-duration">${escapeHtml(step.duration)}</span>
    </div>
  `).join("");

  $("#telemetryGrid").innerHTML = state.telemetry.map((item) => `
    <div class="telemetry-card">
      <span>${escapeHtml(item.label)}</span>
      <span>${escapeHtml(item.value)}</span>
    </div>
  `).join("");
}

function renderDevice() {
  $("#safetyList").innerHTML = data.safety.map((item) => `
    <div class="status-line">
      <span>${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(item.value)}</strong>
    </div>
  `).join("");

  $("#deviceConsumables").innerHTML = data.deviceConsumables.map((item) => `
    <article class="consumable-card">
      <div class="consumable-top">
        <span class="swatch" style="background:${item.color}"></span>
        <div class="consumable-name">
          <strong>${escapeHtml(item.name)}</strong>
          <span class="consumable-meta">${escapeHtml(item.type)} · ${escapeHtml(item.channel)}</span>
        </div>
        <span class="shots">${item.shots}次</span>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:${item.percent}%"></div></div>
      <div class="percent-line">
        <span>余量</span>
        <span>${item.percent}%</span>
      </div>
    </article>
  `).join("");

  $("#hardwareGrid").innerHTML = data.hardware.map((item) => `
    <article class="hardware-card">
      ${iconMarkup("shield")}
      <strong>${escapeHtml(item.label)}</strong>
      <span>${escapeHtml(item.value)}</span>
    </article>
  `).join("");

  $("#refreshDevice").addEventListener("click", () => toast("状态已刷新"));
  $("#cleanDone").addEventListener("click", () => toast("今日清洁已记录"));
}

function boot() {
  hydrateStaticIcons();
  renderIndex();
  renderScan();
  loadMeshData();
  renderRecommend();
  renderRoutine();
  renderDevice();
  bindNavigation();
  setView(location.hash.slice(1) || "index");
}

document.addEventListener("DOMContentLoaded", boot);
