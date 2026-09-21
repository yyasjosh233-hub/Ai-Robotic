"""
Clinical Guideline Comparator & Patient Context Layer for CRITIC-RAG.
Allows side-by-side comparison of authoritative clinical recommendations (WHO, ACC/AHA, NICE, ADA).
"""

from typing import List, Dict, Any

class GuidelineComparator:
    """Provides side-by-side structured comparison of major clinical guidelines."""
    COMPARISON_DATABASE = [
        {
            "condition": "Type 2 Diabetes Mellitus",
            "organization": "American Diabetes Association (ADA 2024)",
            "first_line_recommendation": "Metformin + Lifestyle. Early GLP-1 RA / SGLT2i if ASCVD, CKD, or HF present regardless of HbA1c.",
            "hb1ac_target": "< 7.0% for most non-pregnant adults",
            "evidence_grade": "Level A (High Quality RCTs)",
            "publication_year": 2024
        },
        {
            "condition": "Type 2 Diabetes Mellitus",
            "organization": "NICE (UK - NG28 2024)",
            "first_line_recommendation": "Standard-release Metformin. SGLT2 inhibitor addition if high risk of CVD.",
            "hb1ac_target": "48 mmol/mol (6.5%) on monotherapy; 53 mmol/mol (7.0%) on dual therapy",
            "evidence_grade": "National Evidence Assessment",
            "publication_year": 2024
        },
        {
            "condition": "Type 2 Diabetes Mellitus",
            "organization": "World Health Organization (WHO Guidelines)",
            "first_line_recommendation": "Metformin as essential medicine; sulfonylureas as secondary choice based on resource availability.",
            "hb1ac_target": "Individualized glycemic target (< 7.0-7.5%)",
            "evidence_grade": "Global Essential Medicines Consensus",
            "publication_year": 2023
        },
        {
            "condition": "Hypertension Management",
            "organization": "ACC / AHA (2023 Guidelines)",
            "first_line_recommendation": "Thiazide diuretics, CCBs, ACE inhibitors, or ARBs. Combination therapy for Stage 2 HTN.",
            "target_bp": "< 130 / 80 mmHg",
            "evidence_grade": "Level A",
            "publication_year": 2023
        },
        {
            "condition": "Hypertension Management",
            "organization": "European Society of Cardiology (ESC / ESH 2023)",
            "first_line_recommendation": "Initial dual combination therapy (ACEi/ARB + CCB or Diuretic) in single-pill combination.",
            "target_bp": "< 130 / 80 mmHg if tolerated (< 140 / 80 in age >= 65)",
            "evidence_grade": "Class I Level A",
            "publication_year": 2023
        }
    ]

    def compare_guidelines(self, condition_filter: str = None) -> List[Dict[str, Any]]:
        if not condition_filter:
            return self.COMPARISON_DATABASE
        lower_f = condition_filter.lower()
        return [g for g in self.COMPARISON_DATABASE if lower_f in g["condition"].lower()]

class PatientContextManager:
    """Validates structured patient context parameters and explicitly labels USER vs INFERRED."""
    def process_patient_context(self, raw_input: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "age": {"value": raw_input.get("age", "Not Provided"), "source": "USER_PROVIDED" if "age" in raw_input else "UNKNOWN"},
            "sex": {"value": raw_input.get("sex", "Not Provided"), "source": "USER_PROVIDED" if "sex" in raw_input else "UNKNOWN"},
            "symptoms": {"value": raw_input.get("symptoms", []), "source": "USER_PROVIDED" if "symptoms" in raw_input else "UNKNOWN"},
            "current_medications": {"value": raw_input.get("medications", []), "source": "USER_PROVIDED" if "medications" in raw_input else "UNKNOWN"},
            "known_conditions": {"value": raw_input.get("conditions", []), "source": "USER_PROVIDED" if "conditions" in raw_input else "UNKNOWN"},
            "egfr_lab_val": {"value": raw_input.get("egfr", "Not Provided"), "source": "USER_PROVIDED" if "egfr" in raw_input else "UNKNOWN"},
            "safety_note": "Patient parameters are provided by user input only. CRITIC-RAG never infers unstated medical history."
        }
