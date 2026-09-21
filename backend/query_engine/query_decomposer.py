"""
Query Classification, Entity Extraction, Decomposition, and Routing for CRITIC-RAG.
"""

from typing import Dict, Any, List
import re

class QueryClassifier:
    """Classifies medical query intent into Disease, Drug, Symptom, or Guideline queries."""
    def classify(self, query_text: str) -> Dict[str, Any]:
        lower_q = query_text.lower()
        categories = []
        if any(term in lower_q for term in ["drug", "treatment", "dose", "medication", "statin", "metformin", "glp-1", "aspirin"]):
            categories.append("DRUG")
        if any(term in lower_q for term in ["diabetes", "hypertension", "cancer", "asthma", "covid", "pneumonia", "disease", "failure"]):
            categories.append("DISEASE")
        if any(term in lower_q for term in ["pain", "fever", "cough", "fatigue", "nausea", "headache", "shortness of breath"]):
            categories.append("SYMPTOM")
        if any(term in lower_q for term in ["guideline", "recommendation", "protocol", "who", "nice", "acc/aha", "ada"]):
            categories.append("GUIDELINE")
        
        primary_intent = categories[0] if categories else "GENERAL_MEDICAL"
        return {
            "query": query_text,
            "primary_intent": primary_intent,
            "detected_categories": categories,
            "is_complex": len(query_text.split()) > 7 or " and " in lower_q or "vs" in lower_q
        }

class MedicalEntityExtractor:
    """Extracts condition, symptom, intervention, population, and maps synonyms to standard medical terms."""
    SYNONYM_MAP = {
        "high blood pressure": "hypertension",
        "sugar disease": "type 2 diabetes mellitus",
        "heart attack": "myocardial infarction",
        "stroke": "cerebrovascular accident",
        "blood clot": "deep vein thrombosis",
        "shortness of breath": "dyspnea",
        "chest pain": "angina / thoracic pain"
    }

    def extract_entities(self, query_text: str) -> Dict[str, Any]:
        normalized = query_text.lower()
        extracted_synonyms = []
        for raw, norm in self.SYNONYM_MAP.items():
            if raw in normalized:
                extracted_synonyms.append({"raw": raw, "normalized": norm})
        
        # Simple rule-based extraction for demonstration
        conditions = []
        drugs = []
        if "diabetes" in normalized or "type 2" in normalized:
            conditions.append("Type 2 Diabetes Mellitus")
        if "hypertension" in normalized or "high blood pressure" in normalized:
            conditions.append("Essential Hypertension")
        if "cardiovascular" in normalized or "heart" in normalized:
            conditions.append("Cardiovascular Disease")

        if "metformin" in normalized:
            drugs.append("Metformin")
        if "glp-1" in normalized or "semaglutide" in normalized:
            drugs.append("GLP-1 Receptor Agonist (Semaglutide)")
        if "statin" in normalized or "atorvastatin" in normalized:
            drugs.append("HMG-CoA Reductase Inhibitor (Statin)")
        if "aspirin" in normalized:
            drugs.append("Aspirin (Acetylsalicylic Acid)")

        return {
            "raw_query": query_text,
            "normalized_terms": extracted_synonyms,
            "conditions": conditions if conditions else ["Unspecified Condition"],
            "drugs": drugs if drugs else ["Unspecified Intervention"],
            "population": "Adult Humans",
            "timeframe": "Current Clinical Guidelines (2020-2026)"
        }

class QueryDecomposer:
    """Decomposes a complex clinical question into structured sub-evidence questions."""
    def decompose(self, query_text: str) -> List[Dict[str, str]]:
        sub_queries = [
            {"id": "SQ-1", "focus": "Effectiveness & Efficacy", "sub_query": f"What is the clinical efficacy evidence regarding: {query_text}?"},
            {"id": "SQ-2", "focus": "Target Population & Demographics", "sub_query": f"What patient populations were evaluated for: {query_text}?"},
            {"id": "SQ-3", "focus": "Safety & Adverse Events", "sub_query": f"What adverse effects, risks, or contraindications are documented for: {query_text}?"},
            {"id": "SQ-4", "focus": "Clinical Guidelines & Consensus", "sub_query": f"What do major clinical guidelines (WHO, NICE, ACC/AHA, ADA) recommend for: {query_text}?"},
            {"id": "SQ-5", "focus": "Contradictory / Mixed Evidence", "sub_query": f"Are there conflicting trial results or limitations regarding: {query_text}?"}
        ]
        return sub_queries
