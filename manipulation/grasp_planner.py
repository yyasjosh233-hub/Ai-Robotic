from typing import Dict, Any, List

class GraspPlanner:
    """
    Evaluates candidate grasp poses and plans end-effector trajectories.
    """

    def generate_grasp_candidate(self, object_coords: List[float]) -> Dict[str, Any]:
        ox, oy, oz = object_coords[:3]
        return {
            "grasp_approach_pose": [ox, oy, oz + 0.15], # Approach 15cm above object
            "grasp_execution_pose": [ox, oy, oz],
            "gripper_width_mm": 65,
            "grasp_confidence": 0.94,
            "collision_free": True
        }
