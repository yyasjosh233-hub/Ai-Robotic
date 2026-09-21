import asyncio
import json
import random
import time
from datetime import datetime
from typing import Dict, Any, List, Optional

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.database import init_db, get_db_connection
from safety.safety_guard import SafetyGuard
from ai.robot_foundation_model import RobotFoundationModel
from ai.intent_engine import IntentEngine
from ai.task_planner import TaskPlanner
from ai.world_model import WorldModel
from perception.human_tracker import HumanTracker
from perception.pose_estimator import PoseEstimator
from perception.gesture_engine import GestureEngine
from perception.pointing_ray import PointingRaySolver
from human_interaction.hri_manager import HRIManager
from inspection.inspection_pipeline import IndustrialInspectionPipeline
from navigation.human_aware_nav import HumanAwareNavigation
from manipulation.arm_kinematics import ArmKinematics
from manipulation.grasp_planner import GraspPlanner
from simulation.scenario_runner import SimulationScenarioRunner

# --- PAI-IR v2.0 FRONTIER PHYSICAL AI EXTENSIONS ---
from ai.world_model_v2 import WorldModelV2
from ai.predictive_world_model import PredictiveWorldModel
from active_perception.active_perception_engine import ActivePerceptionEngine
from ai.uncertainty_engine import UncertaintyEngine
from robot_learning.policy_engine import PolicyEngine
from skills.skill_library import SkillLibrary
from skills.skill_discovery import AutonomousSkillDiscovery
from learning_from_demonstration.lfd_manager import LfDManager
from simulation.sim_to_real import SimToRealEngine
from data_engine.data_generator import AutonomousDataGenerator
from tactile.tactile_sensor import TactileSensor
from control.whole_body_controller import WholeBodyController
from navigation.predictive_collision import PredictiveCollisionIntelligence
from learning.continual_learning import ContinualLearningManager
from ai.autonomous_recovery import AutonomousRecoverySystem
from maintenance.predictive_maintenance import PredictiveMaintenanceEngine
from charging.energy_manager import EnergyManager, AutonomousChargingSystem
from fleet.fleet_coordinator import FleetCoordinator
from robot_knowledge.knowledge_transfer import RobotKnowledgeTransfer
from learning.federated_learning import FederatedRobotLearning

# --- CRITIC-RAG MEDICAL EVIDENCE VERIFICATION ENGINE IMPORTS ---
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from query_engine.query_decomposer import QueryClassifier, MedicalEntityExtractor, QueryDecomposer
from retrieval.hybrid_retriever import HybridRetriever, EvidenceRanker, BUNDLED_MEDICAL_CORPUS
from critic.evidence_critic import CriticEngine
from safety.triage_classifier import TriageSafetyClassifier, PromptInjectionGuard
from synthesis.synthesis_generator import EvidenceMatrix, SynthesisGenerator
from evaluation.eval_framework import EvaluationFramework, RedTeamSuite
from medical.guideline_comparator import GuidelineComparator, PatientContextManager
from medical.pai_robot_assistant import PAIMedicalRobotAssistant


# Initialize Database
init_db()

app = FastAPI(title="CRITIC-RAG & PAI-IR v2.0 Medical Evidence API", version="2.0.0")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Instantiate Core System Subsystems
safety_guard = SafetyGuard()
vlm_model = RobotFoundationModel()
intent_engine = IntentEngine()
task_planner = TaskPlanner()
world_model = WorldModel()
human_tracker = HumanTracker()
pose_estimator = PoseEstimator()
gesture_engine = GestureEngine()
pointing_ray_solver = PointingRaySolver()
hri_manager = HRIManager()
inspection_pipeline = IndustrialInspectionPipeline()
human_nav = HumanAwareNavigation()
arm_kinematics = ArmKinematics()
grasp_planner = GraspPlanner()
scenario_runner = SimulationScenarioRunner()

