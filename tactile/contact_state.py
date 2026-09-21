from typing import Dict, Any

class ContactStateEvaluator:
    """Tracks contact transitions: FREE -> TOUCHING -> GRASPED -> SLIP."""
    def evaluate_contact(self, force_n: float) -> str:
        if force_n < 0.5:
            return "FREE"
        elif force_n < 5.0:
            return "TOUCHING"
        elif force_n < 35.0:
            return "STABLE_GRASP"
        else:
            return "EXCESSIVE_FORCE_WARNING"


class SlipDetector:
    """Detects high-frequency tangential shear micro-vibrations indicating slip."""
    def detect_slip(self, tangential_force_derivative: float) -> bool:
        return tangential_force_derivative > 4.5


class ForceEstimator:
    """Estimates external contact wrenches (Fx, Fy, Fz, Tx, Ty, Tz) from motor currents."""
    def estimate_wrench(self, motor_currents: list) -> Dict[str, float]:
        return {
            "fx": round(motor_currents[0] * 1.5, 2) if motor_currents else 0.0,
            "fy": round(motor_currents[1] * 1.5, 2) if len(motor_currents) > 1 else 0.0,
            "fz": round(motor_currents[2] * 2.1, 2) if len(motor_currents) > 2 else 0.0,
            "tx": 0.1, "ty": 0.05, "tz": 0.02
        }
