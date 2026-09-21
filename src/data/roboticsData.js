export const techSpectrumData = [
  {
    id: 'industrial',
    number: '01',
    title: 'Industrial Automation',
    category: 'Industrial Automation',
    description: 'Automated machines used in factories. They perform tasks like welding, painting, assembly, packaging, and material handling with high precision and speed.',
    spec: 'Payload: Up to 500kg | Precision: ±0.02mm',
    image: '/assets/robocorp25_dashboard.jpg',
    badge: 'Heavy Industrial'
  },
  {
    id: 'humanoid',
    number: '02',
    title: 'Humanoid Robots',
    category: 'Humanoid Assistants',
    description: 'Robots designed to look and behave like humans. They are used in research, service industries, customer interaction, and advanced AI development.',
    spec: 'DoF: 53 | AI Core: Neural-Motion v4',
    image: '/assets/humanoid_robot_line-o8O7YzXE.png',
    badge: 'Bipedal Autonomy'
  },
  {
    id: 'medical',
    number: '03',
    title: 'Medical Robots',
    category: 'Precision Surgery',
    description: 'Assist doctors in performing precise surgeries, rehabilitation therapy, patient monitoring, and hospital automation.',
    spec: 'Latency: <1.2ms | Accuracy: Sub-millimeter',
    image: '/assets/pharmaceutical_bottling-D1Qpz-Ox.png',
    badge: 'Sub-Millimeter QA'
  },
  {
    id: 'agricultural',
    number: '04',
    title: 'Agricultural Robots',
    category: 'Smart Agriculture',
    description: 'Help farmers with tasks like planting, harvesting crops, spraying fertilizers, monitoring soil health, and crop inspection using AI sensors.',
    spec: 'Autonomy: Level 4 | Coverage: 50 acres/day',
    image: '/assets/agricultural_robot-CsfUqPxz.png',
    badge: 'Field Autonomous'
  },
  {
    id: 'uav',
    number: '05',
    title: 'Drone Robots (UAV)',
    category: 'Autonomous Drones',
    description: 'Flying robots used for surveillance, delivery services, agriculture monitoring, aerial photography, mapping, and disaster management.',
    spec: 'Flight Time: 60 mins | Sensors: LiDAR & Multi-spectral',
    image: '/assets/biomimetic_pollinator-CJFOGGDc.png',
    badge: 'Aerial Inspection'
  },
  {
    id: 'underwater',
    number: '06',
    title: 'Underwater Robots',
    category: 'Underwater Robots',
    description: 'Used for ocean exploration, pipeline inspection, underwater research, and deep-sea mining (ROV or AUV).',
    spec: 'Depth: Up to 6000m | Navigation: Acoustic SLAM',
    image: '/assets/underwater_robot-CyZ2Gk4Y.png',
    badge: 'Offshore Inspection'
  },
  {
    id: 'military',
    number: '07',
    title: 'Military Robots',
    category: 'Defense & Security',
    description: 'Used by defense forces for bomb disposal, surveillance, reconnaissance missions, and battlefield support.',
    spec: 'Traction: Tracked / All-Terrain | Payload: Weaponry & Sensors',
    image: '/assets/formula_race_car-F-PbYVwt.png',
    badge: 'Defense Grade'
  },
  {
    id: 'service',
    number: '08',
    title: 'Service Robots',
    category: 'Service & Hospitality',
    description: 'Assist humans in daily activities. Examples include hotel robots, hospital robots, cleaning robots, and delivery robots.',
    spec: 'Interaction: Natural Language | Navigation: Indoor SLAM',
    image: '/assets/robotic_arm-B6Ghzi5k.png',
    badge: 'Human Assistant'
  },
  {
    id: 'educational',
    number: '09',
    title: 'Educational Robots',
    category: 'STEM & Research',
    description: 'Help students learn coding, robotics engineering, artificial intelligence, and STEM concepts through practical hands-on learning.',
    spec: 'Software: Blockly & Python | Connectivity: Bluetooth/Wi-Fi',
    image: '/assets/educational_robot-Co922cI9.png',
    badge: 'STEM Certified'
  },
  {
    id: 'amr',
    number: '10',
    title: 'Autonomous Mobile Robots (AMR)',
    category: 'Logistics & AMRs',
    description: 'Self-navigating warehouse and logistics systems that optimize material flow with dynamic pathfinding.',
    spec: 'Speed: 2.0 m/s | Navigation: SLAM Visual-LiDAR',
    image: '/assets/agricultural_robot-CsfUqPxz.png',
    badge: 'Warehouse Swarm'
  }
]

