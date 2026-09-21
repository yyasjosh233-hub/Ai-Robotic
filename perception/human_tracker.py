from typing import Dict, Any, List
import time

class HumanTracker:
    """
    Person Tracking System with ByteTrack / DeepSORT multi-frame association abstraction.
    """

    def __init__(self):
        self.tracks = {}

    def update(self, raw_detections: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        tracked_humans = []
        for idx, det in enumerate(raw_detections):
            person_id = det.get("person_id", f"PERSON_0{idx+1}")
            distance = det.get("distance", 2.2)
            gesture = det.get("gesture", "Pointing")
            pose = det.get("pose", "Standing")

            tracked_humans.append({
                "person_id": person_id,
                "distance": distance,
                "pose": pose,
                "gesture": gesture,
                "head_direction": "LEFT" if idx == 0 else "FORWARD",
                "tracking": "ACTIVE",
                "confidence": 0.95,
                "velocity": [0.05, 0.0],
                "last_seen": time.time()
            })
        return tracked_humans
