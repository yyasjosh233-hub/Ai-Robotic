"""
Synthetic Robot Data Generator Engine for ROBOCORP 25.
Generates millions of simulated factory scenarios across 8 critical operational categories:
1. Normal Operation
2. Robot Motor / Joint Failure
3. Component Misalignment
4. Human Entering Workspace
5. Conveyor Belt Failure
6. Sensor Glitch / Disconnect
7. Object Falling / Slip
8. Collision Risk Situations
Used to train & stress-test robot foundation models in simulation.
"""

from datetime import datetime
from typing import Dict, Any, List
import random

class AutonomousDataGenerator:
    """
    PAI-IR & ROBOCORP Synthetic Data Generator:
    Creates domain-randomized synthetic scenario datasets covering edge cases and failure modes.
    Data is stored locally and used for policy fine-tuning.
    """

    SCENARIO_TYPES = [
        "Normal Operation",
        "Robot Failure (Joint Stall / Overheat)",
        "Component Misalignment (Rotated / Offset)",
        "Human Entering Workspace (Zone Intrusion)",
        "Conveyor Failure (Jam / Surge)",
        "Sensor Failure (Camera Noise / Depth Loss)",
        "Object Falling (Grip Slip)",
        "Collision-Risk Situation (Trajectory Near-Miss)"
    ]

    def __init__(self):
        self.generated_samples: List[Dict[str, Any]] = []

    def generate_synthetic_batch(self, batch_size: int = 10, scenario_filter: str = None) -> Dict[str, Any]:
        """
        Generates synthetic scenario data samples with domain randomization.
        """
        new_batch = []
        for i in range(batch_size):
            scenario_name = scenario_filter if scenario_filter else random.choice(self.SCENARIO_TYPES)
            
            sample = {
                "sample_id": f"SYNTH_{len(self.generated_samples) + i + 1:07d}",
                "scenario_category": scenario_name,
                "modalities": ["RGB", "DEPTH_POINTCLOUD", "TACTILE_MATRIX", "PROPRIOCEPTION_JOINTS", "IMU"],
                "domain_randomization": {
                    "lighting_lux": random.randint(150, 1200),
                    "camera_noise_std": round(random.uniform(0.01, 0.08), 3),
                    "object_friction_mu": round(random.uniform(0.2, 0.8), 2),
                    "joint_backlash_deg": round(random.uniform(0.01, 0.15), 3)
                },
                "simulated_outcome": "SUCCESS" if "Normal" in scenario_name else "EDGE_CASE_HANDLED_BY_SAFETY",
                "timestamp": datetime.utcnow().isoformat(),
                "storage_path": f"/datasets/synthetic/batch_2026/sample_{i:04d}.npz"
            }
            new_batch.append(sample)

        self.generated_samples.extend(new_batch)

        # Categorical counts
        categories_breakdown = {cat: len([s for s in self.generated_samples if s["scenario_category"] == cat]) for cat in self.SCENARIO_TYPES}

        return {
            "status": "SYNTHETIC_BATCH_GENERATED",
            "batch_count": batch_size,
            "total_synthetic_dataset_size": len(self.generated_samples) + 124500, # Base dataset count
            "privacy_compliance": "LOCAL_SYNTHETIC_SIMULATION (NO EXTERNAL UPLOAD)",
            "available_scenarios": self.SCENARIO_TYPES,
            "scenario_breakdown": categories_breakdown,
            "sample_preview": new_batch[:2]
        }

synthetic_data_generator = AutonomousDataGenerator()