export const servicesData = techSpectrumData

export const illustrationsData = [
  {
    id: 201,
    title: 'AMR Warehouse Waypoint Navigation & Path Planner',
    category: 'Autonomous Mobile Robots (AMR)',
    spec: 'EKF Pose Estimation · LiDAR Scan Fan · Waypoint Goal [12.8, 18.2]',
    description: 'Interactive web UI for autonomous mobile robots with waypoint path planning, EKF pose estimation, linear/angular velocity telemetry, and emergency stop control.',
    image: '/assets/dashboard_amr_waypoint_planner.jpg'
  },
  {
    id: 202,
    title: 'AMR Occupancy Grid & 3-Zone Costmap Planner v3.2',
    category: 'Autonomous Mobile Robots (AMR)',
    spec: '34,120 LiDAR Points · Global Inflation Layer · DWA Trajectory',
    description: 'High-density 2D factory floorplan costmap renderer featuring dynamic obstacle inflation layers, 22Hz map updates, and telemetry monitoring.',
    image: '/assets/dashboard_amr_occupancy_costmap.jpg'
  },
  {
    id: 203,
    title: 'AMR Dynamic Obstacle A* Re-Planning (ROBOT AMR-113)',
    category: 'Autonomous Mobile Robots (AMR)',
    spec: 'A* Real-Time Re-Routing · Tanh Deceleration · 360° LiDAR Feed',
    description: 'Autonomous re-routing engine detecting dynamic warehouse obstacles in real-time, executing reflex deceleration, and navigating active cyan path trajectories.',
    image: '/assets/dashboard_amr_obstacle_replanning.jpg'
  },
  {
    id: 101,
    title: '6-DOF Robotic Arm Path Planner Dashboard',
    category: 'Digital Twin & Simulation',
    spec: 'Three.js 3D View · Real-Time Joint Kinematics',
    description: 'Interactive path planning interface featuring 6-DOF joint controllers (q1-q6), End-Effector trajectory tracking, telemetry metrics, and emergency stop system.',
    image: '/assets/dashboard_6dof_path_planner.jpg'
  },
  {
    id: 102,
    title: 'Robotic Trajectory Planner & 3D Collision Detection',
    category: 'Kinematics & Pathfinding',
    spec: 'Quintic Polynomial Trajectory · 0.342m Safe Clearance',
    description: 'Real-time velocity and acceleration curve analytics coupled with Three.js 3D collision detection and JSON payload telemetry export.',
    image: '/assets/dashboard_trajectory_collision.jpg'
  },
  {
    id: 103,
    title: 'Quality Vision AI Live Conveyor Inspection',
    category: 'Quality Inspection',
    spec: 'Sub-mm Optical QA · 98.4% Confidence · 1,000 FPS',
    description: 'Automated conveyor gear inspection station with real-time pass/fail evaluation, outer diameter, pitch circle, concentricity error tracking, and defect trends analytics.',
    image: '/assets/dashboard_quality_vision.jpg'
  },
  {
    id: 1,
    title: 'Precision Cyber-Physical Sewing System',
    category: 'Textile Automation',
    spec: 'Optical Tension Sensing · Sub-mm Stitching',
    description: 'High-speed automated textile tensioning and stitch-correction robotic cells for automotive interiors.',
    image: '/assets/future_sewing_machine-DyfMm28G.png'
  },
  {
    id: 2,
    title: 'Humanoid Robotic Assembly Line',
    category: 'Humanoid Assistants',
    spec: 'Bipedal Balance · Haptic Grippers',
    description: 'Bipedal humanoid articulators operating in high-mix automotive component assembly plants.',
    image: '/assets/humanoid_robot_line-o8O7YzXE.png'
  },
  {
    id: 3,
    title: 'Precision Sensor Calibration System',
    category: 'Quality Inspection',
    spec: 'Sub-Millimeter Alignment · Multi-Camera Array',
    description: 'Sub-micron optoelectronic sensor test bench for aerospace guidance systems.',
    image: '/assets/glowing_dartboard-Cm5Z6R88.png'
  },
  {
    id: 4,
    title: 'High-Volume Multi-Axis Factory Automation',
    category: 'Industrial Automation',
    spec: '6-DOF Sync · 0.04mm Repeatability',
    description: 'Synchronized multi-arm robotic workcell executing high-speed pick and placement.',
    image: '/assets/orange_robotic_arms_factory-BnlkxGTJ.png'
  },
  {
    id: 5,
    title: 'High-Speed Formula Vehicle Telematics',
    category: 'Edge AI Controllers',
    spec: '1,000 Hz Telemetry · Zero Latency',
    description: 'Real-time telemetry and edge analytics controller for electric motorsport powertrains.',
    image: '/assets/formula_race_car-F-PbYVwt.png'
  },
  {
    id: 6,
    title: 'IoT-Connected Textile Factory Automation',
    category: 'Smart Factory',
    spec: 'ROS 2 Swarm · Predictive Maintenance',
    description: 'Connected textile spinning loom monitoring with automatic yarn breakage resolution.',
    image: '/assets/textile_automation-CyCkRO0e.png'
  },
  {
    id: 7,
    title: 'Collaborative Robotics (Cobot) Systems',
    category: 'Collaborative Robotics',
    spec: 'Haptic Touch · Zero-Gate Safety',
    description: 'Touch-sensitive cobot arm working alongside human operators in electronics manufacturing.',
    image: '/assets/robotic_arm-B6Ghzi5k.png'
  },
  {
    id: 8,
    title: 'Sterile Pharmaceutical Bottling Line',
    category: 'Medical & Pharma',
    spec: 'ISO Class 5 Cleanroom · Zero Contamination',
    description: 'Ultra-clean robotic filling and capping cell designed for vaccine vial distribution.',
    image: '/assets/pharmaceutical_bottling-D1Qpz-Ox.png'
  },
  {
    id: 9,
    title: 'Evolutionary Biomimetic Pollinator Drones',
    category: 'Smart Agriculture',
    spec: 'Autonomous Swarm · Micro-Flight Vectoring',
    description: 'Micro-drone swarm for precision greenhouse crop pollination and micro-yield mapping.',
    image: '/assets/biomimetic_pollinator-CJFOGGDc.png'
  },
  {
    id: 10,
    title: 'Silicon Wafer Microelectronics Fabrication',
    category: 'Microelectronics',
    spec: 'Nanometer Vacuum Grip · Sub-micron Vision',
    description: 'Nanometer-class vacuum arm handler for semiconductor wafer transfer inside cleanrooms.',
    image: '/assets/microelectronics_processor-Rygh1gBd.png'
  },
  {
    id: 11,
    title: 'Dynamic Flow UX Telemetry Visualization',
    category: 'Digital Twin',
    spec: '3D WebGL Mirror · Real-Time ROS 2 Stream',
    description: 'Digital twin operator dashboard visualizing factory telemetry and arm joint torques.',
    image: '/assets/ux_flow_telemetry-CnQTkN39.png'
  }
]

