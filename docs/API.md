# REST & WebSocket API Reference — PAI-IR

## Key Endpoints
- `GET  /api/robot/status` - Telemetry health & status
- `GET  /api/world-state` - Current spatial entity map
- `GET  /api/humans` - Human perception tracking data
- `POST /api/hri/voice` - Speech command endpoint
- `POST /api/hri/gesture` - Gesture recognition trigger
- `POST /api/navigation/go` - Waypoint goal command
- `POST /api/safety/estop` - Emergency stop trigger
- `POST /api/safety/reset` - Emergency stop reset
- `POST /api/inspection/run` - 11-Stage CV quality inspection
- `GET  /api/inspection/results` - Historical inspection records
- `POST /api/simulation/scenario` - AI simulation scenario player
- `GET  /api/analytics` - Operational KPIs
- `WS   /ws/telemetry` - 10Hz real-time telemetry stream
