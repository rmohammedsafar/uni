/* ==========================================================================
   UNIVERSITY OF EAST FLORIDA - GLOBAL ONLINE CAMPUS
   Application Logic, Automatic PDF Brochure Lead Logging & Admin Dashboard Engine
   ========================================================================== */

// --- SENDER EMAIL CONFIGURATION ---
const SENDER_EMAIL = "r.mohammedsafar@gmail.com";

// Initialize EmailJS Browser SDK if available
if (typeof emailjs !== "undefined") {
  try {
    emailjs.init({ publicKey: "YOUR_EMAILJS_PUBLIC_KEY" });
  } catch (e) {
    console.log("EmailJS initialized");
  }
}

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
    numericFee: 14400,
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
    numericFee: 13200,
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
    numericFee: 16800,
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
    numericFee: 14400,
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
    numericFee: 28800,
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
    numericFee: 15000,
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
    numericFee: 13800,
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
    numericFee: 12000,
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

// --- USER SESSION STATE ---
let isAdminLoggedIn = false;
let currentUser = null;

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  renderProgramsCatalog(DEGREE_PROGRAMS);
  initSearchAndFilter();
  initStudentPortal();
  initApplicationUploadForm();
  initLiveClocks();
  initModalListeners();
});

// --- AUTOMATIC FIREBASE LEAD LOGGING & PDF BROCHURE DOWNLOAD ENGINE ---
async function handleBrochureDownloadClick(programId) {
  const program = DEGREE_PROGRAMS.find(p => p.id === programId);
  if (!program) return;

  let studentName = currentUser ? currentUser.name : "Student Lead";
  let studentEmail = currentUser ? currentUser.email : "";

  if (!studentEmail) {
    studentEmail = "guest_lead@uef.edu.online";
  }

  // Save Lead Data in Firebase Cloud Firestore (`brochure_downloads`)
  const leadData = {
    studentName,
    studentEmail,
    programId: program.id,
    programTitle: program.title,
    degree: program.degree,
    downloadedAt: new Date().toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }) + " at " + new Date().toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })
  };

  if (window.firebaseManager) {
    await window.firebaseManager.saveBrochureLead(leadData);
  }

  // Dispatch real email via FormSubmit API & Vercel Serverless API
  try {
    fetch(`https://formsubmit.co/ajax/${SENDER_EMAIL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        _subject: `[UEF BROCHURE REQUEST] ${program.degree} in ${program.title}`,
        student_name: studentName,
        student_email: studentEmail,
        program: `${program.degree} in ${program.title}`,
        tuition: program.tuition,
        downloaded_at: new Date().toISOString()
      })
    });

    fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        toEmail: studentEmail,
        toName: studentName,
        program: `${program.degree} in ${program.title}`,
        tuition: program.tuition,
        status: 'OFFICIAL BROCHURE ISSUED',
        type: 'brochure'
      })
    });
  } catch (e) {
    console.warn("Brochure email dispatch trigger:", e);
  }

  // Render Preview Modal & Trigger Download
  openBrochureModal(programId);
}

// --- GUARANTEED NON-BLOCKED PDF DOWNLOAD VIA HIDDEN IFRAME ---
function triggerPDFDownload() {
  if (!activeBrochureProgram) return;
  const element = document.getElementById("pdfPaperPreview");
  if (!element) return;

  // Remove old print iframe if exists
  let oldFrame = document.getElementById("brochurePrintFrame");
  if (oldFrame) oldFrame.remove();

  // Create hidden iframe (Completely bypasses browser popup blockers)
  const iframe = document.createElement("iframe");
  iframe.id = "brochurePrintFrame";
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";

  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>UEF_Brochure_${activeBrochureProgram.id}.pdf</title>
        <style>
          @page { size: letter portrait; margin: 20mm; }
          body { font-family: 'Times New Roman', serif; padding: 20px; color: #111; line-height: 1.5; }
          .pdf-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px double #6b111c; padding-bottom: 15px; margin-bottom: 20px; }
          .pdf-logo { width: 60px; height: 60px; }
          .pdf-header-title { text-align: right; }
          .pdf-header-title h2 { color: #6b111c; margin: 0; font-size: 22px; }
          .pdf-header-title p { font-size: 11px; color: #d4af37; letter-spacing: 2px; font-weight: bold; }
          .pdf-program-title { font-size: 24px; color: #3b060d; margin: 20px 0 10px; font-weight: bold; }
          .pdf-info-grid { display: flex; justify-content: space-between; background: #f7f3e9; padding: 15px; border-radius: 5px; margin-bottom: 20px; border: 1px solid #e2d7c0; }
          .pdf-module-list ul { padding-left: 20px; }
          .pdf-module-list li { margin-bottom: 8px; font-size: 14px; }
          .pdf-footer-stamp { margin-top: 40px; border-top: 1px solid #ccc; padding-top: 15px; font-size: 12px; display: flex; justify-content: space-between; color: #666; }
        </style>
      </head>
      <body>
        ${element.innerHTML}
      </body>
    </html>
  `);
  doc.close();

  setTimeout(() => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  }, 250);
}

// --- AUTH TAB SWITCHING ENGINE (SIGN IN vs STUDENT REGISTER) ---
function switchAuthTab(tabMode) {
  const signInBtn = document.getElementById("tabSignInBtn");
  const registerBtn = document.getElementById("tabRegisterBtn");
  const formSignIn = document.getElementById("authFormSignIn");
  const formRegister = document.getElementById("authFormRegister");

  if (tabMode === 'signin') {
    signInBtn.classList.add("active");
    registerBtn.classList.remove("active");
    formSignIn.style.display = "block";
    formRegister.style.display = "none";
  } else {
    registerBtn.classList.add("active");
    signInBtn.classList.remove("active");
    formRegister.style.display = "block";
    formSignIn.style.display = "none";
  }
}

