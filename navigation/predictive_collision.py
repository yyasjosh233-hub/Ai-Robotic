from datetime import datetime
from typing import Dict, Any, List

class PredictiveCollisionIntelligence:
    """
    PAI-IR Predictive Collision Intelligence:
    Predicts human & robot trajectories over a future time horizon,
    calculates collision probability, and adjusts velocity proactively.
    The deterministic safety guard layer remains independent and enforced.
    """

    def __init__(self):
        self.horizon_seconds = 5.0

    def evaluate_collision_risk(
        self,
        robot_pose: Dict[str, float],
        robot_vel: Dict[str, float],
        human_pose: Dict[str, float],
        human_vel: Dict[str, float]
    ) -> Dict[str, Any]:
        """
        Projects robot and human positions across future time steps (1.0s, 2.0s.. 5.0s)
        and computes collision probability.
        """
        predicted_min_distance = 999.0
        time_to_closest = 0.0

        for t in [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0]:
            r_x = robot_pose["x"] + robot_vel.get("vx", 0.0) * t
            r_y = robot_pose["y"] + robot_vel.get("vy", 0.0) * t

            h_x = human_pose["x"] + human_vel.get("vx", 0.0) * t
            h_y = human_pose["y"] + human_vel.get("vy", 0.0) * t

            dist = ((r_x - h_x)**2 + (r_y - h_y)**2)**0.5
            if dist < predicted_min_distance:
                predicted_min_distance = dist
                time_to_closest = t

        # Risk Classification
        if predicted_min_distance < 0.6:
            risk_level = "HIGH"
            recommended_action = "SLOW_DOWN_AND_REROUTE"
            speed_factor = 0.3
        elif predicted_min_distance < 1.2:
            risk_level = "MEDIUM"
            recommended_action = "MODERATE_SPEED_SCALING"
            speed_factor = 0.65
        else:
            risk_level = "LOW"
            recommended_action = "MAINTAIN_CRUISE_VELOCITY"
            speed_factor = 1.0

        return {
            "human_risk_level": risk_level,
            "predicted_collision_time_s": round(time_to_closest, 1),
            "predicted_min_distance_m": round(predicted_min_distance, 2),
            "recommended_action": recommended_action,
            "proactive_speed_scaling_factor": speed_factor,
            "deterministic_override_ready": True,
            "timestamp": datetime.utcnow().isoformat()
        }
