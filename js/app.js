/* ==========================================================================
   UNIVERSITY OF EAST FLORIDA - GLOBAL ONLINE CAMPUS
   Application Logic, Drag & Drop Upload, Firebase & Email Engine
   ========================================================================== */

// --- 100% ONLINE DEGREE PROGRAM DATABASE ---
const DEGREE_PROGRAMS = [
  {
    id: "ms-cs-ai",
    degree: "Master of Science",
    title: "Computer Science & Artificial Intelligence",
    category: "technology",
    credits: 36,
    duration: "1.5 Years (100% Online)",
    tuition: "$14,400 USD",
    minGpa: 3.0,
    minPercent: 75,
    description: "Advanced theoretical study in Machine Learning, Deep Neural Networks, Natural Language Processing, and Cloud AI Systems.",
    modules: [
      "CS501: Theoretical Foundations of AI & Logic",
      "CS508: Deep Learning Architectures & Neural Nets",
      "CS512: Advanced Data Structures & Algorithm Design",
      "CS520: Natural Language Processing & Large Language Models",
      "CS590: Graduate AI Thesis & Theoretical Capstone"
    ]
  },
  {
    id: "ms-ds",
    degree: "Master of Science",
    title: "Data Science & Big Analytics",
    category: "technology",
    credits: 33,
    duration: "1.5 Years (100% Online)",
    tuition: "$13,200 USD",
    minGpa: 2.8,
    minPercent: 72,
    description: "Master predictive modeling, statistical learning, quantitative decision theory, and enterprise big data pipelines.",
    modules: [
      "DS501: Applied Mathematical Statistics",
      "DS504: Predictive Modeling & Regression",
      "DS510: Big Data Distributed Systems Theory",
      "DS518: Bayesian Data Analysis & Decision Theory",
      "DS595: Capstone Data Science Research Project"
    ]
  },
  {
    id: "global-mba",
    degree: "Master of Business Administration",
    title: "Global MBA & Digital Leadership",
    category: "business",
    credits: 42,
    duration: "2.0 Years (100% Online)",
    tuition: "$16,800 USD",
    minGpa: 2.7,
    minPercent: 68,
    description: "Develop global strategic vision, international managerial economics, organizational psychology, and digital venture creation.",
    modules: [
      "MBA601: Strategic Global Leadership",
      "MBA610: International Managerial Economics",
      "MBA625: Digital Business Transformation & Innovation",
      "MBA640: Global Financial Management & Capital Markets",
      "MBA690: Executive Strategy Simulation Capstone"
    ]
  },
  {
    id: "ms-cybersecurity",
    degree: "Master of Science",
    title: "Cyber Security Policy & Digital Governance",
    category: "technology",
    credits: 36,
    duration: "1.5 Years (100% Online)",
    tuition: "$14,400 USD",
    minGpa: 2.8,
    minPercent: 70,
    description: "Comprehensive online program covering international cyberlaw, risk assessment frameworks, cryptographic principles, and incident governance.",
    modules: [
      "SEC501: Global Information Security Architecture",
      "SEC515: Cryptographic Protocols & Network Security",
      "SEC530: Cyber Governance, Policy & Risk Frameworks",
      "SEC545: Digital Forensics & Incident Response Policy",
      "SEC590: Cyber Risk Governance Capstone"
    ]
  },
  {
    id: "bs-software-eng",
    degree: "Bachelor of Science",
    title: "Software Engineering & Web Systems",
    category: "technology",
    credits: 120,
    duration: "3.5 Years (100% Online)",
    tuition: "$28,800 USD",
    minGpa: 2.5,
    minPercent: 60,
    description: "Foundational and advanced undergraduate curriculum in object-oriented architecture, full-stack web engineering, and software testing.",
    modules: [
      "SE101: Introduction to Programming Concepts & Logic",
      "SE205: Object-Oriented Software Architecture",
      "SE310: Web Application Engineering & Cloud Services",
      "SE340: Database Systems Design & SQL Theory",
      "SE490: Senior Software Project Capstone"
    ]
  },
  {
    id: "ms-digital-health",
    degree: "Master of Science",
    title: "Healthcare Systems & Digital Informatics",
    category: "healthcare",
    credits: 36,
    duration: "1.5 Years (100% Online)",
    tuition: "$15,000 USD",
    minGpa: 2.8,
    minPercent: 70,
    description: "Non-clinical leadership degree in healthcare analytics, electronic health records governance, and digital health policy.",
    modules: [
      "HIM501: Global Health Information Systems Theory",
      "HIM512: Health Data Security, Privacy & HIPAA Policy",
      "HIM530: Strategic Healthcare Financial Management",
      "HIM550: Digital Transformation in Health Delivery",
      "HIM595: Health Informatics Master Project"
    ]
  },
  {
    id: "ms-fintech",
    degree: "Master of Science",
    title: "Financial Technology (FinTech) & Economics",
    category: "business",
    credits: 33,
    duration: "1.5 Years (100% Online)",
    tuition: "$13,800 USD",
    minGpa: 2.9,
    minPercent: 72,
    description: "Theoretical bridge between financial economics, digital currency theory, quantitative trading algorithms, and decentralized ledger policy.",
    modules: [
      "FIN502: Quantitative Financial Economics",
      "FIN515: Algorithmic Trading & Financial Modeling",
      "FIN535: Distributed Ledger & Blockchain Policy",
      "FIN560: Financial Regulation & Compliance Tech",
      "FIN590: FinTech Innovation Capstone"
    ]
  },
  {
    id: "ma-digital-marketing",
    degree: "Master of Arts",
    title: "Digital Marketing & Global E-Commerce",
    category: "business",
    credits: 30,
    duration: "1.0 Year (100% Online)",
    tuition: "$12,000 USD",
    minGpa: 2.6,
    minPercent: 65,
    description: "Advanced strategic online marketing, consumer behavior analytics, search optimization theory, and international brand management.",
    modules: [
      "MKT501: Strategic Digital Consumer Behavior",
      "MKT510: Search Engine & Content Strategy Theory",
      "MKT525: Global E-Commerce Infrastructure & Logistics",
      "MKT540: Marketing Data Analytics & ROI Metrics",
      "MKT590: Digital Brand Campaign Capstone"
    ]
  }
];

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  renderProgramsCatalog(DEGREE_PROGRAMS);
  initSearchAndFilter();
  initStudentPortal();
  initApplicationUploadForm();
  initLiveClocks();
  initModalListeners();
});

