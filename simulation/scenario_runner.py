from typing import Dict, Any, List
import time

class SimulationScenarioRunner:
    """
    Executes 5 deterministic AI Simulation Scenarios for PAI-IR platform.
    """

    SCENARIOS = {
        "1": "Voice Command Component Inspection",
        "2": "Pointing Gesture Target Identification",
        "3": "Dynamic Human Follow Mode",
        "4": "Human Path Intrusion & Emergency Safety Stop",
        "5": "Defective Component Pick & Place Transport"
    }

    def run_scenario(self, scenario_id: str) -> Dict[str, Any]:
        if scenario_id == "1":
            return {
                "scenario_id": "1",
                "name": self.SCENARIOS["1"],
                "steps": [
                    {"step": 1, "status": "HUMAN_VOICE_COMMAND", "details": "Operator speaks: 'Inspect that component.'"},
                    {"step": 2, "status": "INTENT_RECOGNITION", "details": "Parsed intent: INSPECT (confidence 0.96)"},
                    {"step": 3, "status": "TASK_PLANNING", "details": "Generated 5-step action plan"},
                    {"step": 4, "status": "NAVIGATION", "details": "AMR navigated to inspection station [2.0, 1.0]"},
                    {"step": 5, "status": "CV_INSPECTION", "details": "Inspection complete. Result: PASS"}
                ]
            }
        elif scenario_id == "2":
            return {
                "scenario_id": "2",
                "name": self.SCENARIOS["2"],
                "steps": [
                    {"step": 1, "status": "GESTURE_DETECTION", "details": "Detected POINT gesture from PERSON_01"},
                    {"step": 2, "status": "POINTING_RAY_SOLVER", "details": "Calculated 3D vector ray intersecting OBJ_RED_01"},
                    {"step": 3, "status": "ALIGN_ROBOT", "details": "AMR rotated 35° toward component"},
                    {"step": 4, "status": "CV_INSPECTION", "details": "Scanned surface. Result: FAIL - SURFACE_CRACK (94%)"}
                ]
            }
        elif scenario_id == "3":
            return {
                "scenario_id": "3",
                "name": self.SCENARIOS["3"],
                "steps": [
                    {"step": 1, "status": "GESTURE_DETECTION", "details": "Detected FOLLOW_ME gesture"},
                    {"step": 2, "status": "PERSON_TRACKING", "details": "Locked ByteTrack ID: PERSON_01 at distance 2.2m"},
                    {"step": 3, "status": "HUMAN_AWARE_NAV", "details": "Following person while maintaining 1.8m safety distance"},
                    {"step": 4, "status": "SPEED_ADAPTATION", "details": "Throttling AMR linear velocity to match human pace"}
                ]
            }
        elif scenario_id == "4":
            return {
                "scenario_id": "4",
                "name": self.SCENARIOS["4"],
                "steps": [
                    {"step": 1, "status": "NAVIGATING", "details": "AMR navigating along path at 1.2 m/s"},
                    {"step": 2, "status": "HUMAN_INTRUSION", "details": "Human stepped into trajectory path at dist 0.7m!"},
                    {"step": 3, "status": "SAFETY_GUARD_TRIGGER", "details": "SAFETY GUARD TRIGGERED: Distance < 0.8m limit!"},
                    {"step": 4, "status": "EMERGENCY_SLOWDOWN", "details": "Applied emergency deceleration. Robot stopped safely."},
                    {"step": 5, "status": "REPLANNING", "details": "Waiting for human to clear path before resuming."}
                ]
            }
        elif scenario_id == "5":
            return {
                "scenario_id": "5",
                "name": self.SCENARIOS["5"],
                "steps": [
                    {"step": 1, "status": "INSPECTION_FAIL", "details": "Component COMP_9041 classified as FAIL (CRACK)"},
                    {"step": 2, "status": "GRASP_PLANNING", "details": "Approaching component with 6-DOF arm"},
                    {"step": 3, "status": "PICK", "details": "Gripper closed around defective component"},
                    {"step": 4, "status": "TRANSPORT", "details": "AMR transported component to Rejection Bin Station [3.8, -0.5]"},
                    {"step": 5, "status": "PLACE", "details": "Component released into rejection bin. Database updated."}
                ]
            }
        else:
            return {"error": "Invalid scenario ID"}
