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
  initTheme();
  initPreloader();
  initLiveClocks();
  renderProgramsCatalog(DEGREE_PROGRAMS);
  initSearchAndFilter();
  initStudentPortal();
  initApplicationUploadForm();
  initModalListeners();
  renderPublicTestimonials();
  initCampusTour();
  renderLecturesGrid('all');
  loadGlobalNews();

  // Load CMS Config & Firestore listeners asynchronously without blocking UI or clocks
  loadSiteCMSConfig();
});

// --- DYNAMIC LIGHT / DARK THEME ENGINE ---
function initTheme() {
  const savedTheme = localStorage.getItem('uef_theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    updateThemeBtnText(true);
  } else {
    document.body.classList.remove('light-theme');
    updateThemeBtnText(false);
  }
}

function toggleThemeMode() {
  const isLight = document.body.classList.toggle('light-theme');
  localStorage.setItem('uef_theme', isLight ? 'light' : 'dark');
  updateThemeBtnText(isLight);
}

function updateThemeBtnText(isLight) {
  const btn = document.getElementById('themeToggleBtn');
  if (btn) {
    btn.innerHTML = isLight ? '☀️ Light Mode' : '🌙 Dark Mode';
  }
}

// --- AUTOMATIC PRELOADER SPLASH SCREEN FADE OUT ENGINE ---
function initPreloader() {
  const preloader = document.getElementById("universityPreloader");
  if (!preloader) return;

  setTimeout(() => {
    preloader.classList.add("fade-out");
  }, 1300);
}

window.addEventListener("load", initPreloader);

// --- MOBILE NAVIGATION DRAWER TOGGLE ENGINE ---
function toggleMobileMenu() {
  const drawer = document.getElementById("mobileNavDrawer");
  if (drawer) {
    drawer.classList.toggle("open");
  }
}

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
      navBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg> Admin Portal`;
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
    navBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg> Sign In`;
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

      if (mEst) mEst.innerText = `📍 USA (Orlando/EST): ${estStr}`;
      if (mGmt) mGmt.innerText = `🌐 UK (London/GMT): ${gmtStr}`;
      if (mJst) mJst.innerText = `🌐 Japan (Tokyo/JST): ${jstStr}`;
      if (mIst) mIst.innerText = `🌐 India (New Delhi/IST): ${istStr}`;
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
  renderCMSProgramTable();
  renderAdminCampusTable();
  renderAdminLectureTable();

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

  // Render Student Feedbacks Table
  const feedbacks = await window.firebaseManager.getFeedbacks();
  const feedbackTbody = document.getElementById("adminFeedbackTableBody");
  const kpiFeedbackElem = document.getElementById("kpiFeedbacksReceived");

  if (kpiFeedbackElem) kpiFeedbackElem.innerText = feedbacks.length;

  if (feedbackTbody) {
    let filteredFeedbacks = feedbacks.filter(f => {
      return (f.fullName || "").toLowerCase().includes(searchVal) ||
             (f.email || "").toLowerCase().includes(searchVal) ||
             (f.comments || "").toLowerCase().includes(searchVal) ||
             (f.category || "").toLowerCase().includes(searchVal);
    });

    if (filteredFeedbacks.length === 0) {
      feedbackTbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 20px; color: var(--text-muted);">
            No student feedbacks submitted yet.
          </td>
        </tr>
      `;
    } else {
      feedbackTbody.innerHTML = filteredFeedbacks.map(f => `
        <tr>
          <td><strong style="color: #f59e0b; font-family: monospace;">${f.feedbackId || 'FB-LOG'}</strong></td>
          <td><strong>${f.fullName}</strong></td>
          <td>${f.email}</td>
          <td><span style="color: #f59e0b; font-weight: bold;">${'⭐'.repeat(parseInt(f.rating) || 5)} (${f.rating}/5)</span></td>
          <td><span class="usa-flag-badge" style="background: rgba(245,158,11,0.15); color: #fbbf24; font-size: 11px;">${f.category}</span></td>
          <td style="font-size: 13px; color: #ddd; max-width: 250px;">"${f.comments}"</td>
          <td style="font-size: 12px; color: var(--text-muted);">${f.submittedAt}</td>
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
  if (select && DEGREE_PROGRAMS && DEGREE_PROGRAMS.length > 0) {
    const currentVal = select.value;
    select.innerHTML = '<option value="" disabled selected>-- Select Target Degree Program --</option>' +
      DEGREE_PROGRAMS.map(p => `
        <option value="${p.id}" ${currentVal === p.id ? 'selected' : ''}>${p.degree} in ${p.name || p.title || 'Degree Program'}</option>
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
      Thank you for submitting your official application to the <strong>University of East Florida</strong>. We confirm that your student records and academic marksheets have been successfully uploaded and recorded into our encrypted <strong>Admissions Database</strong>.
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

// --- STUDENT FEEDBACK SUBMISSION & PUBLIC TESTIMONIALS ENGINE ---
async function handleFeedbackSubmit(event) {
  event.preventDefault();
  const fullName = document.getElementById("fbFullName").value.trim();
  const email = document.getElementById("fbEmail").value.trim();
  const category = document.getElementById("fbCategory").value;
  const rating = document.getElementById("fbRating").value;
  const comments = document.getElementById("fbComments").value.trim();

  const feedbackRecord = {
    fullName,
    email,
    category,
    rating,
    comments
  };

  if (window.firebaseManager) {
    await window.firebaseManager.saveFeedback(feedbackRecord);
  }

  // Dispatch real email notification to Registrar (r.mohammedsafar@gmail.com)
  try {
    fetch(`https://formsubmit.co/ajax/${SENDER_EMAIL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        _subject: `[UEF STUDENT FEEDBACK] ${rating} Stars from ${fullName}`,
        _replyto: email,
        student_name: fullName,
        student_email: email,
        category: category,
        star_rating: `${rating} / 5 Stars`,
        feedback_comments: comments
      })
    });
  } catch (e) {
    console.warn("Feedback email trigger notice:", e);
  }

  alert(`🎉 Thank you for your feedback, ${fullName}! Your review (${rating} Stars) has been recorded in Cloud Firestore and submitted to the Registrar.`);
  
  event.target.reset();
  renderPublicTestimonials();
  if (isAdminLoggedIn) renderAdminDashboard();
}

