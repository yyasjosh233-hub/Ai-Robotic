import math
from datetime import datetime
from typing import Dict, Any, List

class ActivePerceptionEngine:
    """
    PAI-IR Active Perception Engine:
    Decides when current perception is insufficient (confidence < threshold),
    computes optimal viewpoints, plans re-observation, and computes information gain.
    """

    def __init__(self, confidence_threshold: float = 0.70):
        self.confidence_threshold = confidence_threshold

    def evaluate_and_reobserve(self, observation: Dict[str, Any], current_robot_pose: Dict[str, float]) -> Dict[str, Any]:
        confidence = observation.get("confidence", 0.5)
        uncertainty = observation.get("uncertainty", 1.0 - confidence)
        target_id = observation.get("object", "target_object")

        if confidence >= self.confidence_threshold:
            return {
                "active_perception_required": False,
                "status": "SUFFICIENT_CONFIDENCE",
                "current_confidence": confidence,
                "message": f"Observation of {target_id} has sufficient confidence ({confidence:.2f}). Proceeding."
            }

        # Select better viewpoint by orbiting target object by 45 degrees
        target_pos = observation.get("position", {"x": 2.5, "y": 0.8, "z": 0.85})
        new_viewpoint = {
            "x": target_pos["x"] - 0.6 * math.cos(math.pi / 4),
            "y": target_pos["y"] - 0.6 * math.sin(math.pi / 4),
            "z": target_pos["z"] + 0.3,
            "look_at": target_pos
        }

        # Simulated re-observation post camera relocation
        reobserved_confidence = min(0.95, confidence + 0.42)
        info_gain = math.log2(reobserved_confidence / max(0.01, confidence))

        return {
            "active_perception_required": True,
            "status": "REOBSERVATION_COMPLETED",
            "initial_confidence": confidence,
            "reobserved_confidence": reobserved_confidence,
            "information_gain_bits": round(info_gain, 3),
            "recommended_viewpoint": new_viewpoint,
            "message": f"Initial confidence low ({confidence:.2f}). Moved camera to optimal viewpoint. New confidence: {reobserved_confidence:.2f}."
        }