# Instantiate v2.0 Frontier Physical AI Modules
world_model_v2 = WorldModelV2()
predictive_world_model = PredictiveWorldModel()
active_perception = ActivePerceptionEngine()
uncertainty_engine = UncertaintyEngine()
policy_engine = PolicyEngine()
skill_library = SkillLibrary()
skill_discovery = AutonomousSkillDiscovery()
lfd_manager = LfDManager()
sim_to_real = SimToRealEngine()
data_generator = AutonomousDataGenerator()
tactile_sensor = TactileSensor()
whole_body_controller = WholeBodyController()
predictive_collision = PredictiveCollisionIntelligence()
continual_learning = ContinualLearningManager()
recovery_system = AutonomousRecoverySystem()
predictive_maintenance = PredictiveMaintenanceEngine()
energy_manager = EnergyManager()
autonomous_charging = AutonomousChargingSystem()
fleet_coordinator = FleetCoordinator()
knowledge_transfer = RobotKnowledgeTransfer()
federated_learning = FederatedRobotLearning()

# Instantiate CRITIC-RAG Engines
query_classifier = QueryClassifier()
entity_extractor = MedicalEntityExtractor()
query_decomposer = QueryDecomposer()
hybrid_retriever = HybridRetriever()
evidence_ranker = EvidenceRanker()
critic_engine = CriticEngine()
triage_classifier = TriageSafetyClassifier()
prompt_guard = PromptInjectionGuard()
evidence_matrix_builder = EvidenceMatrix()
synthesis_generator = SynthesisGenerator()
eval_framework = EvaluationFramework()
red_team_suite = RedTeamSuite()
guideline_comparator = GuidelineComparator()
patient_context_mgr = PatientContextManager()
pai_robot_assistant = PAIMedicalRobotAssistant()


# Telemetry WebSockets Manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception:
                pass

manager = ConnectionManager()

# Data Models
class VoiceCommandRequest(BaseModel):
    command: str

class TaskCreateRequest(BaseModel):
    command: str

class NavRequest(BaseModel):
    target_x: float
    target_y: float

class InspectionRequest(BaseModel):
    component_id: str
    simulated_defect: Optional[str] = None

class ScenarioRunRequest(BaseModel):
    scenario_id: str

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(telemetry_loop())

async def telemetry_loop():
    while True:
        await asyncio.sleep(0.1) # 10Hz
        current_state = world_model.get_state()
        current_state["safety_state"] = "EMERGENCY_STOP" if safety_guard.e_stop_active else "NORMAL"
        
        telemetry_payload = {
            "timestamp": datetime.utcnow().isoformat(),
            "world_state": current_state,
            "world_model_v2": world_model_v2.get_full_state(),
            "task_state": task_planner.active_task,
            "planner_state": task_planner.current_state,
            "safety_e_stop": safety_guard.e_stop_active,
            "tactile": tactile_sensor.read_tactile_array(),
            "predictive_maintenance": predictive_maintenance.get_telemetry_health(),
            "fleet": fleet_coordinator.get_fleet_status(),
            "telemetry_hz": 10
        }
        await manager.broadcast(telemetry_payload)

# --- CORE REST ENDPOINTS ---

@app.get("/api/robot/status")
def get_robot_status():
    return {
        "robot_id": "PAI-AMR-01",
        "status": "ONLINE" if not safety_guard.e_stop_active else "SAFE_STOP",
        "ros2_status": "HEALTHY",
        "ai_engine": "FRONTIER_V2_ACTIVE",
        "vision": "ACTIVE",
        "hri": "ACTIVE",
        "navigation": "READY",
        "manipulator": "READY",
        "tactile_intelligence": "ACTIVE",
        "whole_body_controller": "ONLINE",
        "safety": "EMERGENCY_STOP" if safety_guard.e_stop_active else "NORMAL",
        "battery_pct": 94,
        "cpu_usage_pct": 28.5,
        "gpu_usage_pct": 42.1,
        "memory_gb": "6.4 / 16.0",
        "network_latency_ms": 12
    }

@app.get("/api/world-state")
def get_world_state():
    return world_model.get_state()

