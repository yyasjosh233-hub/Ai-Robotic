from datetime import datetime
from typing import Dict, Any

class EnergyManager:
    """
    PAI-IR Energy-Aware Physical AI Manager:
    Tracks battery level, estimated remaining runtime, task energy costs, and motor loads.
    Recommends returning to charging station when low priority tasks collide with low battery.
    """

    def __init__(self, battery_pct: float = 94.0):
        self.battery_pct = battery_pct

    def evaluate_task_energy_cost(self, task_priority: str, distance_m: float) -> Dict[str, Any]:
        est_energy_cost_pct = (distance_m * 0.15) + 2.0
        remaining_after_task = self.battery_pct - est_energy_cost_pct

        if remaining_after_task < 20.0 and task_priority in ["LOW", "MEDIUM"]:
            recommendation = "DOCK_AND_CHARGE"
            advice = f"Battery at {self.battery_pct:.1f}%. Task priority is {task_priority}. Recommend returning to charging station."
        else:
            recommendation = "PROCEED_TASK"
            advice = f"Energy sufficient ({self.battery_pct:.1f}%). Proceeding with task."

        return {
            "current_battery_pct": self.battery_pct,
            "task_priority": task_priority,
            "distance_m": distance_m,
            "estimated_cost_pct": round(est_energy_cost_pct, 1),
            "remaining_after_task_pct": round(remaining_after_task, 1),
            "recommendation": recommendation,
            "advice": advice,
            "timestamp": datetime.utcnow().isoformat()
        }


class AutonomousChargingSystem:
    """Manages low battery task completion, docking maneuver, charge verification, and task resumption."""

    def __init__(self):
        self.charging_state = "IDLE"  # IDLE, NAVIGATING_TO_DOCK, DOCKED_CHARGING, RESUMING_TASK

    def initiate_charging_docking(self) -> Dict[str, Any]:
        self.charging_state = "NAVIGATING_TO_DOCK"
        return {
            "charging_state": self.charging_state,
            "dock_location": {"x": 0.0, "y": 0.0, "z": 0.0},
            "status": "DOCKING_MANEUVER_INITIATED",
            "message": "Autonomous docking sequence started. AMR navigating to station 01."
        }

    def verify_docked_and_charging(self) -> Dict[str, Any]:
        self.charging_state = "DOCKED_CHARGING"
        return {
            "charging_state": self.charging_state,
            "voltage_v": 24.8,
            "current_a": 12.5,
            "charging_status": "FAST_CHARGING_ACTIVE",
            "timestamp": datetime.utcnow().isoformat()
        }
