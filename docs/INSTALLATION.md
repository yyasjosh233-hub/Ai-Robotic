# Installation & Setup Guide — PAI-IR

## Windows / Cross-Platform Development
1. Clone repository:
   ```bash
   git clone https://github.com/pai-ir/physical-ai-industrial-robot.git
   cd physical-ai-industrial-robot
   ```

2. Install Python backend dependencies:
   ```bash
   pip install fastapi uvicorn pydantic numpy opencv-python pytest
   ```

3. Install Node.js frontend dependencies:
   ```bash
   npm install
   ```

4. Launch Backend:
   ```bash
   python -m uvicorn backend.main:app --reload --port 8000
   ```

5. Launch Frontend Dashboard:
   ```bash
   npm run dev
   ```
