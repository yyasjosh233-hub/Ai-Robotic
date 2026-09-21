import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Layers, Eye, RefreshCw, Cpu } from 'lucide-react';

export default function DigitalTwinPage({ worldState }) {
  const twinRef = useRef(null);

  useEffect(() => {
    if (!twinRef.current) return;

    const width = twinRef.current.clientWidth;
    const height = twinRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1d);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(12, 14, 16);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    twinRef.current.appendChild(renderer.domElement);

    // Factory Floor
    const floorGeo = new THREE.PlaneGeometry(24, 24);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    const grid = new THREE.GridHelper(24, 24, 0x38bdf8, 0x1e293b);
    scene.add(grid);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0x38bdf8, 2, 50);
    light1.position.set(0, 10, 0);
    scene.add(light1);

    // Conveyor Belt Model
    const convGeo = new THREE.BoxGeometry(6, 0.4, 1.5);
    const convMat = new THREE.MeshStandardMaterial({ color: 0x334155 });
    const conv = new THREE.Mesh(convGeo, convMat);
    conv.position.set(3, 0.2, -4);
    scene.add(conv);

    // AMR Robot Body
    const amrGroup = new THREE.Group();
    const bodyGeo = new THREE.BoxGeometry(1.4, 0.5, 1.0);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0284c7 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.25;
    amrGroup.add(body);

    scene.add(amrGroup);

    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      if (worldState?.robot?.pose) {
        amrGroup.position.x = worldState.robot.pose.x || 2.5;
        amrGroup.position.z = worldState.robot.pose.y || 1.2;
      }
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      if (twinRef.current) {
        twinRef.current.removeChild(renderer.domElement);
      }
    };
  }, [worldState]);

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl flex items-center space-x-4">
        <Layers className="w-8 h-8 text-cyan-400" />
        <div>
          <h1 className="text-xl font-black text-slate-100 tracking-wider uppercase">INDUSTRIAL FACTORY DIGITAL TWIN</h1>
          <p className="text-xs text-slate-400">Three.js 3D Factory Floor Sync with Real-time Robot Telemetry & Human Avatars</p>
        </div>
      </div>

      <div className="relative w-full h-[600px] bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="absolute top-4 left-4 z-10 bg-slate-900/90 border border-slate-800 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-mono text-cyan-400 font-bold">
          DIGITAL TWIN STATE: SYNCHRONIZED 10Hz
        </div>
        <div ref={twinRef} className="w-full h-full" />
      </div>
    </div>
  );
}
