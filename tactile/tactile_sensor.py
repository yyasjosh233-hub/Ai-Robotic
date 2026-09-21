from datetime import datetime
from typing import Dict, Any, List

class TactileSensor:
    """
    PAI-IR Tactile & Force Intelligence Abstraction:
    Supports tactile array sensors, F/T sensors, and gripper pressure sensors.
    Tracks Contact, Pressure, Force, Slip, and Grip Stability.
    Operates in TACTILE SIMULATION MODE when hardware sensors are offline.
    """

    def __init__(self):
        self.mode = "TACTILE SIMULATION MODE"
        self.current_grip_pressure_n = 12.5
        self.slip_detected = False

    def read_tactile_array(self) -> Dict[str, Any]:
        """Returns 4x4 tactile pressure matrix, total normal force, slip status, and grip stability."""
        # Simulated 4x4 tactile pad array
        matrix = [
            [1.2, 1.5, 1.4, 0.8],
            [2.1, 3.4, 3.2, 1.5],
            [1.9, 3.1, 3.0, 1.4],
            [0.5, 1.1, 0.9, 0.4]
        ]
        total_force_n = sum(sum(row) for row in matrix)
        
        # Check for slip condition
        if total_force_n < 10.0:
            self.slip_detected = True
            recommended_action = "INCREASE_GRIP_PRESSURE"
        else:
            self.slip_detected = False
            recommended_action = "MAINTAIN_GRIP"

        return {
            "mode": self.mode,
            "tactile_matrix_4x4_kPa": matrix,
            "total_normal_force_N": round(total_force_n, 2),
            "grip_pressure_setting_N": self.current_grip_pressure_n,
            "slip_detected": self.slip_detected,
            "grip_stability": "STABLE" if not self.slip_detected else "SLIP_RISK",
            "recommended_action": recommended_action,
            "timestamp": datetime.utcnow().isoformat()
        }

    def adjust_grip_force(self, delta_n: float) -> float:
        self.current_grip_pressure_n = max(2.0, min(50.0, self.current_grip_pressure_n + delta_n))
        return self.current_grip_pressure_n