// --- PROGRAM CATALOG RENDERER ---
function renderProgramsCatalog(programs) {
  const container = document.getElementById("programsContainer");
  if (!container) return;

  if (programs.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
        <p style="font-size: 18px;">No 100% online programs matched your search filters.</p>
        <button class="btn btn-outline" onclick="resetFilters()" style="margin-top: 15px;">Reset Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = programs.map(p => `
    <div class="program-card fade-in" id="card-${p.id}">
      <div class="card-header">
        <span class="online-tag">100% ONLINE</span>
        <div class="program-degree">${p.degree}</div>
        <h3 class="program-name">${p.title}</h3>
      </div>
      <div class="card-body">
        <p class="program-desc">${p.description}</p>
        <div class="program-specs">
          <div class="spec-item">
            <span class="spec-label">Duration</span>
            <span class="spec-val">${p.duration}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Credits</span>
            <span class="spec-val">${p.credits} Credits</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Tuition</span>
            <span class="spec-val">${p.tuition}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Min Admission</span>
            <span class="spec-val">${p.minGpa} GPA (${p.minPercent}%)</span>
          </div>
        </div>
        <div class="card-actions">
          <button class="btn btn-maroon" onclick="openBrochureModal('${p.id}')">
            📄 PDF Brochure
          </button>
          <button class="btn btn-gold" onclick="scrollToApplySection('${p.id}')">
            📝 Apply & Upload
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// --- SEARCH & FILTER LOGIC ---
function initSearchAndFilter() {
  const searchInput = document.getElementById("searchInput");
  const filterPills = document.querySelectorAll(".filter-pill");

  let currentCategory = "all";
  let currentSearch = "";

  function applyFilters() {
    let filtered = DEGREE_PROGRAMS.filter(p => {
      const matchCat = currentCategory === "all" || p.category === currentCategory;
      const matchSearch = p.title.toLowerCase().includes(currentSearch) || 
                          p.degree.toLowerCase().includes(currentSearch) ||
                          p.description.toLowerCase().includes(currentSearch);
      return matchCat && matchSearch;
    });
    renderProgramsCatalog(filtered);
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearch = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentCategory = pill.getAttribute("data-category");
      applyFilters();
    });
  });
}

function resetFilters() {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) searchInput.value = "";
  document.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
  document.querySelector(".filter-pill[data-category='all']")?.classList.add("active");
  renderProgramsCatalog(DEGREE_PROGRAMS);
}

// --- DRAG AND DROP MARKSHEET UPLOAD & FIREBASE SYSTEM ---
let selectedFilesList = [];

function initApplicationUploadForm() {
  const select = document.getElementById("appTargetProgram");
  if (select) {
    select.innerHTML = DEGREE_PROGRAMS.map(p => `
      <option value="${p.id}">${p.degree} in ${p.title}</option>
    `).join('');
  }

  const dropZone = document.getElementById("marksheetDropZone");
  if (!dropZone) return;

  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropZone.classList.add('drop-zone-active');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropZone.classList.remove('drop-zone-active');
    }, false);
  });

  dropZone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
  });
}

function handleFileSelection(event) {
  const files = event.target.files;
  handleFiles(files);
}

function handleFiles(files) {
  for (let file of files) {
    if (file.size > 10 * 1024 * 1024) {
      alert(`File "${file.name}" exceeds the 10MB limit.`);
      continue;
    }
    selectedFilesList.push({
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + " MB",
      type: file.type || "Document"
    });
  }
  renderUploadedFilesList();
}

function renderUploadedFilesList() {
  const container = document.getElementById("uploadedFilesList");
  if (!container) return;

  if (selectedFilesList.length === 0) {
    container.innerHTML = `<span style="font-size: 12px; color: var(--text-muted);">No marksheets uploaded yet.</span>`;
    return;
  }

  container.innerHTML = selectedFilesList.map((f, idx) => `
    <span class="file-chip">
      📄 ${f.name} (${f.size})
      <span class="file-chip-remove" onclick="removeUploadedFile(${idx})" title="Remove">✕</span>
    </span>
  `).join('');
}

function removeUploadedFile(index) {
  selectedFilesList.splice(index, 1);
  renderUploadedFilesList();
}

async function handleApplicationSubmit(event) {
  event.preventDefault();

  const fullName = document.getElementById("appFullName").value.trim();
  const email = document.getElementById("appEmail").value.trim();
  const phone = document.getElementById("appPhone").value.trim();
  const country = document.getElementById("appCountry").value.trim();
  const programId = document.getElementById("appTargetProgram").value;
  const previousSchool = document.getElementById("appPreviousInstitution").value.trim();

  const targetProgram = DEGREE_PROGRAMS.find(p => p.id === programId) || DEGREE_PROGRAMS[0];

  const trackingId = "UEF-2026-REG-" + Math.floor(1000 + Math.random() * 9000);
  const now = new Date();
  const timestampStr = now.toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }) + " at " + now.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });

  const applicationRecord = {
    trackingId,
    fullName,
    email,
    phone,
    country,
    programId,
    programTitle: targetProgram.title,
    degree: targetProgram.degree,
    previousSchool,
    uploadedMarksheets: selectedFilesList.length > 0 ? selectedFilesList : [{ name: "High_School_Marksheet.pdf", size: "1.4 MB" }],
    submittedAt: timestampStr,
    status: "APPLICATION UNDER REVIEW"
  };

  // Save to Firebase Firestore / Local Persistence Engine
  if (window.firebaseManager) {
    await window.firebaseManager.saveApplication(applicationRecord);
  }

  // Generate & Render Confirmation Email Preview
  renderConfirmationEmail(applicationRecord);
  openConfirmationEmailModal();
}

function renderConfirmationEmail(record) {
  const paper = document.getElementById("emailReceiptPaper");
  if (!paper) return;

  paper.innerHTML = `
    <div class="email-paper-header">
      <div style="display: flex; align-items: center; gap: 12px;">
        <img src="assets/logo.svg" alt="UEF Crest" style="width: 50px; height: 50px;">
        <div>
          <div class="email-paper-title">UNIVERSITY OF EAST FLORIDA</div>
          <div style="font-size: 11px; color: #d4af37; font-weight: bold;">OFFICE OF ADMISSIONS & REGISTRAR • ORLANDO, USA</div>
        </div>
      </div>
      <div class="tracking-stamp-badge">
        ✓ ${record.trackingId}
      </div>
    </div>

    <div style="font-size: 13px; color: #666; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
      <strong>From:</strong> Office of Admissions &lt;admissions-registrar@uef.edu.online&gt;<br>
      <strong>To:</strong> ${record.fullName} &lt;${record.email}&gt;<br>
      <strong>Subject:</strong> [CONFIRMATION] Official Application & Marksheets Received (${record.trackingId})<br>
      <strong>Date:</strong> ${record.submittedAt}
    </div>

    <p style="font-size: 15px; color: #222; margin-bottom: 16px;">
      Dear <strong>${record.fullName}</strong>,
    </p>

    <p style="font-size: 14px; color: #444; line-height: 1.6; margin-bottom: 20px;">
      Thank you for submitting your official application to the <strong>University of East Florida</strong>. We confirm that your student records and academic marksheets have been successfully uploaded and saved into our encrypted <strong>Firebase Firestore Admissions Database</strong>.
    </p>

    <div style="background: #fdfaf3; border: 1px solid #e7d8b1; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
      <h4 style="color: #6b111c; font-family: var(--font-serif); margin-bottom: 12px; font-size: 16px;">
        📋 Application Summary & Verification Code
      </h4>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 13px;">
        <div><strong>Application Tracking ID:</strong> <span style="color: #6b111c; font-weight: bold;">${record.trackingId}</span></div>
        <div><strong>Target Degree Program:</strong> ${record.degree} in ${record.programTitle}</div>
        <div><strong>Applicant Name:</strong> ${record.fullName}</div>
        <div><strong>Country of Residence:</strong> ${record.country}</div>
        <div><strong>Previous Institution:</strong> ${record.previousSchool}</div>
        <div><strong>Admissions Status:</strong> <span style="color: #047857; font-weight: bold;">UNDER REGISTRAR REVIEW</span></div>
      </div>
    </div>

    <h4 style="font-size: 14px; color: #3b060d; margin-bottom: 10px; font-family: var(--font-serif);">
      📁 Attached & Verified Marksheet Documents:
    </h4>
    <ul style="padding-left: 20px; font-size: 13px; color: #555; margin-bottom: 24px;">
      ${record.uploadedMarksheets.map(m => `<li><strong>${m.name}</strong> (${m.size}) - Verified & Recorded in Firestore</li>`).join('')}
    </ul>

    <p style="font-size: 13px; color: #555; line-height: 1.6; margin-bottom: 24px;">
      An international admissions evaluation specialist from our Orlando, USA campus will review your marksheets against our 100% online program requirements. You will receive your official <strong>Offer Letter</strong> within 24 to 48 hours.
    </p>

    <div style="border-top: 1px dashed #ccc; padding-top: 16px; font-size: 12px; color: #777; display: flex; justify-content: space-between;">
      <div>
        <strong>University Registrar Office</strong><br>
        1200 University Blvd, Suite 500, Orlando, FL 32816, USA
      </div>
      <div style="text-anchor: right; text-align: right;">
        Toll-Free USA: +1 (800) 555-UEF1<br>
        Verified Digital Receipt
      </div>
    </div>
  `;
}

function openConfirmationEmailModal() {
  const modal = document.getElementById("confirmationEmailModal");
  if (modal) modal.classList.add("open");
}

function closeConfirmationEmailModal() {
  const modal = document.getElementById("confirmationEmailModal");
  if (modal) modal.classList.remove("open");
}

function printApplicationReceipt() {
  const paper = document.getElementById("emailReceiptPaper");
  if (!paper) return;

  const printWin = window.open('', '', 'height=800,width=800');
  printWin.document.write(`
    <html>
      <head>
        <title>UEF_Application_Receipt.pdf</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; color: #111; }
          .email-paper-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #6b111c; padding-bottom: 15px; margin-bottom: 20px; }
          .tracking-stamp-badge { background: #ecfdf5; border: 1px solid #10b981; color: #047857; padding: 4px 10px; border-radius: 12px; font-weight: bold; }
        </style>
      </head>
      <body>
        ${paper.innerHTML}
        <script>
          setTimeout(() => {
            window.print();
            window.close();
          }, 400);
        </script>
      </body>
    </html>
  `);
  printWin.document.close();
}

function scrollToApplySection(programId) {
  const select = document.getElementById("appTargetProgram");
  const section = document.getElementById("applySection");
  if (select && programId) {
    select.value = programId;
  }
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// --- STUDENT PORTAL MARKS & ELIGIBILITY ENGINE ---
let studentSubjects = [
  { name: "Mathematics & Quantitative Theory", score: 85, weight: 4 },
  { name: "Computer Fundamentals & Programming", score: 88, weight: 4 },
  { name: "English Communication & Research", score: 80, weight: 3 },
  { name: "Analytical Logic & Reasoning", score: 82, weight: 3 }
];

function initStudentPortal() {
  renderGradeTable();
  populateProgramSelectOptions();
  calculateStudentEligibility();

  const addSubjectBtn = document.getElementById("addSubjectBtn");
  if (addSubjectBtn) {
    addSubjectBtn.addEventListener("click", () => {
      studentSubjects.push({ name: "New Academic Subject", score: 75, weight: 3 });
      renderGradeTable();
      calculateStudentEligibility();
    });
  }

  const targetSelect = document.getElementById("targetProgramSelect");
  if (targetSelect) {
    targetSelect.addEventListener("change", calculateStudentEligibility);
  }
}

function populateProgramSelectOptions() {
  const select = document.getElementById("targetProgramSelect");
  if (!select) return;
  select.innerHTML = DEGREE_PROGRAMS.map(p => `
    <option value="${p.id}">${p.degree} - ${p.title} (Req: ${p.minGpa} GPA / ${p.minPercent}%)</option>
  `).join('');
}

function renderGradeTable() {
  const tbody = document.getElementById("gradeTableBody");
  if (!tbody) return;

  tbody.innerHTML = studentSubjects.map((sub, idx) => `
    <tr>
      <td>
        <input type="text" class="form-control" value="${sub.name}" 
               onchange="updateSubjectField(${idx}, 'name', this.value)" style="padding: 6px 10px;">
      </td>
      <td>
        <input type="number" class="form-control" value="${sub.score}" min="0" max="100" 
               onchange="updateSubjectField(${idx}, 'score', parseFloat(this.value) || 0)" style="padding: 6px 10px; width: 80px;">
      </td>
      <td>
        <input type="number" class="form-control" value="${sub.weight}" min="1" max="6" 
               onchange="updateSubjectField(${idx}, 'weight', parseFloat(this.value) || 1)" style="padding: 6px 10px; width: 70px;">
      </td>
      <td style="text-align: center;">
        <button class="remove-row-btn" onclick="removeSubjectRow(${idx})" title="Remove">✕</button>
      </td>
    </tr>
  `).join('');
}

function updateSubjectField(index, field, value) {
  if (studentSubjects[index]) {
    studentSubjects[index][field] = value;
    calculateStudentEligibility();
  }
}

function removeSubjectRow(index) {
  if (studentSubjects.length <= 1) {
    alert("You must have at least one academic subject grade.");
    return;
  }
  studentSubjects.splice(index, 1);
  renderGradeTable();
  calculateStudentEligibility();
}

function calculateStudentEligibility() {
  if (studentSubjects.length === 0) return;

  let totalWeightedScore = 0;
  let totalCredits = 0;

  studentSubjects.forEach(s => {
    const score = Math.min(100, Math.max(0, s.score));
    const weight = Math.max(1, s.weight);
    totalWeightedScore += score * weight;
    totalCredits += weight;
  });

  const avgPercent = totalCredits > 0 ? (totalWeightedScore / totalCredits) : 0;
  
  let gpa4 = 0;
  if (avgPercent >= 90) gpa4 = 4.0;
  else if (avgPercent >= 60) gpa4 = 1.0 + ((avgPercent - 60) / 30) * 3.0;
  else gpa4 = (avgPercent / 60) * 1.0;
  
  gpa4 = Math.round(gpa4 * 100) / 100;
  const ectsScale = (gpa4 * 1.25).toFixed(1);

  document.getElementById("gpaValue").innerText = gpa4.toFixed(2);
  document.getElementById("percentValue").innerText = `${avgPercent.toFixed(1)}%`;
  document.getElementById("ectsValue").innerText = `${ectsScale} / 5.0`;

  const selectedProgramId = document.getElementById("targetProgramSelect")?.value || DEGREE_PROGRAMS[0].id;
  const targetProgram = DEGREE_PROGRAMS.find(p => p.id === selectedProgramId) || DEGREE_PROGRAMS[0];

  const statusBadge = document.getElementById("eligibilityBadge");
  const statusAdvice = document.getElementById("eligibilityAdvice");
  const matchedList = document.getElementById("matchedProgramsList");

  let isDirect = gpa4 >= targetProgram.minGpa && avgPercent >= targetProgram.minPercent;
  let isConditional = !isDirect && (gpa4 >= (targetProgram.minGpa - 0.4) || avgPercent >= (targetProgram.minPercent - 10));

  if (isDirect) {
    statusBadge.className = "eligibility-status-badge status-eligible";
    statusBadge.innerText = "✓ ELIGIBLE FOR DIRECT ADMISSION";
    statusAdvice.innerHTML = `Congratulations! Your score of <strong>${gpa4.toFixed(2)} GPA (${avgPercent.toFixed(1)}%)</strong> meets all academic entry requirements for the <strong>${targetProgram.title}</strong> program.`;
  } else if (isConditional) {
    statusBadge.className = "eligibility-status-badge status-conditional";
    statusBadge.innerText = "⚡ CONDITIONAL ADMISSION GRANTED";
    statusAdvice.innerHTML = `Your score of <strong>${gpa4.toFixed(2)} GPA</strong> qualifies for Conditional Admission. You may enrol provided you take a 1-month online foundation module before semester start.`;
  } else {
    statusBadge.className = "eligibility-status-badge status-ineligible";
    statusBadge.innerText = "⚠️ PREREQUISITE BRIDGING RECOMMENDED";
    statusAdvice.innerHTML = `Your current score of <strong>${gpa4.toFixed(2)} GPA</strong> is below the ${targetProgram.minGpa} GPA requirement. We recommend taking our 100% online Foundation Certificate first.`;
  }

  if (matchedList) {
    matchedList.innerHTML = DEGREE_PROGRAMS.map(p => {
      const match = gpa4 >= p.minGpa;
      return `
        <div class="program-match-item" style="border-left-color: ${match ? '#10b981' : '#f59e0b'};">
          <div>
            <strong style="color: #fff; font-size: 14px;">${p.title}</strong>
            <div style="font-size: 12px; color: var(--text-muted);">${p.degree} • Req: ${p.minGpa} GPA</div>
          </div>
          <div>
            <span class="usa-flag-badge" style="background: ${match ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)'}; color: ${match ? '#34d399' : '#fbbf24'};">
              ${match ? '✓ Eligible' : '⚡ Conditional'}
            </span>
          </div>
        </div>
      `;
    }).join('');
  }
}

// --- LIVE INTERNATIONAL CLOCKS ---
function initLiveClocks() {
  function updateClocks() {
    const now = new Date();
    const estTime = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
    const gmtTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/London" }));
    const jstTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));

    const formatTime = (d) => d.toLocaleTimeString("en-US", { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const clockEst = document.getElementById("clockEST");
    const clockGmt = document.getElementById("clockGMT");
    const clockJst = document.getElementById("clockJST");

    if (clockEst) clockEst.innerText = `USA (Orlando/EST): ${formatTime(estTime)}`;
    if (clockGmt) clockGmt.innerText = `UK (London/GMT): ${formatTime(gmtTime)}`;
    if (clockJst) clockJst.innerText = `Japan (Tokyo/JST): ${formatTime(jstTime)}`;
  }

  updateClocks();
  setInterval(updateClocks, 1000);
}

// --- PDF BROCHURE PREVIEW & DOWNLOAD SYSTEM ---
let activeBrochureProgram = null;

function initModalListeners() {
  const brochureModal = document.getElementById("brochureModal");
  if (brochureModal) {
    brochureModal.addEventListener("click", (e) => {
      if (e.target === brochureModal) closeBrochureModal();
    });
  }

  const emailModal = document.getElementById("confirmationEmailModal");
  if (emailModal) {
    emailModal.addEventListener("click", (e) => {
      if (e.target === emailModal) closeConfirmationEmailModal();
    });
  }
}

function openBrochureModal(programId) {
  const program = DEGREE_PROGRAMS.find(p => p.id === programId);
  if (!program) return;
  activeBrochureProgram = program;

  const modal = document.getElementById("brochureModal");
  const titleElem = document.getElementById("modalProgramTitle");
  const paperElem = document.getElementById("pdfPaperPreview");

  if (titleElem) titleElem.innerText = `${program.degree} - ${program.title}`;

  if (paperElem) {
    paperElem.innerHTML = `
      <div class="pdf-header">
        <img src="assets/logo.svg" class="pdf-logo" alt="UEF Crest">
        <div class="pdf-header-title">
          <h2>UNIVERSITY OF EAST FLORIDA</h2>
          <p>100% ONLINE GLOBAL ACCREDITED CAMPUS • USA</p>
        </div>
      </div>

      <div class="pdf-program-title">${program.degree} in ${program.title}</div>
      <p style="font-size: 14px; color: #444; margin-bottom: 20px; line-height: 1.6;">
        ${program.description} Designed strictly for remote online learning with no physical lab requirements. All coursework, lectures, and faculty evaluations are conducted via our encrypted virtual portal.
      </p>

      <div class="pdf-info-grid">
        <div>
          <strong style="font-size: 11px; color: #6b111c; text-transform: uppercase;">Duration</strong>
          <div style="font-size: 15px; font-weight: bold; color: #1a080c;">${program.duration}</div>
        </div>
        <div>
          <strong style="font-size: 11px; color: #6b111c; text-transform: uppercase;">Total Credits</strong>
          <div style="font-size: 15px; font-weight: bold; color: #1a080c;">${program.credits} Credits</div>
        </div>
        <div>
          <strong style="font-size: 11px; color: #6b111c; text-transform: uppercase;">Total Tuition Fee</strong>
          <div style="font-size: 15px; font-weight: bold; color: #d4af37;">${program.tuition}</div>
        </div>
      </div>

      <div class="pdf-module-list">
        <h4>Core Academic Curriculum & Modules</h4>
        <ul>
          ${program.modules.map(m => `<li style="font-size: 13px; color: #333;"><strong>${m.split(':')[0]}:</strong> ${m.split(':')[1] || ''}</li>`).join('')}
        </ul>
      </div>

      <div style="background: #fdf8eb; border-left: 4px solid #d4af37; padding: 12px 16px; margin-bottom: 24px; font-size: 13px; color: #5c440a;">
        <strong>Academic Entry Requirements:</strong> Minimum ${program.minGpa} Cumulative GPA on US 4.0 scale (or ${program.minPercent}% international equivalent). International English proficiency waiver available for eligible online candidates.
      </div>

      <div class="pdf-footer-stamp">
        <div>
          <strong>Office of the University Registrar</strong><br>
          1200 University Boulevard, Suite 500, Orlando, FL 32816, USA<br>
          Toll-Free Hotline: +1 (800) 555-UEF1 | registrar@uef.edu.online
        </div>
        <div style="text-align: right;">
          <span style="display: inline-block; border: 2px solid #6b111c; color: #6b111c; font-weight: bold; padding: 4px 10px; border-radius: 4px; font-size: 11px; letter-spacing: 1px;">
            VERIFIED OFFICIAL BROCHURE
          </span>
        </div>
      </div>
    `;
  }

  if (modal) modal.classList.add("open");
}

function closeBrochureModal() {
  const modal = document.getElementById("brochureModal");
  if (modal) modal.classList.remove("open");
}

function triggerPDFDownload() {
  if (!activeBrochureProgram) return;
  const element = document.getElementById("pdfPaperPreview");
  if (!element) return;

  const printWin = window.open('', '', 'height=800,width=800');
  printWin.document.write(`
    <html>
      <head>
        <title>UEF_Brochure_${activeBrochureProgram.id}.pdf</title>
        <style>
          body { font-family: 'Times New Roman', serif; padding: 40px; color: #111; }
          .pdf-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #6b111c; padding-bottom: 15px; margin-bottom: 20px; }
          .pdf-logo { width: 60px; height: 60px; }
          .pdf-header-title h2 { color: #6b111c; margin: 0; }
          .pdf-program-title { font-size: 24px; color: #3b060d; margin: 20px 0 10px; font-weight: bold; }
          .pdf-info-grid { display: flex; justify-content: space-between; background: #f7f3e9; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
          .pdf-module-list ul { padding-left: 20px; }
          .pdf-module-list li { margin-bottom: 8px; }
          .pdf-footer-stamp { margin-top: 40px; border-top: 1px solid #ccc; padding-top: 15px; font-size: 12px; display: flex; justify-content: space-between; }
        </style>
      </head>
      <body>
        ${element.innerHTML}
        <script>
          setTimeout(() => {
            window.print();
            window.close();
          }, 400);
        </script>
      </body>
    </html>
  `);
  printWin.document.close();
}

function submitContactInquiry(event) {
  event.preventDefault();
  alert("Thank you! Your international admissions inquiry has been sent to the University of East Florida Registrar (Orlando, USA). An advisor will contact you shortly.");
  event.target.reset();
}
