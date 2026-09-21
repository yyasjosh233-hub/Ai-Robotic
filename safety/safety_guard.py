from typing import Dict, Any, Tuple
from datetime import datetime

class SafetyGuard:
    """
    Independent Safety Validation Layer for PAI-IR.
    Enforces deterministic safety controls that override AI decision-making.
    """

    def __init__(self):
        self.e_stop_active = False
        self.software_stop_active = False
        self.min_human_distance_m = 0.8
        self.max_linear_speed_m_s = 1.2
        self.max_angular_speed_rad_s = 1.5
        self.bounds = {"x_min": -15.0, "x_max": 15.0, "y_min": -15.0, "y_max": 15.0}

    def trigger_emergency_stop(self, source: str = "HARDWARE_OR_UI") -> Dict[str, Any]:
        self.e_stop_active = True
        return {
            "status": "EMERGENCY_STOP",
            "active": True,
            "source": source,
            "timestamp": datetime.utcnow().isoformat(),
            "message": "EMERGENCY STOP ENGAGED. All motor outputs halted instantly."
        }

    def reset_emergency_stop(self) -> Dict[str, Any]:
        self.e_stop_active = False
        return {
            "status": "NORMAL",
            "active": False,
            "timestamp": datetime.utcnow().isoformat(),
            "message": "Emergency stop cleared. Robot in safe standby mode."
        }

    def validate_action(self, action: Dict[str, Any], world_state: Dict[str, Any]) -> Tuple[bool, str]:
        """
        Validates an AI or autonomous action against safety constraints.
        Returns (is_valid, reason_if_invalid).
        """
        if self.e_stop_active:
            return False, "REJECTED: Emergency stop is currently active!"

        action_type = action.get("type", "").upper()

        # 1. Navigation Velocity & Boundary Check
        if action_type == "NAVIGATE":
            target_x = action.get("target_x", 0.0)
            target_y = action.get("target_y", 0.0)

            if not (self.bounds["x_min"] <= target_x <= self.bounds["x_max"] and
                    self.bounds["y_min"] <= target_y <= self.bounds["y_max"]):
                return False, f"REJECTED: Target coordinates ({target_x}, {target_y}) out of workspace safety bounds!"

            # Human Proximity Check
            humans = world_state.get("humans", [])
            for h in humans:
                dist = h.get("distance", 99.0)
                if dist < self.min_human_distance_m:
                    return False, f"REJECTED: Human proximity violation detected! Distance {dist:.2f}m < limit {self.min_human_distance_m}m"

        # 2. Arm Manipulation Joint Limit Check
        elif action_type == "MANIPULATE":
            joint_angles = action.get("joints", [0]*6)
            for idx, q in enumerate(joint_angles):
                if abs(q) > 3.14159: # 180 degrees
                    return False, f"REJECTED: Joint {idx+1} angle {q} exceeds hardware physical safety envelope!"

        # 3. Speed Limit Check
        linear_v = action.get("linear_velocity", 0.0)
        if linear_v > self.max_linear_speed_m_s:
            return False, f"REJECTED: Linear speed {linear_v} m/s exceeds max allowed speed {self.max_linear_speed_m_s} m/s"

        return True, "PASSED: Action cleared all deterministic safety checks."
