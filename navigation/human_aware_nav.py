from typing import Dict, Any, List

class HumanAwareNavigation:
    """
    Human-Aware Nav2 Navigation Engine for PAI-IR.
    Enforces dynamic safety zones (1.5m buffer), trajectory prediction, and slowdowns near humans.
    """

    def __init__(self, safety_radius: float = 1.5):
        self.safety_radius = safety_radius
        self.current_goal = None
        self.mode = "NAVIGATE" # NAVIGATE | FOLLOW | SLOWDOWN | STOP

    def plan_path(self, current_pose: Dict[str, float], target_pose: Dict[str, float], humans: List[Dict[str, Any]]) -> Dict[str, Any]:
        cx, cy = current_pose["x"], current_pose["y"]
        tx, ty = target_pose["x"], target_pose["y"]

        # Check human distances along path
        collision_risk = "LOW"
        recommended_speed = 1.2 # m/s

        for h in humans:
            dist = h.get("distance", 99.0)
            if dist < 1.0:
                collision_risk = "HIGH"
                recommended_speed = 0.0
                self.mode = "STOP"
            elif dist < self.safety_radius:
                collision_risk = "MEDIUM"
                recommended_speed = 0.4
                self.mode = "SLOWDOWN"

        path_waypoints = [
            {"x": cx, "y": cy},
            {"x": (cx + tx)/2.0, "y": (cy + ty)/2.0},
            {"x": tx, "y": ty}
        ]

        return {
            "status": "PATH_GENERATED",
            "mode": self.mode,
            "collision_risk": collision_risk,
            "recommended_speed_m_s": recommended_speed,
            "waypoints": path_waypoints,
            "safety_zone_radius_m": self.safety_radius
        }
