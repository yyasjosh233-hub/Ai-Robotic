import unittest
from ai.intent_engine import IntentEngine
from human_interaction.hri_manager import HRIManager

class TestHRI(unittest.TestCase):
    def setUp(self):
        self.intent_engine = IntentEngine()
        self.hri_manager = HRIManager()

    def test_intent_parsing(self):
        res = self.intent_engine.parse_command("Robot inspect the component")
        self.assertEqual(res["intent"], "INSPECT")

    def test_hri_dialogue_history(self):
        self.hri_manager.process_voice_input("Follow me")
        history = self.hri_manager.get_history()
        self.assertTrue(any(msg["text"] == "Follow me" for msg in history))

if __name__ == "__main__":
    unittest.main()
