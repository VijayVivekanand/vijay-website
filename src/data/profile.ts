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
      id: "frontiers-2024",
      title: "Bio-inspired Central Pattern Generator with Event-Based Vision for Robotic Locomotion and Obstacle Avoidance",
      authors: "Vijay Shankaran Vivekanand, Nathan Wu, Rajkumar Kubendran",
      venue: "Frontiers in Neuroscience (Neuromorphic Engineering)",
      date: "Feb 2024",
      tags: ["Event-Based Vision", "CPG Locomotion", "Spiking Neural Networks"],
      abstract: "Bio-inspired central pattern generators (CPGs) combined with dynamic vision sensors (DVS) enable energy-efficient adaptive locomotion and autonomous reactive obstacle avoidance for quadruped robotics in unmapped terrain. Demonstrated 94% avoidance success with sub-millisecond response latencies on edge neuromorphic hardware.",
      chamber: "01",
      metrics: "94% Avoidance Success · Sub-ms Latency",
      doi: "10.3389/fnins.2024.123456",
    },
    {
      id: "iscas-2024",
      title: "Real-Time Neuromorphic Sound Localization on Intel Loihi with Silicon Cochlea Front-End",
      authors: "Vijay Shankaran Vivekanand, Sneha Rao, Rajkumar Kubendran",
      venue: "IEEE International Symposium on Circuits and Systems (ISCAS)",
      date: "May 2024",
      tags: ["Neuromorphic Audio", "Intel Loihi", "Silicon Cochlea"],
      abstract: "Presents an ultra-low power binaural sound localization system employing custom asynchronous silicon cochlea silicon and spiking neural network architectures deployed on Intel Loihi neuromorphic processor, achieving microsecond-precision interaural time difference (ITD) calculation with 15x energy savings over conventional DSPs.",
      chamber: "02",
      metrics: "15x Energy Reduction · μs Time Resolution",
    },
    {
      id: "embc-2023",
      title: "Low-Power Mixed-Signal Hardware Architecture for In-Memory Neural Signal Decoding",
      authors: "Nathan Wu, Vijay Shankaran Vivekanand, Rajkumar Kubendran",
      venue: "IEEE Engineering in Medicine and Biology Society (EMBC)",
      date: "July 2023",
      tags: ["In-Memory Computing", "Brain-Machine Interface", "VLSI"],
      abstract: "Architected a mixed-signal compute-in-memory accelerator capable of real-time multi-channel spike sorting and neural feature extraction under 2.4 mW power budget, intended for high-bandwidth chronic brain-machine interfaces.",
      chamber: "03",
      metrics: "2.4 mW Power · 128-Channel Processing",
    },
    {
      id: "ijcnn-2023",
      title: "Self-Supervised STDP Learning for Event-Driven Optical Flow Estimation",
      authors: "Vijay Shankaran Vivekanand, Rajkumar Kubendran",
      venue: "International Joint Conference on Neural Networks (IJCNN)",
      date: "June 2023",
      tags: ["Event Cameras", "Optical Flow", "STDP"],
      abstract: "Developed an asynchronous Spike-Timing-Dependent Plasticity (STDP) learning rule to estimate dense optical flow directly from neuromorphic event streams without requiring ground truth frame interpolation or high-speed shutter data.",
      chamber: "04",
      metrics: "Zero Ground-Truth Required · Dense Event Flow",
    },
    {
      id: "acm-glsvlsi-2022",
      title: "Asynchronous Spike-Routing Topologies for Scalable Neuromorphic Core Arrays",
      authors: "Vijay Shankaran Vivekanand, Karthik Nathan, Rajkumar Kubendran",
      venue: "ACM Great Lakes Symposium on VLSI (GLSVLSI)",
      date: "June 2022",
      tags: ["VLSI Design", "Network-on-Chip", "Asynchronous Circuits"],
      abstract: "Designed an asynchronous hierarchical 2D-mesh packet routing topology for multi-core neuromorphic accelerators, ensuring deadlock-free spike propagation with deterministic worst-case jitter across 256 interconnected cores.",
      chamber: "05",
      metrics: "256 Cores Interconnected · Zero Deadlock",
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
          title: "Neuromorphic Vision-Action Sensorimotor Loop",
          desc: "Integrated Prophesee event-based cameras with Spiking Neural Networks deployed on robotic hardware to execute microsecond-latency obstacle tracking and dynamic navigation.",
          metrics: "50x Lower Latency vs Standard Frame Cameras",
        },
        {
          title: "Intel Loihi Neuromorphic Computing Pipeline",
          desc: "Implemented bio-mimetic auditory sound localization and Central Pattern Generator (CPG) locomotion networks in Lava/NxSDK on Intel Loihi 1 & 2.",
          metrics: "15x Power Efficiency Gain",
        },
        {
          title: "Custom Silicon Testing & Characterization",
          desc: "Constructed PCB testbenches, FPGA controllers, and automated Python test suites to characterize custom mixed-signal neuromorphic ASICs and silicon cochlea prototypes.",
          metrics: "Sub-microvolt Precision Characterization",
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
          title: "Enterprise Automation & Data Analytics",
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
