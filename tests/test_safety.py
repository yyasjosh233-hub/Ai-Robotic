import unittest
from safety.safety_guard import SafetyGuard

class TestSafetyGuard(unittest.TestCase):
    def setUp(self):
        self.guard = SafetyGuard()

    def test_emergency_stop_trigger(self):
        res = self.guard.trigger_emergency_stop("TEST_TRIGGER")
        self.assertTrue(self.guard.e_stop_active)
        self.assertEqual(res["status"], "EMERGENCY_STOP")

    def test_reset_emergency_stop(self):
        self.guard.trigger_emergency_stop()
        res = self.guard.reset_emergency_stop()
        self.assertFalse(self.guard.e_stop_active)
        self.assertEqual(res["status"], "NORMAL")

    def test_validate_action_within_bounds(self):
        action = {"type": "NAVIGATE", "target_x": 2.0, "target_y": 1.0}
        world_state = {"humans": [{"distance": 2.5}]}
        is_safe, reason = self.guard.validate_action(action, world_state)
        self.assertTrue(is_safe)

    def test_validate_action_out_of_bounds(self):
        action = {"type": "NAVIGATE", "target_x": 99.0, "target_y": 1.0}
        world_state = {"humans": []}
        is_safe, reason = self.guard.validate_action(action, world_state)
        self.assertFalse(is_safe)
        self.assertIn("out of workspace safety bounds", reason)

    def test_validate_human_proximity_violation(self):
        action = {"type": "NAVIGATE", "target_x": 2.0, "target_y": 1.0}
        world_state = {"humans": [{"distance": 0.5}]} # Less than limit 0.8m
        is_safe, reason = self.guard.validate_action(action, world_state)
        self.assertFalse(is_safe)
        self.assertIn("Human proximity violation", reason)

if __name__ == "__main__":
    unittest.main()