export const blogData = [
  {
    id: 'b1',
    title: 'Generative Physical AI (Motion Transformers)',
    date: 'Sept 12, 2026',
    author: 'Dr. Alexander Sterling',
    category: 'Neural AI Architecture',
    excerpt: 'How transformer neural networks are training 6-DOF cobots to anticipate trajectory collisions in 4ms.',
    content: 'Generative Motion v4.0 introduces neural motion transformers trained on over 50,000 hours of high-precision industrial robot trajectories. By replacing traditional polynomial interpolators with real-time transformer inference, arm joint torque adjustments occur within 4 milliseconds of detecting obstacle variance.'
  },
  {
    id: 'b2',
    title: 'Liquid-State Biomimetic Actuation',
    date: 'Aug 28, 2026',
    author: 'Elena Rostova',
    category: 'Actuator Research',
    excerpt: 'Transitioning from rigid harmonic drives to compliant liquid-crystal elastomer joints.',
    content: 'Traditional steel harmonic gearboxes impose thermal and weight limits. Our liquid-state elastomer actuators provide variable stiffness, enabling delicate organic handling without compromising high-load holding capacity.'
  },
  {
    id: 'b3',
    title: 'Neuromorphic Edge Vision Engines',
    date: 'Aug 14, 2026',
    author: 'Dr. Sarah Chen',
    category: 'Computer Vision',
    excerpt: 'Event-based camera arrays delivering sub-microsecond optical defect tracking at 1,000 FPS.',
    content: 'Neuromorphic event-driven sensors only output pixel luminance changes, reducing data throughput by 95% while providing 1,000 FPS spatial tracking for high-speed automated packaging lines.'
  },
  {
    id: 'b4',
    title: 'Haptic Sensing Skin Matrices',
    date: 'Jul 30, 2026',
    author: 'DJ Research Team',
    category: 'Cobot Safety',
    excerpt: 'Flexible piezo-resistive polymer skin giving cobots human-equivalent pressure perception.',
    content: 'Integrating over 4,000 tactile nodes per square meter across cobot articulators eliminates the need for physical light curtains, making human-robot co-working completely seamless.'
  },
  {
    id: 'b5',
    title: 'Decentralized Swarm Mesh Networks',
    date: 'Jul 15, 2026',
    author: 'DJ Autonomous Fleet Lab',
    category: 'AMRs & Swarms',
    excerpt: 'Zero-master mesh network protocols for 100+ warehouse AMRs navigating dynamic environments.',
    content: 'Decentralized peer-to-peer ROS 2 nodes allow AMR fleets to resolve bottleneck intersections autonomously without central server latency.'
  }
]

