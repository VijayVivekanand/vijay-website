const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

async function generateCV() {
  const pdfDoc = await PDFDocument.create();
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const pageWidth = 595.28; // A4
  const pageHeight = 841.89;
  const margin = 48;
  const contentWidth = pageWidth - margin * 2;

  // Colors
  const black = rgb(0.08, 0.08, 0.08);
  const grayText = rgb(0.25, 0.25, 0.25);
  const lightGray = rgb(0.45, 0.45, 0.45);
  const linkBlue = rgb(0.12, 0.35, 0.65);

  function wrapText(text, maxWidth, font, fontSize) {
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = font.widthOfTextAtSize(testLine, fontSize);
      if (width <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  function drawBoldPrefixParagraph(
    page,
    prefix,
    body,
    x,
    y,
    maxWidth,
    fontSize,
    fontBold,
    fontRegular,
    prefixColor,
    bodyColor
  ) {
    const prefixWidth = fontBold.widthOfTextAtSize(prefix, fontSize);
    const remainingFirstLineWidth = maxWidth - prefixWidth;

    const words = body.split(" ");
    let firstLineBody = "";
    let wordIndex = 0;

    while (wordIndex < words.length) {
      const test = firstLineBody ? `${firstLineBody} ${words[wordIndex]}` : words[wordIndex];
      if (fontRegular.widthOfTextAtSize(test, fontSize) <= remainingFirstLineWidth) {
        firstLineBody = test;
        wordIndex++;
      } else {
        break;
      }
    }

    // Draw first line
    page.drawText(prefix, {
      x,
      y,
      size: fontSize,
      font: fontBold,
      color: prefixColor,
    });

    if (firstLineBody) {
      page.drawText(firstLineBody, {
        x: x + prefixWidth,
        y,
        size: fontSize,
        font: fontRegular,
        color: bodyColor,
      });
    }

    let currentY = y - (fontSize + 3.5);

    // Remaining lines
    const remainingWords = words.slice(wordIndex);
    if (remainingWords.length > 0) {
      const remainingText = remainingWords.join(" ");
      const lines = wrapText(remainingText, maxWidth, fontRegular, fontSize);
      for (const line of lines) {
        page.drawText(line, {
          x,
          y: currentY,
          size: fontSize,
          font: fontRegular,
          color: bodyColor,
        });
        currentY -= (fontSize + 3.5);
      }
    }

    return currentY;
  }

  function drawSectionHeader(page, title, y) {
    page.drawRectangle({
      x: margin,
      y: y - 2,
      width: 44,
      height: 4,
      color: black,
    });
    page.drawText(title, {
      x: margin + 52,
      y: y - 5,
      size: 13,
      font: fontBold,
      color: black,
    });
    return y - 22;
  }

  function drawFooter(page, pageNum) {
    page.drawText(`${pageNum}/3`, {
      x: pageWidth - margin - 20,
      y: 28,
      size: 9,
      font: fontOblique,
      color: lightGray,
    });
  }

  // ==================== PAGE 1 ====================
  const page1 = pdfDoc.addPage([pageWidth, pageHeight]);
  let y1 = pageHeight - margin - 15;

  // Name Header
  page1.drawText("Vijay Shankaran", {
    x: margin,
    y: y1,
    size: 26,
    font: fontRegular,
    color: grayText,
  });
  y1 -= 28;
  page1.drawText("Vivekanand", {
    x: margin,
    y: y1,
    size: 28,
    font: fontBold,
    color: black,
  });

  // Contact Info on Top Right
  const contactX = pageWidth - margin - 145;
  let contactY = pageHeight - margin - 10;
  page1.drawText("+1-412-726-4553", {
    x: contactX,
    y: contactY,
    size: 9,
    font: fontRegular,
    color: grayText,
  });
  contactY -= 13;
  page1.drawText("v.vijayshankaran@gmail.com", {
    x: contactX,
    y: contactY,
    size: 9,
    font: fontRegular,
    color: linkBlue,
  });
  contactY -= 13;
  page1.drawText("in vijay-s-vivekanand", {
    x: contactX,
    y: contactY,
    size: 9,
    font: fontRegular,
    color: linkBlue,
  });

  y1 -= 35;

  // Section 1: Research Interests
  y1 = drawSectionHeader(page1, "Research Interests", y1);

  // Domains row
  page1.drawText("Domains", {
    x: margin + 5,
    y: y1,
    size: 9.5,
    font: fontBold,
    color: black,
  });
  page1.drawText("Embodied AI  |  Robot Perception  |  Adaptive Control", {
    x: margin + 65,
    y: y1,
    size: 9.5,
    font: fontBold,
    color: black,
  });
  y1 -= 15;

  // Summary row
  page1.drawText("Summary", {
    x: margin + 5,
    y: y1,
    size: 9.5,
    font: fontBold,
    color: black,
  });
  const summaryLines = wrapText(
    "Focused on the intersection of deep learning and robust control theory for autonomous robotic systems. Interested in developing data-efficient learning algorithms for perception-action loops, specifically leveraging event-based vision and foundation models to enable real-time decision-making in dynamic, unstructured environments.",
    contentWidth - 65,
    fontRegular,
    9
  );
  for (const line of summaryLines) {
    page1.drawText(line, {
      x: margin + 65,
      y: y1,
      size: 9,
      font: fontRegular,
      color: grayText,
    });
    y1 -= 12;
  }
  y1 -= 12;

  // Section 2: Education
  y1 = drawSectionHeader(page1, "Education", y1);

  // Pitt
  page1.drawText("Dec 2023", {
    x: margin + 5,
    y: y1,
    size: 9,
    font: fontBold,
    color: black,
  });
  page1.drawText("University of Pittsburgh", {
    x: margin + 65,
    y: y1,
    size: 10,
    font: fontBold,
    color: black,
  });
  y1 -= 13;
  page1.drawText("M.S. in Electrical and Computer Engineering | CGPA 3.85", {
    x: margin + 65,
    y: y1,
    size: 9,
    font: fontOblique,
    color: grayText,
  });
  y1 -= 12;
  const cwLines1 = wrapText(
    "Coursework: Linear System Theory, Adaptive Control, Robotic Control, Optimal Control, Pattern Recognition, Analysis of Stochastic Processes, Optimization Methods, Neuromorphic System Design, Advanced Information Security",
    contentWidth - 65,
    fontRegular,
    8.5
  );
  for (const line of cwLines1) {
    page1.drawText(line, {
      x: margin + 65,
      y: y1,
      size: 8.5,
      font: fontRegular,
      color: grayText,
    });
    y1 -= 11;
  }
  y1 -= 6;

  // PES
  page1.drawText("Jul 2021", {
    x: margin + 5,
    y: y1,
    size: 9,
    font: fontBold,
    color: black,
  });
  page1.drawText("PES University", {
    x: margin + 65,
    y: y1,
    size: 10,
    font: fontBold,
    color: black,
  });
  y1 -= 13;
  page1.drawText("B.Tech in Electronics and Communications Engineering | CGPA 3.30", {
    x: margin + 65,
    y: y1,
    size: 9,
    font: fontOblique,
    color: grayText,
  });
  y1 -= 12;
  page1.drawText("Specialization: Signal Processing", {
    x: margin + 65,
    y: y1,
    size: 8.5,
    font: fontBold,
    color: black,
  });
  y1 -= 11;
  const cwLines2 = wrapText(
    "Coursework: Basic Electronics Engineering, Engineering Mathematics, VLSI, Communication Engineering, Digital Signal Processing, Embedded System Design, Digital Signal Processing Laboratory, Digital Image Processing, Artificial Neural Networks, Machine Learning, Introduction to Cryptography, Computer Networks",
    contentWidth - 65,
    fontRegular,
    8.5
  );
  for (const line of cwLines2) {
    page1.drawText(line, {
      x: margin + 65,
      y: y1,
      size: 8.5,
      font: fontRegular,
      color: grayText,
    });
    y1 -= 11;
  }
  y1 -= 12;

  // Section 3: Publications
  y1 = drawSectionHeader(page1, "Publications", y1);

  const pubs = [
    {
      num: "1.",
      authors: "S. Hashemkhani, V. S. Vivekanand, S. Chopra, R. Kubendran. ",
      title: '“Toward autonomous event-based sensorimotor control with supervised gait learning and obstacle avoidance for robot navigation.” ',
      venue: "Frontiers in Neuroscience, 19:1492436, Feb 2025.",
    },
    {
      num: "2.",
      authors: "Y. Li, V. Shankaran Vivekanand, R. Kubendran, I. Lee. ",
      title: '“Dynamic Neural Fields Accelerator Design for a Millimeter-Scale Tracking System.” ',
      venue: "IEEE Transactions on VLSI Systems, 32(10):1940-1944, Oct 2024.",
    },
    {
      num: "3.",
      authors: "V. S. Vivekanand, S. Chopra, S. Hashemkhani, R. C. Kubendran. ",
      title: '“Robot Locomotion through Tunable Bursting Rhythms using Efficient Bio-mimetic Neural Networks on Loihi and Arduino Platforms.” ',
      venue: "ACM ICONS, Art. 5, pp. 1–7, Aug 2023.",
    },
    {
      num: "4.",
      authors: "S. Venkatachalam, V. S. Vivekanand, R. Kubendran. ",
      title: '“Frame of Events: A Low-latency Resource-efficient Approach for Stereo Depth Maps.” ',
      venue: "IEEE ICARA, pp. 324-328, Feb 2023.",
    },
    {
      num: "5.",
      authors: "V. S. Vivekanand, S. Hashemkhani, S. Venkatachalam, R. Kubendran. ",
      title: '“Robot Locomotion Control Using Central Pattern Generator with Non-linear Bio-mimetic Neurons.” ',
      venue: "IEEE ICARA, pp. 102-106, Feb 2023.",
    },
  ];

  for (const pub of pubs) {
    page1.drawText(pub.num, {
      x: margin + 35,
      y: y1,
      size: 8.5,
      font: fontBold,
      color: black,
    });
    const pubText = pub.authors + pub.title + pub.venue;
    const pubLines = wrapText(pubText, contentWidth - 55, fontRegular, 8.5);
    for (const line of pubLines) {
      page1.drawText(line, {
        x: margin + 50,
        y: y1,
        size: 8.5,
        font: fontRegular,
        color: grayText,
      });
      y1 -= 11.5;
    }
    y1 -= 2.5;
  }

  y1 -= 4;
  y1 = drawSectionHeader(page1, "Research Experience", y1);

  drawFooter(page1, 1);

  // ==================== PAGE 2 ====================
  const page2 = pdfDoc.addPage([pageWidth, pageHeight]);
  let y2 = pageHeight - margin - 15;

  // ENIGMA Lab Role
  page2.drawText("2022 – 2024", {
    x: margin + 5,
    y: y2,
    size: 9,
    font: fontBold,
    color: black,
  });
  const enigmaRole = wrapText(
    "Graduate Research Assistant, ENIGMA Lab, University of Pittsburgh, Advisor: Dr. Rajkumar Kubendran",
    contentWidth - 65,
    fontBold,
    9.5
  );
  for (const line of enigmaRole) {
    page2.drawText(line, {
      x: margin + 65,
      y: y2,
      size: 9.5,
      font: fontBold,
      color: black,
    });
    y2 -= 13;
  }

  const enigmaBullets = [
    {
      title: "Neuromorphic Sensorimotor Control: ",
      text: "Developed a multi-layer SNN with mixed feedback at multiple timescales to enable autonomous gait adaptation. Implemented a self-supervised Spike-Time Dependent Plasticity (STDP) algorithm, allowing a quadruped robot to autonomously transition gaits (walk, crawl) based on real-time environmental feedback.",
    },
    {
      title: "Hardware Accelerator Design: ",
      text: "Collaborated on the design of a hardware accelerator for Dynamic Neural Fields (DNF) used in object tracking. Optimized the architecture for a 28-nm CMOS process, achieving real-time processing of 256x256 DVS frames at 211 fps with ultra-low power consumption (1.68 mW).",
    },
    {
      title: "Bio-Mimetic Control Systems: ",
      text: "Pioneered a tunable bursting Central Pattern Generator (CPG) utilizing bio-mimetic neuron models. Validated performance across serial (Arduino) and asynchronous (Intel Loihi) hardware, demonstrating up to 10x higher jitter tolerance compared to standard Leaky Integrate-and-Fire (LIF) models.",
    },
    {
      title: "DVS Stereo Vision Pipeline: ",
      text: "Engineered a hybrid stereo vision pipeline for Dynamic Vision Sensors. Reduced latency to 3.8 ms per frame and optimized memory footprint to 112.4 Kb, proving viability for high-speed drone navigation.",
    },
  ];

  for (const b of enigmaBullets) {
    page2.drawText("•", {
      x: margin + 70,
      y: y2,
      size: 9,
      font: fontBold,
      color: black,
    });
    y2 = drawBoldPrefixParagraph(
      page2,
      b.title,
      b.text,
      margin + 82,
      y2,
      contentWidth - 85,
      8.5,
      fontBold,
      fontRegular,
      black,
      grayText
    );
    y2 -= 2.5;
  }

  y2 -= 8;

  // Technical Experience Header
  y2 = drawSectionHeader(page2, "Technical Experience", y2);

  // COI Energy Role
  page2.drawText("Feb 2024 –", {
    x: margin + 5,
    y: y2,
    size: 9,
    font: fontBold,
    color: black,
  });
  page2.drawText("Present", {
    x: margin + 5,
    y: y2 - 10,
    size: 8.5,
    font: fontRegular,
    color: grayText,
  });
  page2.drawText("AI Engineer, COI Energy, Pittsburgh, PA", {
    x: margin + 65,
    y: y2,
    size: 9.5,
    font: fontBold,
    color: black,
  });
  y2 -= 14;

  const coiBullets = [
    {
      title: "Scalable Data Infrastructure: ",
      text: "Independently architected an asynchronous, high-throughput data pipeline for the real-time ingestion of smart meter telemetry. Optimized the system for concurrency to handle massive data streams, reducing data availability latency and directly supporting the training of downstream forecasting models.",
    },
    {
      title: "Generative AI & RAG: ",
      text: "Architected a domain-specific Retrieval-Augmented Generation (RAG) system using Gemini 2.5 on GCP. Engineered the vector retrieval pipeline for curated technical documentation, significantly reducing query latency for customer support.",
    },
    {
      title: "Time-Series Forecasting: ",
      text: "Developed comparative models (Prophet vs. XGBoost) for energy load forecasting, achieving 92% accuracy in predicting consumption peaks for commercial clients.",
    },
    {
      title: "Industrial Automation: ",
      text: "Designed automated control logic for remote generator operations, increasing system response reliability by 80% during critical grid demand events.",
    },
  ];

  for (const b of coiBullets) {
    page2.drawText("•", {
      x: margin + 70,
      y: y2,
      size: 9,
      font: fontBold,
      color: black,
    });
    y2 = drawBoldPrefixParagraph(
      page2,
      b.title,
      b.text,
      margin + 82,
      y2,
      contentWidth - 85,
      8.5,
      fontBold,
      fontRegular,
      black,
      grayText
    );
    y2 -= 2.5;
  }
  y2 -= 4;

  // Viatris
  page2.drawText("June 2023 –", {
    x: margin + 5,
    y: y2,
    size: 8.5,
    font: fontBold,
    color: black,
  });
  page2.drawText("Aug 2023", {
    x: margin + 5,
    y: y2 - 10,
    size: 8,
    font: fontRegular,
    color: grayText,
  });
  page2.drawText("Manufacturing Analytics Intern, Viatris Pharmaceuticals, Canonsburg, PA", {
    x: margin + 65,
    y: y2,
    size: 9.5,
    font: fontBold,
    color: black,
  });
  y2 -= 14;

  const viatrisBullets = [
    "Developed a Python-based MRP Rationalization interface for effective global pricing and conversions for the user to optimize global supply chain costs.",
    "Designed and developed Power BI dashboards integrating live data from Laboratory Inventory Management System and SAP to help users make informed business decisions",
  ];
  for (const b of viatrisBullets) {
    page2.drawText("•", {
      x: margin + 70,
      y: y2,
      size: 9,
      font: fontBold,
      color: black,
    });
    const lines = wrapText(b, contentWidth - 85, fontRegular, 8.5);
    for (const line of lines) {
      page2.drawText(line, {
        x: margin + 82,
        y: y2,
        size: 8.5,
        font: fontRegular,
        color: grayText,
      });
      y2 -= 11.5;
    }
    y2 -= 2.5;
  }
  y2 -= 4;

  // Happiest Minds
  page2.drawText("Jan 2021 –", {
    x: margin + 5,
    y: y2,
    size: 8.5,
    font: fontBold,
    color: black,
  });
  page2.drawText("May 2021", {
    x: margin + 5,
    y: y2 - 10,
    size: 8,
    font: fontRegular,
    color: grayText,
  });
  page2.drawText("Robotic Process Automation Intern, Happiest Minds Technologies", {
    x: margin + 65,
    y: y2,
    size: 9.5,
    font: fontBold,
    color: black,
  });
  y2 -= 14;

  const hmBullets = [
    "Programmed Robotic Process Automation scripts for extracting costs incurred from clients’ bills of materials, which led to faster bill processing by 500%.",
    "Implemented an algorithm to annotate template files to automatically generate a summary document from a design document.",
  ];
  for (const b of hmBullets) {
    page2.drawText("•", {
      x: margin + 70,
      y: y2,
      size: 9,
      font: fontBold,
      color: black,
    });
    const lines = wrapText(b, contentWidth - 85, fontRegular, 8.5);
    for (const line of lines) {
      page2.drawText(line, {
        x: margin + 82,
        y: y2,
        size: 8.5,
        font: fontRegular,
        color: grayText,
      });
      y2 -= 11.5;
    }
    y2 -= 2.5;
  }
  y2 -= 4;

  // Mylan
  page2.drawText("May 2019 –", {
    x: margin + 5,
    y: y2,
    size: 8.5,
    font: fontBold,
    color: black,
  });
  page2.drawText("July 2019", {
    x: margin + 5,
    y: y2 - 10,
    size: 8,
    font: fontRegular,
    color: grayText,
  });
  page2.drawText("Custom Apps Intern, Mylan Pharmaceuticals", {
    x: margin + 65,
    y: y2,
    size: 9.5,
    font: fontBold,
    color: black,
  });
  y2 -= 14;

  const mylanBullets = [
    "Charted a Python-based automated OCR system for improved QC testing accuracy and speed in a GxP environment.",
    "Engineered a secure, user-friendly data validation interface for laboratory technicians, reducing manual review time and ensuring compliance with industry standards.",
  ];
  for (const b of mylanBullets) {
    page2.drawText("•", {
      x: margin + 70,
      y: y2,
      size: 9,
      font: fontBold,
      color: black,
    });
    const lines = wrapText(b, contentWidth - 85, fontRegular, 8.5);
    for (const line of lines) {
      page2.drawText(line, {
        x: margin + 82,
        y: y2,
        size: 8.5,
        font: fontRegular,
        color: grayText,
      });
      y2 -= 11.5;
    }
    y2 -= 2.5;
  }

  drawFooter(page2, 2);

  // ==================== PAGE 3 ====================
  const page3 = pdfDoc.addPage([pageWidth, pageHeight]);
  let y3 = pageHeight - margin - 15;

  // Section: Academic Projects
  y3 = drawSectionHeader(page3, "Academic Projects", y3);

  const projects = [
    {
      title: "Silicon Cochlea Simulation: ",
      text: "Implemented a software simulation of a silicon cochlea to process dense audio signals into sparse spike events, modeling biological auditory processing for neuromorphic inputs.",
    },
    {
      title: "Chaotic Neural Network Cryptography: ",
      text: "Designed a secure cryptographic system utilizing chaotic sequences to determine neural network weights/biases for high-entropy image encryption with a theoretical key space of ~10^157810.",
    },
    {
      title: "DCGAN Image Steganography: ",
      text: "Engineered a cover-based image steganography framework using Deep Convolutional GANs, Dense Encoders, and Reed-Solomon decoding achieving 0.103 bytes/pixel capacity with 0.9994 SSIM.",
    },
    {
      title: "LQR Inverted Pendulum: ",
      text: "Implemented a Linear Quadratic Regulator (LQR) controller to stabilize an inverted cart-pendulum system, simulating optimal control strategies for unstable non-linear systems.",
    },
  ];

  for (const p of projects) {
    y3 = drawBoldPrefixParagraph(
      page3,
      p.title,
      p.text,
      margin + 65,
      y3,
      contentWidth - 65,
      8.5,
      fontBold,
      fontRegular,
      black,
      grayText
    );
    y3 -= 4;
  }
  y3 -= 4;

  // Section: Skills
  y3 = drawSectionHeader(page3, "Skills", y3);

  const skillsList = [
    {
      cat: "Machine\nLearning",
      items: "Spiking Neural Networks (SNN), TensorFlow, PyTorch, XGBoost, Prophet, LLM Integration (RAG), Scikit-learn",
    },
    {
      cat: "Robotics &\nControl",
      items: "ROS (Robot Operating System), MATLAB/Simulink, Adaptive Control, Linear System Theory, Dynamic Vision Sensors (DVS)",
    },
    {
      cat: "Hardware",
      items: "Intel Loihi (Neuromorphic), Arduino/Microcontrollers, VLSI Design concepts",
    },
    {
      cat: "Programming\nLanguages",
      items: "Python, C++, MATLAB, Java, SQL, TypeScript",
    },
    {
      cat: "Cloud &\nTools",
      items: "GCP, AWS, Git, Docker, JIRA",
    },
  ];

  for (const s of skillsList) {
    const catLines = s.cat.split("\n");
    for (let i = 0; i < catLines.length; i++) {
      page3.drawText(catLines[i], {
        x: margin + 5,
        y: y3 - i * 10,
        size: 8.5,
        font: fontBold,
        color: black,
      });
    }

    const itemLines = wrapText(s.items, contentWidth - 65, fontRegular, 8.5);
    let itemY = y3;
    for (const line of itemLines) {
      page3.drawText(line, {
        x: margin + 65,
        y: itemY,
        size: 8.5,
        font: fontRegular,
        color: grayText,
      });
      itemY -= 11.5;
    }
    y3 = Math.min(y3 - (catLines.length - 1) * 10 - 14, itemY - 3);
  }
  y3 -= 4;

  // Section: Community & Leadership
  y3 = drawSectionHeader(page3, "Community & Leadership", y3);

  const community = [
    {
      role: "Mentorship",
      text: "Helped design a summer school curriculum aimed at democratizing access to STEM education for students from underrepresented backgrounds.",
    },
    {
      role: "Advocacy",
      text: "Recognizing the increasing loneliness epidemic, spearheaded a mental health awareness campaign during my time as a summer intern at Viatris, a global healthcare company.",
    },
    {
      role: "Teaching",
      text: "Teaching Assistant – ECE 0101: Introduction to Electronics, ECE 1212: Electronic Circuit Design Lab, ECE 2195: Neuromorphic Systems Design.",
    },
  ];

  for (const c of community) {
    page3.drawText(c.role, {
      x: margin + 5,
      y: y3,
      size: 8.5,
      font: fontBold,
      color: black,
    });
    const lines = wrapText(c.text, contentWidth - 65, fontRegular, 8.5);
    for (const line of lines) {
      page3.drawText(line, {
        x: margin + 65,
        y: y3,
        size: 8.5,
        font: fontRegular,
        color: grayText,
      });
      y3 -= 11.5;
    }
    y3 -= 3;
  }
  y3 -= 4;

  // Section: Honors & Awards
  y3 = drawSectionHeader(page3, "Honors & Awards", y3);

  const awards = [
    {
      year: "2025",
      title: "TechCrunch Disrupt Finalist Presenter, TechCrunch",
      desc: "Presented for COI Energy at the TechCrunch Disrupt Finals.",
    },
    {
      year: "2024",
      title: "Employee of the Year, COI Energy",
      desc: "Awarded for exceptional contributions to the company, chosen by a company-wide vote.",
    },
    {
      year: "2021",
      title: "MRD Scholarship for Academic Excellence, PES University",
      desc: "Merit-based scholarship awarded for maintaining top-tier academic standing during the undergraduate program.",
    },
    {
      year: "2019",
      title: "Semi-Finalist, e-Yantra Robotics Challenge, Govt. of India (MHRD)",
      desc: "Competed in a nationwide robotics competition focused on building autonomous solutions, placing in the top tier among thousands of engineering teams.",
    },
  ];

  for (const a of awards) {
    page3.drawText(a.year, {
      x: margin + 5,
      y: y3,
      size: 8.5,
      font: fontBold,
      color: black,
    });
    page3.drawText(a.title, {
      x: margin + 65,
      y: y3,
      size: 8.5,
      font: fontBold,
      color: black,
    });
    y3 -= 11.5;
    const descLines = wrapText(a.desc, contentWidth - 65, fontRegular, 8.5);
    for (const line of descLines) {
      page3.drawText(line, {
        x: margin + 65,
        y: y3,
        size: 8.5,
        font: fontRegular,
        color: grayText,
      });
      y3 -= 11.5;
    }
    y3 -= 3;
  }

  drawFooter(page3, 3);

  // Write to public/Vijay_Shankaran_Vivekanand_CV.pdf
  const projectRoot = path.join(__dirname, "..");
  const publicDir = path.join(projectRoot, "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(publicDir, "Vijay_Shankaran_Vivekanand_CV.pdf");
  fs.writeFileSync(outputPath, pdfBytes);
  console.log("Successfully generated clean PDF to:", outputPath);
}

generateCV().catch(console.error);