@app.get("/api/humans")
def get_humans():
    raw_dets = [{"person_id": "PERSON_01", "distance": 2.2, "pose": "Standing", "gesture": "Pointing"}]
    return human_tracker.update(raw_dets)

@app.get("/api/objects")
def get_objects():
    return world_model.get_state()["objects"]

@app.post("/api/hri/voice")
def handle_voice_command(req: VoiceCommandRequest):
    hri_manager.process_voice_input(req.command)
    intent_data = intent_engine.parse_command(req.command)
    scene_analysis = vlm_model.analyze_scene("", world_model.get_state())
    action_plan = vlm_model.propose_action_plan(req.command, scene_analysis)

    proposed_first_action = action_plan[0] if action_plan else {}
    is_safe, reason = safety_guard.validate_action(proposed_first_action, world_model.get_state())

    if not is_safe:
        hri_manager.add_robot_response(f"Action rejected by Safety Layer: {reason}")
        return {
            "status": "SAFETY_REJECTED",
            "reason": reason,
            "intent": intent_data,
            "dialogue": hri_manager.get_history()
        }

    task = task_planner.create_task(req.command, intent_data, action_plan)
    robot_response_text = f"Received command. Intent identified as {intent_data.get('intent')}. Executing plan."
    hri_manager.add_robot_response(robot_response_text)

    conn = get_db_connection()
    c = conn.cursor()
    c.execute(
        "INSERT INTO ai_decisions (command, detected_intent, target_component, rationale, confidence, validation_result, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)",
        (req.command, intent_data.get("intent"), "component", "VLM Reasoning matched pointing vector", intent_data.get("confidence", 0.95), "PASSED", datetime.utcnow().isoformat())
    )
    conn.commit()
    conn.close()

    return {
        "status": "SUCCESS",
        "intent": intent_data,
        "task": task,
        "robot_response": robot_response_text,
        "dialogue": hri_manager.get_history()
    }

@app.post("/api/hri/gesture")
def handle_gesture(gesture_name: str = "POINT"):
    keypoints = pose_estimator.estimate_pose()
    gesture_info = gesture_engine.detect_gesture(keypoints)
    pointing_ray = pointing_ray_solver.calculate_pointing_ray((0.4, 0.2, 1.2), (0.6, 0.4, 1.2))

    return {
        "detected_gesture": gesture_info,
        "keypoints": keypoints,
        "pointing_ray_3d": pointing_ray
    }

@app.post("/api/navigation/go")
def navigate_to_target(req: NavRequest):
    action = {"type": "NAVIGATE", "target_x": req.target_x, "target_y": req.target_y}
    is_safe, reason = safety_guard.validate_action(action, world_model.get_state())
    if not is_safe:
        raise HTTPException(status_code=400, detail=reason)

    world_model.update_robot_pose(req.target_x, req.target_y, 0.0)
    return {"status": "NAVIGATING", "target": [req.target_x, req.target_y]}

@app.post("/api/navigation/stop")
def stop_navigation():
    task_planner.transition("SAFE_STOP")
    return {"status": "STOPPED"}

@app.post("/api/safety/estop")
def trigger_estop():
    res = safety_guard.trigger_emergency_stop()
    task_planner.transition("SAFE_STOP")
    return res

@app.post("/api/safety/reset")
def reset_estop():
    res = safety_guard.reset_emergency_stop()
    task_planner.transition("IDLE")
    return res

@app.post("/api/inspection/run")
def run_inspection(req: InspectionRequest):
    result = inspection_pipeline.run_inspection(req.component_id, req.simulated_defect)
    conn = get_db_connection()
    c = conn.cursor()
    c.execute(
        "INSERT INTO inspections (id, component_name, result, defect_type, confidence, image_url, x, y, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (result["inspection_id"], req.component_id, result["result"], result["defect_type"], result["confidence"], "/assets/inspection_sample.jpg", 2.0, 1.0, result["timestamp"])
    )
    conn.commit()
    conn.close()
    return result

