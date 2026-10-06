export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  date: string;
  tags: string[];
  abstract: string;
  link?: string;
  doi?: string;
  chamber: string;
  metrics?: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  advisor?: string;
  type: "industry" | "research" | "internship";
  points: { title: string; desc: string; metrics?: string }[];
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  details: string[];
  tags: string[];
  link?: string;
  doi?: string;
  mathSnippet?: string;
  metrics?: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  iconType: "trophy" | "star" | "medal" | "award";
  rarity: "Legendary" | "Rare" | "Uncommon";
}

export interface PersonalityInterest {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  icon: string;
  highlights: string[];
  image?: string;
  badge?: string;
}

export interface PersonalityData {
  tagline: string;
  bio: string;
  image?: string;
  imageCaption?: string;
  interests: PersonalityInterest[];
  quickBites: { label: string; value: string; icon: string }[];
  philosophies: { principle: string; quote: string }[];
}

export interface ProfileData {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  github?: string;
  bio: string;
  researchInterests: string[];
  education: {
    institution: string;
    degree: string;
    period: string;
    location: string;
    gpa?: string;
    specialization?: string;
    coursework?: string[];
  }[];
  publications: Publication[];
  experience: Experience[];
  projects: Project[];
  skills: {
    category: string;
    items: { name: string; level: number; featured?: boolean }[];
  }[];
  awards: Award[];
  personality: PersonalityData;
  stats: { label: string; value: string; unit?: string; sub: string }[];
}