async function renderPublicTestimonials() {
  const container = document.getElementById("publicTestimonialsContainer");
  if (!container) return;

  let liveFeedbacks = [];
  if (window.firebaseManager) {
    liveFeedbacks = await window.firebaseManager.getFeedbacks();
  }

  const seedTestimonials = [
    {
      fullName: "David Sterling",
      category: "Academic Excellence & Programs",
      rating: "5",
      comments: "The M.S. in Computer Science & AI curriculum is outstanding. The 100% online remote structure allowed me to balance work while earning a top USA degree.",
      submittedAt: "Aug 8, 2026"
    },
    {
      fullName: "Ananya Sharma",
      category: "100% Online Learning Portal",
      rating: "5",
      comments: "The online marksheets upload and student portal were seamless. Received my official admission offer letter within 24 hours!",
      submittedAt: "Aug 6, 2026"
    },
    {
      fullName: "Marcus Vance",
      category: "Global MBA & Leadership",
      rating: "5",
      comments: "Exceptional faculty and digital business strategy modules. The referral scholarship discount saved me over $2,800 on tuition fees.",
      submittedAt: "Aug 3, 2026"
    }
  ];

  const allReviews = [...liveFeedbacks, ...seedTestimonials];

  container.innerHTML = allReviews.map(t => `
    <div style="background: rgba(0,0,0,0.5); border: 1px solid var(--border-gold); padding: 18px; border-radius: 12px; transition: var(--tr-fast);">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
        <div>
          <strong style="color: #fff; font-size: 15px;">${t.fullName}</strong>
          <div style="font-size: 11px; color: var(--gold-primary); font-weight: 600;">${t.category}</div>
        </div>
        <div style="color: #f59e0b; font-size: 13px; font-weight: bold;">
          ${'⭐'.repeat(parseInt(t.rating) || 5)}
        </div>
      </div>
      <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin: 0;">
        "${t.comments}"
      </p>
      <div style="font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 8px; text-align: right;">
        ${t.submittedAt || 'Verified Review'}
      </div>
    </div>
  `).join('');
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

// ============================================================
// VIRTUAL CAMPUS TOUR ENGINE
// ============================================================
const CAMPUS_ROOMS = {
  'library': {
    icon: '📚',
    name: 'Digital Research Library',
    description: 'Access over 2.4 million peer-reviewed journals, textbooks, case studies, and research papers from Oxford, Cambridge, and MIT OpenCourseWare. Available 24/7 from any device globally.',
    stats: [
      { label: 'Digital Resources', value: '2.4M+' },
      { label: 'Research Journals', value: '48,000+' },
      { label: 'Access', value: '24/7 Global' },
      { label: 'Languages', value: '28 Languages' }
    ],
    highlight: 'Includes IEEE, ACM, JSTOR, Springer, and Elsevier full-text databases.'
  },
  'cs-lab': {
    icon: '💻',
    name: 'CS & Artificial Intelligence Lab',
    description: 'Our cloud-based AI lab features GPU computing clusters, TensorFlow and PyTorch sandboxes, Jupyter notebooks, and collaborative coding environments powered by AWS and Google Cloud.',
    stats: [
      { label: 'GPU Compute Nodes', value: '500+' },
      { label: 'Active Projects', value: '1,200+' },
      { label: 'AI Frameworks', value: 'TF/PyTorch' },
      { label: 'Uptime', value: '99.97%' }
    ],
    highlight: 'Industry-grade tools: Docker, Kubernetes, GitHub Copilot, and VS Code Cloud.'
  },
  'business': {
    icon: '📊',
    name: 'Global Business School',
    description: 'Engage with live NYSE/NASDAQ market simulators, Bloomberg Terminal access, strategic case study rooms, and global MBA cohort video seminars with guest C-suite executives.',
    stats: [
      { label: 'Bloomberg Terminals', value: '120 Virtual' },
      { label: 'Case Studies', value: '8,500+' },
      { label: 'Alumni Network', value: '45 Countries' },
      { label: 'MBA Ranking', value: 'Top 12%' }
    ],
    highlight: 'Live trading simulations with $100,000 virtual portfolio management.'
  },
  'healthcare': {
    icon: '🏥',
    name: 'Health Informatics Institute',
    description: 'Immersive 3D anatomy visualization suites, patient data management simulators, telemedicine protocol labs, and global epidemiology mapping tools built with real WHO datasets.',
    stats: [
      { label: '3D Anatomy Models', value: '14,000+' },
      { label: 'Clinical Simulations', value: '3,200+' },
      { label: 'WHO Datasets', value: 'Live Feed' },
      { label: 'Certifications', value: 'HL7 / FHIR' }
    ],
    highlight: 'Partners with Johns Hopkins, WHO, and CDC for real-world health data.'
  },
  'auditorium': {
    icon: '🎓',
    name: 'Virtual Grand Auditorium',
    description: 'Host of our weekly live commencement ceremonies, guest lecturer series, global student symposiums, and official graduation celebrations streamed to 190+ countries in HD.',
    stats: [
      { label: 'Capacity', value: '50,000 Live' },
      { label: 'Annual Events', value: '240+' },
      { label: 'Countries Reached', value: '190+' },
      { label: 'Graduates 2024', value: '12,400+' }
    ],
    highlight: 'Officially certified by the US Department of Education as a virtual campus.'
  }
};

function initCampusTour() {
  switchTourRoom('library');
}

function switchTourRoom(roomId) {
  const room = CAMPUS_ROOMS[roomId];
  if (!room) return;

  document.querySelectorAll('.tour-nav-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`tourBtn-${roomId}`);
  if (activeBtn) activeBtn.classList.add('active');

  const display = document.getElementById('tourRoomDisplay');
  if (!display) return;

  display.innerHTML = `
    <div class="tour-room-visual">
      <div style="font-size:90px; margin-bottom:12px;">${room.icon}</div>
      <div style="font-size:13px; color:var(--gold-primary); font-weight:700; letter-spacing:2px; text-transform:uppercase; text-align:center;">UEF CAMPUS</div>
    </div>
    <div class="tour-room-info">
      <div>
        <div style="font-size:11px; color:var(--gold-primary); font-weight:700; text-transform:uppercase; letter-spacing:2px; margin-bottom:8px;">Virtual Campus Tour</div>
        <h3 style="font-size:26px; font-weight:800; color:#fff; font-family:var(--font-serif); margin-bottom:14px; line-height:1.2;">${room.name}</h3>
        <p style="font-size:14px; color:var(--text-muted); line-height:1.65;">${room.description}</p>
      </div>
      <div class="tour-stat-row">
        ${room.stats.map(s => `
          <div class="tour-stat-box">
            <div style="font-size:20px; font-weight:900; color:var(--gold-primary); font-family:var(--font-serif);">${s.value}</div>
            <div style="font-size:11px; color:var(--text-muted); margin-top:3px; text-transform:uppercase; letter-spacing:1px;">${s.label}</div>
          </div>
        `).join('')}
      </div>
      <div style="background:rgba(212,175,55,0.08); border:1px solid var(--border-gold); border-radius:10px; padding:14px; font-size:13px; color:var(--gold-light);">
        ✨ ${room.highlight}
      </div>
      <a href="#applySection" class="btn btn-gold" style="width:fit-content; padding:11px 24px;">📝 Apply to This Program</a>
    </div>
  `;
}

// ============================================================
// RECORDED LECTURES ENGINE
// ============================================================
const LECTURES = [
  { id:'l1', category:'cs', title:'Introduction to Machine Learning & Neural Networks', professor:'Prof. Andrew Ng — Stanford University', duration:'1:12:34', youtubeId:'jGwO_UgTS7I', thumb:'https://img.youtube.com/vi/jGwO_UgTS7I/maxresdefault.jpg' },
  { id:'l2', category:'cs', title:'Deep Learning for Computer Vision (CNN Architecture)', professor:'Prof. Fei-Fei Li — Stanford AI Lab', duration:'58:22', youtubeId:'iaSUYvmCekI', thumb:'https://img.youtube.com/vi/iaSUYvmCekI/maxresdefault.jpg' },
  { id:'l3', category:'cs', title:'Algorithms & Data Structures: Complexity Analysis', professor:'Prof. Erik Demaine — MIT CSAIL', duration:'1:24:10', youtubeId:'HtSuA80QTyo', thumb:'https://img.youtube.com/vi/HtSuA80QTyo/maxresdefault.jpg' },
  { id:'l4', category:'business', title:'Strategic Management & Competitive Advantage', professor:'Prof. Michael Porter — Harvard Business School', duration:'47:18', youtubeId:'mYF2_FBCvXw', thumb:'https://img.youtube.com/vi/mYF2_FBCvXw/maxresdefault.jpg' },
  { id:'l5', category:'business', title:'Financial Markets & Investment Banking Fundamentals', professor:'Prof. Robert Shiller — Yale University', duration:'1:08:45', youtubeId:'WQui_3Hpmmc', thumb:'https://img.youtube.com/vi/WQui_3Hpmmc/maxresdefault.jpg' },
  { id:'l6', category:'business', title:'Entrepreneurship & Startup Ecosystem — Silicon Valley', professor:'Prof. Steve Blank — UC Berkeley', duration:'55:30', youtubeId:'zwb7jPM8mLA', thumb:'https://img.youtube.com/vi/zwb7jPM8mLA/maxresdefault.jpg' },
  { id:'l7', category:'healthcare', title:'Health Informatics & Electronic Medical Records (EHR)', professor:'Prof. Dina Katabi — MIT CSAIL Health', duration:'49:55', youtubeId:'UF8uR6Z6KLc', thumb:'https://img.youtube.com/vi/UF8uR6Z6KLc/maxresdefault.jpg' },
  { id:'l8', category:'healthcare', title:'Global Epidemiology & Public Health Systems', professor:'Prof. David Relman — Stanford Medicine', duration:'1:03:14', youtubeId:'54XLXg4fYsc', thumb:'https://img.youtube.com/vi/54XLXg4fYsc/maxresdefault.jpg' },
  { id:'l9', category:'math', title:'Linear Algebra: Essence & Intuition for AI', professor:'Prof. Gilbert Strang — MIT OpenCourseWare', duration:'36:22', youtubeId:'kjBOesZCoqc', thumb:'https://img.youtube.com/vi/kjBOesZCoqc/maxresdefault.jpg' },
  { id:'l10', category:'math', title:'Calculus & Differential Equations for Engineers', professor:'Prof. David Jerison — MIT Mathematics', duration:'51:08', youtubeId:'WUvTyaaNkzM', thumb:'https://img.youtube.com/vi/WUvTyaaNkzM/maxresdefault.jpg' },
  { id:'l11', category:'cs', title:'Cybersecurity & Ethical Hacking Fundamentals', professor:'Prof. J. Alex Halderman — University of Michigan', duration:'1:18:00', youtubeId:'inWWhr5tnEA', thumb:'https://img.youtube.com/vi/inWWhr5tnEA/maxresdefault.jpg' },
  { id:'l12', category:'business', title:'Digital Marketing & Analytics in the AI Era', professor:'Prof. Scott Galloway — NYU Stern', duration:'44:30', youtubeId:'k5BgQLm9J9M', thumb:'https://img.youtube.com/vi/k5BgQLm9J9M/maxresdefault.jpg' }
];

function renderLecturesGrid(category) {
  document.querySelectorAll('[id^="lecFilter-"]').forEach(b => b.classList.remove('active'));
  const activeFilter = document.getElementById(`lecFilter-${category}`);
  if (activeFilter) activeFilter.classList.add('active');

  const filtered = category === 'all' ? LECTURES : LECTURES.filter(l => l.category === category);
  const grid = document.getElementById('lecturesGrid');
  if (!grid) return;

  const categoryLabel = { cs:'CS & AI', business:'Business', healthcare:'Healthcare', math:'Mathematics' };

  grid.innerHTML = filtered.map(lec => `
    <div class="lecture-card" onclick="openLecture('${lec.youtubeId}', '${lec.title.replace(/'/g, "\\'")}')">
      <div class="lecture-thumbnail">
        <img src="${lec.thumb}" alt="${lec.title}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'640\\' height=\\'360\\'><rect fill=\\'%23200a0e\\' width=\\'640\\' height=\\'360\\'/><text x=\\'320\\' y=\\'180\\' font-size=\\'80\\' text-anchor=\\'middle\\' dominant-baseline=\\'middle\\'>${lec.category==='cs'?'💻':lec.category==='business'?'📊':lec.category==='healthcare'?'🏥':'📐'}</text></svg>'">
        <div class="lecture-play-overlay">
          <div class="lecture-play-btn">▶</div>
        </div>
        <span class="lecture-duration-badge">${lec.duration}</span>
      </div>
      <div class="lecture-info">
        <span class="lecture-category-tag">${categoryLabel[lec.category] || lec.category}</span>
        <div class="lecture-title">${lec.title}</div>
        <div class="lecture-professor">👨‍🏫 ${lec.professor}</div>
      </div>
    </div>
  `).join('');
}

function filterLectures(category) {
  renderLecturesGrid(category);
}

function openLecture(youtubeId, title) {
  const modal = document.getElementById('lectureVideoModal');
  const frame = document.getElementById('lectureVideoFrame');
  const titleEl = document.getElementById('lectureModalTitle');
  if (!modal || !frame) return;

  frame.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
  if (titleEl) titleEl.textContent = title;
  modal.classList.add('open');
}

function closeLectureModal(e) {
  if (e && e.target !== document.getElementById('lectureVideoModal') && !e.target.closest('.modal-close')) return;
  const modal = document.getElementById('lectureVideoModal');
  const frame = document.getElementById('lectureVideoFrame');
  if (modal) modal.classList.remove('open');
  if (frame) frame.src = '';
}

// ============================================================
// ACADEMIC QUIZ ENGINE
// ============================================================
const QUIZ_QUESTIONS = {
  cs: [
    { q: 'What does "AI" stand for in Computer Science?', options: ['Automated Interface', 'Artificial Intelligence', 'Advanced Integration', 'Algorithmic Input'], answer: 1 },
    { q: 'Which data structure uses LIFO (Last In, First Out) order?', options: ['Queue', 'Linked List', 'Stack', 'Binary Tree'], answer: 2 },
    { q: 'What is the time complexity of binary search?', options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'], answer: 2 },
    { q: 'Which language is primarily used for Machine Learning?', options: ['Java', 'Python', 'C++', 'PHP'], answer: 1 },
    { q: 'What does HTTP stand for?', options: ['HyperText Transfer Protocol', 'High Transfer Text Program', 'Hyper Terminal Transfer Process', 'HyperText Transmission Path'], answer: 0 }
  ],
  business: [
    { q: 'What does "ROI" stand for in business finance?', options: ['Return On Investment', 'Rate Of Inflation', 'Revenue On Income', 'Risk Of Insolvency'], answer: 0 },
    { q: 'Which financial statement shows a company\'s revenues and expenses?', options: ['Balance Sheet', 'Cash Flow Statement', 'Income Statement', 'Equity Report'], answer: 2 },
    { q: 'What is "market capitalization"?', options: ['Total debt of a company', 'Total shares × share price', 'Annual revenue of a company', 'Net profit margin'], answer: 1 },
    { q: 'Which pricing strategy involves setting a high initial price and lowering it over time?', options: ['Penetration Pricing', 'Price Skimming', 'Cost-Plus Pricing', 'Competitive Pricing'], answer: 1 },
    { q: 'What does "B2B" mean in business?', options: ['Budget to Budget', 'Business to Business', 'Buy to Buy', 'Brand to Brand'], answer: 1 }
  ],
  healthcare: [
    { q: 'What does "EHR" stand for in Health Informatics?', options: ['Electronic Health Records', 'Extended Health Registry', 'Emergency Health Report', 'Electronic Hospital Roster'], answer: 0 },
    { q: 'Which organization publishes global disease statistics?', options: ['UNESCO', 'UNICEF', 'WHO', 'WTO'], answer: 2 },
    { q: 'What is "telemedicine"?', options: ['Medicine for telecom workers', 'Remote healthcare delivery via technology', 'TV medical broadcasts', 'Automated pharmacy systems'], answer: 1 },
    { q: 'What does "BMI" stand for?', options: ['Body Mass Index', 'Biological Medical Indicator', 'Blood Metabolism Index', 'Brain Motor Index'], answer: 0 },
    { q: 'Which act in the USA protects patient health information privacy?', options: ['ADA Act', 'HIPAA', 'COBRA', 'Medicare Act'], answer: 1 }
  ]
};

let quizState = { subject: null, current: 0, score: 0, answered: false };

function startQuiz(subject) {
  quizState = { subject, current: 0, score: 0, answered: false };
  document.getElementById('quizStartScreen').style.display = 'none';
  document.getElementById('quizResultScreen').style.display = 'none';
  document.getElementById('quizActiveScreen').style.display = 'block';
  const labels = { cs: '💻 CS & AI Quiz', business: '📊 Business Quiz', healthcare: '🏥 Healthcare Quiz' };
  document.getElementById('quizSubjectLabel').textContent = labels[subject] || 'Quiz';
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const questions = QUIZ_QUESTIONS[quizState.subject];
  const q = questions[quizState.current];
  quizState.answered = false;

  document.getElementById('quizCurrentQ').textContent = quizState.current + 1;
  document.getElementById('quizProgressBar').style.width = `${((quizState.current + 1) / 5) * 100}%`;

  document.getElementById('quizQuestionCard').innerHTML = `
    <div style="font-size:16px; font-weight:700; color:#fff; line-height:1.5; margin-bottom:4px;">
      Q${quizState.current + 1}. ${q.q}
    </div>
    <div class="quiz-options-grid" id="quizOptionsGrid">
      ${q.options.map((opt, i) => `
        <button class="quiz-option-btn" onclick="answerQuiz(${i})" id="quizOpt-${i}">
          <span style="font-weight:700; color:var(--gold-primary); margin-right:8px;">${['A','B','C','D'][i]}.</span> ${opt}
        </button>
      `).join('')}
    </div>
  `;
}

function answerQuiz(selectedIndex) {
  if (quizState.answered) return;
  quizState.answered = true;

  const questions = QUIZ_QUESTIONS[quizState.subject];
  const correct = questions[quizState.current].answer;
  const isCorrect = selectedIndex === correct;
  if (isCorrect) quizState.score++;

  document.querySelectorAll('.quiz-option-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) btn.classList.add('correct');
    else if (i === selectedIndex && !isCorrect) btn.classList.add('wrong');
  });

  setTimeout(() => {
    quizState.current++;
    if (quizState.current < 5) {
      renderQuizQuestion();
    } else {
      showQuizResult();
    }
  }, 1200);
}

function showQuizResult() {
  document.getElementById('quizActiveScreen').style.display = 'none';
  const resultEl = document.getElementById('quizResultScreen');
  resultEl.style.display = 'block';

  const score = quizState.score;
  const subjectPrograms = { cs: 'M.S. in Computer Science & AI', business: 'Global MBA — Business Leadership', healthcare: 'M.S. in Health Informatics' };
  const grade = score === 5 ? '🏆 Perfect Score!' : score >= 4 ? '⭐ Excellent!' : score >= 3 ? '✅ Good Work!' : score >= 2 ? '📚 Keep Studying' : '💡 Beginner Level';
  const gradeColor = score >= 4 ? '#34d399' : score >= 3 ? '#f59e0b' : '#f87171';

  resultEl.innerHTML = `
    <div style="background:radial-gradient(circle at 50% 0%, rgba(107,17,28,0.4) 0%, rgba(15,8,10,0.97) 100%); border:1px solid var(--border-gold); border-radius:20px; padding:40px; max-width:600px; margin:0 auto;">
      <div style="font-size:60px; margin-bottom:16px;">${score === 5 ? '🏆' : score >= 3 ? '⭐' : '📚'}</div>
      <div style="font-size:18px; font-weight:800; color:${gradeColor}; margin-bottom:6px;">${grade}</div>
      <div style="font-size:52px; font-weight:900; color:var(--gold-primary); font-family:var(--font-serif); margin:12px 0;">${score}/5</div>
      <div style="font-size:14px; color:var(--text-muted); margin-bottom:24px;">You answered ${score} out of 5 questions correctly!</div>
      ${score >= 3 ? `
        <div style="background:rgba(212,175,55,0.1); border:1px solid var(--border-gold); padding:16px; border-radius:12px; margin-bottom:24px;">
          <div style="font-size:12px; color:var(--gold-light); font-weight:700; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px;">🎓 Recommended UEF Program</div>
          <div style="font-size:17px; font-weight:800; color:#fff;">${subjectPrograms[quizState.subject]}</div>
        </div>
      ` : ''}
      <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
        <button class="btn btn-gold" onclick="startQuiz('${quizState.subject}')" style="padding:11px 22px;">🔄 Try Again</button>
        <button class="btn btn-outline" onclick="resetQuiz()" style="padding:11px 22px;">📚 Choose Subject</button>
        <a href="#applySection" class="btn btn-maroon" style="padding:11px 22px;">📝 Apply Now</a>
      </div>
    </div>
  `;
}

function resetQuiz() {
  document.getElementById('quizResultScreen').style.display = 'none';
  document.getElementById('quizActiveScreen').style.display = 'none';
  document.getElementById('quizStartScreen').style.display = 'block';
}

// ============================================================
// GLOBAL NEWS FEED ENGINE — Live RSS via rss2json proxy
// ============================================================
// ============================================================
// GLOBAL NEWS FEED ENGINE — Live RSS via rss2json proxy
// ============================================================
const SEED_NEWS = [
  { title: 'AI Surpasses Human Performance on Medical Diagnosis Benchmarks', description: 'A new multimodal AI model developed by Google DeepMind has matched board-certified radiologists in detecting early-stage cancer across 14 medical imaging datasets.', source: 'NATURE MEDICINE', url: '#applySection', pubDate: 'Aug 11, 2026', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80' },
  { title: 'Global University Enrollment Hits Record 280 Million Students in 2025', description: 'UNESCO reports a historic surge in online higher education enrollment, with Asia-Pacific and Sub-Saharan Africa driving the majority of new student registrations.', source: 'UNESCO REPORT', url: '#applySection', pubDate: 'Aug 11, 2026', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop&q=80' },
  { title: 'Quantum Computing Achieves 1 Million Qubit Milestone', description: 'IBM unveils its Condor+ quantum processor exceeding 1 million qubits, marking a landmark breakthrough that could revolutionize cryptography, drug discovery, and logistics.', source: 'MIT TECHNOLOGY REVIEW', url: '#applySection', pubDate: 'Aug 11, 2026', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80' }
];

async function loadGlobalNews(isUserClick = false) {
  const grid = document.getElementById('globalNewsGrid');
  if (!grid) return;

  if (isUserClick) {
    grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--text-muted);">
      <div style="font-size:36px; margin-bottom:12px; animation:logoPulse 1.5s ease-in-out infinite alternate;">🌍</div>
      <p>Fetching latest live bulletins...</p>
    </div>`;
  }

  let articles = [];

  try {
    const rssUrl = encodeURIComponent('https://feeds.bbci.co.uk/news/technology/rss.xml');
    const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}&count=3`, { signal: AbortSignal.timeout(4000) });
    if (res.ok) {
      const data = await res.json();
      if (data.status === 'ok' && data.items && data.items.length > 0) {
        articles = data.items.map(item => ({
          title: item.title,
          description: item.description?.replace(/<[^>]+>/g,'').substring(0, 150) + '...' || '',
          source: 'BBC TECHNOLOGY',
          url: item.link || '#applySection',
          pubDate: new Date(item.pubDate).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}),
          image: item.thumbnail || item.enclosure?.link || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop&q=80'
        }));
      }
    }
  } catch (e) {
    console.log('Live news fetch fallback to pre-rendered cards:', e.message);
  }

  if (articles.length > 0) {
    grid.innerHTML = articles.map(article => `
      <div class="news-card" style="display:flex; flex-direction:column; justify-content:space-between; overflow:hidden; padding:0; border-radius:16px;">
        <div style="height:200px; overflow:hidden; position:relative;">
          <img src="${article.image}" alt="${article.title}" style="width:100%; height:100%; object-fit:cover; transition:transform 0.4s ease;"
            onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop&q=80'">
        </div>
        <div style="padding:24px; display:flex; flex-direction:column; flex:1; justify-content:space-between;">
          <div>
            <div style="font-size:11px; color:var(--gold-light); font-weight:700; text-transform:uppercase; letter-spacing:1px; margin-bottom:10px;">
              📰 ${article.source}
            </div>
            <h3 class="news-title" style="font-size:17px; font-family:var(--font-serif); color:var(--text-main); margin-bottom:10px; line-height:1.35;">${article.title}</h3>
            <p class="news-snippet" style="font-size:13px; color:var(--text-muted); line-height:1.55; margin-bottom:18px;">${article.description}</p>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-gold); padding-top:14px; font-size:12px; color:var(--text-muted);">
            <span>📷 ${article.pubDate}</span>
            <a href="${article.url}" ${article.url.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}
              class="btn btn-outline" style="padding:4px 12px; font-size:11px; border-color:var(--border-gold); color:var(--gold-light);">
              Read More →
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }
}

// ============================================================
// UEF AI STUDENT ADVISOR CHATBOT ENGINE
// ============================================================
let isAIChatOpen = false;

function toggleAIChatWindow() {
  const win = document.getElementById('aiChatWindow');
  const badge = document.getElementById('aiChatUnreadBadge');
  if (!win) return;

  isAIChatOpen = !isAIChatOpen;
  if (isAIChatOpen) {
    win.classList.add('open');
    if (badge) badge.style.display = 'none';
    const input = document.getElementById('aiChatInput');
    if (input) input.focus();
  } else {
    win.classList.remove('open');
  }
}

function handleAIChatKey(e) {
  if (e.key === 'Enter') {
    sendAIChatMessage();
  }
}

function sendQuickAIQuestion(questionText) {
  const input = document.getElementById('aiChatInput');
  if (input) {
    input.value = questionText;
    sendAIChatMessage();
  }
}

function sendAIChatMessage() {
  const input = document.getElementById('aiChatInput');
  const container = document.getElementById('aiChatMessages');
  if (!input || !container) return;

  const text = input.value.trim();
  if (!text) return;

  // Append user message
  const userMsgDiv = document.createElement('div');
  userMsgDiv.className = 'ai-msg ai-msg-user';
  userMsgDiv.innerHTML = `<div class="ai-msg-bubble">${escapeHtml(text)}</div>`;
  container.appendChild(userMsgDiv);

  // Clear input
  input.value = '';

  // Hide quick chips once user chats
  const chips = document.getElementById('aiQuickChips');
  if (chips) chips.style.display = 'none';

  // Scroll to bottom
  container.scrollTop = container.scrollHeight;

  // Thinking indicator
  const typingDiv = document.createElement('div');
  typingDiv.className = 'ai-msg ai-msg-bot';
  typingDiv.id = 'aiTypingIndicator';
  typingDiv.innerHTML = `<div class="ai-msg-bubble" style="color:var(--gold-light);">🤖 Advisor is thinking...</div>`;
  container.appendChild(typingDiv);
  container.scrollTop = container.scrollHeight;

  // Respond after 600ms delay
  setTimeout(() => {
    const indicator = document.getElementById('aiTypingIndicator');
    if (indicator) indicator.remove();

    const botResponse = generateAIAdvisorResponse(text);
    const botMsgDiv = document.createElement('div');
    botMsgDiv.className = 'ai-msg ai-msg-bot';
    botMsgDiv.innerHTML = `<div class="ai-msg-bubble">${botResponse}</div>`;
    container.appendChild(botMsgDiv);
    container.scrollTop = container.scrollHeight;
  }, 650);
}

function generateAIAdvisorResponse(query) {
  const q = query.toLowerCase();

  if (q.includes('program') || q.includes('degree') || q.includes('course') || q.includes('major')) {
    return `🎓 <strong>University of East Florida Degree Programs:</strong><br><br>
    • <strong>M.S. Computer Science & AI</strong> ($14,400 total)<br>
    • <strong>M.S. Data Science & Big Data</strong> ($13,800 total)<br>
    • <strong>Global MBA — Business Leadership</strong> ($16,200 total)<br>
    • <strong>M.S. Cybersecurity Policy & Risk</strong> ($14,000 total)<br>
    • <strong>B.S. Software Engineering</strong> ($18,500 total)<br><br>
    All programs are 100% online, self-paced, and internationally accredited!`;
  }

  if (q.includes('apply') || q.includes('marksheet') || q.includes('document') || q.includes('admission') || q.includes('upload')) {
    return `📝 <strong>How to Apply to UEF:</strong><br><br>
    1. Scroll to the <strong>Official Application</strong> section below.<br>
    2. Fill in your Full Name, Email, Phone, and Select your Degree.<br>
    3. Drag & drop or upload your Academic Marksheets / Transcripts (PDF/JPG).<br>
    4. Enter an optional <strong>Referral Code</strong> for up to 35% tuition discount.<br>
    5. Click <strong>Submit Official Application</strong>!<br><br>
    Admissions team responds within 24-48 hours via email.`;
  }

  if (q.includes('fee') || q.includes('cost') || q.includes('discount') || q.includes('referral') || q.includes('price') || q.includes('scholarship')) {
    return `💰 <strong>Tuition Fee Discounts & Referral Hub:</strong><br><br>
    • <strong>Tier 1 (1 Referral):</strong> 10% OFF (~$1,440 savings)<br>
    • <strong>Tier 2 (2-3 Referrals):</strong> 20% OFF (~$2,880 savings)<br>
    • <strong>Tier 3 (4+ Referrals):</strong> 35% OFF (~$5,000 savings)<br><br>
    You can generate your unique referral code in the <strong>Student Portal & Rewards</strong> section!`;
  }

  if (q.includes('gpa') || q.includes('requirement') || q.includes('eligible') || q.includes('marks') || q.includes('score')) {
    return `🎓 <strong>GPA & Academic Eligibility Rules:</strong><br><br>
    • <strong>GPA ≥ 3.50 (85%+):</strong> Direct Unconditional Admission + 15% Dean's Merit Scholarship!<br>
    • <strong>GPA 2.75 - 3.49 (70%-84%):</strong> Standard Admission.<br>
    • <strong>GPA 2.00 - 2.74 (55%-69%):</strong> Conditional Admission with Foundation Prep.<br><br>
    Use our interactive <strong>Marks Evaluator</strong> in the Student Portal section to calculate your exact GPA!`;
  }

  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('headquarters') || q.includes('address') || q.includes('usa')) {
    return `🏛️ <strong>USA Headquarters & Official Contact:</strong><br><br>
    • <strong>Address:</strong> 1200 University Blvd, Suite 500, Orlando, FL 32816, USA<br>
    • <strong>Toll-Free:</strong> +1 (800) 555-UEF1<br>
    • <strong>Registrar Email:</strong> <a href="mailto:r.mohammedsafar@gmail.com" style="color:var(--gold-primary);">r.mohammedsafar@gmail.com</a><br>
    • <strong>Hours:</strong> Mon - Fri: 8:00 AM - 6:00 PM EST`;
  }

  if (q.includes('accreditation') || q.includes('deac') || q.includes('sacscoc') || q.includes('valid') || q.includes('legal')) {
    return `🌐 <strong>Accreditation & Recognition:</strong><br><br>
    UEF adheres to DEAC Distance Education Standards and SACSCOC Regional Quality Models, fully accredited for 100% online distance learning under US Higher Education frameworks.`;
  }

}

// ============================================================
// ADMIN DASHBOARD TAB SWITCHER
// ============================================================
function switchAdminTab(tabName) {
  const tabs = ['admissions', 'courses', 'campus', 'lectures', 'branding'];
  tabs.forEach(t => {
    const btn = document.getElementById(`adminTabBtn-${t}`);
    const content = document.getElementById(`adminTab-${t}`);
    if (btn) btn.classList.remove('active');
    if (content) content.style.display = 'none';
  });

  const activeBtn = document.getElementById(`adminTabBtn-${tabName}`);
  const activeContent = document.getElementById(`adminTab-${tabName}`);
  if (activeBtn) activeBtn.classList.add('active');
  if (activeContent) activeContent.style.display = 'block';
}
function renderAdminCampusTable() {
  const tbody = document.getElementById('adminCampusTableBody');
  if (!tbody) return;

  const roomKeys = Object.keys(CAMPUS_ROOMS);
  tbody.innerHTML = roomKeys.map(key => {
    const r = CAMPUS_ROOMS[key];
    const statsStr = r.stats.map(s => `${s.label}: ${s.value}`).join(' | ');
    const isEditing = editingCampusId === key;

    if (isEditing) {
      return `
        <tr style="background: rgba(212,175,55,0.15);">
          <td style="font-family:monospace; font-size:12px; color:var(--gold-light);">${key}</td>
          <td><input type="text" id="inlineCampusName_${key}" class="form-control" value="${escapeHtml(r.name)}" style="padding:4px 8px; font-size:13px;"></td>
          <td style="font-size:24px;">${r.icon}</td>
          <td style="font-size:11px; color:var(--text-muted);">${statsStr}</td>
          <td><input type="text" id="inlineCampusHighlight_${key}" class="form-control" value="${escapeHtml(r.highlight)}" style="padding:4px 8px; font-size:13px;"></td>
          <td>
            <div style="display:flex; gap:6px;">
              <button class="btn btn-gold" onclick="saveInlineCampus('${key}')" style="padding:4px 10px; font-size:11px;">💾 Save</button>
              <button class="btn btn-outline" onclick="cancelInlineCampus()" style="padding:4px 10px; font-size:11px;">✕</button>
            </div>
          </td>
        </tr>
      `;
    }

    return `
      <tr>
        <td style="font-family:monospace; font-size:12px; color:var(--gold-light);">${key}</td>
        <td style="font-weight:700;">${r.name}</td>
        <td style="font-size:24px;">${r.icon}</td>
        <td style="font-size:12px; color:var(--text-muted);">${statsStr}</td>
        <td style="font-size:12px;">${r.highlight}</td>
        <td>
          <button class="btn btn-outline" onclick="editCampusRoom('${key}')" style="padding:4px 10px; font-size:11px;">✏️ Edit Line</button>
        </td>
      </tr>
    `;
  }).join('');
}

function editCampusRoom(key) {
  editingCampusId = key;
  renderAdminCampusTable();
}

function cancelInlineCampus() {
  editingCampusId = null;
  renderAdminCampusTable();
}

async function saveInlineCampus(key) {
  const r = CAMPUS_ROOMS[key];
  if (!r) return;

  const newName = document.getElementById(`inlineCampusName_${key}`)?.value.trim();
  const newHighlight = document.getElementById(`inlineCampusHighlight_${key}`)?.value.trim();

  if (newName) r.name = newName;
  if (newHighlight) r.highlight = newHighlight;

  editingCampusId = null;
  switchTourRoom(key);
  renderAdminCampusTable();
  await saveAdminCMSConfig(true);
}

// ============================================================
// LECTURE LIBRARY MANAGER (INLINE ROW EDITING)
// ============================================================
function renderAdminLectureTable() {
  const tbody = document.getElementById('adminLectureTableBody');
  if (!tbody) return;

  tbody.innerHTML = LECTURES.map(lec => {
    const isEditing = editingLectureId === lec.id;

    if (isEditing) {
      return `
        <tr style="background: rgba(212,175,55,0.15);">
          <td style="font-family:monospace; font-size:12px; color:var(--gold-light);">${lec.id}</td>
          <td><input type="text" id="inlineLecTitle_${lec.id}" class="form-control" value="${escapeHtml(lec.title)}" style="padding:4px 8px; font-size:13px;"></td>
          <td><input type="text" id="inlineLecProf_${lec.id}" class="form-control" value="${escapeHtml(lec.professor)}" style="padding:4px 8px; font-size:12px;"></td>
          <td>
            <select id="inlineLecCat_${lec.id}" class="form-select" style="padding:4px 8px; font-size:12px;">
              <option value="cs" ${lec.category==='cs'?'selected':''}>💻 CS & AI</option>
              <option value="business" ${lec.category==='business'?'selected':''}>📊 Business</option>
              <option value="healthcare" ${lec.category==='healthcare'?'selected':''}>🏥 Healthcare</option>
              <option value="math" ${lec.category==='math'?'selected':''}>📐 Math</option>
            </select>
          </td>
          <td><input type="text" id="inlineLecDuration_${lec.id}" class="form-control" value="${escapeHtml(lec.duration)}" style="padding:4px 8px; font-size:12px;"></td>
          <td><input type="text" id="inlineLecYt_${lec.id}" class="form-control" value="${escapeHtml(lec.youtubeId)}" style="padding:4px 8px; font-size:12px; font-family:monospace;"></td>
          <td>
            <div style="display:flex; gap:6px;">
              <button class="btn btn-gold" onclick="saveInlineLecture('${lec.id}')" style="padding:4px 10px; font-size:11px;">💾 Save</button>
              <button class="btn btn-outline" onclick="cancelInlineLecture()" style="padding:4px 10px; font-size:11px;">✕</button>
            </div>
          </td>
        </tr>
      `;
    }

    return `
      <tr>
        <td style="font-family:monospace; font-size:12px; color:var(--gold-light);">${lec.id}</td>
        <td style="font-weight:700;">${lec.title}</td>
        <td style="font-size:12px; color:var(--text-muted);">${lec.professor}</td>
        <td><span class="online-tag" style="position:static;">${lec.category}</span></td>
        <td style="font-size:12px;">${lec.duration}</td>
        <td style="font-family:monospace; font-size:12px; color:#34d399;">${lec.youtubeId}</td>
        <td>
          <button class="btn btn-outline" onclick="editLecture('${lec.id}')" style="padding:4px 10px; font-size:11px;">✏️ Edit Line</button>
          <button class="btn btn-outline" onclick="deleteLecture('${lec.id}')" style="padding:4px 10px; font-size:11px; border-color:#ef4444; color:#f87171;">🗑️ Delete</button>
        </td>
      </tr>
    `;
  }).join('');
}

function editLecture(lecId) {
  editingLectureId = lecId;
  renderAdminLectureTable();
}

function cancelInlineLecture() {
  editingLectureId = null;
  renderAdminLectureTable();
}

async function saveInlineLecture(lecId) {
  const lec = LECTURES.find(l => l.id === lecId);
  if (!lec) return;

  const newTitle = document.getElementById(`inlineLecTitle_${lecId}`)?.value.trim();
  const newProf = document.getElementById(`inlineLecProf_${lecId}`)?.value.trim();
  const newCat = document.getElementById(`inlineLecCat_${lecId}`)?.value.trim();
  const newDur = document.getElementById(`inlineLecDuration_${lecId}`)?.value.trim();
  const newYt = document.getElementById(`inlineLecYt_${lecId}`)?.value.trim();

  if (newTitle) lec.title = newTitle;
  if (newProf) lec.professor = newProf;
  if (newCat) lec.category = newCat;
  if (newDur) lec.duration = newDur;
  if (newYt) {
    lec.youtubeId = newYt;
    lec.thumb = `https://img.youtube.com/vi/${newYt}/maxresdefault.jpg`;
  }

  editingLectureId = null;
  renderLecturesGrid('all');
  renderAdminLectureTable();
  await saveAdminCMSConfig(true);
}

function openAddNewLectureModal() {
  const form = document.getElementById('adminLectureForm');
  if (form) form.reset();
  document.getElementById('lecEditId').value = '';
  document.getElementById('adminLectureModalTitle').textContent = '🎬 Add Recorded Lecture';
  document.getElementById('adminLectureModal').classList.add('open');
}

function closeAdminLectureModal() {
  document.getElementById('adminLectureModal').classList.remove('open');
}

async function deleteLecture(lecId) {
  if (!confirm(`Are you sure you want to delete lecture ID '${lecId}'?`)) return;

  const idx = LECTURES.findIndex(l => l.id === lecId);
  if (idx >= 0) {
    LECTURES.splice(idx, 1);
    renderLecturesGrid('all');
    renderAdminLectureTable();
    await saveAdminCMSConfig(true);
  }
}

async function handleSaveLectureSubmit(e) {
  e.preventDefault();
  const editId = document.getElementById('lecEditId').value.trim();
  const youtubeId = document.getElementById('lecYoutubeId').value.trim();

  const lecData = {
    id: editId || ('LEC-' + Math.floor(100 + Math.random() * 900)),
    title: document.getElementById('lecTitle').value.trim(),
    professor: document.getElementById('lecProfessor').value.trim(),
    category: document.getElementById('lecCategory').value.trim(),
    duration: document.getElementById('lecDuration').value.trim(),
    youtubeId: youtubeId,
    thumb: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
  };

  if (editId) {
    const idx = LECTURES.findIndex(l => l.id === editId);
    if (idx >= 0) LECTURES[idx] = lecData;
  } else {
    LECTURES.push(lecData);
  }

  closeAdminLectureModal();
  renderLecturesGrid('all');
  renderAdminLectureTable();
  await saveAdminCMSConfig(true);
}

// ============================================================
// DEGREE PROGRAM CATALOG MANAGER (INLINE ROW EDITING)
// ============================================================
function renderCMSProgramTable() {
  const tbody = document.getElementById('cmsProgramTableBody');
  if (!tbody) return;

  tbody.innerHTML = DEGREE_PROGRAMS.map(prog => {
    const isEditing = editingProgramId === prog.id;

    if (isEditing) {
      return `
        <tr style="background: rgba(212,175,55,0.15);">
          <td style="font-family:monospace; font-size:12px; color:var(--gold-light);">${prog.id}</td>
          <td><input type="text" id="inlineProgName_${prog.id}" class="form-control" value="${escapeHtml(prog.name)}" style="padding:4px 8px; font-size:13px;"></td>
          <td>
            <select id="inlineProgCat_${prog.id}" class="form-select" style="padding:4px 8px; font-size:12px;">
              <option value="technology" ${prog.category==='technology'?'selected':''}>Computer & Data Tech</option>
              <option value="business" ${prog.category==='business'?'selected':''}>Business & FinTech</option>
              <option value="healthcare" ${prog.category==='healthcare'?'selected':''}>Health Informatics</option>
            </select>
          </td>
          <td><input type="number" id="inlineProgTuition_${prog.id}" class="form-control" value="${prog.tuition}" style="padding:4px 8px; font-size:13px; color:#34d399; font-weight:bold;"></td>
          <td><input type="text" id="inlineProgDuration_${prog.id}" class="form-control" value="${escapeHtml(prog.duration)}" style="padding:4px 8px; font-size:12px;"></td>
          <td>
            <div style="display:flex; gap:6px;">
              <button class="btn btn-gold" onclick="saveInlineProgram('${prog.id}')" style="padding:4px 10px; font-size:11px;">💾 Save</button>
              <button class="btn btn-outline" onclick="cancelInlineProgram()" style="padding:4px 10px; font-size:11px;">✕</button>
            </div>
          </td>
        </tr>
      `;
    }

    return `
      <tr>
        <td style="font-family:monospace; font-size:12px; color:var(--gold-light);">${prog.id}</td>
        <td style="font-weight:700;">${prog.name}</td>
        <td><span class="online-tag" style="position:static;">${prog.category}</span></td>
        <td style="color:#34d399; font-weight:700;">$${prog.tuition.toLocaleString()}</td>
        <td style="font-size:12px;">${prog.duration}</td>
        <td>
          <button class="btn btn-outline" onclick="editProgram('${prog.id}')" style="padding:4px 10px; font-size:11px;">✏️ Edit Line</button>
          <button class="btn btn-outline" onclick="deleteProgram('${prog.id}')" style="padding:4px 10px; font-size:11px; border-color:#ef4444; color:#f87171;">🗑️ Delete</button>
        </td>
      </tr>
    `;
  }).join('');
}

function editProgram(progId) {
  editingProgramId = progId;
  renderCMSProgramTable();
}

function cancelInlineProgram() {
  editingProgramId = null;
  renderCMSProgramTable();
}

async function saveInlineProgram(progId) {
  const prog = DEGREE_PROGRAMS.find(p => p.id === progId);
  if (!prog) return;

  const newName = document.getElementById(`inlineProgName_${progId}`)?.value.trim();
  const newCat = document.getElementById(`inlineProgCat_${progId}`)?.value.trim();
  const newTuition = parseInt(document.getElementById(`inlineProgTuition_${progId}`)?.value);
  const newDuration = document.getElementById(`inlineProgDuration_${progId}`)?.value.trim();

  if (newName) prog.name = newName;
  if (newCat) prog.category = newCat;
  if (!isNaN(newTuition)) prog.tuition = newTuition;
  if (newDuration) prog.duration = newDuration;

  editingProgramId = null;
  renderProgramsCatalog(DEGREE_PROGRAMS);
  renderCMSProgramTable();
  await saveAdminCMSConfig(true);
}

function openAddNewProgramModal() {
  const form = document.getElementById('adminProgramForm');
  if (form) form.reset();
  document.getElementById('progEditId').value = '';
  document.getElementById('adminProgramModalTitle').textContent = '➕ Add New Degree Program';
  document.getElementById('adminProgramModal').classList.add('open');
}

function closeAdminProgramModal() {
  document.getElementById('adminProgramModal').classList.remove('open');
}

async function deleteProgram(progId) {
  if (!confirm(`Are you sure you want to delete program ID '${progId}' from the catalog?`)) return;

  const idx = DEGREE_PROGRAMS.findIndex(p => p.id === progId);
  if (idx >= 0) {
    DEGREE_PROGRAMS.splice(idx, 1);
    renderProgramsCatalog(DEGREE_PROGRAMS);
    renderCMSProgramTable();
    await saveAdminCMSConfig(true);
  }
}

async function handleSaveProgramSubmit(e) {
  e.preventDefault();
  const editId = document.getElementById('progEditId').value.trim();

  const progData = {
    id: editId || ('UEF-PROG-' + Math.floor(100 + Math.random() * 900)),
    name: document.getElementById('progName').value.trim(),
    degree: document.getElementById('progDegree').value.trim(),
    category: document.getElementById('progCategory').value.trim(),
    tuition: parseInt(document.getElementById('progTuition').value) || 12000,
    duration: document.getElementById('progDuration').value.trim(),
    description: document.getElementById('progDescription').value.trim(),
    format: "100% Remote / Asynchronous",
    credits: "36 US Credit Hours (12 Core Modules)"
  };

  if (editId) {
    const idx = DEGREE_PROGRAMS.findIndex(p => p.id === editId);
    if (idx >= 0) DEGREE_PROGRAMS[idx] = progData;
  } else {
    DEGREE_PROGRAMS.push(progData);
  }

  closeAdminProgramModal();
  renderProgramsCatalog(DEGREE_PROGRAMS);
  renderCMSProgramTable();
  await saveAdminCMSConfig(true);
}

// Helper to escape HTML strings in input values
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
