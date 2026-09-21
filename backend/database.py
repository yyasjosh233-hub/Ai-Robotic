import sqlite3
import os
import json
from datetime import datetime

DB_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "database")
DB_PATH = os.path.join(DB_DIR, "pai_ir.db")

def init_db():
    os.makedirs(DB_DIR, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Create Tables
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS robots (
        id TEXT PRIMARY KEY,
        name TEXT,
        status TEXT,
        battery INTEGER,
        x REAL,
        y REAL,
        theta REAL,
        updated_at TEXT
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS humans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        person_id TEXT,
        distance REAL,
        pose TEXT,
        gesture TEXT,
        confidence REAL,
        x REAL,
        y REAL,
        last_seen TEXT
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        command TEXT,
        intent TEXT,
        status TEXT,
        steps TEXT,
        created_at TEXT,
        completed_at TEXT
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS inspections (
        id TEXT PRIMARY KEY,
        component_name TEXT,
        result TEXT,
        defect_type TEXT,
        confidence REAL,
        image_url TEXT,
        x REAL,
        y REAL,
        timestamp TEXT
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS safety_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_type TEXT,
        severity TEXT,
        description TEXT,
        robot_state TEXT,
        timestamp TEXT
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS ai_decisions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        command TEXT,
        detected_intent TEXT,
        target_component TEXT,
        rationale TEXT,
        confidence REAL,
        validation_result TEXT,
        timestamp TEXT
    )
    ''')

    # Seed Initial Robot Status if empty
    cursor.execute("SELECT COUNT(*) FROM robots")
    if cursor.fetchone()[0] == 0:
        cursor.execute('''
        INSERT INTO robots (id, name, status, battery, x, y, theta, updated_at)
        VALUES ('PAI-AMR-01', 'PAI Industrial AMR', 'ONLINE', 94, 2.5, 1.2, 0.0, ?)
        ''', (datetime.utcnow().isoformat(),))

    conn.commit()
    conn.close()

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn
