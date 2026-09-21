from typing import Dict, Any, List
from datetime import datetime

class WorldModel:
    """
    Dynamic World Model tracking environment entities and robot state.
    """

    def __init__(self):
        self.state = {
            "robot": {
                "id": "PAI-AMR-01",
                "name": "PAI Industrial Robot",
                "status": "ONLINE",
                "battery": 94,
                "pose": {"x": 2.5, "y": 1.2, "theta": 0.0},
                "arm_joints": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
                "gripper_open": True,
                "linear_velocity": 0.0,
                "angular_velocity": 0.0
            },
            "humans": [
                {
                    "person_id": "PERSON_01",
                    "distance": 2.2,
                    "pose": "Standing",
                    "gesture": "Pointing",
                    "head_direction": "LEFT",
                    "tracking": "ACTIVE",
                    "confidence": 0.96,
                    "coords": {"x": 4.5, "y": 1.2}
                }
            ],
            "objects": [
                {"id": "OBJ_RED_01", "type": "component", "color": "red", "coords": [2.4, 1.1, 0.85], "status": "UNINSPECTED"},
                {"id": "OBJ_BIN_01", "type": "rejection_bin", "coords": [3.8, -0.5, 0.40], "status": "AVAILABLE"}
            ],
            "stations": [
                {"name": "Inspection Station Alpha", "coords": [2.0, 1.0]},
                {"name": "Rejection Bin Station", "coords": [3.8, -0.5]}
            ],
            "active_task": None,
            "safety_state": "NORMAL",
            "last_updated": datetime.utcnow().isoformat()
        }

    def get_state(self) -> Dict[str, Any]:
        self.state["last_updated"] = datetime.utcnow().isoformat()
        return self.state

    def update_robot_pose(self, x: float, y: float, theta: float):
        self.state["robot"]["pose"] = {"x": x, "y": y, "theta": theta}

    def update_arm_joints(self, joints: List[float]):
        self.state["robot"]["arm_joints"] = joints

    def update_human(self, person_id: str, distance: float, pose: str, gesture: str):
        for h in self.state["humans"]:
            if h["person_id"] == person_id:
                h["distance"] = distance
                h["pose"] = pose
                h["gesture"] = gesture
                return
        self.state["humans"].append({
            "person_id": person_id,
            "distance": distance,
            "pose": pose,
            "gesture": gesture,
            "tracking": "ACTIVE",
            "confidence": 0.92,
            "coords": {"x": distance + 1.0, "y": 1.0}
        })