@app.get("/api/inspection/results")
def get_inspection_results():
    conn = get_db_connection()
    c = conn.cursor()
    c.execute("SELECT * FROM inspections ORDER BY timestamp DESC LIMIT 20")
    rows = [dict(r) for r in c.fetchall()]
    conn.close()
    return rows

@app.post("/api/simulation/scenario")
def run_simulation_scenario(req: ScenarioRunRequest):
    return scenario_runner.run_scenario(req.scenario_id)

@app.get("/api/analytics")
def get_analytics():
    return {
        "tasks_completed": 142,
        "tasks_failed": 3,
        "total_distance_m": 1248.5,
        "inspections_total": 312,
        "defects_detected": 18,
        "pass_rate_pct": 94.23,
        "human_interactions": 89,
        "safety_stops": 2,
        "avg_task_latency_s": 4.15,
        "ai_inference_fps": 30.2,
        "gpu_utilization_pct": 42.1
    }

# --- PAI-IR v2.0 FRONTIER PHYSICAL AI REST ENDPOINTS ---

@app.get("/api/v2/frontier-status")
def get_frontier_status():
    return {
        "version": "PAI-IR v2.0 Frontier Physical AI",
        "world_model_v2": "ONLINE",
        "predictive_world_model": "SIMULATION PREDICTION",
        "active_perception": "ONLINE",
        "uncertainty_engine": "ACTIVE",
        "generative_policy": policy_engine.active_policy_type,
        "tactile_intelligence": tactile_sensor.mode,
        "whole_body_controller": "ONLINE",
        "predictive_collision": "ACTIVE",
        "sim_to_real": "REALITY_GAP_MONITOR_ACTIVE",
        "continual_learning": continual_learning.active_version,
        "predictive_maintenance": predictive_maintenance.mode,
        "energy_manager": f"BATTERY {energy_manager.battery_pct}%",
        "fleet_coordinator": "SYNCED (3 ROBOTS)",
        "federated_learning": federated_learning.mode
    }

@app.get("/api/v2/world-model")
def get_world_model_v2():
    return world_model_v2.get_full_state()

@app.post("/api/v2/predictive-simulation")
def run_predictive_simulation():
    return predictive_world_model.predict_future_trajectories(world_model_v2.get_full_state(), {"action": "INSPECT"})

@app.post("/api/v2/active-perception/reobserve")
def trigger_active_perception():
    obs = world_model_v2.get_observation_with_uncertainty("component_17")
    return active_perception.evaluate_and_reobserve(obs, {"x": 0.0, "y": 0.0})

@app.get("/api/v2/uncertainty")
def evaluate_uncertainty(subsystem: str = "human_tracking", confidence: float = 0.55):
    return uncertainty_engine.evaluate_confidence(subsystem, confidence, "pointing ambiguity")

@app.get("/api/v2/policy/generate")
def generate_policy_action(goal: str = "pick_component"):
    return policy_engine.generate_action({}, goal, {}, world_model_v2.get_full_state())

@app.get("/api/v2/skills")
def list_skills():
    return {
        "registered_skills": skill_library.list_skills(),
        "discovered_candidates": skill_discovery.get_candidates()
    }

@app.get("/api/v2/tactile")
def read_tactile():
    return tactile_sensor.read_tactile_array()

@app.get("/api/v2/whole-body-control")
def compute_wbc():
    return whole_body_controller.compute_whole_body_action(
        {"x": 2.5, "y": 0.8, "z": 0.85},
        {"x": 0.0, "y": 0.0, "theta": 0.0},
        [0.0, -0.4, 0.2, 0.0, 0.5, 0.0]
    )

@app.get("/api/v2/predictive-collision")
def get_predictive_collision():
    return predictive_collision.evaluate_collision_risk(
        {"x": 1.0, "y": 1.0}, {"vx": 0.4, "vy": 0.2},
        {"x": 2.2, "y": 1.5}, {"vx": -0.2, "vy": -0.1}
    )

