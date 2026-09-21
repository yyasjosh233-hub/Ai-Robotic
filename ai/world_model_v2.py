from datetime import datetime
from typing import Dict, Any, List, Optional

class WorldModelV2:
    """
    PAI-IR World Model 2.0:
    Represents Spatial, Dynamic, Physical, Task states, and explicit Uncertainty metadata.
    """

    def __init__(self):
        self.spatial_state = {
            "robot_pose": {"x": 0.0, "y": 0.0, "z": 0.0, "theta": 0.0},
            "human_positions": [
                {"id": "HUMAN_01", "x": 2.2, "y": 1.5, "z": 0.0, "confidence": 0.94, "uncertainty": 0.06}
            ],
            "object_positions": [
                {"id": "component_17", "x": 2.5, "y": 0.8, "z": 0.85, "confidence": 0.92, "uncertainty": 0.08},
                {"id": "reject_bin", "x": 3.5, "y": -2.0, "z": 0.0, "confidence": 0.99, "uncertainty": 0.01}
            ],
            "obstacles": [
                {"id": "pillar_01", "x": -1.5, "y": 2.0, "radius": 0.4}
            ],
            "stations": {
                "charging_dock": {"x": 0.0, "y": 0.0, "z": 0.0},
                "inspection_station": {"x": 2.5, "y": 1.2, "z": 0.0},
                "assembly_table": {"x": 2.5, "y": 0.8, "z": 0.85}
            },
            "conveyor_state": {"status": "RUNNING", "speed_m_s": 0.25}
        }

        self.dynamic_state = {
            "robot_velocity": {"vx": 0.0, "vy": 0.0, "omega": 0.0},
            "human_velocity": {"id": "HUMAN_01", "vx": 0.1, "vy": 0.05},
            "moving_obstacles": []
        }

        self.physical_state = {
            "object_mass_est_kg": 0.45,
            "orientation_rpy": [0.0, 0.0, 1.57],
            "contact_state": "FREE",  # FREE, TOUCHING, GRASPED
            "grasp_state": "OPEN",     # OPEN, CLOSING, STABLE_GRASP, SLIP
            "surface_condition": "DRY",
            "force_state_N": {"fx": 0.0, "fy": 0.0, "fz": 0.0}
        }

        self.task_state = {
            "current_task": "STANDBY",
            "completed_subtasks": [],
            "pending_subtasks": [],
            "failed_subtasks": [],
            "learned_skills": ["navigate_to", "inspect_object", "grasp_object"]
        }

    def get_observation_with_uncertainty(self, entity_id: str) -> Dict[str, Any]:
        """Returns object/entity observation formatted with value, confidence, uncertainty, timestamp, and source."""
        for obj in self.spatial_state["object_positions"]:
            if obj["id"] == entity_id:
                return {
                    "object": entity_id,
                    "position": {"x": obj["x"], "y": obj["y"], "z": obj["z"]},
                    "confidence": obj["confidence"],
                    "uncertainty": obj["uncertainty"],
                    "timestamp": datetime.utcnow().isoformat(),
                    "source": "rgbd_camera"
                }
        return {
            "object": entity_id,
            "position": {"x": 0.0, "y": 0.0, "z": 0.0},
            "confidence": 0.0,
            "uncertainty": 1.0,
            "timestamp": datetime.utcnow().isoformat(),
            "source": "unknown"
        }

    def get_full_state(self) -> Dict[str, Any]:
        return {
            "spatial_state": self.spatial_state,
            "dynamic_state": self.dynamic_state,
            "physical_state": self.physical_state,
            "task_state": self.task_state,
            "timestamp": datetime.utcnow().isoformat()
        }
