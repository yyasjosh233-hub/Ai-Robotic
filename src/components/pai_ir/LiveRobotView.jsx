import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Eye, Shield, MapPin, Move, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, 
  Play, Box, Volume2, Sparkles, Zap, Radio, CheckCircle2, RefreshCw, Cpu, MessageSquare, Users, Activity
} from 'lucide-react';

export default function LiveRobotView({ worldState }) {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);

  // Selector state: Which robot is currently being controlled
  const [targetRobot, setTargetRobot] = useState('BOTH'); // 'ALPHA', 'BETA', 'BOTH'
  
  // Default to CONTINUOUS MOTION as requested!
  const [alphaAction, setAlphaAction] = useState('CONTINUOUS_MOTION');
  const [betaAction, setBetaAction] = useState('CONTINUOUS_MOTION');
  
  const [cameraPreset, setCameraPreset] = useState('DUAL_FRONT');
  const [alphaPose, setAlphaPose] = useState({ x: -1.5, z: 0, rotY: 0.35 });
  const [betaPose, setBetaPose] = useState({ x: 1.5, z: 0, rotY: -0.35 });
  
  const [speechInput, setSpeechInput] = useState('Unit-A and Unit-B physical AI sync operational.');
  const [activeSpeaker, setActiveSpeaker] = useState(null); // 'ALPHA', 'BETA', null
  const [lastSpokenText, setLastSpokenText] = useState('UNIT-B // OPERATIONAL STATUS: NOMINAL. CALIBRATING SENSORS...\nUNIT-A // AFFIRMATIVE. PROCEEDING WITH SYNC.');
  const [hologramTextLine, setHologramTextLine] = useState("CYBERNETIC DATA SYNC IN PROGRESS...");

  // Refs for animation frame reading without re-triggering effects
  const alphaActionRef = useRef('CONTINUOUS_MOTION');
  const betaActionRef = useRef('CONTINUOUS_MOTION');
  useEffect(() => { alphaActionRef.current = alphaAction; }, [alphaAction]);
  useEffect(() => { betaActionRef.current = betaAction; }, [betaAction]);

  const alphaPoseRef = useRef(alphaPose);
  const betaPoseRef = useRef(betaPose);
  useEffect(() => { alphaPoseRef.current = alphaPose; }, [alphaPose]);
  useEffect(() => { betaPoseRef.current = betaPose; }, [betaPose]);

  // Joints references for both robots
  const alphaJointsRef = useRef({});
  const betaJointsRef = useRef({});
  const alphaRootRef = useRef(null);
  const betaRootRef = useRef(null);
  const energyWaveRef = useRef(null);

  // Sync with worldState if provided
  useEffect(() => {
    if (worldState?.robot?.pose) {
      setAlphaPose(prev => ({ ...prev, x: (worldState.robot.pose.x || -1.5), z: (worldState.robot.pose.y || 0) }));
    }
  }, [worldState]);

  // Set action for selected target robot(s)
  const setActionForTarget = (action) => {
    if (targetRobot === 'ALPHA' || targetRobot === 'BOTH') setAlphaAction(action);
    if (targetRobot === 'BETA' || targetRobot === 'BOTH') setBetaAction(action);
  };

  // Trigger Face-to-Face Dual Debate / Interaction Mode
  const triggerDualDebate = () => {
    setAlphaAction('DEBATE');
    setBetaAction('DEBATE');
    
    setAlphaPose(p => ({ ...p, rotY: Math.PI * 0.28 }));
    setBetaPose(p => ({ ...p, rotY: -Math.PI * 0.28 }));

    const lines = [
      { speaker: 'BETA', text: "UNIT-B // OPERATIONAL STATUS: NOMINAL. CALIBRATING SENSORS..." },
      { speaker: 'ALPHA', text: "UNIT-A // AFFIRMATIVE. PROCEEDING WITH SYNC." },
      { speaker: 'BETA', text: "UNIT-B // 3D KINEMATICS AND SENSOR FUSION LOCKED." },
      { speaker: 'ALPHA', text: "UNIT-A // AUTONOMOUS PHYSICAL AI CONTINUOUS MOTION ACTIVE." }
    ];

    let lineIndex = 0;
    const speakNextLine = () => {
      if (lineIndex >= lines.length) {
        setTimeout(() => {
          setAlphaAction('CONTINUOUS_MOTION');
          setBetaAction('CONTINUOUS_MOTION');
          setActiveSpeaker(null);
        }, 1500);
        return;
      }

      const item = lines[lineIndex];
      setActiveSpeaker(item.speaker);
      setLastSpokenText(item.text);
      setHologramTextLine(item.text);

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(item.text.replace(/UNIT-[AB] \/\//, ''));
        utterance.pitch = item.speaker === 'ALPHA' ? 1.1 : 0.85;
        utterance.rate = 1.05;
        
        utterance.onend = () => {
          lineIndex++;
          setTimeout(speakNextLine, 600);
        };
        utterance.onerror = () => {
          lineIndex++;
          setTimeout(speakNextLine, 600);
        };
        window.speechSynthesis.speak(utterance);
      } else {
        lineIndex++;
        setTimeout(speakNextLine, 2500);
      }
    };

    speakNextLine();
  };

  // Trigger TTS for custom input
  const triggerSpeech = (speaker = 'ALPHA') => {
    if (!speechInput.trim()) return;
    setActiveSpeaker(speaker);
    const formatted = `${speaker === 'ALPHA' ? 'UNIT-A' : 'UNIT-B'} // ${speechInput}`;
    setLastSpokenText(formatted);
    setHologramTextLine(formatted);

    if (speaker === 'ALPHA') setAlphaAction('TALK');
    else setBetaAction('TALK');

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(speechInput);
      utterance.pitch = speaker === 'ALPHA' ? 1.1 : 0.85;
      utterance.rate = 1.05;

      utterance.onend = () => {
        setActiveSpeaker(null);
        setAlphaAction('CONTINUOUS_MOTION');
        setBetaAction('CONTINUOUS_MOTION');
      };
      utterance.onerror = () => {
        setActiveSpeaker(null);
        setAlphaAction('CONTINUOUS_MOTION');
        setBetaAction('CONTINUOUS_MOTION');
      };
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        setActiveSpeaker(null);
        setAlphaAction('CONTINUOUS_MOTION');
        setBetaAction('CONTINUOUS_MOTION');
      }, 3000);
    }
  };

  // Helper to build a 3D Cybernetic Humanoid Robot
  const createHumanoidRobot = (scene, config) => {
    const { primaryColor, accentColor, eyeColor, jointColor, isBeta } = config;

    const robotRoot = new THREE.Group();
    scene.add(robotRoot);

    const armorMat = new THREE.MeshStandardMaterial({ color: primaryColor, roughness: 0.15, metalness: 0.5 });
    const darkChassisMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3, metalness: 0.8 });
    const silverJointMat = new THREE.MeshStandardMaterial({ color: jointColor, roughness: 0.25, metalness: 0.9 });
    const accentGlowMat = new THREE.MeshStandardMaterial({ color: accentColor, emissive: accentColor, emissiveIntensity: 2.2, roughness: 0.1 });
    const eyeMat = new THREE.MeshStandardMaterial({ color: eyeColor, emissive: eyeColor, emissiveIntensity: 2.5, roughness: 0.1 });
    const visorDarkMat = new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.05, metalness: 0.95 });

    const joints = { chestCoreMat: accentGlowMat, eyeMat };

    // --- PELVIS ---
    const pelvisGroup = new THREE.Group();
    pelvisGroup.position.y = 1.05;
    robotRoot.add(pelvisGroup);

    const pelvisMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.18, 0.22, 16), darkChassisMat);
    pelvisMesh.castShadow = true;
    pelvisGroup.add(pelvisMesh);

    const pelvisRing = new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.02, 8, 24), accentGlowMat);
    pelvisRing.rotation.x = Math.PI / 2;
    pelvisGroup.add(pelvisRing);

    // --- TORSO ---
    const torsoGroup = new THREE.Group();
    torsoGroup.position.y = 0.22;
    pelvisGroup.add(torsoGroup);
    joints.torso = torsoGroup;

    const waistJoint = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.16, 16), silverJointMat);
    waistJoint.position.y = 0.08;
    torsoGroup.add(waistJoint);

    const chestMesh = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.52, 0.32), armorMat);
    chestMesh.position.y = 0.38;
    chestMesh.castShadow = true;
    torsoGroup.add(chestMesh);

    const spineMesh = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.44, 0.1), darkChassisMat);
    spineMesh.position.set(0, 0.38, -0.18);
    torsoGroup.add(spineMesh);

    // Chest Reactor Core Light
    const chestCoreGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.04, 24);
    chestCoreGeo.rotateX(Math.PI / 2);
    const chestCoreMesh = new THREE.Mesh(chestCoreGeo, accentGlowMat);
    chestCoreMesh.position.set(0, 0.42, 0.16);
    torsoGroup.add(chestCoreMesh);

    // --- HEAD & HELMET ---
    const headGroup = new THREE.Group();
    headGroup.position.y = 0.72;
    torsoGroup.add(headGroup);
    joints.head = headGroup;

    const neckMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.12, 16), silverJointMat);
    neckMesh.position.y = 0.04;
    headGroup.add(neckMesh);

    const headHelmetGeo = new THREE.SphereGeometry(0.28, 32, 32);
    headHelmetGeo.scale(1.05, 0.98, 1.0);
    const headHelmetMesh = new THREE.Mesh(headHelmetGeo, armorMat);
    headHelmetMesh.position.y = 0.28;
    headHelmetMesh.castShadow = true;
    headGroup.add(headHelmetMesh);

    const visorGeo = new THREE.SphereGeometry(0.25, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.55);
    visorGeo.scale(0.95, 0.7, 0.85);
    const visorMesh = new THREE.Mesh(visorGeo, visorDarkMat);
    visorMesh.rotation.x = Math.PI / 2;
    visorMesh.position.set(0, 0.28, 0.08);
    headGroup.add(visorMesh);

    // Visor Oval Eyes
    const eyeGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.02, 16);
    eyeGeo.rotateX(Math.PI / 2);

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.09, 0.28, 0.26);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.09, 0.28, 0.26);
    headGroup.add(rightEye);

    // Ear accents
    const earGeo = new THREE.TorusGeometry(0.06, 0.012, 8, 16);
    const leftEar = new THREE.Mesh(earGeo, accentGlowMat);
    leftEar.rotation.y = Math.PI / 2;
    leftEar.position.set(-0.29, 0.28, 0);
    headGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, accentGlowMat);
    rightEar.rotation.y = Math.PI / 2;
    rightEar.position.set(0.29, 0.28, 0);
    headGroup.add(rightEar);

    // --- ARMS ---
    const buildArm = (isRight) => {
      const sideMultiplier = isRight ? 1 : -1;
      const shoulderJointGroup = new THREE.Group();
      shoulderJointGroup.position.set(sideMultiplier * 0.29, 0.48, 0);
      torsoGroup.add(shoulderJointGroup);

      const shoulderCap = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 16), silverJointMat);
      shoulderJointGroup.add(shoulderCap);

      const upperArmGroup = new THREE.Group();
      shoulderJointGroup.add(upperArmGroup);

      const upperArmMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.32, 16), armorMat);
      upperArmMesh.position.y = -0.16;
      upperArmMesh.castShadow = true;
      upperArmGroup.add(upperArmMesh);

      const armRing = new THREE.Mesh(new THREE.TorusGeometry(0.072, 0.008, 8, 16), accentGlowMat);
      armRing.rotation.x = Math.PI / 2;
      armRing.position.y = -0.12;
      upperArmGroup.add(armRing);

      const elbowJointGroup = new THREE.Group();
      elbowJointGroup.position.y = -0.32;
      upperArmGroup.add(elbowJointGroup);

      const elbowCap = new THREE.Mesh(new THREE.SphereGeometry(0.065, 16, 16), silverJointMat);
      elbowJointGroup.add(elbowCap);

      const forearmGroup = new THREE.Group();
      elbowJointGroup.add(forearmGroup);

      const forearmMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.3, 16), armorMat);
      forearmMesh.position.y = -0.15;
      forearmMesh.castShadow = true;
      forearmGroup.add(forearmMesh);

      const handGroup = new THREE.Group();
      handGroup.position.y = -0.32;
      forearmGroup.add(handGroup);

      const palmMesh = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.09, 0.04), darkChassisMat);
      handGroup.add(palmMesh);

      [-0.03, -0.015, 0, 0.015, 0.03].forEach((fx) => {
        const finger = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.06, 0.012), silverJointMat);
        finger.position.set(fx, -0.06, 0);
        handGroup.add(finger);
      });

      return { shoulder: shoulderJointGroup, upperArm: upperArmGroup, elbow: elbowJointGroup, forearm: forearmGroup, hand: handGroup };
    };

    const leftArm = buildArm(false);
    const rightArm = buildArm(true);
    joints.leftShoulder = leftArm.shoulder;
    joints.rightShoulder = rightArm.shoulder;
    joints.leftElbow = leftArm.elbow;
    joints.rightElbow = rightArm.elbow;
    joints.leftHand = leftArm.hand;
    joints.rightHand = rightArm.hand;

    // --- LEGS ---
    const buildLeg = (isRight) => {
      const sideMultiplier = isRight ? 1 : -1;
      const hipJointGroup = new THREE.Group();
      hipJointGroup.position.set(sideMultiplier * 0.15, -0.1, 0);
      pelvisGroup.add(hipJointGroup);

      const hipBall = new THREE.Mesh(new THREE.SphereGeometry(0.095, 16, 16), silverJointMat);
      hipJointGroup.add(hipBall);

      const thighGroup = new THREE.Group();
      hipJointGroup.add(thighGroup);

      const thighMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.075, 0.42, 16), armorMat);
      thighMesh.position.y = -0.21;
      thighMesh.castShadow = true;
      thighGroup.add(thighMesh);

      const thighRing = new THREE.Mesh(new THREE.TorusGeometry(0.092, 0.008, 8, 16), accentGlowMat);
      thighRing.rotation.x = Math.PI / 2;
      thighRing.position.y = -0.16;
      thighGroup.add(thighRing);

      const kneeJointGroup = new THREE.Group();
      kneeJointGroup.position.y = -0.42;
      thighGroup.add(kneeJointGroup);

      const kneeCap = new THREE.Mesh(new THREE.SphereGeometry(0.075, 16, 16), silverJointMat);
      kneeJointGroup.add(kneeCap);

      const calfGroup = new THREE.Group();
      kneeJointGroup.add(calfGroup);

      const calfMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.06, 0.42, 16), armorMat);
      calfMesh.position.y = -0.21;
      calfMesh.castShadow = true;
      calfGroup.add(calfMesh);

      const footGroup = new THREE.Group();
      footGroup.position.y = -0.42;
      calfGroup.add(footGroup);

      const footMesh = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.22), darkChassisMat);
      footMesh.position.set(0, -0.04, 0.05);
      footMesh.castShadow = true;
      footGroup.add(footMesh);

      const bootSole = new THREE.Mesh(new THREE.BoxGeometry(0.125, 0.015, 0.225), accentGlowMat);
      bootSole.position.set(0, -0.08, 0.05);
      footGroup.add(bootSole);

      return { hip: hipJointGroup, thigh: thighGroup, knee: kneeJointGroup, calf: calfGroup, foot: footGroup };
    };

    const leftLeg = buildLeg(false);
    const rightLeg = buildLeg(true);
    joints.leftHip = leftLeg.hip;
    joints.rightHip = rightLeg.hip;
    joints.leftKnee = leftLeg.knee;
    joints.rightKnee = rightLeg.knee;

    // Laser cone
    const scanConeGeo = new THREE.ConeGeometry(0.9, 2.2, 32, 1, true);
    scanConeGeo.rotateX(-Math.PI / 2);
    const scanConeMat = new THREE.MeshBasicMaterial({ color: accentColor, transparent: true, opacity: 0.35, side: THREE.DoubleSide });
    const scanLaserCone = new THREE.Mesh(scanConeGeo, scanConeMat);
    scanLaserCone.position.set(0, 1.2, 1.1);
    scanLaserCone.visible = false;
    robotRoot.add(scanLaserCone);
    joints.scanLaser = scanLaserCone;

    return { root: robotRoot, joints };
  };

  // Main Three.js Scene Setup & Render Loop
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // 1. Scene & Lighting
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x04060d);
    scene.fog = new THREE.FogExp2(0x04060d, 0.035);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 3.2, 6.8);
    camera.lookAt(0, 1.2, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.target.set(0, 1.2, 0);
    controlsRef.current = controls;

    // 5. Lights setup matching user image (Cyan on left, Magenta on right)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const cyanSpotLight = new THREE.SpotLight(0x00f0ff, 4.5, 30, Math.PI / 4, 0.4);
    cyanSpotLight.position.set(-6, 12, 6);
    cyanSpotLight.castShadow = true;
    scene.add(cyanSpotLight);

    const magentaSpotLight = new THREE.SpotLight(0xff007f, 4.5, 30, Math.PI / 4, 0.4);
    magentaSpotLight.position.set(6, 12, 6);
    magentaSpotLight.castShadow = true;
    scene.add(magentaSpotLight);

    const centerGlowLight = new THREE.PointLight(0x00f0ff, 2.5, 12);
    centerGlowLight.position.set(0, 1.5, 1.5);
    scene.add(centerGlowLight);

    // 6. Environment Floor Grid & Tech Discs
    const gridHelper = new THREE.GridHelper(30, 30, 0x00f0ff, 0x1e1b4b);
    gridHelper.position.y = 0.001;
    scene.add(gridHelper);

    // Dynamic Holographic Energy Particle Wave System between Unit-A and Unit-B
    const particleCount = 200;
    const particlesGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 3.0; // Between -1.5 and 1.5
      particlePos[i * 3 + 1] = 0.8 + (Math.random() - 0.5) * 1.5;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.08,
      transparent: true,
      opacity: 0.85
    });
    const energyWaveSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(energyWaveSystem);
    energyWaveRef.current = energyWaveSystem;

    // 7. BUILD THE TWO CYBERNETIC HUMANOID ROBOTS
    // UNIT-A: CYAN CYBER (Left)
    const alphaBot = createHumanoidRobot(scene, {
      primaryColor: 0x334155, // Metallic Cyber Grey
      accentColor: 0x00f0ff,  // Glowing Cyan Neon
      eyeColor: 0x00f0ff,
      jointColor: 0x64748b,
      isBeta: false
    });
    alphaRootRef.current = alphaBot.root;
    alphaJointsRef.current = alphaBot.joints;

    // UNIT-B: MAGENTA ANDROID (Right)
    const betaBot = createHumanoidRobot(scene, {
      primaryColor: 0x312e81, // Metallic Android Indigo
      accentColor: 0xff007f,  // Glowing Magenta Neon
      eyeColor: 0xff007f,
      jointColor: 0x6366f1,
      isBeta: true
    });
    betaRootRef.current = betaBot.root;
    betaJointsRef.current = betaBot.joints;

    // 8. ANIMATION LOOP & HIGH-DYNAMIC CONTINUOUS MOTION ENGINE
    let reqId;
    let clock = new THREE.Clock();

    const evaluateKinematics = (action, elapsed, isBeta) => {
      let tHeadY = 0, tHeadX = 0, tTorsoX = 0, tTorsoY = 0;
      let tLShoulderX = 0, tLShoulderZ = 0.15, tLElbowX = -0.2;
      let tRShoulderX = 0, tRShoulderZ = -0.15, tRElbowX = -0.2;
      let tLHipX = 0, tLKneeX = 0, tRHipX = 0, tRKneeX = 0;
      let coreIntensity = 2.0 + Math.sin(elapsed * 4) * 0.6;
      let scanVisible = false;

      const phaseShift = isBeta ? Math.PI : 0;

      // CONTINUOUS HIGH-DYNAMIC MOTION MODE (Default requested by user)
      if (action === 'CONTINUOUS_MOTION') {
        const motionRate = elapsed * 5 + phaseShift;
        
        // Continuous Leg Stance Gait / Swaying Walk
        tLHipX = Math.sin(motionRate) * 0.35;
        tRHipX = -Math.sin(motionRate) * 0.35;
        tLKneeX = Math.max(0, -Math.sin(motionRate) * 0.45);
        tRKneeX = Math.max(0, Math.sin(motionRate) * 0.45);

        // Continuous Arm & Torso Motions
        tLShoulderX = -Math.sin(motionRate) * 0.35;
        tRShoulderX = Math.sin(motionRate) * 0.35;
        tLShoulderZ = 0.2 + Math.cos(motionRate) * 0.15;
        tRShoulderZ = -0.2 - Math.sin(motionRate) * 0.15;

        tTorsoX = Math.sin(motionRate * 2) * 0.08;
        tTorsoY = (isBeta ? -0.3 : 0.3) + Math.cos(motionRate * 0.5) * 0.15; // Facing center & tilting
        tHeadY = (isBeta ? -0.35 : 0.35) + Math.sin(motionRate) * 0.2;     // Head tracking towards opposite robot
        tHeadX = Math.sin(motionRate * 1.5) * 0.08;

      } else if (action === 'IDLE') {
        tTorsoX = Math.sin(elapsed * 2 + phaseShift) * 0.03;
        tHeadX = Math.sin(elapsed * 2.5 + phaseShift) * 0.02;
        tRShoulderX = Math.sin(elapsed * 2) * 0.05;
        tLShoulderX = Math.sin(elapsed * 2) * 0.05;

      } else if (action === 'WAVE') {
        if (!isBeta) {
          tRShoulderZ = -2.2; tRShoulderX = -0.3; tRElbowX = -0.9;
        } else {
          tLShoulderZ = 2.2; tLShoulderX = -0.3; tLElbowX = -0.9;
        }
        tHeadY = isBeta ? -0.25 : 0.25;
        coreIntensity = 3.0 + Math.sin(elapsed * 10) * 0.8;

      } else if (action === 'WALK') {
        const walkRate = elapsed * 7 + phaseShift;
        tLHipX = Math.sin(walkRate) * 0.45;
        tRHipX = -Math.sin(walkRate) * 0.45;
        tLKneeX = Math.max(0, -Math.sin(walkRate) * 0.55);
        tRKneeX = Math.max(0, Math.sin(walkRate) * 0.55);
        tLShoulderX = -Math.sin(walkRate) * 0.4;
        tRShoulderX = Math.sin(walkRate) * 0.4;
        tTorsoX = Math.sin(walkRate * 2) * 0.04;

      } else if (action === 'INSPECT') {
        tTorsoX = 0.25; tHeadX = 0.35; tHeadY = isBeta ? -0.25 : 0.25;
        tRShoulderX = -1.1; tRElbowX = -0.15;
        scanVisible = true;
        coreIntensity = 3.5 + Math.sin(elapsed * 12) * 1.0;

      } else if (action === 'DANCE') {
        const danceRate = elapsed * 8 + phaseShift;
        tTorsoY = Math.sin(danceRate * 0.5) * 0.35;
        tTorsoX = Math.cos(danceRate * 0.5) * 0.18;
        tLShoulderZ = Math.abs(Math.sin(danceRate)) * 1.4 + 0.2;
        tRShoulderZ = -Math.abs(Math.cos(danceRate)) * 1.4 - 0.2;
        tLElbowX = -Math.sin(danceRate) * 0.8;
        tRElbowX = -Math.cos(danceRate) * 0.8;
        tHeadY = Math.sin(danceRate) * 0.4;
        coreIntensity = 3.8 + Math.sin(danceRate * 2) * 1.5;

      } else if (action === 'DEBATE' || action === 'TALK') {
        const talkRate = elapsed * 9 + phaseShift;
        tHeadY = (isBeta ? -0.38 : 0.38) + Math.sin(talkRate * 0.4) * 0.12;
        tHeadX = Math.sin(talkRate * 0.6) * 0.08;
        tRShoulderX = -0.4 + Math.sin(talkRate) * 0.15;
        tLShoulderX = -0.4 + Math.cos(talkRate) * 0.15;
        tRElbowX = -0.6; tLElbowX = -0.6;
        coreIntensity = 3.0 + Math.sin(talkRate * 1.5) * 0.8;
      }

      return { tHeadY, tHeadX, tTorsoX, tTorsoY, tLShoulderX, tLShoulderZ, tLElbowX, tRShoulderX, tRShoulderZ, tRElbowX, tLHipX, tLKneeX, tRHipX, tRKneeX, coreIntensity, scanVisible };
    };

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();
      controls.update();

      // Animate Energy Wave Particle Matrix
      if (energyWaveRef.current) {
        const posAttr = energyWaveRef.current.geometry.attributes.position;
        for (let i = 0; i < particleCount; i++) {
          let x = posAttr.getX(i);
          let y = 0.8 + Math.sin(elapsed * 4 + x * 3) * 0.3;
          let z = Math.cos(elapsed * 3 + x * 2) * 0.2;
          posAttr.setXYZ(i, x, y, z);
        }
        posAttr.needsUpdate = true;
      }

      const aAct = alphaActionRef.current;
      const bAct = betaActionRef.current;
      const aPose = alphaPoseRef.current;
      const bPose = betaPoseRef.current;

      // Position Robot Unit-A (Cyan Cyber)
      if (alphaRootRef.current) {
        alphaRootRef.current.position.x = THREE.MathUtils.lerp(alphaRootRef.current.position.x, aPose.x, 0.1);
        alphaRootRef.current.position.z = THREE.MathUtils.lerp(alphaRootRef.current.position.z, aPose.z, 0.1);
        alphaRootRef.current.rotation.y = THREE.MathUtils.lerp(alphaRootRef.current.rotation.y, aPose.rotY, 0.1);
      }

      // Position Robot Unit-B (Magenta Android)
      if (betaRootRef.current) {
        betaRootRef.current.position.x = THREE.MathUtils.lerp(betaRootRef.current.position.x, bPose.x, 0.1);
        betaRootRef.current.position.z = THREE.MathUtils.lerp(betaRootRef.current.position.z, bPose.z, 0.1);
        betaRootRef.current.rotation.y = THREE.MathUtils.lerp(betaRootRef.current.rotation.y, bPose.rotY, 0.1);
      }

      // Evaluate Alpha Kinematics
      const kA = evaluateKinematics(aAct, elapsed, false);
      const jA = alphaJointsRef.current;
      const lerpSpeed = 0.12;

      if (jA.head) { jA.head.rotation.y = THREE.MathUtils.lerp(jA.head.rotation.y, kA.tHeadY, lerpSpeed); jA.head.rotation.x = THREE.MathUtils.lerp(jA.head.rotation.x, kA.tHeadX, lerpSpeed); }
      if (jA.torso) { jA.torso.rotation.x = THREE.MathUtils.lerp(jA.torso.rotation.x, kA.tTorsoX, lerpSpeed); jA.torso.rotation.y = THREE.MathUtils.lerp(jA.torso.rotation.y, kA.tTorsoY, lerpSpeed); }
      if (jA.leftShoulder) { jA.leftShoulder.rotation.x = THREE.MathUtils.lerp(jA.leftShoulder.rotation.x, kA.tLShoulderX, lerpSpeed); jA.leftShoulder.rotation.z = THREE.MathUtils.lerp(jA.leftShoulder.rotation.z, kA.tLShoulderZ, lerpSpeed); }
      if (jA.rightShoulder) { jA.rightShoulder.rotation.x = THREE.MathUtils.lerp(jA.rightShoulder.rotation.x, kA.tRShoulderX, lerpSpeed); jA.rightShoulder.rotation.z = THREE.MathUtils.lerp(jA.rightShoulder.rotation.z, kA.tRShoulderZ, lerpSpeed); }
      if (jA.leftElbow) jA.leftElbow.rotation.x = THREE.MathUtils.lerp(jA.leftElbow.rotation.x, kA.tLElbowX, lerpSpeed);
      if (jA.rightElbow) jA.rightElbow.rotation.x = THREE.MathUtils.lerp(jA.rightElbow.rotation.x, kA.tRElbowX, lerpSpeed);
      if (jA.leftHip) jA.leftHip.rotation.x = THREE.MathUtils.lerp(jA.leftHip.rotation.x, kA.tLHipX, lerpSpeed);
      if (jA.rightHip) jA.rightHip.rotation.x = THREE.MathUtils.lerp(jA.rightHip.rotation.x, kA.tRHipX, lerpSpeed);
      if (jA.leftKnee) jA.leftKnee.rotation.x = THREE.MathUtils.lerp(jA.leftKnee.rotation.x, kA.tLKneeX, lerpSpeed);
      if (jA.rightKnee) jA.rightKnee.rotation.x = THREE.MathUtils.lerp(jA.rightKnee.rotation.x, kA.tRKneeX, lerpSpeed);
      if (jA.chestCoreMat) jA.chestCoreMat.emissiveIntensity = kA.coreIntensity;
      if (jA.scanLaser) jA.scanLaser.visible = kA.scanVisible;

      // Evaluate Beta Kinematics
      const kB = evaluateKinematics(bAct, elapsed, true);
      const jB = betaJointsRef.current;

      if (jB.head) { jB.head.rotation.y = THREE.MathUtils.lerp(jB.head.rotation.y, kB.tHeadY, lerpSpeed); jB.head.rotation.x = THREE.MathUtils.lerp(jB.head.rotation.x, kB.tHeadX, lerpSpeed); }
      if (jB.torso) { jB.torso.rotation.x = THREE.MathUtils.lerp(jB.torso.rotation.x, kB.tTorsoX, lerpSpeed); jB.torso.rotation.y = THREE.MathUtils.lerp(jB.torso.rotation.y, kB.tTorsoY, lerpSpeed); }
      if (jB.leftShoulder) { jB.leftShoulder.rotation.x = THREE.MathUtils.lerp(jB.leftShoulder.rotation.x, kB.tLShoulderX, lerpSpeed); jB.leftShoulder.rotation.z = THREE.MathUtils.lerp(jB.leftShoulder.rotation.z, kB.tLShoulderZ, lerpSpeed); }
      if (jB.rightShoulder) { jB.rightShoulder.rotation.x = THREE.MathUtils.lerp(jB.rightShoulder.rotation.x, kB.tRShoulderX, lerpSpeed); jB.rightShoulder.rotation.z = THREE.MathUtils.lerp(jB.rightShoulder.rotation.z, kB.tRShoulderZ, lerpSpeed); }
      if (jB.leftElbow) jB.leftElbow.rotation.x = THREE.MathUtils.lerp(jB.leftElbow.rotation.x, kB.tLElbowX, lerpSpeed);
      if (jB.rightElbow) jB.rightElbow.rotation.x = THREE.MathUtils.lerp(jB.rightElbow.rotation.x, kB.tRElbowX, lerpSpeed);
      if (jB.leftHip) jB.leftHip.rotation.x = THREE.MathUtils.lerp(jB.leftHip.rotation.x, kB.tLHipX, lerpSpeed);
      if (jB.rightHip) jB.rightHip.rotation.x = THREE.MathUtils.lerp(jB.rightHip.rotation.x, kB.tRHipX, lerpSpeed);
      if (jB.leftKnee) jB.leftKnee.rotation.x = THREE.MathUtils.lerp(jB.leftKnee.rotation.x, kB.tLKneeX, lerpSpeed);
      if (jB.rightKnee) jB.rightKnee.rotation.x = THREE.MathUtils.lerp(jB.rightKnee.rotation.x, kB.tRKneeX, lerpSpeed);
      if (jB.chestCoreMat) jB.chestCoreMat.emissiveIntensity = kB.coreIntensity;
      if (jB.scanLaser) jB.scanLaser.visible = kB.scanVisible;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Camera Presets
  const applyCameraPreset = (preset) => {
    setCameraPreset(preset);
    if (!cameraRef.current || !controlsRef.current) return;

    if (preset === 'DUAL_FRONT') cameraRef.current.position.set(0, 2.8, 6.2);
    else if (preset === 'ALPHA_FOCUS') cameraRef.current.position.set(-1.5, 2.0, 3.2);
    else if (preset === 'BETA_FOCUS') cameraRef.current.position.set(1.5, 2.0, 3.2);
    else if (preset === 'DEBATE_ANGLE') cameraRef.current.position.set(0, 2.0, 3.8);
    else if (preset === 'TOP_DOWN') cameraRef.current.position.set(0, 7.5, 0.1);

    controlsRef.current.target.set(0, 1.2, 0);
  };

  // Drive Motion Handler
  const moveActiveRobot = (dx, dz, drotY = 0) => {
    if (targetRobot === 'ALPHA' || targetRobot === 'BOTH') {
      setAlphaPose(prev => ({
        x: Math.max(-8, Math.min(8, prev.x + dx)),
        z: Math.max(-8, Math.min(8, prev.z + dz)),
        rotY: prev.rotY + drotY
      }));
      setAlphaAction('WALK');
    }
    if (targetRobot === 'BETA' || targetRobot === 'BOTH') {
      setBetaPose(prev => ({
        x: Math.max(-8, Math.min(8, prev.x + dx)),
        z: Math.max(-8, Math.min(8, prev.z + dz)),
        rotY: prev.rotY + drotY
      }));
      setBetaAction('WALK');
    }
  };

  const actionButtons = [
    { id: 'CONTINUOUS_MOTION', label: '⚡ Continuous Motion', color: 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold animate-pulse' },
    { id: 'WAVE', label: '👋 Wave Arm', color: 'bg-cyan-600 text-white' },
    { id: 'WALK', label: '🚶 Sync Walk', color: 'bg-blue-600 text-white' },
    { id: 'INSPECT', label: '🔍 Dual Scan', color: 'bg-amber-600 text-white' },
    { id: 'DANCE', label: '💃 Cyber Dance', color: 'bg-purple-600 text-white' },
    { id: 'IDLE', label: '🛑 Standby', color: 'bg-slate-800 text-slate-300' },
  ];

  return (
    <div className="relative w-full h-[740px] bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">

      {/* Top Left: UNIT-A (CYAN CYBER) Status Card Matching Image */}
      <div className="absolute top-4 left-4 z-10 bg-slate-900/90 border border-cyan-500/50 backdrop-blur-md px-4 py-3 rounded-2xl shadow-2xl flex flex-col space-y-1 w-60">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-black text-cyan-400 tracking-wider">UNIT-A (CYAN CYBER)</span>
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
          <span>STATUS: <strong className="text-emerald-400">ONLINE</strong></span>
          <span className="text-cyan-400 font-bold">{alphaAction}</span>
        </div>
      </div>

      {/* Top Right: UNIT-B (MAGENTA ANDROID) Status Card Matching Image */}
      <div className="absolute top-4 right-4 z-10 bg-slate-900/90 border border-pink-500/50 backdrop-blur-md px-4 py-3 rounded-2xl shadow-2xl flex flex-col space-y-1 w-60 text-right">
        <div className="flex items-center justify-between flex-row-reverse">
          <span className="font-mono text-xs font-black text-pink-400 tracking-wider">UNIT-B (MAGENTA ANDROID)</span>
          <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 flex-row-reverse">
          <span>STATUS: <strong className="text-emerald-400">ONLINE</strong></span>
          <span className="text-pink-400 font-bold">{betaAction}</span>
        </div>
      </div>

      {/* Center Floating Cybernetic Hologram Dialogue HUD Overlay (Matching Uploaded Image) */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10 bg-slate-900/90 border border-cyan-400/60 backdrop-blur-md p-4 rounded-2xl shadow-2xl w-[460px] font-mono text-xs text-center space-y-2">
        <div className="flex items-center justify-between border-b border-cyan-900/60 pb-2 text-[10px] font-bold text-cyan-400">
          <div className="flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-cyan-400" />
            <span>NEON CYBERNETIC DATA SYNC MATRIX</span>
          </div>
          <span className="text-purple-400 font-bold">10Hz PHYSICAL AI</span>
        </div>

        <div className="bg-slate-950/90 border border-purple-900/40 p-3 rounded-xl text-left space-y-1 text-[11px]">
          <div className="text-pink-400 font-bold leading-relaxed">
            UNIT-B // OPERATIONAL STATUS: NOMINAL. CALIBRATING SENSORS...
          </div>
          <div className="text-cyan-400 font-bold leading-relaxed">
            UNIT-A // AFFIRMATIVE. PROCEEDING WITH SYNC.
          </div>
          {hologramTextLine && !hologramTextLine.includes('NOMINAL') && (
            <div className="text-amber-300 font-bold pt-1 border-t border-slate-800">
              {hologramTextLine}
            </div>
          )}
        </div>
      </div>

      {/* Target Robot Selection Bar */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 bg-slate-900/90 border border-slate-800 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center space-x-2 text-xs font-mono">
        <span className="text-[10px] text-slate-400 font-bold px-1">MOTION TARGET:</span>
        {['ALPHA', 'BETA', 'BOTH'].map(t => (
          <button
            key={t}
            onClick={() => setTargetRobot(t)}
            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
              targetRobot === t
                ? t === 'ALPHA' ? 'bg-cyan-600 text-white' : t === 'BETA' ? 'bg-pink-600 text-white' : 'bg-gradient-to-r from-cyan-600 to-pink-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {t === 'ALPHA' ? '🤖 UNIT-A (CYAN)' : t === 'BETA' ? '🤖 UNIT-B (MAGENTA)' : '⚡ BOTH ROBOTS'}
          </button>
        ))}
      </div>

      {/* Action Controller Overlay (Bottom Center) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-slate-900/95 border border-slate-800 backdrop-blur-md p-2.5 rounded-2xl flex items-center space-x-2 shadow-2xl">
        <button
          onClick={triggerDualDebate}
          className="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-900/40 flex items-center space-x-1.5"
        >
          <MessageSquare className="w-4 h-4" />
          <span>🗣️ Cybernetic Dialogue</span>
        </button>

        <span className="text-slate-700">|</span>

        {actionButtons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => setActionForTarget(btn.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
              (targetRobot === 'BOTH' && alphaAction === btn.id && betaAction === btn.id) ||
              (targetRobot === 'ALPHA' && alphaAction === btn.id) ||
              (targetRobot === 'BETA' && betaAction === btn.id)
                ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950 scale-105 ' + btn.color
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Left Bottom Directional Walk Controller */}
      <div className="absolute bottom-4 left-4 z-10 bg-slate-900/95 border border-slate-800 backdrop-blur-md p-3 rounded-2xl flex flex-col space-y-2 shadow-2xl font-mono text-xs">
        <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          <Move className="w-3.5 h-3.5 text-cyan-400" />
          <span>WALK DRIVE ({targetRobot})</span>
        </div>
        <div className="grid grid-cols-3 gap-1 w-32 self-center">
          <div />
          <button
            onClick={() => moveActiveRobot(0, -0.4)}
            className="p-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg flex items-center justify-center shadow"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <div />
          <button
            onClick={() => moveActiveRobot(-0.4, 0, 0.2)}
            className="p-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg flex items-center justify-center shadow"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setAlphaPose({ x: -1.5, z: 0, rotY: 0.35 }); setBetaPose({ x: 1.5, z: 0, rotY: -0.35 }); setActionForTarget('CONTINUOUS_MOTION'); }}
            title="Reset Home"
            className="p-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold rounded-lg flex items-center justify-center border border-slate-700"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => moveActiveRobot(0.4, 0, -0.2)}
            className="p-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg flex items-center justify-center shadow"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <div />
          <button
            onClick={() => moveActiveRobot(0, 0.4)}
            className="p-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg flex items-center justify-center shadow"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
          <div />
        </div>
      </div>

      {/* Right Bottom Voice Dialogue Panel */}
      <div className="absolute bottom-4 right-4 z-10 bg-slate-900/95 border border-slate-800 backdrop-blur-md p-3 rounded-2xl flex flex-col space-y-2 shadow-2xl w-80 font-sans text-xs">
        <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
          <div className="flex items-center space-x-1.5 text-pink-400">
            <Volume2 className="w-4 h-4" />
            <span>CYBERNETIC VOICE SPEECH</span>
          </div>
          {activeSpeaker && <span className="text-emerald-400 animate-pulse font-mono">{activeSpeaker} SPEAKING</span>}
        </div>
        <div className="flex items-center space-x-1.5">
          <input
            type="text"
            value={speechInput}
            onChange={(e) => setSpeechInput(e.target.value)}
            placeholder="Type message..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
          />
          <button
            onClick={() => triggerSpeech('ALPHA')}
            className="px-2.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg text-[11px]"
          >
            Unit-A
          </button>
          <button
            onClick={() => triggerSpeech('BETA')}
            className="px-2.5 py-1.5 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-lg text-[11px]"
          >
            Unit-B
          </button>
        </div>
      </div>

      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}
