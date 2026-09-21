from datetime import datetime
from typing import Dict, Any

class UncertaintyEngine:
    """
    PAI-IR Uncertainty Engine:
    Tracks confidence across vision, speech, grasping, nav, gesture, and planning.
    Categorizes into HIGH, MEDIUM, LOW, UNKNOWN and recommends safe actions.
    """

    def __init__(self):
        pass

    def evaluate_confidence(self, subsystem: str, confidence_score: float, context: str = "") -> Dict[str, Any]:
        if confidence_score >= 0.85:
            level = "HIGH CONFIDENCE"
            recommendation = "PROCEED_AUTONOMOUSLY"
            action_text = f"High confidence ({confidence_score:.2f}) for {subsystem}. Executing autonomously."
        elif confidence_score >= 0.60:
            level = "MEDIUM CONFIDENCE"
            recommendation = "ACTIVE_OBSERVATION"
            action_text = f"Medium confidence ({confidence_score:.2f}) for {subsystem}. Re-observing before action."
        elif confidence_score >= 0.30:
            level = "LOW CONFIDENCE"
            recommendation = "ASK_HUMAN"
            action_text = f"I am not confident about the {subsystem} ({context}). Could you point or clarify?"
        else:
            level = "UNKNOWN"
            recommendation = "SAFE_STATE"
            action_text = f"Unknown state for {subsystem}. Transitioning to safe stop."

        return {
            "subsystem": subsystem,
            "confidence_score": confidence_score,
            "uncertainty_level": level,
            "recommendation": recommendation,
            "robot_response": action_text,
            "timestamp": datetime.utcnow().isoformat()
        }
