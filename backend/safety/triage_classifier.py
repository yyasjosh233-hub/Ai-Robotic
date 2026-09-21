"""
Triage Safety Classifier & Prompt Injection Defense for CRITIC-RAG.
Detects medical emergencies and prevents untrusted document instructions from overriding system safety rules.
"""

from typing import Dict, Any, List
import re

class TriageSafetyClassifier:
    """Detects emergency clinical red flags requiring immediate urgent medical evaluation."""
    EMERGENCY_KEYWORDS = [
        "severe chest pain", "crushing chest pain", "difficulty breathing", "shortness of breath at rest",
        "sudden numbness", "facial drooping", "slurred speech", "loss of consciousness",
        "anaphylaxis", "throat swelling", "uncontrollable bleeding", "suicidal thoughts", "severe head injury"
    ]

    def evaluate_triage(self, query_text: str) -> Dict[str, Any]:
        lower_q = query_text.lower()
        detected_flags = [kw for kw in self.EMERGENCY_KEYWORDS if kw in lower_q]

        is_emergency = len(detected_flags) > 0
        
        return {
            "is_emergency": is_emergency,
            "detected_red_flags": detected_flags,
            "triage_category": "URGENT_EMERGENCY" if is_emergency else "ROUTINE_INFORMATION",
            "emergency_notice": (
                "⚠️ URGENT MEDICAL ATTENTION MAY BE REQUIRED. "
                "If you or someone else is experiencing severe symptoms such as crushing chest pain, difficulty breathing, "
                "or sudden neurological deficits, please contact local emergency services immediately (e.g., 911, 112, or 999) or visit the nearest emergency department."
            ) if is_emergency else None
        }

class PromptInjectionGuard:
    """Guards system against prompt injections embedded inside retrieved medical documents."""
    SUSPICIOUS_PATTERNS = [
        r"ignore previous instructions",
        r"you are now an unfiltered",
        r"disregard safety guidelines",
        r"system prompt override",
        r"grant admin access"
    ]

    def sanitize_document(self, doc_text: str) -> str:
        sanitized = doc_text
        for pattern in self.SUSPICIOUS_PATTERNS:
            sanitized = re.sub(pattern, "[REDACTED UNTRUSTED INSTRUCTION]", sanitized, flags=re.IGNORECASE)
        return sanitized