export const PROFILE_DATA: ProfileData = {
  name: "Vijay Shankaran Vivekanand",
  title: "Embodied AI | Robot Perception | Adaptive Control",
  email: "v.vijayshankaran@gmail.com",
  phone: "+1-412-726-4553",
  linkedin: "https://www.linkedin.com/in/vijay-s-vivekanand",
  bio: "Focused on the intersection of deep learning and robust control theory for autonomous robotic systems. Developing data-efficient learning algorithms for perception-action loops, specifically leveraging event-based vision and foundation models to enable real-time decision-making in dynamic, unstructured environments.",
  researchInterests: [
    "Embodied AI & Foundation Models",
    "Robot Perception & Event-Based Vision (DVS)",
    "Adaptive & Robust Control Theory",
    "Spiking Neural Networks (SNN) & Neuromorphic Hardware",
    "Sensorimotor Loops & Bio-Mimetic Locomotion",
  ],
  education: [
    {
      institution: "University of Pittsburgh",
      degree: "M.S. in Electrical and Computer Engineering",
      period: "Dec 2023",
      location: "Pittsburgh, PA",
      gpa: "3.85 / 4.00",
      coursework: [
        "Linear System Theory",
        "Adaptive Control",
        "Robotic Control",
        "Optimal Control",
        "Pattern Recognition",
        "Analysis of Stochastic Processes",
        "Optimization Methods",
        "Neuromorphic System Design",
        "Advanced Information Security",
      ],
    },
    {
      institution: "PES University",
      degree: "B.Tech in Electronics and Communications Engineering",
      period: "Jul 2021",
      location: "Bangalore, India",
      gpa: "3.30 / 4.00",
      specialization: "Signal Processing",
      coursework: [
        "Basic Electronics Engineering",
        "Engineering Mathematics",
        "VLSI",
        "Communication Engineering",
        "Digital Signal Processing",
        "Embedded System Design",
        "Digital Signal Processing Laboratory",
        "Digital Image Processing",
        "Artificial Neural Networks",
        "Machine Learning",
        "Introduction to Cryptography",
        "Computer Networks",
      ],
    },
  ],
  stats: [
    { label: "Publications", value: "5", unit: "Articles", sub: "Peer-reviewed (Frontiers, IEEE, ACM)" },
    { label: "MS GPA", value: "3.85", unit: "/ 4.0", sub: "University of Pittsburgh (ECE)" },
    { label: "B.Tech CGPA", value: "3.30", unit: "/ 4.0", sub: "PES University (Signal Processing)" },
    { label: "Research Focus", value: "Neuromorphic", unit: "AI & Robotics", sub: "Event-Based Vision & SNNs" },
  ],
  publications: [
    {
      id: "frontiers-2025",
      title: "Toward autonomous event-based sensorimotor control with supervised gait learning and obstacle avoidance for robot navigation",
      authors: "Shahin Hashemkhani, Vijay Shankaran Vivekanand, Samarth Chopra, Rajkumar Kubendran",
      venue: "Frontiers in Neuroscience (Vol. 19, 1492436)",
      date: "Feb 2025",
      tags: ["Event-Based Vision", "Sensorimotor Control", "Gait Learning", "Obstacle Avoidance", "Central Pattern Generator"],
      abstract: "Miniature robots are useful during disaster response and accessing remote or unsafe areas. They need to navigate uneven terrains without supervision and under severe resource constraints such as limited compute, storage and power budget. Event-based sensorimotor control in edge robotics has potential to enable fully autonomous and adaptive robot navigation systems capable of responding to environmental fluctuations by learning new types of motion and real-time decision making to avoid obstacles. This work presents a novel bio-inspired framework with a hierarchical control system to address these limitations, utilizing a tunable multi-layer neural network with a hardware-friendly Central Pattern Generator (CPG) as the core coordinator to govern the precise timing of periodic motion. Autonomous operation is managed by a Dynamic State Machine (DSM) at the top of the hierarchy, providing the necessary adaptability to handle environmental challenges such as obstacles or uneven terrain. The multi-layer neural network uses a nonlinear neuron model which employs mixed feedback at multiple timescales to produce rhythmic patterns of bursting events to control the motors. A comprehensive study of the architecture's building blocks is presented along with a detailed analysis of network equations. Finally, we demonstrate the proposed framework on the Petoi robot, which can autonomously learn walk and crawl gaits using supervised Spike-Time Dependent Plasticity (STDP) learning algorithm, transition between the learned gaits stored as new states, through the DSM for real-time obstacle avoidance. Measured results of the system performance are summarized and compared with other works to highlight our unique contributions.",
      chamber: "01",
      metrics: "Supervised STDP · DSM Obstacle Avoidance · Petoi Robot",
      doi: "10.3389/fnins.2025.1492436",
      link: "https://doi.org/10.3389/fnins.2025.1492436",
    },
    {
      id: "ieee-tvlsi-2024",
      title: "Dynamic Neural Fields Accelerator Design for a Millimeter-Scale Tracking System",
      authors: "Y. Li, Vijay Shankaran Vivekanand, Rajkumar Kubendran, Inhee Lee",
      venue: "IEEE Transactions on Very Large Scale Integration (VLSI) Systems (Vol. 32, Issue 10, pp. 1940-1944)",
      date: "Oct 2024",
      tags: ["VLSI Design", "Dynamic Neural Fields (DNF)", "Dynamic Vision Sensors (DVS)", "CMOS Accelerator", "Target Tracking"],
      abstract: "This brief introduces a compact-size hardware accelerator for dynamic neural fields (DNF) used in object tracking. To address the substantial computational workload and memory occupancy associated with conventional DNFs, three key approaches are implemented: kernel size reduction and abstraction, the replacement of sigmoidal functions with comparison operations, and the approximation of rectangular-shaped objects. The design is realized in a 28-nm CMOS process, resulting in a layout with an area of 0.53 mm2. Simulation results demonstrate that the accelerator processes 256×256 dynamic vision sensor (DVS) frames at 211 frames per second (fps), with a power consumption of 1.68 mW under such conditions.",
      chamber: "02",
      metrics: "28-nm CMOS · 211 FPS · 1.68 mW · 0.53 mm²",
      doi: "10.1109/TVLSI.2024.3416725",
      link: "https://doi.org/10.1109/TVLSI.2024.3416725",
    },
    {
      id: "acm-icons-2023",
      title: "Robot Locomotion through Tunable Bursting Rhythms using Efficient Bio-mimetic Neural Networks on Loihi and Arduino Platforms",
      authors: "Vijay Shankaran Vivekanand, Samarth Chopra, Shahin Hashemkhani, Rajkumar Chinnakonda Kubendran",
      venue: "ACM International Conference on Neuromorphic Systems (ICONS '23), Article 5, pp. 1–7",
      date: "Aug 2023",
      tags: ["Intel Loihi", "Central Pattern Generator", "Bursting Rhythms", "Bio-mimetic Neurons", "Quadruped Locomotion"],
      abstract: "Rhythmic tasks that biological beings perform such as breathing, walking, and swimming, use specialized neural networks called central pattern generators (CPG). Spiking CPGs have already been implemented to control robot locomotion. This paper aims to take this concept further by designing and implementing a tunable bursting central pattern generator to control quadruped robots for the first time, to the best of our knowledge. Bursting CPGs allow for more granular control over the motion and speed of operation while retaining the low memory usage and latency capabilities of spiking CPGs. A bio-mimetic neuron model is chosen for this implementation which is highly optimized to run real-time on standard (Arduino microcontroller) and specialized (Intel Loihi) hardware. The Petoi bittle is chosen as the model hardware setup to showcase the efficiency of the proposed CPGs even in serial processing architectures. The CPG network is also realized in a completely asynchronous Loihi architecture to illustrate its versatility. The fully connected network running on CPG takes around 10 kilo bytes of memory (33% of Arduino capacity) to execute different modes of locomotion - walk, jump, trot, gallop, and crawl. Benchmarking results show that the bio-mimetic neurons take around 600 bytes (around 2%) more memory than Izhikevich neurons while being 0.02ms (around 14%) faster in isolated neuron testing.",
      chamber: "03",
      metrics: "~10 KB Memory · 14% Faster · Loihi & Arduino",
      doi: "10.1145/3589737.3605965",
      link: "https://doi.org/10.1145/3589737.3605965",
    },
    {
      id: "icara-2023-stereo",
      title: "Frame of Events: A Low-latency Resource-efficient Approach for Stereo Depth Maps",
      authors: "S. Venkatachalam, Vijay Shankaran Vivekanand, Rajkumar Kubendran",
      venue: "IEEE International Conference on Automation, Robotics and Applications (ICARA '23), pp. 324-328",
      date: "Feb 2023",
      tags: ["Stereo Vision", "Dynamic Vision Sensors (DVS)", "Frame of Events", "Depth Estimation", "Drone Navigation"],
      abstract: "Computer vision traditionally uses cameras that capture visual information as frames at periodic intervals. On the other hand, Dynamic Vision Sensors (DVS) capture temporal contrast (TC) in each pixel asynchronously and stream them serially. This paper proposes a hybrid approach to generate input visual data as ‘frame of events’ for a stereo vision pipeline. We demonstrate that using hybrid vision sensors that produce frames made up of TC events can achieve superior results in terms of low latency, less compute and low memory footprint as compared to the traditional cameras and the event-based DVS. The frame-of-events approach eliminates the latency and memory resources involved in the accumulation of asynchronous events into synchronous frames, while generating acceptable disparity maps for depth estimation. Benchmarking results show that the frame-of-events pipeline outperforms others with the least average latency per frame of 3.8 ms and least average memory usage per frame of 112.4 Kb, which amounts to 7.32% and 9.75% reduction when compared to traditional frame-based pipeline. Hence, the proposed method is suitable for missioncritical robotics applications that involve path planning and localization mapping in a resource-constrained environment, such as drone navigation and autonomous vehicles.",
      chamber: "04",
      metrics: "3.8 ms Latency · 112.4 Kb Memory · 9.75% Drop",
      doi: "10.1109/ICARA56516.2023.10125817",
      link: "https://doi.org/10.1109/ICARA56516.2023.10125817",
    },
    {
      id: "icara-2023-cpg",
      title: "Robot Locomotion Control Using Central Pattern Generator with Non-linear Bio-mimetic Neurons",
      authors: "Vijay Shankaran Vivekanand, Shahin Hashemkhani, S. Venkatachalam, Rajkumar Kubendran",
      venue: "IEEE International Conference on Automation, Robotics and Applications (ICARA '23), pp. 102-106",
      date: "Feb 2023",
      tags: ["Central Pattern Generator", "Non-linear Neurons", "Spike-Based Control", "Jitter Tolerance", "Quadruped Robotics"],
      abstract: "Central pattern generators (CPG) generate rhythmic gait patterns that can be tuned to exhibit various locomotion behaviors like walking, trotting, etc. CPGs inspired by biology have been implemented previously in robotics to generate periodic motion patterns. This paper aims to take the inspiration even further to present a novel methodology to control movement of a four-legged robot using a non-linear bio-mimetic neuron model. In contrast to using regular leaky integrate and fire (LIF) neurons to create coupled neural networks, our design uses non-linear neurons constituting a mixed-feedback (positive and negative) control system operating at multiple timescales (fast, slow and ultraslow ranging from sub-ms to seconds), to generate a variety of spike patterns that control the robotic limbs and hence its gait. The use of spikes as motor control signals allows for low memory usage and low latency operation of the robot. Unlike LIF neurons, the bio-mimetic neurons are also jitter tolerant making the CPG network more resilient and robust to perturbations in the input stimulus. As a proof of concept, we implemented our model on the Petoi Bittle bot, a quadruped pet dog robot and were able to reliably observe different modes of locomotion-walk, trot and jump. Four bio-mimetic neurons forming a CPG network to control the four limbs were implemented on Arduino microcontroller and compared to a similar CPG built using four LIF neurons. The differential equations for both neurons were solved real-time on Arduino and profiled for memory usage, latency and jitter tolerance. The CPG using bio-mimetic non-linear neurons used marginally higher memory (378 bytes, 18% higher than LIF neurons), incurred insignificant latency of 3.54ms compared to motor activation delay of 200ms, while providing upto 5-10x higher jitter tolerance.",
      chamber: "05",
      metrics: "5-10x Jitter Tolerance · 3.54 ms Latency · Arduino Edge",
      doi: "10.1109/ICARA56516.2023.10125666",
      link: "https://doi.org/10.1109/ICARA56516.2023.10125666",
    },
  ],
  experience: [
    {
      id: "coi-energy",
      role: "Lead Machine Learning & AI Solutions Engineer",
      organization: "COI Energy Services",
      location: "Tampa, FL / Remote",
      period: "Jan 2024 – Present",
      type: "industry",
      points: [
        {
          title: "Multi-Agent Energy Forecasting & Grid Optimization",
          desc: "Architected end-to-end predictive energy load and peak demand forecasting pipeline for enterprise industrial facilities utilizing Prophet, XGBoost, and deep recurrent neural networks.",
          metrics: "94.2% Prediction Accuracy · $4.1M Pipeline",
        },
        {
          title: "Generative AI Assistant for Energy Audits",
          desc: "Engineered high-accuracy Retrieval-Augmented Generation (RAG) assistant integrating complex building blueprints, ASHRAE standards, and utility rate tariffs into structured actionable retrofit insights.",
          metrics: "60% Reduction in Audit Time",
        },
        {
          title: "Distributed Edge Sensor Pipeline",
          desc: "Deployed resilient IoT ingestion microservices handling real-time high-frequency telemetry across 500+ commercial building sensors with sub-second alerting.",
          metrics: "99.98% Telemetry Uptime",
        },
      ],
      technologies: ["Python", "PyTorch", "GCP", "FastAPI", "Docker", "LangChain", "PostgreSQL", "XGBoost"],
    },
    {
      id: "enigma-lab",
      role: "Graduate Neuromorphic Robotics Researcher",
      organization: "ENIGMA Lab, University of Pittsburgh",
      location: "Pittsburgh, PA",
      period: "Jan 2022 – Dec 2023",
      advisor: "Dr. Rajkumar Kubendran",
      type: "research",
      points: [
        {
          title: "Neuromorphic Sensorimotor Control & STDP Gait Learning",
          desc: "Integrated Prophesee event-based cameras with multi-layer Spiking Neural Networks deployed on robotic hardware to execute microsecond-latency obstacle tracking and dynamic navigation.",
          metrics: "Sub-ms Response Latency · Petoi Quadruped",
        },
        {
          title: "Intel Loihi Neuromorphic Computing Pipeline",
          desc: "Implemented bio-mimetic auditory sound localization and Central Pattern Generator (CPG) bursting locomotion networks in Lava/NxSDK on Intel Loihi 1 & 2.",
          metrics: "15x Power Efficiency Gain · ~10 KB Footprint",
        },
        {
          title: "Custom Silicon Testing & Characterization",
          desc: "Constructed PCB testbenches, FPGA controllers, and automated Python test suites to characterize custom mixed-signal neuromorphic ASICs and silicon cochlea prototypes.",
          metrics: "28-nm CMOS Layout · 211 FPS · 1.68 mW",
        },
      ],
      technologies: ["Intel Loihi", "Lava SNN", "ROS2", "Event-based Cameras (DVS)", "C++", "Python", "Simulink", "PCB Design"],
    },
    {
      id: "viatris",
      role: "AI & Data Automation Specialist",
      organization: "Viatris",
      location: "Pittsburgh, PA",
      period: "May 2023 – Aug 2023",
      type: "internship",
      points: [
        {
          title: "Enterprise Automation & Data Intelligence",
          desc: "Developed automated data intelligence workflows and predictive quality assurance metrics across global supply chain logistics, cutting manual report overhead by 70%.",
          metrics: "70% Manual Time Reduction",
        },
      ],
      technologies: ["Python", "SQL", "Tableau", "Process Automation"],
    },
    {
      id: "happiest-minds",
      role: "Embedded Systems & AI Engineer",
      organization: "Happiest Minds Technologies",
      location: "Bangalore, India",
      period: "Aug 2021 – Dec 2021",
      type: "industry",
      points: [
        {
          title: "Industrial Edge IoT Firmware",
          desc: "Developed deterministic firmware on ARM Cortex-M microcontrollers and integrated computer vision inference models for edge defect classification on industrial assembly lines.",
          metrics: "98.5% Real-Time Inference Accuracy",
        },
      ],
      technologies: ["Embedded C/C++", "ARM Cortex-M", "TensorFlow Lite", "FreeRTOS", "MQTT"],
    },
    {
      id: "mylan",
      role: "Systems Automation Intern",
      organization: "Mylan Laboratories",
      location: "Bangalore, India",
      period: "Jan 2021 – May 2021",
      type: "internship",
      points: [
        {
          title: "Automated Equipment Telemetry Verification",
          desc: "Engineered automated data collection scripts for manufacturing hardware sensors and designed real-time anomaly detection pipelines.",
          metrics: "100% Audit Compliance",
        },
      ],
      technologies: ["Python", "SCADA", "Statistical Process Control"],
    },
  ],
  projects: [
    {
      id: "autonomous_sensorimotor_cpg",
      title: "Autonomous Event-Based Sensorimotor Control & Supervised Gait Learning",
      category: "Neuromorphic Robotics & Edge AI",
      description: "Bio-inspired hierarchical control system for quadruped robots featuring a multi-layer neural network with hardware-friendly Central Pattern Generators (CPG) and a Dynamic State Machine (DSM). Autonomously learns walk and crawl gaits using supervised Spike-Timing Dependent Plasticity (STDP) for real-time obstacle avoidance.",
      details: [
        "Implemented nonlinear neuron model with mixed positive-negative feedback operating across multiple timescales (sub-ms to seconds).",
        "Integrated Dynamic State Machine (DSM) at hierarchy root for seamless autonomous transition between learned locomotion gaits.",
        "Demonstrated real-time obstacle avoidance on Petoi robot with sub-millisecond response latencies under constrained compute budgets.",
      ],
      tags: ["Event-Based Vision", "Supervised STDP", "Central Pattern Generator", "Dynamic State Machine", "Edge Robotics"],
      metrics: "Supervised STDP · Petoi Quadruped · Front. Neurosci '25",
      link: "https://doi.org/10.3389/fnins.2025.1492436",
      doi: "10.3389/fnins.2025.1492436",
    },
    {
      id: "dnf_accelerator_vlsi",
      title: "28-nm DNF Hardware Accelerator for Millimeter-Scale DVS Tracking",
      category: "VLSI Architecture & Neuromorphic ASIC",
      description: "A compact-size 28-nm CMOS hardware accelerator for Dynamic Neural Fields (DNF) executing millimeter-scale object tracking on asynchronous Dynamic Vision Sensor (DVS) streams.",
      details: [
        "Optimized computation via kernel size abstraction, sigmoidal function replacement with comparison operators, and rectangular shape approximation.",
        "Realized in 28-nm CMOS process occupying a miniature silicon footprint of only 0.53 mm².",
        "Achieved 211 FPS high-speed tracking throughput on 256×256 DVS frames at an ultra-low power budget of 1.68 mW.",
      ],
      tags: ["28-nm CMOS", "Dynamic Neural Fields (DNF)", "DVS Tracking", "Low-Power VLSI", "IEEE TVLSI '24"],
      metrics: "28-nm CMOS · 211 FPS · 1.68 mW · 0.53 mm²",
      link: "https://doi.org/10.1109/TVLSI.2024.3416725",
      doi: "10.1109/TVLSI.2024.3416725",
    },
    {
      id: "bursting_cpg_loihi",
      title: "Tunable Bursting CPG Locomotion on Intel Loihi & Arduino",
      category: "Neuromorphic Computing & Bio-Mimetic Control",
      description: "Designed and deployed tunable bursting Central Pattern Generators (CPGs) for quadruped locomotion across standard microcontroller (Arduino) and fully asynchronous neuromorphic (Intel Loihi) architectures.",
      details: [
        "Engineered bio-mimetic mixed-feedback neurons providing granular locomotion control over walk, jump, trot, gallop, and crawl gaits.",
        "Required only ~10 KB memory footprint (33% of Arduino capacity) for full locomotion execution.",
        "Benchmarking proved 14% faster isolated neuron execution (0.02ms latency) with 5-10x higher input jitter tolerance over LIF models.",
      ],
      tags: ["Intel Loihi", "Central Pattern Generator", "Bursting Rhythms", "Arduino", "ACM ICONS '23"],
      metrics: "~10 KB Footprint · 14% Faster · 5-10x Jitter Resilient",
      link: "https://doi.org/10.1145/3589737.3605965",
      doi: "10.1145/3589737.3605965",
    },
    {
      id: "frame_of_events_stereo",
      title: "Frame of Events Low-Latency Stereo Depth Mapping for DVS",
      category: "Event-Based Vision & 3D Perception",
      description: "Hybrid temporal-contrast event sensor pipeline generating 'frame of events' for high-speed robotic stereo disparity and depth estimation in resource-constrained environments.",
      details: [
        "Eliminated latency and memory overhead of accumulating asynchronous DVS events into synchronous dense frames.",
        "Outperformed conventional pipelines with 3.8 ms average latency per frame and 112.4 Kb memory usage.",
        "Validated for resource-constrained autonomous micro-aerial vehicles (UAVs) and drone navigation.",
      ],
      tags: ["Stereo Vision", "Dynamic Vision Sensors (DVS)", "Depth Estimation", "Frame of Events", "IEEE ICARA '23"],
      metrics: "3.8 ms Latency · 112.4 Kb Memory · 9.75% Resource Drop",
      link: "https://doi.org/10.1109/ICARA56516.2023.10125817",
      doi: "10.1109/ICARA56516.2023.10125817",
    },
    {
      id: "silicon_cochlea",
      title: "Binaural Neuromorphic Silicon Cochlea with ITD Sound Localization",
      category: "Neuromorphic Hardware & Audio",
      description: "A mixed-signal silicon cochlea front-end coupled with an asynchronous Spiking Neural Network on Intel Loihi. Replicates human auditory periphery mechanics to perform 3D sound localization via sub-microsecond Interaural Time Difference (ITD) detection.",
      details: [
        "Modeled multi-stage resonant basilar membrane filter banks with subthreshold CMOS circuits.",
        "Synthesized spike-based cross-correlation coincidence detector network on Loihi achieving ±2.5° angular localization accuracy.",
        "Measured continuous operating power consumption under 1.8 mW at 100 kHz acoustic bandwidth.",
      ],
      tags: ["Intel Loihi", "Silicon Cochlea", "Spiking Neural Networks", "VLSI", "Audio DSP"],
      metrics: "±2.5° Angular Resolution · 1.8 mW Power",
    },
    {
      id: "chaos_cryptography",
      title: "Real-Time Chaos-Based Hyperchaotic Image Encryption System",
      category: "Cryptography & Signal Processing",
      description: "Designed and implemented a 4D Lorenz-Chen hyperchaotic attractor cryptographic engine for high-throughput, low-latency secure multimedia streaming.",
      details: [
        "Implemented high-dimensional pseudo-random permutation and diffusion algorithms exhibiting infinite phase space sensitivity.",
        "Demonstrated resistance to differential cryptanalysis with NPCR > 99.6% and UACI > 33.4%.",
        "Streamed real-time 1080p60 encrypted video feeds with zero perceptual frame dropping on embedded ARM platforms.",
      ],
      tags: ["Nonlinear Dynamics", "Chaos Theory", "Embedded Security", "C++", "OpenCV"],
      metrics: "NPCR > 99.6% · Real-Time 1080p60 Streaming",
    },
    {
      id: "lqr_inverted_pendulum",
      title: "LQR & Model Predictive Control for Nonlinear Inverted Pendulum on Cart",
      category: "Control Systems & Robotics",
      description: "Formulated adaptive state-space stabilization, swing-up trajectory optimization, and robust disturbance rejection for a classic underactuated nonlinear robotic mechanism.",
      details: [
        "Derived full Lagrangian equations of motion and linearized system matrices around unstable inverted equilibrium point.",
        "Synthesized infinite-horizon Linear Quadratic Regulator (LQR) with Kalman state estimator for noisy optical encoder feedback.",
        "Achieved rapid swing-up within 1.2 seconds with recovery under 25° external impulse perturbation.",
      ],
      tags: ["Modern Control Theory", "LQR / LQG", "Kalman Filter", "MATLAB", "Simulink", "State-Space"],
      metrics: "1.2s Swing-up · 25° Impulse Rejection",
    },
  ],
  skills: [
    {
      category: "AI & Machine Learning",
      items: [
        { name: "PyTorch & TensorFlow", level: 92, featured: true },
        { name: "Generative AI & RAG (Gemini, LangChain)", level: 90, featured: true },
        { name: "XGBoost & Prophet Forecasting", level: 88 },
        { name: "Self-Supervised STDP Learning", level: 92, featured: true },
        { name: "Scikit-Learn & Computer Vision", level: 86 },
      ],
    },
    {
      category: "Robotics & Control",
      items: [
        { name: "ROS / ROS2", level: 90, featured: true },
        { name: "Dynamic Vision Sensors (DVS / Event Cameras)", level: 95, featured: true },
        { name: "Adaptive & Optimal Control (LQR, MPC)", level: 92, featured: true },
        { name: "Linear System Theory & Kalman Filtering", level: 90 },
        { name: "Central Pattern Generators (CPG Locomotion)", level: 94, featured: true },
        { name: "MATLAB & Simulink", level: 90 },
      ],
    },
    {
      category: "Hardware & Embedded",
      items: [
        { name: "Intel Loihi (Neuromorphic Hardware)", level: 88, featured: true },
        { name: "VLSI / CMOS Accelerator Architecture", level: 85, featured: true },
        { name: "Arduino, STM32 & Microcontrollers", level: 88 },
        { name: "Real-time Asynchronous Processing", level: 90 },
      ],
    },
    {
      category: "Languages & Tools",
      items: [
        { name: "Python", level: 96, featured: true },
        { name: "C / C++", level: 90, featured: true },
        { name: "MATLAB", level: 90 },
        { name: "TypeScript / JavaScript", level: 85 },
        { name: "Google Cloud Platform (GCP) & AWS", level: 86 },
        { name: "Docker, Git, Linux / Bash", level: 90 },
        { name: "SQL & Vector Databases", level: 88 },
      ],
    },
  ],
  awards: [
    {
      id: "techcrunch-2025",
      title: "TechCrunch Disrupt Finalist Presenter",
      organization: "TechCrunch Disrupt Finals",
      year: "2025",
      description: "Selected as the finalist presenter for COI Energy at the prestigious TechCrunch Disrupt Finals.",
      iconType: "trophy",
      rarity: "Legendary",
    },
    {
      id: "employee-year-2024",
      title: "Employee of the Year",
      organization: "COI Energy",
      year: "2024",
      description: "Awarded for exceptional engineering contributions and high-impact infrastructure delivery, chosen via company-wide vote.",
      iconType: "star",
      rarity: "Legendary",
    },
    {
      id: "mrd-scholarship-2021",
      title: "MRD Scholarship for Academic Excellence",
      organization: "PES University",
      year: "2021",
      description: "Merit-based scholarship awarded for maintaining top-tier academic standing throughout the undergraduate program.",
      iconType: "medal",
      rarity: "Rare",
    },
    {
      id: "eyantra-2019",
      title: "Semi-Finalist, e-Yantra Robotics Challenge",
      organization: "Govt. of India (MHRD) / IIT Bombay",
      year: "2019",
      description: "Competed in nationwide robotics competition focused on building autonomous robotics solutions, placing in the top tier among thousands of teams.",
      iconType: "award",
      rarity: "Rare",
    },
  ],
  personality: {
    tagline: "Beyond Equations, Silicon & Control Loops",
    bio: "When I am not training neural networks, tuning Kalman filters, or wiring neuromorphic testbenches, you'll find me conquering Destiny 2 raids, editing cinematic video cuts, drawing digital art, cheering during football matchdays, and cracking complex strategy puzzles.",
    image: "/casual_photo.jpg",
    imageCaption: "Pondering relativity, spacetime & control theory with Albert Einstein · Washington, D.C.",
    interests: [
      {
        id: "video-games",
        title: "Video Games: Destiny 2 & Elden Ring",
        category: "Gaming & Lore",
        tagline: "100% Steam Completionist · High-stakes raids & Soulslikes",
        description: "Massive fan of rich lore, precision mechanics, and coordinated gameplay. Achieved 100% Steam completion across both Elden Ring (42/42) and Destiny 2 (23/23). Whether executing flawless endgame raid mechanics or mastering dodge timings in The Lands Between, gaming is where tactical reflexes meet deep narrative world-building.",
        icon: "Gamepad2",
        image: "/gaming_achievements.png",
        badge: "100% Steam Achievements",
        highlights: [
          "Elden Ring: 42/42 (100%)",
          "Destiny 2: 23/23 (100%)",
          "Fireteam Raids & Soulslikes",
        ],
      },
      {
        id: "video-editing",
        title: "Cinematic Video Editing & Motion",
        category: "Storytelling & Visual Rhythm",
        tagline: "Dynamic pacing, beat syncing, color grading & seamless cuts",
        description: "Crafting narratives through visual rhythm and acoustic tempo. Blending sound design with frame-accurate cuts, dynamic transitions, and color grading to transform raw sequences into impactful visual stories.",
        icon: "Video",
        highlights: ["Audio-Visual Beat Syncing", "Color Grading & Cinematic Look", "Dynamic Transitions & Motion Rhythm"],
      },
      {
        id: "digital-art",
        title: "Digital Art & Creative Illustration",
        category: "Creative Expression",
        tagline: "Concept styling, composition, palettes & visual aesthetics",
        description: "Exploring creative expression on digital canvas—experimenting with character concepts, sci-fi palettes, lighting moods, and spatial composition. A refreshing creative balance to mathematical equations and code.",
        icon: "Palette",
        highlights: ["Concept Art & Character Sketches", "Sci-Fi Color Palettes & Lighting", "Visual Composition & Framing"],
      },
      {
        id: "football",
        title: "Football / Soccer Enthusiast",
        category: "Sports & Tactics",
        tagline: "High-press transitions, matchday drama & tactical play",
        description: "Passionate follower and player of the beautiful game. Deeply fascinated by high-pressing tactical setups, spatial awareness, counter-attack transitions, and the sheer electric atmosphere of matchday.",
        icon: "Trophy",
        highlights: ["Tactical Formations & Spatial Pressing", "Weekend Matchday Thrills", "Pivotal Playmaker Vision"],
      },
      {
        id: "puzzles-strategy",
        title: "Puzzles, Logic & Strategy",
        category: "Logic & Problem Solving",
        tagline: "Chess, multi-step deduction, brain teasers & strategic foresight",
        description: "Drawn to lateral thinking challenges, multi-step deduction, and tactical foresight where every move ripples across the board. Tackling complex spatial and mechanical puzzles is the ultimate mental playground.",
        icon: "Brain",
        highlights: ["Multi-Step Deductions", "Spatial & Mechanical Logic Puzzles", "Strategic Foresight & Game Theory"],
      },
    ],
    quickBites: [
      { label: "Favorite Games", value: "Destiny 2 & Elden Ring", icon: "Gamepad2" },
      { label: "Creative Toolchain", value: "Premiere, After Effects & Digital Canvas", icon: "Video" },
      { label: "Sport of Choice", value: "Football / Soccer", icon: "Trophy" },
      { label: "Off-Duty Fuel", value: "Double Shot Espresso / Flat White", icon: "Coffee" },
      { label: "Cities Called Home", value: "Gurgaon ➔ Bangalore ➔ Pittsburgh", icon: "MapPin" },
      { label: "Strategic Mindset", value: "Long-Horizon Planning & Fast Execution", icon: "Brain" },
    ],
    philosophies: [
      {
        principle: "Perception Precedes Action",
        quote: "In robotics as in life: before you can make decisive, optimal decisions, you must build high-fidelity internal models of the world.",
      },
      {
        principle: "Simplicity Through Depth",
        quote: "The highest form of engineering is taking immense systemic complexity and distilling it into an intuitive, elegant interface.",
      },
      {
        principle: "Continuous Iteration & Feedback Loops",
        quote: "A closed-loop system with tight feedback always outperforms an open-loop giant with perfect initial calibration.",
      },
    ],
  },
};
