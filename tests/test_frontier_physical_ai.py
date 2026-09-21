import unittest
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

class TestFrontierPhysicalAI(unittest.TestCase):

    def test_world_model_v2(self):
        wm = WorldModelV2()
        obs = wm.get_observation_with_uncertainty("component_17")
        self.assertIn("confidence", obs)
        self.assertIn("uncertainty", obs)
        self.assertEqual(obs["object"], "component_17")

    def test_predictive_world_model(self):
        pwm = PredictiveWorldModel()
        res = pwm.predict_future_trajectories({}, {})
        self.assertEqual(res["prediction_backend"], "SIMULATION PREDICTION")
        self.assertEqual(len(res["candidate_futures"]), 3)

    def test_active_perception(self):
        ape = ActivePerceptionEngine(confidence_threshold=0.75)
        res = ape.evaluate_and_reobserve({"confidence": 0.45, "object": "component_17"}, {"x": 0, "y": 0})
        self.assertTrue(res["active_perception_required"])
        self.assertGreater(res["reobserved_confidence"], 0.45)

    def test_uncertainty_engine(self):
        ue = UncertaintyEngine()
        res = ue.evaluate_confidence("human_tracking", 0.92)
        self.assertEqual(res["uncertainty_level"], "HIGH CONFIDENCE")
        res_low = ue.evaluate_confidence("grasping", 0.45, "pointing ambiguity")
        self.assertEqual(res_low["uncertainty_level"], "LOW CONFIDENCE")

    def test_policy_engine(self):
        pe = PolicyEngine()
        act = pe.generate_action({}, "pick_component", {}, {})
        self.assertIn("DETERMINISTIC FALLBACK", act["policy_mode"])
        pe.set_policy_type("LEARNED POLICY")
        act_learned = pe.generate_action({}, "pick_component", {}, {})
        self.assertIn("LEARNED POLICY", act_learned["policy_mode"])

    def test_skills(self):
        sl = SkillLibrary()
        self.assertIsNotNone(sl.get_skill("inspect_and_remove_defect"))
        asd = AutonomousSkillDiscovery()
        disc = asd.analyze_execution_history([])
        self.assertEqual(disc["status"], "CANDIDATE_DISCOVERED")

    def test_lfd_manager(self):
        lfd = LfDManager()
        rec = lfd.start_recording("demo_pick_place")
        self.assertEqual(rec["status"], "RECORDING_STARTED")
        saved = lfd.stop_recording([{"state": [0,0], "action": [1,1]}])
        self.assertEqual(saved["status"], "RECORDING_SAVED")

    def test_sim_to_real(self):
        stre = SimToRealEngine()
        gap = stre.compute_reality_gap({"position": {"x": 2.5, "y": 1.2, "z": 0.8}}, {"position": {"x": 2.48, "y": 1.21, "z": 0.79}})
        self.assertIn("difference", gap)

    def test_tactile_sensor(self):
        ts = TactileSensor()
        tac = ts.read_tactile_array()
        self.assertEqual(tac["mode"], "TACTILE SIMULATION MODE")
        self.assertIn("tactile_matrix_4x4_kPa", tac)

    def test_whole_body_controller(self):
        wbc = WholeBodyController()
        cmd = wbc.compute_whole_body_action({"x": 2.5, "y": 0.8, "z": 0.85}, {"x": 0.0, "y": 0.0}, [0.0]*6)
        self.assertEqual(cmd["workspace_safety_check"], "PASSED")

    def test_predictive_collision(self):
        pci = PredictiveCollisionIntelligence()
        col = pci.evaluate_collision_risk({"x": 0, "y": 0}, {"vx": 1, "vy": 0}, {"x": 2, "y": 0}, {"vx": -1, "vy": 0})
        self.assertIn("human_risk_level", col)

    def test_continual_learning(self):
        cl = ContinualLearningManager()
        stat = cl.get_learning_status()
        self.assertIn("active_version", stat)

    def test_autonomous_recovery(self):
        ars = AutonomousRecoverySystem()
        rec = ars.diagnose_and_recover("GRASP_FAILED")
        self.assertEqual(rec["status"], "RECOVERY_ATTEMPTED")

    def test_predictive_maintenance(self):
        pme = PredictiveMaintenanceEngine()
        diag = pme.get_telemetry_health()
        self.assertEqual(diag["mode"], "Rule-Based Diagnostic Mode")

    def test_energy_manager(self):
        em = EnergyManager(90.0)
        res = em.evaluate_task_energy_cost("LOW", 10.0)
        self.assertEqual(res["recommendation"], "PROCEED_TASK")

    def test_fleet_coordinator(self):
        fc = FleetCoordinator()
        stat = fc.get_fleet_status()
        self.assertEqual(stat["fleet_size"], 3)

if __name__ == '__main__':
    unittest.main()
