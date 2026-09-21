# System Architecture — PAI-IR

## Monorepo Layout
The platform is structured into clear isolated modules:

- `backend/`: FastAPI Web Server, WebSockets (10Hz telemetry), SQLite DB connector.
- `ai/`: Foundation Model Adapters (`robot_foundation_model.py`), Intent Engine (`intent_engine.py`), Task Planner (`task_planner.py`), World Model (`world_model.py`).
- `perception/`: Human Tracker (`human_tracker.py`), Pose Estimator (`pose_estimator.py`), Gesture Engine (`gesture_engine.py`), Pointing Ray Solver (`pointing_ray.py`).
- `human_interaction/`: STT/TTS Dialogue Manager (`hri_manager.py`).
- `inspection/`: 11-Stage CV Quality Inspection Pipeline (`inspection_pipeline.py`).
- `navigation/`: Nav2 Human-Aware Planner (`human_aware_nav.py`).
- `manipulation/`: 6-DOF Manipulator Kinematics (`arm_kinematics.py`), Grasp Evaluator (`grasp_planner.py`).
- `safety/`: Independent Safety Guard (`safety_guard.py`).
- `simulation/`: 5 Deterministic AI Simulation Scenarios Runner (`scenario_runner.py`).
- `ros2_ws/`: ROS 2 Package Tree (`pai_description`, `pai_bringup`, `pai_navigation`, `pai_perception`, `pai_hri`, `pai_manipulation`, `pai_inspection`, `pai_planner`, `pai_safety`, `pai_simulation`, `pai_interfaces`).
- `src/`: React + Vite + Tailwind CSS + Three.js Industrial Control Dashboard (18 Pages).