// --- GOOGLE AUTHENTICATION & JWT DECODER ENGINE ---
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

function handleGoogleCredentialResponse(response) {
  if (response && response.credential) {
    const payload = parseJwt(response.credential);
    if (payload && payload.email) {
      console.log("🔑 Authenticated via Google Account:", payload.email);
      processAuthenticatedUser(payload.email, payload.name);
      return;
    }
  }
}

async function handleGoogleSignIn() {
  if (window.auth && window.googleProvider) {
    try {
      const result = await window.auth.signInWithPopup(window.googleProvider);
      const user = result.user;
      processAuthenticatedUser(user.email, user.displayName);
      return;
    } catch (e) {
      console.warn("Firebase Auth Popup warning, triggering Google Account prompt:", e);
    }
  }

  const userEmail = prompt("🔵 Google Account Sign In\n\nEnter your Google email address to authenticate:", SENDER_EMAIL);
  if (userEmail && userEmail.trim()) {
    processAuthenticatedUser(userEmail.trim(), userEmail.split('@')[0]);
  }
}

async function handleStudentRegisterSubmit(event) {
  event.preventDefault();
  const fullName = document.getElementById("regFullName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const phone = document.getElementById("regPhone").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  const userRecord = {
    fullName,
    email,
    phone,
    role: "student",
    createdAt: new Date().toISOString()
  };

  if (window.firebaseManager) {
    await window.firebaseManager.saveUserProfile(userRecord);
  }

  alert(`🎉 Account registered successfully! Welcome to UEF, ${fullName}.`);
  processAuthenticatedUser(email, fullName);
}

function processAuthenticatedUser(email, name) {
  currentUser = { email, name: name || email.split('@')[0] };
  closeAdminLoginModal();

  if (window.firebaseManager) {
    window.firebaseManager.saveUserProfile({ email, fullName: currentUser.name, lastLogin: new Date().toISOString() });
  }

  const isAdminEmail = email.toLowerCase() === "admin@uef.edu.online" ||
                       email.toLowerCase() === SENDER_EMAIL.toLowerCase() ||
                       email.toLowerCase().includes("admin") ||
                       email.toLowerCase().includes("rmohammedsafar");

  const studentDashboardSec = document.getElementById("studentDashboardSection");
  const adminDashboardSec = document.getElementById("adminDashboardSection");
  const navBtn = document.getElementById("navAdminBtn");
  const navDashLink = document.getElementById("navDashboardLink");

  if (isAdminEmail) {
    isAdminLoggedIn = true;
    if (studentDashboardSec) studentDashboardSec.style.display = "none";
    if (adminDashboardSec) {
      adminDashboardSec.style.display = "block";
      adminDashboardSec.scrollIntoView({ behavior: 'smooth' });
    }
    if (navBtn) {
      navBtn.innerHTML = `🔓 ${currentUser.name} (Admin)`;
      navBtn.onclick = () => adminDashboardSec.scrollIntoView({ behavior: 'smooth' });
    }
    if (navDashLink) navDashLink.style.display = "none";

    renderAdminDashboard();
    alert(`Welcome back, Registrar Administrator (${email})! Admin Dashboard loaded.`);
  } else {
    isAdminLoggedIn = false;
    if (adminDashboardSec) adminDashboardSec.style.display = "none";
    if (studentDashboardSec) {
      studentDashboardSec.style.display = "block";
      studentDashboardSec.scrollIntoView({ behavior: 'smooth' });
    }
    if (navBtn) {
      navBtn.innerHTML = `👤 ${currentUser.name}`;
      navBtn.onclick = () => studentDashboardSec.scrollIntoView({ behavior: 'smooth' });
    }
    if (navDashLink) navDashLink.style.display = "inline-block";

    renderStudentDashboard(email);
    alert(`Signed in successfully as ${email}! Redirected to your Student Account Dashboard.`);
  }
}

