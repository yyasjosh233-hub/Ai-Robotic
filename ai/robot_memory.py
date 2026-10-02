"""
Dual-Layer Robot Memory System for ROBOCORP 25.
Equips every robot (R01-R25) with:
1. Short-Term Memory (Current task, current location, active detected objects, working state)
2. Long-Term Memory (Historical failures, successful trajectories, maintenance records, learned skills, operator preferences)
Example: R08 remembers that inserting component at -15.4° angle previously caused misalignment.
"""

from datetime import datetime
from typing import Dict, Any, List

class RobotMemorySystem:
    """
    PAI-IR & ROBOCORP Dual-Layer Memory Engine:
    Maintains fast volatile Short-Term Working Memory and persistent episodic Long-Term Memory.
    """

    def __init__(self, robot_id: str = "R08"):
        self.robot_id = robot_id
        self.mode = "DUAL_LAYER_MEMORY_ACTIVE"
        
        # Volatile Short-Term Memory
        self.short_term_memory = {
            "robot_id": self.robot_id,
            "current_task": "Precision Component Insertion",
            "current_location": "Assembly Station A03",
            "active_spatial_pose": {"x": 2.40, "y": 1.10, "z": 0.85, "theta_deg": -45.0},
            "currently_held_object": "precision_gear_c14",
            "working_memory_buffer": [
                "Segmented red component",
                "Grasp force validated at 18.5 N",
                "Tactile contact established on 32 taxels"
            ]
        }

        # Persistent Episodic Long-Term Memory
        self.long_term_memory = {
            "historical_failures": [
                {
                    "date": "2026-08-14",
                    "event": "Insertion Misalignment Warning",
                    "lesson_learned": "Inserting component C-14 at a -15.4° angle previously caused housing jammed misalignment. Always enforce -45.0° wrist alignment vector."
                },
                {
                    "date": "2026-07-02",
                    "event": "Grip Micro-Slip Incident",
                    "lesson_learned": "Oiled steel components require +4.0N extra grip force adjustment."
                }
            ],
            "successful_trajectories": 4820,
            "learned_skills": [
                "Compliant High-Precision Gear Insertion v4",
                "Dual-Arm Load Balancing",
                "Soft Surface Landing Protocol"
            ],
            "operator_preferences": {
                "preferred_operator": "OPERATOR_JOHN",
                "hri_feedback_voice": "CONFIRM_BEFORE_HIGH_SPEED",
                "safety_margin_m": 1.5
            },
            "maintenance_history": [
                {"date": "2026-09-10", "type": "Harmonic Drive Recalibration", "status": "PASSED"},
                {"date": "2026-08-20", "type": "Tactile Array Gel Pad Replacement", "status": "PASSED"}
            ]
        }

    def recall_memory_context(self, task_prompt: str = "insert gear component") -> Dict[str, Any]:
        """
        Queries dual-layer memory for context, checking past lessons learned before action execution.
        """
        timestamp = datetime.utcnow().isoformat()
        
        # Match past failure warnings
        relevant_warning = None
        for failure in self.long_term_memory["historical_failures"]:
            if "misalignment" in failure["event"].lower() or "gear" in task_prompt.lower():
                relevant_warning = failure["lesson_learned"]
                break

        return {
            "mode": self.mode,
            "timestamp": timestamp,
            "robot_id": self.robot_id,
            "short_term_memory": self.short_term_memory,
            "long_term_memory": {
                "successful_trajectories_count": self.long_term_memory["successful_trajectories"],
                "learned_skills": self.long_term_memory["learned_skills"],
                "operator_preferences": self.long_term_memory["operator_preferences"],
                "active_recalled_warning": relevant_warning or "No matching past failures found."
            },
            "memory_guided_action_advice": f"MEMORY RECALL ACTIVE: {relevant_warning}" if relevant_warning else "Memory clear. Proceed with default plan."
        }

robot_memory_system = RobotMemorySystem()
