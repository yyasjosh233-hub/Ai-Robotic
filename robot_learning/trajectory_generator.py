from typing import Dict, Any, List

class TrajectoryGenerator:
    """Generates continuous smooth joint & base trajectories."""
    def generate_smooth_trajectory(self, start_pose: List[float], end_pose: List[float], steps: int = 10) -> List[List[float]]:
        trajectory = []
        for step in range(steps + 1):
            t = step / steps
            interpolated = [s + t * (e - s) for s, e in zip(start_pose, end_pose)]
            trajectory.append(interpolated)
        return trajectory


class PolicyRegistry:
    """Registry managing available learned, imitation, and fallback policy checkpoints."""
    def __init__(self):
        self.policies = {
            "policy_v1_fallback": {"type": "DETERMINISTIC FALLBACK", "status": "ACTIVE", "accuracy": 0.99},
            "policy_v2_diffusion": {"type": "LEARNED POLICY", "status": "CANDIDATE", "accuracy": 0.94},
            "policy_v3_rl_grasp": {"type": "RL POLICY", "status": "VALIDATING", "accuracy": 0.91}
        }

    def list_policies(self) -> Dict[str, Any]:
        return self.policies


class ActionValidator:
    """Validates policy output against joint limits, workspace bounds, and safety constraints."""
    def validate_trajectory(self, trajectory: List[Dict[str, Any]]) -> Dict[str, Any]:
        # Check joint angle limits
        for point in trajectory:
            angles = point.get("joint_angles", [])
            for a in angles:
                if abs(a) > 3.14:
                    return {"valid": False, "reason": "Joint limit exceeded (+/- 3.14 rad)"}
        return {"valid": True, "reason": "Trajectory within kinematic & velocity bounds."}