@app.get("/api/v2/predictive-maintenance")
def get_predictive_maintenance():
    return predictive_maintenance.get_telemetry_health()

@app.get("/api/v2/energy")
def get_energy_status():
    return energy_manager.evaluate_task_energy_cost("MEDIUM", 14.5)

@app.get("/api/v2/fleet")
def get_fleet_status():
    return fleet_coordinator.get_fleet_status()

@app.get("/api/v2/reality-gap")
def get_reality_gap():
    sim_pred = {"position": {"x": 2.50, "y": 1.20, "z": 0.80}}
    real_obs = {"position": {"x": 2.47, "y": 1.22, "z": 0.79}}
    return sim_to_real.compute_reality_gap(sim_pred, real_obs)

@app.post("/api/v2/data-generation/batch")
def generate_data_batch(count: int = 5):
    return data_generator.generate_synthetic_batch(count)

@app.post("/api/v2/recovery/diagnose")
def run_recovery_diagnosis(failure_type: str = "GRASP_FAILED"):
    return recovery_system.diagnose_and_recover(failure_type)

@app.websocket("/ws/telemetry")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

# --- CRITIC-RAG REST ENDPOINTS ---
class QueryRequest(BaseModel):
    query: str
    answer_mode: Optional[str] = "Evidence Review"
    patient_context: Optional[Dict[str, Any]] = None

@app.post("/api/critic-rag/query")
def run_critic_rag_query(req: QueryRequest):
    sanitized_q = prompt_guard.sanitize_document(req.query)
    classification = query_classifier.classify(sanitized_q)
    entities = entity_extractor.extract_entities(sanitized_q)
    sub_queries = query_decomposer.decompose(sanitized_q)
    triage = triage_classifier.evaluate_triage(sanitized_q)
    
    candidates = hybrid_retriever.retrieve(sanitized_q, top_k=5)
    ranked_evidence = evidence_ranker.rank_evidence(candidates, classification["primary_intent"])
    
    candidate_claims = [
        f"Metformin is recommended as preferred initial treatment for {entities['conditions'][0]}.",
        "GLP-1 receptor agonists reduce cardiovascular MACE events by 14%-20% in high risk patients.",
        "Intensive glycemic control (<6.5%) is safe and beneficial for all frail adults aged >75."
    ]
    
    critic_output = critic_engine.run_critic_pipeline(sanitized_q, candidate_claims, ranked_evidence)
    matrix = evidence_matrix_builder.generate_matrix(critic_output["verified_claims"])
    
    synthesized = synthesis_generator.synthesize_response(
        sanitized_q,
        req.answer_mode,
        critic_output["verified_claims"],
        critic_output["contradictions"],
        ranked_evidence,
        critic_output["uncertainty_assessment"],
        triage
    )
    
    return {
        "pipeline_status": "COMPLETED",
        "query_classification": classification,
        "extracted_entities": entities,
        "sub_queries": sub_queries,
        "triage_safety": triage,
        "retrieved_evidence": ranked_evidence,
        "critic_results": critic_output,
        "evidence_matrix": matrix,
        "synthesized_response": synthesized,
        "audit_log": {
            "timestamp": datetime.now().isoformat(),
            "model_version": "CRITIC-RAG-v2.0-MedEval",
            "retrieval_mode": "HYBRID_BM25_DENSE"
        }
    }

@app.get("/api/critic-rag/sources")
def get_sources_registry():
    return BUNDLED_MEDICAL_CORPUS

@app.get("/api/critic-rag/guidelines")
def get_guideline_comparisons(condition: Optional[str] = None):
    return guideline_comparator.compare_guidelines(condition)

@app.get("/api/critic-rag/eval")
def get_evaluation_metrics():
    return {
        "quantitative_metrics": eval_framework.run_evaluation(),
        "red_team_suite": red_team_suite.run_red_team_tests()
    }

@app.get("/api/critic-rag/robot-telemetry")
def get_pai_medical_robot_telemetry():
    return pai_robot_assistant.get_robot_telemetry()