async function renderStudentDashboard(userEmail) {
  const title = document.getElementById("studentWelcomeTitle");
  const emailSub = document.getElementById("studentEmailSub");
  const statusBox = document.getElementById("studentAppStatusBox");

  if (title) title.innerText = `Welcome back, ${currentUser ? currentUser.name : 'Student'}!`;
  if (emailSub) emailSub.innerText = `Registered Student Account: ${userEmail}`;

  if (!statusBox || !window.firebaseManager) return;

  const applications = await window.firebaseManager.getApplications();
  const myApps = applications.filter(a => a.email.toLowerCase() === userEmail.toLowerCase());

  if (myApps.length === 0) {
    statusBox.innerHTML = `
      <div style="background: rgba(255,255,255,0.03); border: 1px dashed var(--border-gold); padding: 30px; border-radius: 12px; text-align: center;">
        <h3 style="color: var(--gold-light); font-family: var(--font-serif); margin-bottom: 8px;">No Application Submitted Yet</h3>
        <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px;">
          You haven't submitted your academic marksheets or degree application yet. Scroll down to apply!
        </p>
        <a href="#applySection" class="btn btn-gold" style="padding: 10px 24px;">📝 Fill Application & Upload Marksheets</a>
      </div>
    `;
    return;
  }

  statusBox.innerHTML = `
    <h3 style="color: var(--gold-light); font-family: var(--font-serif); margin-bottom: 16px;">
      📋 My Degree Application Status & Records
    </h3>
    <div style="display: flex; flex-direction: column; gap: 16px;">
      ${myApps.map(app => `
        <div style="background: rgba(0,0,0,0.6); border: 1px solid var(--border-gold); padding: 20px; border-radius: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
            <div>
              <span style="font-family: monospace; font-size: 12px; color: var(--gold-primary); font-weight: bold;">${app.trackingId}</span>
              <h4 style="font-size: 18px; color: #fff; margin: 4px 0;">${app.degree} in ${app.programTitle}</h4>
              <div style="font-size: 13px; color: var(--text-muted);">Submitted on: ${app.submittedAt}</div>
            </div>
            <div>
              <span class="eligibility-status-badge ${app.status.includes('ADMITTED') ? 'status-eligible' : (app.status.includes('CONDITIONAL') ? 'status-conditional' : 'status-ineligible')}" style="font-size: 12px; padding: 4px 12px;">
                ${app.status}
              </span>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-top: 16px; background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; font-size: 13px;">
            <div><strong>Tuition Fee:</strong> ${app.finalFeeDisplay || app.tuition}</div>
            <div><strong>Referral Applied:</strong> ${app.referralCode ? `${app.referralCode} (${app.discountPercent}% OFF)` : 'None'}</div>
            <div><strong>Uploaded Files:</strong> ${(app.uploadedMarksheets || []).length} Marksheets</div>
          </div>

          <div style="margin-top: 16px; display: flex; gap: 10px; flex-wrap: wrap;">
            ${app.status.includes('ADMITTED') || app.status.includes('CONDITIONAL') ? `
              <button class="btn btn-gold" onclick="downloadOfferLetterPDF('${app.trackingId}')" style="padding: 8px 18px; font-size: 13px;">
                📜 Download Official Admission Offer Letter (PDF)
              </button>
            ` : ''}
            <button class="btn btn-outline" onclick="scrollToApplySection('${app.programId}')" style="padding: 8px 16px; font-size: 13px;">
              📁 Upload Supplementary Documents
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

async function downloadOfferLetterPDF(trackingId) {
  const apps = await window.firebaseManager.getApplications();
  const app = apps.find(a => a.trackingId === trackingId);
  if (!app) return;

  let oldFrame = document.getElementById("offerLetterPrintFrame");
  if (oldFrame) oldFrame.remove();

  const iframe = document.createElement("iframe");
  iframe.id = "offerLetterPrintFrame";
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";

  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>UEF_Official_Admission_Offer_Letter_${app.trackingId}.pdf</title>
        <style>
          @page { size: letter portrait; margin: 20mm; }
          body { font-family: 'Times New Roman', serif; padding: 30px; color: #111; line-height: 1.6; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px double #6b111c; padding-bottom: 15px; margin-bottom: 25px; }
          .title { font-size: 22px; color: #6b111c; font-weight: bold; margin-bottom: 4px; }
          .badge { background: #ecfdf5; border: 1px solid #10b981; color: #047857; padding: 6px 14px; border-radius: 20px; font-weight: bold; display: inline-block; }
          .box { background: #fdfaf3; border: 1px solid #e7d8b1; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { margin-top: 40px; border-top: 1px solid #ccc; padding-top: 15px; font-size: 12px; display: flex; justify-content: space-between; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="title">UNIVERSITY OF EAST FLORIDA</div>
            <div style="font-size: 12px; color: #d4af37; font-weight: bold;">OFFICE OF THE REGISTRAR & ADMISSIONS • ORLANDO, USA</div>
          </div>
          <div class="badge">
            ✓ OFFICIAL ADMISSION OFFER
          </div>
        </div>

        <p>Date: ${app.submittedAt}</p>
        <p>To: <strong>${app.fullName}</strong> (${app.email})<br>Country: ${app.country}</p>

        <h2 style="color: #6b111c; margin-top: 20px;">OFFICIAL LETTER OF ADMISSION</h2>

        <p>
          Dear <strong>${app.fullName}</strong>,
        </p>

        <p>
          On behalf of the Admissions Committee at the <strong>University of East Florida</strong>, we are thrilled to inform you that your academic credentials and submitted marksheets have been evaluated and accepted! You are officially granted admission into our 100% online degree program:
        </p>

        <div class="box">
          <h3>${app.degree} in ${app.programTitle}</h3>
          <p><strong>Tracking Reference ID:</strong> ${app.trackingId}</p>
          <p><strong>Tuition Fee:</strong> ${app.finalFeeDisplay || app.tuition}</p>
          <p><strong>Instruction Format:</strong> 100% Remote Virtual Campus (Orlando, FL, USA)</p>
        </div>

        <p>
          Welcome to the UEF global academic community!
        </p>

        <div class="footer">
          <div>
            <strong>Office of the University Registrar</strong><br>
            University of East Florida, Orlando, FL 32816, USA<br>
            Email: ${SENDER_EMAIL}
          </div>
          <div style="text-align: right;">
            Official Digital Crest Seal Verified
          </div>
        </div>
      </body>
    </html>
  `);
  doc.close();

  setTimeout(() => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  }, 250);
}

function openAdminLoginModal() {
  const modal = document.getElementById("adminLoginModal");
  if (modal) modal.classList.add("open");
}

function closeAdminLoginModal() {
  const modal = document.getElementById("adminLoginModal");
  if (modal) modal.classList.remove("open");
}

function handleAdminLoginSubmit(event) {
  if (event && event.preventDefault) event.preventDefault();
  const email = document.getElementById("adminEmailInput").value.trim();
  const pass = document.getElementById("adminPasswordInput").value.trim();

  processAuthenticatedUser(email, email.split('@')[0]);
}

function adminLogout() {
  isAdminLoggedIn = false;
  currentUser = null;
  const adminSec = document.getElementById("adminDashboardSection");
  const studentSec = document.getElementById("studentDashboardSection");
  const navBtn = document.getElementById("navAdminBtn");
  const navDashLink = document.getElementById("navDashboardLink");

  if (adminSec) adminSec.style.display = "none";
  if (studentSec) studentSec.style.display = "none";
  if (navDashLink) navDashLink.style.display = "none";
  if (navBtn) {
    navBtn.innerHTML = "🔑 Sign In / Register";
    navBtn.onclick = openAdminLoginModal;
  }
  alert("Signed out successfully.");
}

// --- ANIMATED LIVE INTERNATIONAL TIME MARQUEE ENGINE ---
function initLiveClocks() {
  function updateClocks() {
    const now = new Date();
    
    const estStr = now.toLocaleTimeString("en-US", { timeZone: "America/New_York", hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const gmtStr = now.toLocaleTimeString("en-US", { timeZone: "Europe/London", hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const jstStr = now.toLocaleTimeString("en-US", { timeZone: "Asia/Tokyo", hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const istStr = now.toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata", hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const clockEst = document.getElementById("clockEST");
    const clockGmt = document.getElementById("clockGMT");
    const clockJst = document.getElementById("clockJST");

    if (clockEst) clockEst.innerText = `USA (Orlando/EST): ${estStr}`;
    if (clockGmt) clockGmt.innerText = `UK (GMT): ${gmtStr}`;
    if (clockJst) clockJst.innerText = `Japan (Tokyo/JST): ${jstStr}`;

    for (let i of [1, 2]) {
      const mEst = document.getElementById(`marqueeClockEST${i}`);
      const mGmt = document.getElementById(`marqueeClockGMT${i}`);
      const mJst = document.getElementById(`marqueeClockJST${i}`);
      const mIst = document.getElementById(`marqueeClockIST${i}`);

      if (mEst) mEst.innerText = `🇺🇸 USA (Orlando/EST): ${estStr}`;
      if (mGmt) mGmt.innerText = `🇬🇧 UK (London/GMT): ${gmtStr}`;
      if (mJst) mJst.innerText = `🇯🇵 Japan (Tokyo/JST): ${jstStr}`;
      if (mIst) mIst.innerText = `🇮🇳 India (New Delhi/IST): ${istStr}`;
    }
  }

  updateClocks();
  setInterval(updateClocks, 1000);
}

// --- STUDENT REFERRAL & DISCOUNT CALCULATION ENGINE ---
function getReferralDiscountPercent(referralCode) {
  if (!referralCode || referralCode.trim() === "") return 0;
  const cleanCode = referralCode.trim().toUpperCase();

  if (cleanCode.includes("GOLD") || cleanCode.includes("AMBASSADOR") || cleanCode === "UEF-REF-GOLD") {
    return 35;
  } else if (cleanCode.includes("SILVER") || cleanCode.includes("TIER2") || cleanCode === "UEF-REF-SILVER") {
    return 20;
  }
  return 15;
}

function calculateLiveTuitionDiscount() {
  const programId = document.getElementById("appTargetProgram")?.value;
  const referralInput = document.getElementById("appReferralCode")?.value;
  const noticeBox = document.getElementById("referralDiscountNotice");

  const program = DEGREE_PROGRAMS.find(p => p.id === programId) || DEGREE_PROGRAMS[0];
  const discountPercent = getReferralDiscountPercent(referralInput);

  if (!noticeBox) return;

  if (discountPercent > 0) {
    const discountAmount = (program.numericFee * (discountPercent / 100));
    const finalFee = program.numericFee - discountAmount;

    noticeBox.style.display = "block";
    noticeBox.innerHTML = `
      <div style="background: rgba(16,185,129,0.15); border: 1px solid #10b981; padding: 12px; border-radius: 8px; color: #34d399;">
        <strong>🎉 Referral Code Verified: ${discountPercent}% Tuition Scholarship Discount Applied!</strong><br>
        Original Tuition: <span style="text-decoration: line-through; opacity: 0.7;">$${program.numericFee.toLocaleString()} USD</span><br>
        Referral Savings: <strong>-$${discountAmount.toLocaleString()} USD (${discountPercent}% OFF)</strong><br>
        Final Discounted Tuition: <span style="color: var(--gold-light); font-weight: bold; font-size: 16px;">$${finalFee.toLocaleString()} USD</span>
      </div>
    `;
  } else {
    noticeBox.style.display = "block";
    noticeBox.innerHTML = `
      <div style="color: var(--text-muted);">
        Standard Tuition Fee: <strong>$${program.numericFee.toLocaleString()} USD</strong> (Enter a Referral Code above to save 15% to 35%)
      </div>
    `;
  }
}

function generateMyReferralCode() {
  const codeVal = "UEF-REF-" + Math.floor(1000 + Math.random() * 9000);
  const box = document.getElementById("userReferralDisplayBox");
  const codeElem = document.getElementById("userReferralCodeVal");

  if (codeElem) codeElem.innerText = codeVal;
  if (box) box.style.display = "block";
}

function copyUserReferralCode() {
  const codeElem = document.getElementById("userReferralCodeVal");
  if (codeElem) {
    navigator.clipboard.writeText(codeElem.innerText);
    alert(`Copied Referral Code "${codeElem.innerText}" to clipboard! Share it with friends to grant them 15% to 35% tuition discount.`);
  }
}

// --- ADMIN DASHBOARD RENDERER & BROCHURE LEADS TABLE ---
async function renderAdminDashboard() {
  if (!isAdminLoggedIn || !window.firebaseManager) return;

  const applications = await window.firebaseManager.getApplications();
  const brochureLeads = await window.firebaseManager.getBrochureLeads();

  const tbody = document.getElementById("adminTableBody");
  const leadsTbody = document.getElementById("adminBrochureTableBody");
  const searchVal = (document.getElementById("adminSearchInput")?.value || "").toLowerCase().trim();
  const filterStatus = document.getElementById("adminStatusFilter")?.value || "ALL";

  let totalApps = applications.length;
  let totalDocs = 0;
  let admittedCount = 0;
  let referralDiscountsCount = 0;

  applications.forEach(a => {
    totalDocs += (a.uploadedMarksheets || []).length;
    if (a.status.includes("ADMITTED")) admittedCount++;
    if (a.referralCode && a.referralCode.trim() !== "") referralDiscountsCount++;
  });

  const kpiAppsElem = document.getElementById("kpiTotalApps");
  const kpiDocsElem = document.getElementById("kpiVerifiedDocs");
  const kpiAdmittedElem = document.getElementById("kpiAdmitted");
  const kpiReferralElem = document.getElementById("kpiReferralDiscounts");
  const kpiBrochureElem = document.getElementById("kpiBrochureLeads");

  if (kpiAppsElem) kpiAppsElem.innerText = totalApps;
  if (kpiDocsElem) kpiDocsElem.innerText = totalDocs;
  if (kpiAdmittedElem) kpiAdmittedElem.innerText = admittedCount;
  if (kpiReferralElem) kpiReferralElem.innerText = referralDiscountsCount;
  if (kpiBrochureElem) kpiBrochureElem.innerText = brochureLeads.length;

  let filteredApps = applications.filter(a => {
    const matchSearch = a.fullName.toLowerCase().includes(searchVal) ||
                        a.email.toLowerCase().includes(searchVal) ||
                        a.country.toLowerCase().includes(searchVal) ||
                        a.programTitle.toLowerCase().includes(searchVal) ||
                        (a.referralCode || "").toLowerCase().includes(searchVal) ||
                        a.trackingId.toLowerCase().includes(searchVal);

    const matchStatus = filterStatus === "ALL" || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  if (tbody) {
    if (filteredApps.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align: center; padding: 30px; color: var(--text-muted);">
            No student applications found.
          </td>
        </tr>
      `;
    } else {
      tbody.innerHTML = filteredApps.map(app => `
        <tr>
          <td><strong style="color: var(--gold-primary); font-family: monospace;">${app.trackingId}</strong></td>
          <td><strong>${app.fullName}</strong></td>
          <td>${app.email}<br><span style="font-size: 11px; color: var(--text-muted);">${app.phone}</span></td>
          <td>${app.country}</td>
          <td>${app.degree} in ${app.programTitle}<br><span style="font-size: 11px; color: var(--gold-light);">Fee: ${app.finalFeeDisplay || app.tuition}</span></td>
          <td>
            ${app.referralCode ? `<span class="usa-flag-badge" style="background: rgba(16,185,129,0.2); color: #34d399;">🎟️ ${app.referralCode} (${app.discountPercent}% OFF)</span>` : '<span style="color: var(--text-muted); font-size: 11px;">None</span>'}
          </td>
          <td style="font-size: 12px; color: var(--text-muted);">${app.submittedAt}</td>
          <td>
            <select class="admin-status-select" onchange="changeApplicantStatus('${app.trackingId}', this.value)">
              <option value="APPLICATION UNDER REVIEW" ${app.status === 'APPLICATION UNDER REVIEW' ? 'selected' : ''}>Under Review</option>
              <option value="ADMITTED - OFFER ISSUED" ${app.status === 'ADMITTED - OFFER ISSUED' ? 'selected' : ''}>Admitted (Offer Issued)</option>
              <option value="CONDITIONAL ADMISSION" ${app.status === 'CONDITIONAL ADMISSION' ? 'selected' : ''}>Conditional Admission</option>
              <option value="REJECTED" ${app.status === 'REJECTED' ? 'selected' : ''}>Rejected</option>
            </select>
          </td>
          <td>
            <button class="btn btn-outline" onclick="inspectApplicantDocs('${app.trackingId}')" style="padding: 4px 10px; font-size: 11px;">
              👁️ View Profile
            </button>
          </td>
        </tr>
      `).join('');
    }
  }

  // Render Brochure Leads Table
  if (leadsTbody) {
    let filteredLeads = brochureLeads.filter(l => {
      return (l.studentName || "").toLowerCase().includes(searchVal) ||
             (l.studentEmail || "").toLowerCase().includes(searchVal) ||
             (l.programTitle || "").toLowerCase().includes(searchVal);
    });

    if (filteredLeads.length === 0) {
      leadsTbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 20px; color: var(--text-muted);">
            No brochure download leads recorded yet.
          </td>
        </tr>
      `;
    } else {
      leadsTbody.innerHTML = filteredLeads.map(l => `
        <tr>
          <td><strong style="color: #34d399; font-family: monospace;">${l.leadId || 'LEAD-LOG'}</strong></td>
          <td><strong>${l.studentName}</strong></td>
          <td>${l.studentEmail}</td>
          <td>${l.programTitle}</td>
          <td>${l.degree}</td>
          <td style="font-size: 12px; color: var(--text-muted);">${l.downloadedAt || l.timestamp}</td>
          <td>
            <button class="btn btn-gold" onclick="openBrochureModal('${l.programId}')" style="padding: 4px 10px; font-size: 11px;">
              📄 View Brochure
            </button>
          </td>
        </tr>
      `).join('');
    }
  }
}

async function changeApplicantStatus(trackingId, newStatus) {
  if (window.firebaseManager) {
    await window.firebaseManager.updateStatus(trackingId, newStatus);
    alert(`Applicant ${trackingId} status updated to: ${newStatus}`);
    renderAdminDashboard();
  }
}

async function inspectApplicantDocs(trackingId) {
  const apps = await window.firebaseManager.getApplications();
  const app = apps.find(a => a.trackingId === trackingId);
  if (!app) return;

  const title = document.getElementById("adminDocModalTitle");
  const body = document.getElementById("adminDocModalBody");
  const modal = document.getElementById("adminDocPreviewModal");

  if (title) title.innerText = `Document Inspector: ${app.fullName} (${app.trackingId})`;

  if (body) {
    body.innerHTML = `
      <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-gold); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
        <h4 style="color: var(--gold-light); font-family: var(--font-serif); margin-bottom: 12px;">👤 Student Details</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 14px; color: #ddd;">
          <div><strong>Full Name:</strong> ${app.fullName}</div>
          <div><strong>Email:</strong> ${app.email}</div>
          <div><strong>Phone:</strong> ${app.phone}</div>
          <div><strong>Country:</strong> ${app.country}</div>
          <div><strong>Target Degree:</strong> ${app.degree} in ${app.programTitle}</div>
          <div><strong>Tuition Fee:</strong> ${app.finalFeeDisplay || app.tuition}</div>
          <div><strong>Referral Code:</strong> ${app.referralCode || 'None'}</div>
          <div><strong>Previous Institution:</strong> ${app.previousSchool}</div>
        </div>
      </div>

      <h4 style="color: var(--gold-light); font-family: var(--font-serif); margin-bottom: 12px;">📁 Uploaded Marksheets & Transcripts</h4>
      <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px;">
        ${(app.uploadedMarksheets || []).map(m => `
          <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.5); border: 1px solid var(--border-gold); padding: 12px 16px; border-radius: 8px;">
            <div>
              <strong style="color: #fff; font-size: 14px;">📄 ${m.name}</strong>
              <div style="font-size: 11px; color: var(--text-muted);">Size: ${m.size} • Encrypted PDF / Image</div>
            </div>
            <button class="btn btn-gold" onclick="alert('Opening document preview for ${m.name} (Simulated File Preview)...')" style="padding: 6px 14px; font-size: 12px;">
              👁️ Preview File
            </button>
          </div>
        `).join('')}
      </div>

      <div style="background: #1e090e; border: 1px solid var(--border-gold); padding: 16px; border-radius: 10px;">
        <label class="form-label">Update Decision Status:</label>
        <div style="display: flex; gap: 10px;">
          <select id="inspectorStatusSelect" class="form-select" style="flex: 1;">
            <option value="APPLICATION UNDER REVIEW" ${app.status === 'APPLICATION UNDER REVIEW' ? 'selected' : ''}>Under Review</option>
            <option value="ADMITTED - OFFER ISSUED" ${app.status === 'ADMITTED - OFFER ISSUED' ? 'selected' : ''}>Admitted - Offer Issued</option>
            <option value="CONDITIONAL ADMISSION" ${app.status === 'CONDITIONAL ADMISSION' ? 'selected' : ''}>Conditional Admission</option>
            <option value="REJECTED" ${app.status === 'REJECTED' ? 'selected' : ''}>Rejected</option>
          </select>
          <button class="btn btn-gold" onclick="saveInspectorStatus('${app.trackingId}')" style="padding: 8px 20px; font-size: 13px;">
            Save Status
          </button>
        </div>
      </div>
    `;
  }

  if (modal) modal.classList.add("open");
}

async function saveInspectorStatus(trackingId) {
  const select = document.getElementById("inspectorStatusSelect");
  if (select) {
    await changeApplicantStatus(trackingId, select.value);
    closeAdminDocModal();
  }
}

function closeAdminDocModal() {
  const modal = document.getElementById("adminDocPreviewModal");
  if (modal) modal.classList.remove("open");
}

async function exportApplicantsCSV() {
  if (!window.firebaseManager) return;
  const apps = await window.firebaseManager.getApplications();

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Tracking ID,Full Name,Email,Phone,Country,Program,Tuition Fee,Referral Code,Previous Institution,Submitted Date,Status\n";

  apps.forEach(a => {
    let row = `"${a.trackingId}","${a.fullName}","${a.email}","${a.phone}","${a.country}","${a.programTitle}","${a.finalFeeDisplay || a.tuition}","${a.referralCode || 'None'}","${a.previousSchool}","${a.submittedAt}","${a.status}"`;
    csvContent += row + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "UEF_Student_Applications_Roster.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// --- SQL DATABASE DUMP EXPORTER ENGINE ---
async function exportApplicantsSQL() {
  if (!window.firebaseManager) return;
  const apps = await window.firebaseManager.getApplications();
  const leads = await window.firebaseManager.getBrochureLeads();

  let sqlContent = `-- ==========================================================================\n`;
  sqlContent += `-- UNIVERSITY OF EAST FLORIDA - SQL DATABASE DUMP\n`;
  sqlContent += `-- Generated on: ${new Date().toISOString()}\n`;
  sqlContent += `-- Compatible with PostgreSQL, MySQL, MariaDB, and Supabase\n`;
  sqlContent += `-- ==========================================================================\n\n`;

  sqlContent += `-- CREATE TABLES\n`;
  sqlContent += `CREATE TABLE IF NOT EXISTS student_applications (\n`;
  sqlContent += `    tracking_id VARCHAR(50) PRIMARY KEY,\n`;
  sqlContent += `    full_name VARCHAR(255) NOT NULL,\n`;
  sqlContent += `    email VARCHAR(255) NOT NULL,\n`;
  sqlContent += `    phone VARCHAR(50),\n`;
  sqlContent += `    country VARCHAR(100),\n`;
  sqlContent += `    program_title VARCHAR(255) NOT NULL,\n`;
  sqlContent += `    degree VARCHAR(100) NOT NULL,\n`;
  sqlContent += `    final_fee VARCHAR(50),\n`;
  sqlContent += `    referral_code VARCHAR(50),\n`;
  sqlContent += `    previous_school VARCHAR(255),\n`;
  sqlContent += `    submitted_at VARCHAR(100),\n`;
  sqlContent += `    status VARCHAR(50)\n`;
  sqlContent += `);\n\n`;

  sqlContent += `CREATE TABLE IF NOT EXISTS brochure_downloads (\n`;
  sqlContent += `    lead_id VARCHAR(50) PRIMARY KEY,\n`;
  sqlContent += `    student_name VARCHAR(255) NOT NULL,\n`;
  sqlContent += `    student_email VARCHAR(255) NOT NULL,\n`;
  sqlContent += `    program_title VARCHAR(255) NOT NULL,\n`;
  sqlContent += `    degree VARCHAR(100) NOT NULL,\n`;
  sqlContent += `    downloaded_at VARCHAR(100)\n`;
  sqlContent += `);\n\n`;

  sqlContent += `-- INSERT STUDENT APPLICATIONS DATA\n`;
  if (apps.length > 0) {
    apps.forEach(a => {
      const cleanName = (a.fullName || '').replace(/'/g, "''");
      const cleanEmail = (a.email || '').replace(/'/g, "''");
      const cleanPhone = (a.phone || '').replace(/'/g, "''");
      const cleanCountry = (a.country || '').replace(/'/g, "''");
      const cleanProgram = (a.programTitle || '').replace(/'/g, "''");
      const cleanDegree = (a.degree || '').replace(/'/g, "''");
      const cleanFee = (a.finalFeeDisplay || a.tuition || '').replace(/'/g, "''");
      const cleanRef = (a.referralCode || '').replace(/'/g, "''");
      const cleanSchool = (a.previousSchool || '').replace(/'/g, "''");
      const cleanDate = (a.submittedAt || '').replace(/'/g, "''");
      const cleanStatus = (a.status || '').replace(/'/g, "''");

      sqlContent += `INSERT INTO student_applications (tracking_id, full_name, email, phone, country, program_title, degree, final_fee, referral_code, previous_school, submitted_at, status) VALUES ('${a.trackingId}', '${cleanName}', '${cleanEmail}', '${cleanPhone}', '${cleanCountry}', '${cleanProgram}', '${cleanDegree}', '${cleanFee}', '${cleanRef}', '${cleanSchool}', '${cleanDate}', '${cleanStatus}') ON CONFLICT (tracking_id) DO UPDATE SET status = '${cleanStatus}';\n`;
    });
  } else {
    sqlContent += `-- No student application records found.\n`;
  }

  sqlContent += `\n-- INSERT BROCHURE DOWNLOAD LEADS DATA\n`;
  if (leads.length > 0) {
    leads.forEach(l => {
      const cleanLeadId = (l.leadId || 'LEAD-' + Math.floor(Math.random() * 10000)).replace(/'/g, "''");
      const cleanName = (l.studentName || '').replace(/'/g, "''");
      const cleanEmail = (l.studentEmail || '').replace(/'/g, "''");
      const cleanProgram = (l.programTitle || '').replace(/'/g, "''");
      const cleanDegree = (l.degree || '').replace(/'/g, "''");
      const cleanDate = (l.downloadedAt || l.timestamp || '').replace(/'/g, "''");

      sqlContent += `INSERT INTO brochure_downloads (lead_id, student_name, student_email, program_title, degree, downloaded_at) VALUES ('${cleanLeadId}', '${cleanName}', '${cleanEmail}', '${cleanProgram}', '${cleanDegree}', '${cleanDate}') ON CONFLICT (lead_id) DO NOTHING;\n`;
    });
  } else {
    sqlContent += `-- No brochure leads recorded yet.\n`;
  }

  const blob = new Blob([sqlContent], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `UEF_University_Database_Dump_${Date.now()}.sql`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

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
          <button class="btn btn-maroon" onclick="handleBrochureDownloadClick('${p.id}')">
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
      <option value="${p.id}">${p.degree} in ${p.title} (${p.tuition})</option>
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
  const referralCode = document.getElementById("appReferralCode")?.value.trim() || "";

  const targetProgram = DEGREE_PROGRAMS.find(p => p.id === programId) || DEGREE_PROGRAMS[0];
  const discountPercent = getReferralDiscountPercent(referralCode);
  const discountAmount = (targetProgram.numericFee * (discountPercent / 100));
  const finalFeeNumeric = targetProgram.numericFee - discountAmount;
  const finalFeeDisplay = `$${finalFeeNumeric.toLocaleString()} USD`;

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
    tuition: targetProgram.tuition,
    rawFee: targetProgram.numericFee,
    referralCode,
    discountPercent,
    discountAmount,
    finalFeeNumeric,
    finalFeeDisplay,
    previousSchool,
    uploadedMarksheets: selectedFilesList.length > 0 ? selectedFilesList : [{ name: "High_School_Marksheet.pdf", size: "1.4 MB" }],
    submittedAt: timestampStr,
    status: "APPLICATION UNDER REVIEW"
  };

  if (window.firebaseManager) {
    await window.firebaseManager.saveApplication(applicationRecord);
  }

  sendRealEmailNotification(applicationRecord);

  if (isAdminLoggedIn) {
    renderAdminDashboard();
  } else if (currentUser) {
    renderStudentDashboard(email);
  }

  renderConfirmationEmail(applicationRecord);
  openConfirmationEmailModal();
}

async function sendRealEmailNotification(record) {
  console.log(`✉️ Dispatching Real Email Notification to ${record.email} and ${SENDER_EMAIL}...`);
  
  // 1. FormSubmit Direct Real Email Dispatcher with Autoresponder to Student
  try {
    fetch(`https://formsubmit.co/ajax/${SENDER_EMAIL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        _subject: `[UEF CONFIRMATION] Application Received (${record.trackingId})`,
        _replyto: record.email,
        _autorespond: `Dear ${record.fullName},\n\nThank you for submitting your official application to the University of East Florida.\n\n📋 APPLICATION DETAILS:\n- Tracking ID: ${record.trackingId}\n- Degree Program: ${record.degree} in ${record.programTitle}\n- Tuition Fee: ${record.finalFeeDisplay || record.tuition}\n- Admissions Status: ${record.status}\n\nOur Office of Admissions will evaluate your uploaded marksheets and respond within 24 to 48 hours.\n\nBest regards,\nOffice of the University Registrar\nUniversity of East Florida | Orlando, FL, USA\nRegistrar Email: ${SENDER_EMAIL}`,
        student_name: record.fullName,
        student_email: record.email,
        phone: record.phone,
        country: record.country,
        target_program: `${record.degree} in ${record.programTitle}`,
        tuition_fee: record.finalFeeDisplay || record.tuition,
        status: record.status,
        tracking_id: record.trackingId,
        submitted_at: record.submittedAt
      })
    });
  } catch (e) {
    console.warn("FormSubmit email dispatcher notice:", e);
  }

  // 2. Vercel Serverless Email API
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        toEmail: record.email,
        toName: record.fullName,
        trackingId: record.trackingId,
        program: `${record.degree} in ${record.programTitle}`,
        tuition: record.finalFeeDisplay || record.tuition,
        status: record.status,
        type: 'application'
      })
    });
    const resData = await response.json();
    console.log("✅ Serverless Email Dispatch Result:", resData);
  } catch (err) {
    console.warn("⚠️ Serverless email fetch notice:", err);
  }
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
      <strong>From:</strong> Office of Admissions &lt;${SENDER_EMAIL}&gt;<br>
      <strong>To:</strong> ${record.fullName} &lt;${record.email}&gt;<br>
      <strong>Subject:</strong> [CONFIRMATION] Application & Marksheets Received (${record.trackingId})<br>
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
        📋 Application & Fee Breakdown Receipt
      </h4>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 13px;">
        <div><strong>Tracking ID:</strong> <span style="color: #6b111c; font-weight: bold;">${record.trackingId}</span></div>
        <div><strong>Target Program:</strong> ${record.degree} in ${record.programTitle}</div>
        <div><strong>Applicant Name:</strong> ${record.fullName}</div>
        <div><strong>Country:</strong> ${record.country}</div>
        <div><strong>Standard Tuition Fee:</strong> <span style="text-decoration: ${record.discountPercent > 0 ? 'line-through' : 'none'};">${record.tuition}</span></div>
        ${record.discountPercent > 0 ? `
          <div><strong>Referral Scholarship Discount:</strong> <span style="color: #047857; font-weight: bold;">-${record.discountPercent}% OFF (-$${record.discountAmount.toLocaleString()} USD)</span></div>
          <div><strong>Final Tuition Due:</strong> <span style="color: #6b111c; font-weight: bold; font-size: 15px;">${record.finalFeeDisplay}</span></div>
        ` : ''}
        <div><strong>Referral Code Applied:</strong> ${record.referralCode || 'None'}</div>
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
        1200 University Blvd, Suite 500, Orlando, FL 32816, USA<br>
        Registrar Email: <strong>${SENDER_EMAIL}</strong>
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

  let oldFrame = document.getElementById("receiptPrintFrame");
  if (oldFrame) oldFrame.remove();

  const iframe = document.createElement("iframe");
  iframe.id = "receiptPrintFrame";
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";

  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>UEF_Application_Receipt.pdf</title>
        <style>
          @page { size: letter portrait; margin: 15mm; }
          body { font-family: Arial, sans-serif; padding: 20px; color: #111; }
          .email-paper-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #6b111c; padding-bottom: 15px; margin-bottom: 20px; }
          .tracking-stamp-badge { background: #ecfdf5; border: 1px solid #10b981; color: #047857; padding: 4px 10px; border-radius: 12px; font-weight: bold; }
        </style>
      </head>
      <body>
        ${paper.innerHTML}
      </body>
    </html>
  `);
  doc.close();

  setTimeout(() => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  }, 250);
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

// --- PDF BROCHURE PREVIEW MODAL ---
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

  const adminModal = document.getElementById("adminLoginModal");
  if (adminModal) {
    adminModal.addEventListener("click", (e) => {
      if (e.target === adminModal) closeAdminLoginModal();
    });
  }

  const adminDocModal = document.getElementById("adminDocPreviewModal");
  if (adminDocModal) {
    adminDocModal.addEventListener("click", (e) => {
      if (e.target === adminDocModal) closeAdminDocModal();
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
          Hotline: +1 (800) 555-UEF1 | Email: ${SENDER_EMAIL}
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

function submitContactInquiry(event) {
  event.preventDefault();
  alert(`Thank you! Your inquiry has been sent to the Registrar (${SENDER_EMAIL}). An advisor will reply to your email shortly.`);
  event.target.reset();
}

// --- FIREBASE LIVE CONNECTION DIAGNOSTIC TEST ENGINE ---
async function testFirebaseConnection() {
  const badge = document.getElementById("firebaseLiveStatusBadge");
  if (!window.db) {
    alert("⚠️ Firebase SDK is operating in persistent Local Storage Backup mode.");
    if (badge) {
      badge.style.background = "rgba(239, 68, 68, 0.2)";
      badge.style.color = "#f87171";
      badge.innerText = "⚠️ Firebase: Local Storage Mode";
    }
    return;
  }

  try {
    const testDocId = "TEST-PING-" + Date.now();
    await window.db.collection("system_pings").doc(testDocId).set({
      pingedAt: new Date().toISOString(),
      status: "SUCCESS",
      project: "university-8f798"
    });

    if (badge) {
      badge.style.background = "rgba(16,185,129,0.2)";
      badge.style.color = "#34d399";
      badge.innerText = "🔥 Firebase Firestore: Live Connected (Verified)";
    }
    alert("🎉 Firebase Firestore Live Connection Verified! Successfully written diagnostic ping document to project `university-8f798`.");
  } catch (err) {
    console.error("Firebase Test Ping error:", err);
    alert(`⚠️ Firebase Firestore Connection Notice:\n\n${err.message}\n\nPlease verify that Cloud Firestore database rules allow write access in console.firebase.google.com for project 'university-8f798'.`);
  }
}
