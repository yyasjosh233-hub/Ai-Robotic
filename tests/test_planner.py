import unittest
from ai.task_planner import TaskPlanner

class TestTaskPlanner(unittest.TestCase):
    def setUp(self):
        self.planner = TaskPlanner()

    def test_task_creation(self):
        steps = [{"step": 1, "action": "NAVIGATE"}]
        task = self.planner.create_task("Inspect target", {"intent": "INSPECT"}, steps)
        self.assertEqual(task["intent"], "INSPECT")
        self.assertEqual(self.planner.current_state, "PLANNING")

    def test_state_transitions(self):
        self.planner.transition("NAVIGATING")
        self.assertEqual(self.planner.current_state, "NAVIGATING")

if __name__ == "__main__":
    unittest.main()
