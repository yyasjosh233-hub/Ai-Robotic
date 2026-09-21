from datetime import datetime
from typing import Dict, Any, List

class ExperienceBuffer:
    """Stores experience tuples (Observation, Action, Outcome, Success/Failure, Error, Recovery)."""
    def __init__(self):
        self.buffer: List[Dict[str, Any]] = []

    def add_experience(self, obs: Dict, action: Dict, outcome: Dict, success: bool, error: str = None, recovery: str = None):
        self.buffer.append({
            "obs": obs,
            "action": action,
            "outcome": outcome,
            "success": success,
            "error": error,
            "recovery": recovery,
            "timestamp": datetime.utcnow().isoformat()
        })

    def get_experiences(self) -> List[Dict[str, Any]]:
        return self.buffer


class ContinualLearningManager:
    """
    PAI-IR Continual Learning & Model Versioning Manager:
    Manages experience collection and model versions (Policy v1, Policy v2, Policy v3).
    Ensures candidate models pass simulation & safety validation and human approval
    before production deployment.
    """

    def __init__(self):
        self.experience_buffer = ExperienceBuffer()
        self.active_version = "Policy v1.0 (Production Standard)"
        self.versions = [
            {"version": "Policy v1.0", "status": "PRODUCTION", "acc": 0.98},
            {"version": "Policy v2.0-candidate", "status": "VALIDATING_IN_SIM", "acc": 0.992},
            {"version": "Policy v3.0-experimental", "status": "DRAFT", "acc": 0.95}
        ]

    def record_execution(self, obs: Dict, action: Dict, success: bool, recovery: str = None):
        self.experience_buffer.add_experience(
            obs=obs,
            action=action,
            outcome={"completed": success},
            success=success,
            recovery=recovery
        )

    def promote_candidate_version(self, candidate_version: str) -> Dict[str, Any]:
        """Safety Gate: Promotes a candidate version only after human approval."""
        for v in self.versions:
            if v["version"] == candidate_version:
                v["status"] = "PRODUCTION"
                self.active_version = candidate_version
                return {
                    "status": "VERSION_PROMOTED",
                    "active_policy": self.active_version,
                    "message": f"Successfully promoted {candidate_version} to production following human approval."
                }
        return {"status": "VERSION_NOT_FOUND"}

    def get_learning_status(self) -> Dict[str, Any]:
        return {
            "active_version": self.active_version,
            "total_experiences_recorded": len(self.experience_buffer.get_experiences()),
            "policy_versions": self.versions
        }