export const upcomingTech = [
  { id: 'u1', title: 'Quantum Kinematic Computing', desc: 'Quantum annealing solvers for multi-agent joint path optimization.' },
  { id: 'u2', title: 'Organic Bio-Hybrid Actuators', desc: 'Synthetic muscle fibers powered by micro-fluidic glucose matrices.' },
  { id: 'u3', title: 'Molecular Nanobot Swarms', desc: 'Sub-micron surface repair units for high-stress turbine blades.' },
  { id: 'u4', title: 'Cognitive Empathy & Co-Reasoning AI', desc: 'Intent-prediction neural models for collaborative human assembly.' },
  { id: 'u5', title: 'Kinetic-Harvesting Graphene Membranes', desc: 'Self-powering robot skins harvesting ambient factory vibration.' }
]

export const caseStudies = [
  {
    industry: 'Textile & Apparel',
    location: 'Coimbatore Hub',
    workload: 'Automated Tension Spinning & Weaving',
    description: 'Implemented 42 IoT-connected textile robot cells with real-time thread breakage detection.',
    metric: '42% Efficiency Increase · 0.1% Yarn Loss'
  },
  {
    industry: 'Automotive Manufacturing',
    location: 'Chennai Assembly Plant',
    workload: 'Sub-Millimeter Chassis Welding',
    description: 'Deployed 18 heavy 6-DOF welding cobots with laser seam tracking for EV chassis lines.',
    metric: '99.9% Weld Integrity · 3.5x Faster Cycle'
  },
  {
    industry: 'Pharmaceutical',
    location: 'Hyderabad Biotech Hub',
    workload: 'Sterile Vial Capping & Packaging',
    description: 'ISO Class 5 cleanroom cobot arm installation for high-output vaccine distribution.',
    metric: 'Zero Contamination Incidents · 24/7 Operation'
  },
  {
    industry: 'Semiconductor Fabrication',
    location: 'Bengaluru R&D Center',
    workload: 'Silicon Wafer Transport & QA',
    description: 'Sub-micron vacuum pick-and-place manipulators operating under cleanroom conditions.',
    metric: '99.98% Defect Free Yield · 0.04mm Repeatability'
  }
]
