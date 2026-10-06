const { PDFDocument, PDFName, PDFString, PDFArray, StandardFonts, rgb } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

async function generateSupplementalPDF() {
  const pdfDoc = await PDFDocument.create();
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const pageWidth = 595.28; // A4 standard
  const pageHeight = 841.89;
  const margin = 42;
  const contentWidth = pageWidth - margin * 2;

  // Color Palette
  const black = rgb(0.08, 0.08, 0.08);
  const darkNavy = rgb(0.09, 0.14, 0.22);
  const slateText = rgb(0.2, 0.24, 0.3);
  const bodyText = rgb(0.25, 0.25, 0.25);
  const lightGray = rgb(0.5, 0.53, 0.58);
  const dividerGray = rgb(0.85, 0.88, 0.92);
  const highlightBlue = rgb(0.1, 0.38, 0.72);
  const accentTeal = rgb(0.05, 0.45, 0.55);

  // Layout helper state
  const pages = [];
  let currentPage = null;
  let currentY = 0;

  function addPage() {
    currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
    pages.push(currentPage);
    currentY = pageHeight - margin - 10;
    return currentPage;
  }

  function ensureSpace(requiredHeight) {
    if (!currentPage || currentY - requiredHeight < margin + 25) {
      addPage();
    }
  }

  function wrapText(text, maxWidth, font, fontSize) {
    if (!text) return [];
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

  function addLinkAnnotation(page, url, x, y, width, height) {
    const linkAnnot = pdfDoc.context.register(
      pdfDoc.context.obj({
        Type: "Annot",
        Subtype: "Link",
        Rect: [x, y - 2, x + width, y + height + 2],
        Border: [0, 0, 0],
        C: [0.1, 0.38, 0.72],
        A: {
          Type: "Action",
          S: "URI",
          URI: PDFString.of(url),
        },
      })
    );

    const annots = page.node.lookup(PDFName.of("Annots"), PDFArray);
    if (annots) {
      annots.push(linkAnnot);
    } else {
      page.node.set(PDFName.of("Annots"), pdfDoc.context.obj([linkAnnot]));
    }
  }

  function drawSectionHeader(title, subtitle = null) {
    ensureSpace(subtitle ? 45 : 35);

    // Section bar
    currentPage.drawRectangle({
      x: margin,
      y: currentY - 2,
      width: 4,
      height: 16,
      color: darkNavy,
    });

    currentPage.drawText(title.toUpperCase(), {
      x: margin + 12,
      y: currentY + 1,
      size: 11.5,
      font: fontBold,
      color: darkNavy,
    });

    // Decorative line
    const textWidth = fontBold.widthOfTextAtSize(title.toUpperCase(), 11.5);
    currentPage.drawLine({
      start: { x: margin + 18 + textWidth, y: currentY + 6 },
      end: { x: pageWidth - margin, y: currentY + 6 },
      thickness: 0.75,
      color: dividerGray,
    });

    currentY -= 16;

    if (subtitle) {
      currentPage.drawText(subtitle, {
        x: margin + 12,
        y: currentY + 2,
        size: 8.5,
        font: fontOblique,
        color: lightGray,
      });
      currentY -= 14;
    } else {
      currentY -= 4;
    }
  }

  // ==================== DOCUMENT INITIALIZATION ====================
  addPage();

  // ==================== HEADER ====================
  // Name
  currentPage.drawText("Vijay Shankaran Vivekanand", {
    x: margin,
    y: currentY,
    size: 20,
    font: fontBold,
    color: darkNavy,
  });
  currentY -= 15;

  // Subtitle
  currentPage.drawText("RESEARCH & ACADEMIC SUPPLEMENT: PUBLICATIONS & HONORS", {
    x: margin,
    y: currentY,
    size: 9.5,
    font: fontBold,
    color: highlightBlue,
  });
  currentY -= 14;

  // Contact line with email, phone, location, and LinkedIn (no overlap)
  const emailStr = "v.vijayshankaran@gmail.com";
  const phoneStr = "+1-412-726-4553";
  const locStr = "Pittsburgh, PA";
  const linkedinStr = "linkedin.com/in/vijay-s-vivekanand";

  currentPage.drawText(`${emailStr}   |   ${phoneStr}   |   ${locStr}   |   `, {
    x: margin,
    y: currentY,
    size: 8.5,
    font: fontRegular,
    color: slateText,
  });
  const prefixW = fontRegular.widthOfTextAtSize(`${emailStr}   |   ${phoneStr}   |   ${locStr}   |   `, 8.5);

  currentPage.drawText(linkedinStr, {
    x: margin + prefixW,
    y: currentY,
    size: 8.5,
    font: fontRegular,
    color: highlightBlue,
  });

  const linkW = fontRegular.widthOfTextAtSize(linkedinStr, 8.5);
  addLinkAnnotation(
    currentPage,
    "https://www.linkedin.com/in/vijay-s-vivekanand",
    margin + prefixW,
    currentY,
    linkW,
    9
  );

  const emailW = fontRegular.widthOfTextAtSize(emailStr, 8.5);
  addLinkAnnotation(
    currentPage,
    "mailto:v.vijayshankaran@gmail.com",
    margin,
    currentY,
    emailW,
    9
  );

  currentY -= 10;

  // Header separator
  currentPage.drawLine({
    start: { x: margin, y: currentY },
    end: { x: pageWidth - margin, y: currentY },
    thickness: 1.25,
    color: darkNavy,
  });
  currentY -= 16;

  // ==================== SECTION 1: PUBLICATIONS ====================
  drawSectionHeader(
    "1. Published Research & Peer-Reviewed Papers",
    "Complete citations, digital links, full authorial abstracts, and experimental performance metrics."
  );

  const publications = [
    {
      id: "frontiers-2025",
      num: "Paper 1",
      title: "Toward autonomous event-based sensorimotor control with supervised gait learning and obstacle avoidance for robot navigation",
      authors: "Shahin Hashemkhani, Vijay Shankaran Vivekanand, Samarth Chopra, Rajkumar Kubendran",
      venue: "Frontiers in Neuroscience (Vol. 19, Art. 1492436)",
      date: "February 2025",
      doi: "10.3389/fnins.2025.1492436",
      url: "https://doi.org/10.3389/fnins.2025.1492436",
      metrics: "Supervised STDP · Dynamic State Machine · Petoi Quadruped Robot",
      tags: ["Event-Based Vision (DVS)", "Sensorimotor Control", "Supervised STDP", "Obstacle Avoidance", "Central Pattern Generator"],
      abstract:
        "Miniature robots are useful during disaster response and accessing remote or unsafe areas. They need to navigate uneven terrains without supervision and under severe resource constraints such as limited compute, storage and power budget. Event-based sensorimotor control in edge robotics has potential to enable fully autonomous and adaptive robot navigation systems capable of responding to environmental fluctuations by learning new types of motion and real-time decision making to avoid obstacles. This work presents a novel bio-inspired framework with a hierarchical control system to address these limitations, utilizing a tunable multi-layer neural network with a hardware-friendly Central Pattern Generator (CPG) as the core coordinator to govern the precise timing of periodic motion. Autonomous operation is managed by a Dynamic State Machine (DSM) at the top of the hierarchy, providing the necessary adaptability to handle environmental challenges such as obstacles or uneven terrain. The multi-layer neural network uses a nonlinear neuron model which employs mixed feedback at multiple timescales to produce rhythmic patterns of bursting events to control the motors. A comprehensive study of the architecture's building blocks is presented along with a detailed analysis of network equations. Finally, we demonstrate the proposed framework on the Petoi robot, which can autonomously learn walk and crawl gaits using supervised Spike-Time Dependent Plasticity (STDP) learning algorithm, transition between the learned gaits stored as new states, through the DSM for real-time obstacle avoidance. Measured results of the system performance are summarized and compared with other works to highlight our unique contributions.",
    },
    {
      id: "ieee-tvlsi-2024",
      num: "Paper 2",
      title: "Dynamic Neural Fields Accelerator Design for a Millimeter-Scale Tracking System",
      authors: "Y. Li, Vijay Shankaran Vivekanand, Rajkumar Kubendran, Inhee Lee",
      venue: "IEEE Transactions on Very Large Scale Integration (VLSI) Systems (Vol. 32, Issue 10, pp. 1940–1944)",
      date: "October 2024",
      doi: "10.1109/TVLSI.2024.3416725",
      url: "https://doi.org/10.1109/TVLSI.2024.3416725",
      metrics: "28-nm CMOS Layout · 211 FPS · 1.68 mW Ultra-Low Power · 0.53 mm² Area",
      tags: ["VLSI Design", "Dynamic Neural Fields (DNF)", "Dynamic Vision Sensors (DVS)", "CMOS Accelerator", "Target Tracking"],
      abstract:
        "This brief introduces a compact-size hardware accelerator for dynamic neural fields (DNF) used in object tracking. To address the substantial computational workload and memory occupancy associated with conventional DNFs, three key approaches are implemented: kernel size reduction and abstraction, the replacement of sigmoidal functions with comparison operations, and the approximation of rectangular-shaped objects. The design is realized in a 28-nm CMOS process, resulting in a layout with an area of 0.53 mm². Simulation results demonstrate that the accelerator processes 256×256 dynamic vision sensor (DVS) frames at 211 frames per second (fps), with a power consumption of 1.68 mW under such conditions.",
    },
    {
      id: "acm-icons-2023",
      num: "Paper 3",
      title: "Robot Locomotion through Tunable Bursting Rhythms using Efficient Bio-mimetic Neural Networks on Loihi and Arduino Platforms",
      authors: "Vijay Shankaran Vivekanand, Samarth Chopra, Shahin Hashemkhani, Rajkumar Chinnakonda Kubendran",
      venue: "ACM International Conference on Neuromorphic Systems (ICONS '23), Article 5, pp. 1–7",
      date: "August 2023",
      doi: "10.1145/3589737.3605965",
      url: "https://doi.org/10.1145/3589737.3605965",
      metrics: "~10 KB Memory Footprint (33% Arduino) · 14% Faster Execution · Intel Loihi & Arduino",
      tags: ["Intel Loihi", "Central Pattern Generator", "Bursting Rhythms", "Bio-mimetic Neurons", "Quadruped Locomotion"],
      abstract:
        "Rhythmic tasks that biological beings perform such as breathing, walking, and swimming, use specialized neural networks called central pattern generators (CPG). Spiking CPGs have already been implemented to control robot locomotion. This paper aims to take this concept further by designing and implementing a tunable bursting central pattern generator to control quadruped robots for the first time, to the best of our knowledge. Bursting CPGs allow for more granular control over the motion and speed of operation while retaining the low memory usage and latency capabilities of spiking CPGs. A bio-mimetic neuron model is chosen for this implementation which is highly optimized to run real-time on standard (Arduino microcontroller) and specialized (Intel Loihi) hardware. The Petoi bittle is chosen as the model hardware setup to showcase the efficiency of the proposed CPGs even in serial processing architectures. The CPG network is also realized in a completely asynchronous Loihi architecture to illustrate its versatility. The fully connected network running on CPG takes around 10 kilo bytes of memory (33% of Arduino capacity) to execute different modes of locomotion - walk, jump, trot, gallop, and crawl. Benchmarking results show that the bio-mimetic neurons take around 600 bytes (around 2%) more memory than Izhikevich neurons while being 0.02ms (around 14%) faster in isolated neuron testing.",
    },
    {
      id: "icara-2023-stereo",
      num: "Paper 4",
      title: "Frame of Events: A Low-latency Resource-efficient Approach for Stereo Depth Maps",
      authors: "S. Venkatachalam, Vijay Shankaran Vivekanand, Rajkumar Kubendran",
      venue: "IEEE International Conference on Automation, Robotics and Applications (ICARA '23), pp. 324–328",
      date: "February 2023",
      doi: "10.1109/ICARA56516.2023.10125817",
      url: "https://doi.org/10.1109/ICARA56516.2023.10125817",
      metrics: "3.8 ms Latency / Frame · 112.4 Kb Memory · 9.75% Memory Reduction",
      tags: ["Stereo Vision", "Dynamic Vision Sensors (DVS)", "Frame of Events", "Depth Estimation", "Drone Navigation"],
      abstract:
        "Computer vision traditionally uses cameras that capture visual information as frames at periodic intervals. On the other hand, Dynamic Vision Sensors (DVS) capture temporal contrast (TC) in each pixel asynchronously and stream them serially. This paper proposes a hybrid approach to generate input visual data as 'frame of events' for a stereo vision pipeline. We demonstrate that using hybrid vision sensors that produce frames made up of TC events can achieve superior results in terms of low latency, less compute and low memory footprint as compared to the traditional cameras and the event-based DVS. The frame-of-events approach eliminates the latency and memory resources involved in the accumulation of asynchronous events into synchronous frames, while generating acceptable disparity maps for depth estimation. Benchmarking results show that the frame-of-events pipeline outperforms others with the least average latency per frame of 3.8 ms and least average memory usage per frame of 112.4 Kb, which amounts to 7.32% and 9.75% reduction when compared to traditional frame-based pipeline. Hence, the proposed method is suitable for mission-critical robotics applications that involve path planning and localization mapping in a resource-constrained environment, such as drone navigation and autonomous vehicles.",
    },
    {
      id: "icara-2023-cpg",
      num: "Paper 5",
      title: "Robot Locomotion Control Using Central Pattern Generator with Non-linear Bio-mimetic Neurons",
      authors: "Vijay Shankaran Vivekanand, Shahin Hashemkhani, S. Venkatachalam, Rajkumar Kubendran",
      venue: "IEEE International Conference on Automation, Robotics and Applications (ICARA '23), pp. 102–106",
      date: "February 2023",
      doi: "10.1109/ICARA56516.2023.10125666",
      url: "https://doi.org/10.1109/ICARA56516.2023.10125666",
      metrics: "5–10x Jitter Tolerance Improvement · 3.54 ms Latency · Real-Time Microcontroller Execution",
      tags: ["Central Pattern Generator", "Non-linear Neurons", "Spike-Based Control", "Jitter Tolerance", "Quadruped Robotics"],
      abstract:
        "Central pattern generators (CPG) generate rhythmic gait patterns that can be tuned to exhibit various locomotion behaviors like walking, trotting, etc. CPGs inspired by biology have been implemented previously in robotics to generate periodic motion patterns. This paper aims to take the inspiration even further to present a novel methodology to control movement of a four-legged robot using a non-linear bio-mimetic neuron model. In contrast to using regular leaky integrate and fire (LIF) neurons to create coupled neural networks, our design uses non-linear neurons constituting a mixed-feedback (positive and negative) control system operating at multiple timescales (fast, slow and ultraslow ranging from sub-ms to seconds), to generate a variety of spike patterns that control the robotic limbs and hence its gait. The use of spikes as motor control signals allows for low memory usage and low latency operation of the robot. Unlike LIF neurons, the bio-mimetic neurons are also jitter tolerant making the CPG network more resilient and robust to perturbations in the input stimulus. As a proof of concept, we implemented our model on the Petoi Bittle bot, a quadruped pet dog robot and were able to reliably observe different modes of locomotion-walk, trot and jump. Four bio-mimetic neurons forming a CPG network to control the four limbs were implemented on Arduino microcontroller and compared to a similar CPG built using four LIF neurons. The differential equations for both neurons were solved real-time on Arduino and profiled for memory usage, latency and jitter tolerance. The CPG using bio-mimetic non-linear neurons used marginally higher memory (378 bytes, 18% higher than LIF neurons), incurred insignificant latency of 3.54ms compared to motor activation delay of 200ms, while providing upto 5-10x higher jitter tolerance.",
    },
  ];

  for (const pub of publications) {
    const titleLines = wrapText(pub.title, contentWidth - 20, fontBold, 10);
    const abstractLines = wrapText(pub.abstract, contentWidth - 20, fontRegular, 8.5);
    const estimatedHeight = 55 + titleLines.length * 13 + abstractLines.length * 11 + 30;

    ensureSpace(Math.min(estimatedHeight, 180));

    // Header badge
    currentPage.drawRectangle({
      x: margin,
      y: currentY - 14,
      width: 46,
      height: 14,
      color: darkNavy,
    });
    currentPage.drawText(pub.num, {
      x: margin + 6,
      y: currentY - 10,
      size: 7.5,
      font: fontBold,
      color: rgb(1, 1, 1),
    });

    // Date & Venue on same line
    currentPage.drawText(`${pub.venue}  |  ${pub.date}`, {
      x: margin + 54,
      y: currentY - 10,
      size: 8,
      font: fontBold,
      color: slateText,
    });

    currentY -= 22;

    // Title
    for (const line of titleLines) {
      currentPage.drawText(line, {
        x: margin,
        y: currentY,
        size: 10,
        font: fontBold,
        color: black,
      });
      currentY -= 13;
    }

    currentY -= 1;

    // Authors line
    currentPage.drawText("Authors: ", {
      x: margin,
      y: currentY,
      size: 8.5,
      font: fontBold,
      color: slateText,
    });
    const authorsPrefixWidth = fontBold.widthOfTextAtSize("Authors: ", 8.5);
    const authorLines = wrapText(pub.authors, contentWidth - authorsPrefixWidth, fontRegular, 8.5);
    let aY = currentY;
    for (let i = 0; i < authorLines.length; i++) {
      currentPage.drawText(authorLines[i], {
        x: i === 0 ? margin + authorsPrefixWidth : margin,
        y: aY,
        size: 8.5,
        font: fontRegular,
        color: bodyText,
      });
      aY -= 11;
    }
    currentY = aY;

    // DOI / Link line
    currentPage.drawText("DOI / Direct Link: ", {
      x: margin,
      y: currentY,
      size: 8.5,
      font: fontBold,
      color: slateText,
    });
    const doiPrefixWidth = fontBold.widthOfTextAtSize("DOI / Direct Link: ", 8.5);
    currentPage.drawText(pub.url, {
      x: margin + doiPrefixWidth,
      y: currentY,
      size: 8.5,
      font: fontRegular,
      color: highlightBlue,
    });
    const urlWidth = fontRegular.widthOfTextAtSize(pub.url, 8.5);
    addLinkAnnotation(currentPage, pub.url, margin + doiPrefixWidth, currentY, urlWidth, 9);
    currentY -= 13;

    // Key Highlights / Metrics
    if (pub.metrics) {
      currentPage.drawText("Key Results: ", {
        x: margin,
        y: currentY,
        size: 8.5,
        font: fontBold,
        color: accentTeal,
      });
      const metricsPrefixWidth = fontBold.widthOfTextAtSize("Key Results: ", 8.5);
      currentPage.drawText(pub.metrics, {
        x: margin + metricsPrefixWidth,
        y: currentY,
        size: 8.5,
        font: fontBold,
        color: darkNavy,
      });
      currentY -= 13;
    }

    // Abstract heading
    currentPage.drawText("Abstract:", {
      x: margin,
      y: currentY,
      size: 8.5,
      font: fontBold,
      color: slateText,
    });
    currentY -= 11;

    // Abstract text paragraphs
    for (const line of abstractLines) {
      if (currentY < margin + 30) {
        addPage();
        currentPage.drawText(`${pub.title} (Abstract Continued):`, {
          x: margin,
          y: currentY,
          size: 8.5,
          font: fontOblique,
          color: lightGray,
        });
        currentY -= 13;
      }

      currentPage.drawText(line, {
        x: margin,
        y: currentY,
        size: 8.5,
        font: fontRegular,
        color: bodyText,
      });
      currentY -= 11;
    }

    // Bottom item divider
    currentY -= 4;
    currentPage.drawLine({
      start: { x: margin, y: currentY },
      end: { x: pageWidth - margin, y: currentY },
      thickness: 0.5,
      color: dividerGray,
    });
    currentY -= 12;
  }

  // ==================== SECTION 2: HONORS & AWARDS ====================
  drawSectionHeader(
    "2. Honors, Awards & Competitive Distinctions",
    "Recognitions spanning venture showcases, company-wide engineering honors, and national robotics challenges."
  );

  const awards = [
    {
      year: "2025",
      title: "TechCrunch Disrupt Finalist Presenter",
      organization: "TechCrunch Disrupt Finals",
      category: "Venture & Technical Pitch Showcase",
      description:
        "Selected as the official finalist presenter representing COI Energy at the globally recognized TechCrunch Disrupt Finals. Pitched the company's autonomous energy load optimization infrastructure and real-time smart grid telemetry platform before an international audience of technology leaders, venture capitalists, and industry judges.",
    },
    {
      year: "2024",
      title: "Employee of the Year",
      organization: "COI Energy",
      category: "Corporate Engineering Excellence",
      description:
        "Conferred via company-wide unanimous vote in recognition of outstanding engineering achievements, autonomous data pipeline architecture, and the delivery of high-accuracy load forecasting models (achieving 92% peak prediction accuracy) and generative RAG systems for industrial grid clients.",
    },
    {
      year: "2021",
      title: "MRD Scholarship for Academic Excellence",
      organization: "PES University",
      category: "Merit-Based Academic Distinction",
      description:
        "Merit scholarship awarded for maintaining distinguished top-tier academic rank throughout the undergraduate curriculum in Electronics and Communications Engineering with specialization in Signal Processing.",
    },
    {
      year: "2019",
      title: "National Semi-Finalist, e-Yantra Robotics Challenge",
      organization: "Govt. of India (MHRD) & Indian Institute of Technology (IIT Bombay)",
      category: "Nationwide Robotics Competition",
      description:
        "Competed in the prestigious nationwide robotics initiative hosted by IIT Bombay and the Ministry of Human Resource Development (MHRD). Designed, programmed, and deployed autonomous robotic perception and locomotion systems, placing in the top tier among thousands of competing university engineering teams.",
    },
  ];

  for (const award of awards) {
    const descLines = wrapText(award.description, contentWidth - 75, fontRegular, 8.5);
    const requiredH = 32 + descLines.length * 11;

    ensureSpace(requiredH);

    // Year pill
    currentPage.drawRectangle({
      x: margin,
      y: currentY - 14,
      width: 50,
      height: 14,
      color: darkNavy,
    });
    currentPage.drawText(award.year, {
      x: margin + 12,
      y: currentY - 10,
      size: 8.5,
      font: fontBold,
      color: rgb(1, 1, 1),
    });

    // Title and Organization
    currentPage.drawText(award.title, {
      x: margin + 60,
      y: currentY - 1,
      size: 10,
      font: fontBold,
      color: black,
    });
    currentY -= 14;

    currentPage.drawText(`${award.organization}  •  ${award.category}`, {
      x: margin + 60,
      y: currentY,
      size: 8,
      font: fontBold,
      color: highlightBlue,
    });
    currentY -= 12;

    // Description
    for (const line of descLines) {
      currentPage.drawText(line, {
        x: margin + 60,
        y: currentY,
        size: 8.5,
        font: fontRegular,
        color: bodyText,
      });
      currentY -= 11;
    }

    currentY -= 6;
    currentPage.drawLine({
      start: { x: margin + 60, y: currentY },
      end: { x: pageWidth - margin, y: currentY },
      thickness: 0.5,
      color: dividerGray,
    });
    currentY -= 10;
  }

  // ==================== FOOTERS (PAGE X OF Y) ====================
  const totalPages = pages.length;
  for (let i = 0; i < totalPages; i++) {
    const page = pages[i];
    const pageNum = i + 1;

    // Footer divider line
    page.drawLine({
      start: { x: margin, y: 32 },
      end: { x: pageWidth - margin, y: 32 },
      thickness: 0.5,
      color: dividerGray,
    });

    // Left footer text
    page.drawText("Vijay Shankaran Vivekanand  •  Publications & Honors Supplement", {
      x: margin,
      y: 20,
      size: 7.5,
      font: fontOblique,
      color: lightGray,
    });

    // Right footer text (Page X of Y)
    const pageText = `Page ${pageNum} of ${totalPages}`;
    const pTextWidth = fontRegular.widthOfTextAtSize(pageText, 7.5);
    page.drawText(pageText, {
      x: pageWidth - margin - pTextWidth,
      y: 20,
      size: 7.5,
      font: fontRegular,
      color: lightGray,
    });
  }

  // ==================== WRITE PDF TO PUBLIC DIRECTORY ====================
  const projectRoot = path.join(__dirname, "..");
  const publicDir = path.join(projectRoot, "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(publicDir, "Vijay_Shankaran_Vivekanand_Supplemental.pdf");
  fs.writeFileSync(outputPath, pdfBytes);

  console.log(`Successfully generated focused supplemental PDF (${totalPages} pages) to: ${outputPath}`);
}

generateSupplementalPDF().catch(console.error);
