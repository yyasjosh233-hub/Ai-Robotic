# Diagnostic & Troubleshooting Guide — PAI-IR

## Common Issues & Solutions
1. **Backend fails to start**: Verify SQLite permissions and Python version >= 3.10.
2. **WebSocket connection drops**: Check CORS configuration and port 8000 availability.
3. **Emergency Stop stays active**: Click "RESET STANDBY" on Command Center or POST `/api/safety/reset`.
