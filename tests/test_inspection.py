import unittest
from inspection.inspection_pipeline import IndustrialInspectionPipeline

class TestInspectionPipeline(unittest.TestCase):
    def setUp(self):
        self.pipeline = IndustrialInspectionPipeline()

    def test_pass_inspection(self):
        res = self.pipeline.run_inspection("COMP_1", "NONE")
        self.assertEqual(res["result"], "PASS")
        self.assertEqual(res["defect_type"], "NONE")

    def test_fail_inspection(self):
        res = self.pipeline.run_inspection("COMP_2", "SURFACE_CRACK")
        self.assertEqual(res["result"], "FAIL")
        self.assertEqual(res["defect_type"], "SURFACE_CRACK")

if __name__ == "__main__":
    unittest.main()
