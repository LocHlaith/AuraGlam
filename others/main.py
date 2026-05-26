import cv2
import mediapipe as mp
import os

# 初始化 MediaPipe 绘图工具和 Face Mesh 模型
mp_drawing = mp.solutions.drawing_utils
mp_face_mesh = mp.solutions.face_mesh

# 定义绘图样式
# drawing_spec: 用于绘制关键点（圆圈）
# drawing_spec1: 用于绘制连接线
drawing_spec = mp_drawing.DrawingSpec(thickness=1, circle_radius=1, color=(0, 255, 0))
drawing_spec1 = mp_drawing.DrawingSpec(thickness=1, circle_radius=1, color=(255, 255, 255))

def process_static_image(image_path):
    """处理静态图片并保存结果"""
    if not os.path.exists(image_path):
        print(f"找不到图片: {image_path}")
        return

    # 配置 FaceMesh 处理静态图片
    with mp_face_mesh.FaceMesh(
        static_image_mode=True,
        max_num_faces=1,
        min_detection_confidence=0.5) as face_mesh:
        
        image = cv2.imread(image_path)
        # BGR 转 RGB
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        results = face_mesh.process(image_rgb)
        annotated_image = image.copy()

        if results.multi_face_landmarks:
            for face_landmarks in results.multi_face_landmarks:
                # 绘制人脸网格
                mp_drawing.draw_landmarks(
                    image=annotated_image,
                    landmark_list=face_landmarks,
                    connections=mp_face_mesh.FACEMESH_TESSELATION, # 使用最新的连接常量
                    landmark_drawing_spec=drawing_spec,
                    connection_drawing_spec=drawing_spec1)
        
        # 显示并保存图片
        cv2.imshow('Annotated Image', annotated_image)
        cv2.waitKey(0)
        cv2.imwrite('output_mesh.png', annotated_image)
        print("处理完成，结果已保存为 output_mesh.png")

def process_video_stream():
    """处理实时摄像头视频流"""
    # 配置 FaceMesh 处理视频流
    with mp_face_mesh.FaceMesh(
        static_image_mode=False, # 视频流模式
        max_num_faces=1,
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5) as face_mesh:
        
        cap = cv2.VideoCapture(0)
        if not cap.isOpened():
            print("无法打开摄像头")
            return

        print("正在捕获视频... 按 'q' 键退出。")
        while cap.isOpened():
            success, image = cap.read()
            if not success:
                print("忽略空帧。")
                continue

            # 翻转图像（镜像）并转换颜色空间
            image = cv2.cvtColor(cv2.flip(image, 1), cv2.COLOR_BGR2RGB)
            # 提高性能：将图像标记为不可写以通过引用传递
            image.flags.writeable = False
            results = face_mesh.process(image)

            # 恢复图像可写性并转回 BGR 以供 OpenCV 显示
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            if results.multi_face_landmarks:
                for face_landmarks in results.multi_face_landmarks:
                    mp_drawing.draw_landmarks(
                        image=image,
                        landmark_list=face_landmarks,
                        connections=mp_face_mesh.FACEMESH_TESSELATION,
                        landmark_drawing_spec=drawing_spec,
                        connection_drawing_spec=drawing_spec1)

            cv2.imshow('MediaPipe FaceMesh', image)
            # 按 'q' 键退出
            if cv2.waitKey(5) & 0xFF == ord('q'):
                break
                
        cap.release()
        cv2.destroyAllWindows()

if __name__ == '__main__':
    # 你可以在这里选择运行图片检测还是视频检测
    
    # 1. 测试静态图片 (请确保当前目录下有一张名为 2.jpg 的图片)
    # process_static_image('2.jpg')
    
    # 2. 测试实时视频流
    process_video_stream()