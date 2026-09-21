from typing import Dict, Any, List

class PoseEstimator:
    """
    7-keypoint Human Pose Estimator (Head, Shoulders, Elbows, Wrists, Hips, Knees, Ankles).
    """

    def estimate_pose(self, frame_id: int = 0) -> Dict[str, Any]:
        return {
            "keypoints": {
                "head": [320, 100],
                "left_shoulder": [280, 160],
                "right_shoulder": [360, 160],
                "left_elbow": [240, 220],
                "right_elbow": [420, 190], # Raised/Pointing
                "left_wrist": [220, 280],
                "right_wrist": [480, 180], # Pointing ray vector source
                "left_hip": [290, 340],
                "right_hip": [350, 340],
                "left_knee": [295, 460],
                "right_knee": [345, 460],
                "left_ankle": [295, 560],
                "right_ankle": [345, 560]
            },
            "posture": "Standing",
            "body_orientation_deg": 15.0,
            "confidence": 0.94
        }
