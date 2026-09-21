from typing import Dict, Any

class IntentEngine:
    """
    Natural Language Command Intent Classifier for PAI-IR.
    Maps human spoken or typed text into structured task intents and slots.
    """

    SUPPORTED_INTENTS = [
        "GREETING", "HELP", "STOP", "COME_HERE", "FOLLOW_ME",
        "GO_TO", "INSPECT", "PICK", "PLACE", "SEARCH",
        "REPORT", "STATUS", "CANCEL", "CONFIRM", "REJECT", "EMERGENCY"
    ]

    def parse_command(self, text: str) -> Dict[str, Any]:
        text_clean = text.lower().strip()

        if any(w in text_clean for w in ["emergency", "e-stop", "hazard"]):
            return {"intent": "EMERGENCY", "confidence": 0.99, "requires_navigation": False, "requires_vision": False}

        if any(w in text_clean for w in ["stop", "halt", "pause", "freeze"]):
            return {"intent": "STOP", "confidence": 0.98, "requires_navigation": False, "requires_vision": False}

        if any(w in text_clean for w in ["follow me", "follow", "come with me"]):
            return {"intent": "FOLLOW_ME", "confidence": 0.95, "requires_navigation": True, "requires_vision": True}

        if any(w in text_clean for w in ["come here", "come over"]):
            return {"intent": "COME_HERE", "confidence": 0.93, "requires_navigation": True, "requires_vision": True}

        if any(w in text_clean for w in ["inspect", "check component", "quality test", "scan"]):
            target = "component"
            if "red" in text_clean:
                target = "red component"
            elif "conveyor" in text_clean:
                target = "conveyor component"
            return {
                "intent": "INSPECT",
                "confidence": 0.96,
                "target": target,
                "requires_navigation": True,
                "requires_vision": True
            }

        if any(w in text_clean for w in ["go to", "navigate to", "head towards"]):
            location = "inspection station"
            if "rejection" in text_clean or "bin" in text_clean:
                location = "rejection bin"
            return {
                "intent": "GO_TO",
                "confidence": 0.91,
                "location": location,
                "requires_navigation": True,
                "requires_vision": False
            }

        if any(w in text_clean for w in ["pick", "grab", "take"]):
            return {
                "intent": "PICK",
                "confidence": 0.92,
                "target": "component",
                "requires_navigation": True,
                "requires_vision": True,
                "requires_arm": True
            }

        if any(w in text_clean for w in ["hello", "hi", "hey"]):
            return {"intent": "GREETING", "confidence": 0.99, "requires_navigation": False, "requires_vision": False}

        if any(w in text_clean for w in ["report", "defect summary", "defects today"]):
            return {"intent": "REPORT", "confidence": 0.95, "requires_navigation": False, "requires_vision": False}

        # Fallback default intent
        return {
            "intent": "STATUS",
            "confidence": 0.70,
            "raw_text": text,
            "requires_navigation": False,
            "requires_vision": False
        }
