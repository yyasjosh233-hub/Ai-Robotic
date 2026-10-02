"""
Tactile & Force Intelligence Engine for ROBOCORP 25.
Provides high-frequency multi-modal tactile sensing:
- Force & Torque Sensors (6-DOF Fx, Fy, Fz, Tx, Ty, Tz)
- Dual Fingertip Pressure Matrices (4x4 Left & Right Pads)
- Contact Detection State Machine
- Dynamic Micro-Slip Detection
- Closed-Loop Grip Force Estimation & Auto-Adjustment
"""

from datetime import datetime
from typing import Dict, Any, List
import random

class TactileSensor:
    """
    PAI-IR & ROBOCORP Tactile Intelligence:
    Enables touch-guided precision assembly, micro-slip prevention, and adaptive compliance.
    Pipeline: Camera -> Find Component -> Grip -> Tactile Sensor -> Detect Contact -> Detect Slip -> Adjust Force -> Insert Component.
    """

    def __init__(self):
        self.mode = "TACTILE_AI_ACTIVE"
        self.current_grip_force_n = 18.5
        self.target_grip_force_n = 22.0
        self.contact_detected = True
        self.slip_detected = False
        self.slip_velocity_mm_s = 0.0

    def process_tactile_feedback(self, component_type: str = "precision_gear") -> Dict[str, Any]:
        """
        Processes real-time tactile fingertip matrices and 6-DOF F/T sensor data.
        Automatically estimates grip stability and adjusts force dynamically.
        """
        # Simulated dual 4x4 fingertip pressure grids (kPa)
        left_finger_matrix = [
            [round(random.uniform(1.0, 3.5), 1) for _ in range(4)] for _ in range(4)
        ]
        right_finger_matrix = [
            [round(random.uniform(1.2, 3.8), 1) for _ in range(4)] for _ in range(4)
        ]
        
        left_force_n = sum(sum(r) for r in left_finger_matrix)
        right_force_n = sum(sum(r) for r in right_finger_matrix)
        total_normal_force_n = round((left_force_n + right_force_n) / 2.0, 2)

        # 6-DOF Force-Torque Wrench Sensor
        ft_sensor = {
            "Fx_N": round(random.uniform(-1.5, 1.5), 2),
            "Fy_N": round(random.uniform(-2.0, 2.0), 2),
            "Fz_N": round(total_normal_force_n, 2),
            "Tx_Nm": round(random.uniform(-0.15, 0.15), 3),
            "Ty_Nm": round(random.uniform(-0.12, 0.12), 3),
            "Tz_Nm": round(random.uniform(-0.08, 0.08), 3)
        }

        # Slip condition analysis based on shear force vs normal force ratio
        shear_force_n = (ft_sensor["Fx_N"]**2 + ft_sensor["Fy_N"]**2) ** 0.5
        friction_coefficient_mu = 0.45
        slip_threshold = total_normal_force_n * friction_coefficient_mu

        if shear_force_n > slip_threshold * 0.85:
            self.slip_detected = True
            self.slip_velocity_mm_s = round(random.uniform(0.5, 2.4), 2)
            adjusted_force_n = round(min(60.0, self.current_grip_force_n + 4.5), 2)
            status_text = "MICRO_SLIP_DETECTED • INCREASING_FORCE"
        else:
            self.slip_detected = False
            self.slip_velocity_mm_s = 0.0
            adjusted_force_n = self.current_grip_force_n
            status_text = "OPTIMAL_TACTILE_CONTACT"

        self.current_grip_force_n = adjusted_force_n

        # Touch-guided manipulation closed-loop steps
        pipeline_steps = [
            {"phase": "Camera View", "status": "COMPLETED", "detail": "Located component at [2.45, 1.10, 0.85]"},
            {"phase": "Find Component", "status": "COMPLETED", "detail": "Aligned end-effector wrist vector"},
            {"phase": "Grip Approach", "status": "COMPLETED", "detail": "Closing fingers at 65mm/s"},
            {"phase": "Tactile Sensor", "status": "ACTIVE", "detail": f"Contact detected on 32 tactile taxels (Fz: {total_normal_force_n}N)"},
            {"phase": "Detect Contact", "status": "CONFIRMED", "detail": "Normal force > 3.0N threshold"},
            {"phase": "Detect Slip", "status": "CHECKING", "detail": f"Slip velocity: {self.slip_velocity_mm_s} mm/s (Slip: {self.slip_detected})"},
            {"phase": "Adjust Force", "status": "AUTO_TUNING", "detail": f"Grip force auto-adjusted to {self.current_grip_force_n} N"},
            {"phase": "Insert Component", "status": "READY", "detail": "Proceeding with compliant insertion trajectory"}
        ]

        return {
            "mode": "TACTILE SIMULATION MODE",
            "tactile_engine_status": self.mode,
            "timestamp": datetime.utcnow().isoformat(),
            "component_type": component_type,
            "tactile_matrix_4x4_kPa": left_finger_matrix,
            "tactile_fingertips": {
                "left_matrix_4x4_kPa": left_finger_matrix,
                "right_matrix_4x4_kPa": right_finger_matrix,
                "active_taxels_count": 32
            },
            "force_torque_6dof": ft_sensor,
            "contact_state": "CONTACT_ESTABLISHED" if self.contact_detected else "NO_CONTACT",
            "slip_detection": {
                "slip_detected": self.slip_detected,
                "slip_velocity_mm_s": self.slip_velocity_mm_s,
                "shear_force_n": round(shear_force_n, 2),
                "grip_stability": "STABLE" if not self.slip_detected else "CORRECTING_SLIP"
            },
            "grip_force_control": {
                "current_grip_force_n": self.current_grip_force_n,
                "recommended_optimal_n": 22.5,
                "status_text": status_text
            },
            "closed_loop_pipeline": pipeline_steps
        }

    def read_tactile_array(self) -> Dict[str, Any]:
        return self.process_tactile_feedback()

    def adjust_grip_force(self, delta_n: float) -> float:
        self.current_grip_force_n = max(2.0, min(60.0, self.current_grip_force_n + delta_n))
        return self.current_grip_force_n

tactile_ai_engine = TactileSensor()
