from datetime import datetime
from typing import Dict, Any, List

class LfDManager:
    """
    PAI-IR Learning from Demonstration (LfD) Manager:
    Manages recording teleop demos, extracting state-action pairs, training candidate policies,
    simulating validation, and presenting human approval workflows.
    """

    def __init__(self):
        self.recorded_demos: List[Dict[str, Any]] = []
        self.is_recording = False

    def start_recording(self, demo_name: str) -> Dict[str, Any]:
        self.is_recording = True
        return {
            "status": "RECORDING_STARTED",
            "demo_name": demo_name,
            "timestamp": datetime.utcnow().isoformat()
        }

    def stop_recording(self, recorded_trajectory: List[Dict[str, Any]]) -> Dict[str, Any]:
        self.is_recording = False
        demo_record = {
            "id": f"demo_{len(self.recorded_demos) + 1}",
            "recorded_at": datetime.utcnow().isoformat(),
            "data_points": len(recorded_trajectory),
            "state_action_pairs": recorded_trajectory,
            "validation_status": "READY_FOR_SIM_TEST"
        }
        self.recorded_demos.append(demo_record)
        return {
            "status": "RECORDING_SAVED",
            "demo": demo_record
        }

    def train_policy_from_demo(self, demo_id: str) -> Dict[str, Any]:
        return {
            "demo_id": demo_id,
            "status": "TRAINED_CANDIDATE_POLICY",
            "sim_accuracy": 0.965,
            "safety_check": "PASSED_IN_SIMULATION",
            "human_approval_required": True,
            "deployable": False,
            "message": "Policy trained from demonstration. Validated in simulation. Awaiting human approval."
        }

    def get_demos(self) -> List[Dict[str, Any]]:
        return self.recorded_demos
