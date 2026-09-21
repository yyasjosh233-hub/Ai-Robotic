import math
from typing import Dict, Any, Tuple

class PointingRaySolver:
    """
    Computes 3D Spatial Vector pointing ray from human arm keypoints to target objects.
    """

    def calculate_pointing_ray(self, elbow_3d: Tuple[float, float, float], wrist_3d: Tuple[float, float, float]) -> Dict[str, Any]:
        # Vector = Wrist - Elbow
        vx = wrist_3d[0] - elbow_3d[0]
        vy = wrist_3d[1] - elbow_3d[1]
        vz = wrist_3d[2] - elbow_3d[2]

        mag = math.sqrt(vx*vx + vy*vy + vz*vz)
        if mag == 0:
            mag = 1.0

        unit_v = [vx/mag, vy/mag, vz/mag]

        # Target intersection estimate at z=0.85m (conveyor height)
        intersection_target = [
            wrist_3d[0] + unit_v[0] * 2.0,
            wrist_3d[1] + unit_v[1] * 2.0,
            0.85
        ]

        return {
            "origin": wrist_3d,
            "direction_vector": unit_v,
            "intersected_target_coords": intersection_target,
            "target_object_id": "OBJ_RED_01"
        }
