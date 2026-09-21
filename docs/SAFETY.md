# Independent Safety Layer Guide — PAI-IR

## Safety Validation Protocol
The Safety Guard (`safety/safety_guard.py`) is an independent software & hardware safety module.
Every action proposed by the VLM/LLM foundation model or AI task planner MUST pass through `validate_action()` before execution.

### Enforcement Rules
1. **Emergency Stop Priority**: If E-Stop is active, ALL motion commands are instantly rejected.
2. **Proximity Limit**: If human distance < 0.8m, navigation velocity is set to 0.0 m/s.
3. **Workspace Bounds**: Coordinates outside [-15m, +15m] are rejected.
4. **Joint Angle Envelope**: Joint values exceeding physical hardware envelope are rejected.
