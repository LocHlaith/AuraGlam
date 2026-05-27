import argparse
import json
import shutil
import tempfile
from pathlib import Path

import cv2
import mediapipe as mp
import numpy as np
from mediapipe.python._framework_bindings import resource_util
from mediapipe.python import solution_base


ROOT = Path(__file__).resolve().parents[2]
DEFAULT_IMAGE = ROOT / "assets" / "images" / "demo-before.png"
DEFAULT_OUTPUT = ROOT / "output_mesh.png"
DEFAULT_JSON = ROOT / "output_mesh.json"

mp_drawing = mp.solutions.drawing_utils
mp_face_mesh = mp.solutions.face_mesh

LANDMARK_SPEC = mp_drawing.DrawingSpec(thickness=1, circle_radius=1, color=(104, 213, 200))
TESSELATION_SPEC = mp_drawing.DrawingSpec(thickness=1, circle_radius=1, color=(255, 255, 255))


def ensure_ascii_mediapipe_resources():
  package_dir = Path(mp.__file__).resolve().parent
  if str(package_dir).isascii():
    return

  temp_root = Path(tempfile.gettempdir()) / "AuraGlam_mediapipe_resources"
  target_modules = temp_root / "mediapipe" / "modules"
  source_modules = package_dir / "modules"
  sentinel = target_modules / "face_landmark" / "face_landmark_front_cpu.binarypb"

  if not sentinel.exists():
    target_modules.parent.mkdir(parents=True, exist_ok=True)
    shutil.copytree(source_modules, target_modules, dirs_exist_ok=True)

  solution_base.__file__ = str(temp_root / "mediapipe" / "python" / "solution_base.py")
  resource_util.set_resource_dir(str(temp_root))


def _landmarks_to_points(face_landmarks, width, height):
  return [
    {
      "index": index,
      "x": round(point.x * width, 3),
      "y": round(point.y * height, 3),
      "z": round(point.z, 6),
    }
    for index, point in enumerate(face_landmarks.landmark)
  ]


def process_static_image(image_path, output_path, json_path=None):
  ensure_ascii_mediapipe_resources()
  image_path = Path(image_path)
  output_path = Path(output_path)
  if not image_path.exists():
    raise FileNotFoundError(f"找不到图片: {image_path}")

  image = cv2.imdecode(np.fromfile(str(image_path), dtype=np.uint8), cv2.IMREAD_COLOR)
  if image is None:
    raise ValueError(f"无法读取图片: {image_path}")

  height, width = image.shape[:2]
  image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

  with mp_face_mesh.FaceMesh(
    static_image_mode=True,
    max_num_faces=1,
    refine_landmarks=False,
    min_detection_confidence=0.5,
  ) as face_mesh:
    results = face_mesh.process(image_rgb)

  annotated = image.copy()
  payload = {
    "source": str(image_path),
    "width": width,
    "height": height,
    "faces": [],
  }

  if results.multi_face_landmarks:
    for face_landmarks in results.multi_face_landmarks:
      mp_drawing.draw_landmarks(
        image=annotated,
        landmark_list=face_landmarks,
        connections=mp_face_mesh.FACEMESH_TESSELATION,
        landmark_drawing_spec=LANDMARK_SPEC,
        connection_drawing_spec=TESSELATION_SPEC,
      )
      payload["faces"].append(_landmarks_to_points(face_landmarks, width, height))

  ok, encoded = cv2.imencode(output_path.suffix or ".png", annotated)
  if not ok:
    raise ValueError(f"无法编码输出图片: {output_path}")
  encoded.tofile(str(output_path))
  if json_path:
    Path(json_path).write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
  return payload


def process_camera():
  ensure_ascii_mediapipe_resources()
  with mp_face_mesh.FaceMesh(
    static_image_mode=False,
    max_num_faces=1,
    refine_landmarks=False,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5,
  ) as face_mesh:
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
      raise RuntimeError("无法打开摄像头")

    while cap.isOpened():
      success, image = cap.read()
      if not success:
        continue

      image = cv2.flip(image, 1)
      image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
      image_rgb.flags.writeable = False
      results = face_mesh.process(image_rgb)
      image_rgb.flags.writeable = True

      if results.multi_face_landmarks:
        for face_landmarks in results.multi_face_landmarks:
          mp_drawing.draw_landmarks(
            image=image,
            landmark_list=face_landmarks,
            connections=mp_face_mesh.FACEMESH_TESSELATION,
            landmark_drawing_spec=LANDMARK_SPEC,
            connection_drawing_spec=TESSELATION_SPEC,
          )

      cv2.imshow("AuraGlam Face Mesh", image)
      if cv2.waitKey(5) & 0xFF == ord("q"):
        break

    cap.release()
    cv2.destroyAllWindows()


def main():
  parser = argparse.ArgumentParser(description="AuraGlam MediaPipe Face Mesh demo")
  parser.add_argument("--image", default=str(DEFAULT_IMAGE), help="静态图片路径")
  parser.add_argument("--output", default=str(DEFAULT_OUTPUT), help="网格叠加图输出路径")
  parser.add_argument("--json", default=str(DEFAULT_JSON), help="点云 JSON 输出路径")
  parser.add_argument("--camera", action="store_true", help="启用本机摄像头实时预览")
  args = parser.parse_args()

  if args.camera:
    process_camera()
    return

  payload = process_static_image(args.image, args.output, args.json)
  print(f"faces={len(payload['faces'])} output={args.output} json={args.json}")


if __name__ == "__main__":
  main()
