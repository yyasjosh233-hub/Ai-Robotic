from typing import Dict, Any

class GestureEngine:
    """
    Gesture Recognizer Engine for PAI-IR.
    Supports WAVE, STOP, POINT, THUMBS_UP, THUMBS_DOWN, FOLLOW_ME, COME_HERE, EMERGENCY.
    """

    GESTURE_MAP = {
        "WAVE": {"response": "Hello. How can I help you?", "action": "GREET"},
        "STOP": {"response": "Entering safe stop immediately.", "action": "STOP"},
        "POINT": {"response": "Target object identified from pointing ray.", "action": "SELECT_TARGET"},
        "THUMBS_UP": {"response": "Task confirmed. Proceeding.", "action": "CONFIRM"},
        "THUMBS_DOWN": {"response": "Task rejected/cancelled.", "action": "CANCEL"},
        "FOLLOW_ME": {"response": "Follow mode activated. Maintaining safe distance.", "action": "FOLLOW"},
        "COME_HERE": {"response": "Navigating to operator location safely.", "action": "COME_HERE"},
        "EMERGENCY": {"response": "EMERGENCY GESTURE! Triggering E-STOP!", "action": "E_STOP"}
    }

    def detect_gesture(self, keypoints: Dict[str, Any]) -> Dict[str, Any]:
        # Default mock simulation returns POINT gesture
        gesture_name = "POINT"
        details = self.GESTURE_MAP[gesture_name]

        return {
            "gesture": gesture_name,
            "confidence": 0.96,
            "mapped_action": details["action"],
            "robot_response": details["response"]
        }
