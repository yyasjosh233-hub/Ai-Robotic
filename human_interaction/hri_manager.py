from typing import Dict, Any, List
from datetime import datetime

class HRIManager:
    """
    Human-Robot Interaction Bridge handling STT, TTS, and Dialogue Log history.
    """

    def __init__(self):
        self.dialogue_history: List[Dict[str, Any]] = [
            {"sender": "ROBOT", "text": "PAI-IR System Online. Ready for interaction.", "timestamp": datetime.utcnow().isoformat()}
        ]

    def process_voice_input(self, transcript: str) -> Dict[str, Any]:
        user_msg = {
            "sender": "HUMAN",
            "text": transcript,
            "timestamp": datetime.utcnow().isoformat()
        }
        self.dialogue_history.append(user_msg)

        return user_msg

    def add_robot_response(self, text: str) -> Dict[str, Any]:
        robot_msg = {
            "sender": "ROBOT",
            "text": text,
            "timestamp": datetime.utcnow().isoformat()
        }
        self.dialogue_history.append(robot_msg)
        return robot_msg

    def get_history(self) -> List[Dict[str, Any]]:
        return self.dialogue_history
