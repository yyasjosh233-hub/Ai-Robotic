from typing import Dict, Any, List
from datetime import datetime
import uuid

class TaskPlanner:
    """
    Finite State Machine Task Planner for PAI-IR.
    Transforms intent into structured, safety-validated task sequences.
    """

    STATES = [
        "IDLE", "UNDERSTANDING", "PLANNING", "VALIDATING",
        "NAVIGATING", "INSPECTING", "MANIPULATING", "REPORTING",
        "COMPLETED", "FAILED", "SAFE_STOP"
    ]

    def __init__(self):
        self.current_state = "IDLE"
        self.active_task = None

    def create_task(self, command: str, intent_data: Dict[str, Any], plan_steps: List[Dict[str, Any]]) -> Dict[str, Any]:
        task_id = f"TASK-{uuid.uuid4().hex[:6].upper()}"
        self.active_task = {
            "id": task_id,
            "command": command,
            "intent": intent_data.get("intent", "UNKNOWN"),
            "state": "PLANNING",
            "steps": plan_steps,
            "current_step_index": 0,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        }
        self.current_state = "PLANNING"
        return self.active_task

    def transition(self, new_state: str) -> str:
        if new_state in self.STATES:
            self.current_state = new_state
            if self.active_task:
                self.active_task["state"] = new_state
                self.active_task["updated_at"] = datetime.utcnow().isoformat()
        return self.current_state

    def advance_step(self) -> Dict[str, Any]:
        if not self.active_task:
            return {"status": "NO_ACTIVE_TASK"}

        idx = self.active_task["current_step_index"]
        steps = self.active_task["steps"]

        if idx + 1 < len(steps):
            self.active_task["current_step_index"] += 1
            next_action = steps[self.active_task["current_step_index"]]["action"]

            # Map next step action to state
            if "NAVIGATE" in next_action:
                self.transition("NAVIGATING")
            elif "INSPECT" in next_action:
                self.transition("INSPECTING")
            elif "MANIPULATE" in next_action:
                self.transition("MANIPULATING")
            elif "REPORT" in next_action:
                self.transition("REPORTING")
        else:
            self.transition("COMPLETED")

        return self.active_task
