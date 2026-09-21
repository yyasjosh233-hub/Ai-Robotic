from typing import Dict, Any, List, Optional
from datetime import datetime

class Skill:
    """Represents a composable atomic or macro robot skill."""
    def __init__(
        self,
        name: str,
        inputs: List[str],
        preconditions: List[str],
        actions: List[str],
        success_conditions: List[str],
        failure_conditions: List[str],
        safety_conditions: List[str],
        confidence: float = 0.95
    ):
        self.name = name
        self.inputs = inputs
        self.preconditions = preconditions
        self.actions = actions
        self.success_conditions = success_conditions
        self.failure_conditions = failure_conditions
        self.safety_conditions = safety_conditions
        self.confidence = confidence

    def to_dict(self) -> Dict[str, Any]:
        return {
            "name": self.name,
            "inputs": self.inputs,
            "preconditions": self.preconditions,
            "actions": self.actions,
            "success_conditions": self.success_conditions,
            "failure_conditions": self.failure_conditions,
            "safety_conditions": self.safety_conditions,
            "confidence": self.confidence
        }


class SkillLibrary:
    """PAI-IR Skill Library: Manages atomic skills and macro composed skill pipelines."""

    def __init__(self):
        self.skills: Dict[str, Skill] = {}
        self._register_default_skills()

    def _register_default_skills(self):
        atomic_skill_names = [
            "navigate_to", "follow_human", "stop_robot", "inspect_object",
            "approach_object", "pick_object", "place_object", "grasp_object",
            "release_object", "move_arm", "look_at_object", "observe_object",
            "return_to_station", "charge_robot"
        ]

        for sname in atomic_skill_names:
            self.skills[sname] = Skill(
                name=sname,
                inputs=["target_id", "pose_vector"],
                preconditions=["system_online", "e_stop_clear"],
                actions=[f"execute_{sname}"],
                success_conditions=[f"{sname}_achieved"],
                failure_conditions=["timeout", "collision_warning"],
                safety_conditions=["keep_human_clear_0.5m"],
                confidence=0.96
            )

        # Composed Macro Skill Example: inspect_and_remove_defect
        self.skills["inspect_and_remove_defect"] = Skill(
            name="inspect_and_remove_defect",
            inputs=["component_id", "reject_bin_id"],
            preconditions=["component_in_workspace", "arm_ready"],
            actions=[
                "navigate_to(inspection_station)",
                "observe_object(component_id)",
                "inspect_object(component_id)",
                "approach_object(component_id)",
                "pick_object(component_id)",
                "navigate_to(reject_bin)",
                "place_object(reject_bin)"
            ],
            success_conditions=["defective_component_binned"],
            failure_conditions=["inspection_failed", "grasp_dropped"],
            safety_conditions=["stop_on_human_entry"],
            confidence=0.92
        )

    def get_skill(self, name: str) -> Optional[Dict[str, Any]]:
        s = self.skills.get(name)
        return s.to_dict() if s else None

    def list_skills(self) -> List[Dict[str, Any]]:
        return [s.to_dict() for s in self.skills.values()]

    def compose_skills(self, composite_name: str, subskill_names: List[str]) -> Dict[str, Any]:
        """Composes a new skill pipeline from existing skills."""
        new_skill = Skill(
            name=composite_name,
            inputs=["composite_target"],
            preconditions=["subskills_valid"],
            actions=subskill_names,
            success_conditions=["pipeline_completed"],
            failure_conditions=["subskill_failed"],
            safety_conditions=["safety_guard_active"],
            confidence=0.90
        )
        self.skills[composite_name] = new_skill
        return new_skill.to_dict()
