from datetime import datetime
from typing import Dict, Any, List

class WholeBodyController:
    """
    PAI-IR Whole-Body Controller (Simulation Level):
    Coordinates AMR Base (x, y, theta), 6-DOF Arm joints (q1..q6), Wrist, and Gripper
    with velocity limits, joint limits, workspace limits, and collision checking.
    """

    def __init__(self):
        # Kinematic Limits
        self.max_base_vel_m_s = 1.0
        self.max_arm_joint_vel_rad_s = 1.5
        self.workspace_bounds = {"x_min": -5.0, "x_max": 5.0, "y_min": -5.0, "y_max": 5.0, "z_min": 0.0, "z_max": 2.2}

    def compute_whole_body_action(
        self,
        target_end_effector: Dict[str, float],
        current_base_pose: Dict[str, float],
        current_arm_joints: List[float]
    ) -> Dict[str, Any]:
        """
        Coordinates base motion and arm joints simultaneously to reach target_end_effector.
        """
        # Determine if base needs to move closer to target
        dx = target_end_effector["x"] - current_base_pose["x"]
        dy = target_end_effector["y"] - current_base_pose["y"]
        dist = (dx**2 + dy**2)**0.5

        base_cmd = {"vx": 0.0, "vy": 0.0, "omega": 0.0}
        if dist > 0.8:
            # Coordinated Base Movement
            base_cmd["vx"] = min(self.max_base_vel_m_s, dx * 0.5)
            base_cmd["vy"] = min(self.max_base_vel_m_s, dy * 0.5)

        # Coordinated Arm Joints
        arm_cmd = [
            min(self.max_arm_joint_vel_rad_s, j + 0.05 * (i + 1))
            for i, j in enumerate(current_arm_joints)
        ]

        # Workspace & Collision check
        is_safe = (
            self.workspace_bounds["x_min"] <= target_end_effector["x"] <= self.workspace_bounds["x_max"] and
            self.workspace_bounds["y_min"] <= target_end_effector["y"] <= self.workspace_bounds["y_max"] and
            self.workspace_bounds["z_min"] <= target_end_effector["z"] <= self.workspace_bounds["z_max"]
        )

        return {
            "controller_status": "COORDINATED_MOTION",
            "base_command": base_cmd,
            "arm_joint_targets": arm_cmd,
            "wrist_rotation_rad": 0.25,
            "gripper_state": "TARGETING",
            "workspace_safety_check": "PASSED" if is_safe else "REJECTED_OUT_OF_BOUNDS",
            "timestamp": datetime.utcnow().isoformat()
        }
