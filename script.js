// ==========================================================================
// FUTURISTIC OS BENTO PORTFOLIO & FIREBASE CLOUD SYNC ENGINE
// Real-time Cloud Synchronization • Firestore DB • PIN-Protected Admin
// ==========================================================================

const STORAGE_KEY = 'webportfolio_os_v2_data';
const SECURITY_KEY = 'webportfolio_os_security_pin';
const FIREBASE_CONFIG_KEY = 'webportfolio_firebase_config';
const DEFAULT_PIN = '2026';

// 1. DEFAULT PORTFOLIO DATA INITIALIZER
const DEFAULT_DATA = {
  profile: {
    name: 'MANOJ KUMAR R',
    role: 'FULL-STACK DEVELOPER',
    email: 'manojkumarrbca@srmasc.ac.in',
    year: '2026',
    bio: 'Passionate Full-Stack Developer & System Architect with expertise in building high-performance web applications, automated workflows, and robust database architectures. Skilled in solving complex technical challenges and optimizing end-to-end digital systems.',
    systemStatus: 'SYSTEM ONLINE',
    portraitType: 'default', // 'default' (SVG) | 'custom' (URL/Base64)
    portraitSrc: ''
  },
  work: {
    summary: 'Specialize in building custom web platforms, process automation engines, and system integrations for clients and businesses to optimize workflow efficiency.',
    availability: 'Available for New Projects & Architectural Consultations'
  },
  projects: [
    {
      id: 'proj-1',
      title: 'Full-Stack Billing Application',
      subtitle: 'Custom Operations & Management Tool',
      tag: 'Production Ready • Scalable Backend',
      url: ''
    },
    {
      id: 'proj-2',
      title: 'IoT Tourist Safety Prototype',
      subtitle: 'Real-time System & Hardware Architecture',
      tag: 'ESP32 / Telemetry • Live Tracking',
      url: ''
    },
    {
      id: 'proj-3',
      title: 'College Schedule Manager',
      subtitle: 'Full-Stack Web App',
      tag: 'Automated Conflict Resolution',
      url: ''
    },
    {
      id: 'proj-4',
      title: 'Computer Engineering Degree',
      subtitle: 'Core Software & Systems Foundation',
      tag: 'Data Structures & Distributed Systems',
      url: ''
    }
  ],
  skills: [
    {
      id: 'skill-1',
      title: 'Python & Backend Systems',
      detail: 'FastAPI, Django, AsyncIO, REST APIs'
    },
    {
      id: 'skill-2',
      title: 'C & Low-Level Programming',
      detail: 'Memory Management, Algorithms, CLI'
    },
    {
      id: 'skill-3',
      title: 'Flutter & Cross-Platform Mobile',
      detail: 'Dart, State Management, Clean Architecture'
    },
    {
      id: 'skill-4',
      title: 'SQL & Database Architecture',
      detail: 'PostgreSQL, Query Optimization, Indexing'
    },
    {
      id: 'skill-5',
      title: 'IoT Architecture & Automation',
      detail: 'Microcontrollers, MQTT, Sensor Telemetry'
    },
    {
      id: 'skill-6',
      title: 'Full-Stack Web Development',
      detail: 'Modern JS, Modern CSS, Performance & UI/UX'
    }
  ],
  competencies: [
    { id: 'comp-1', title: 'Problem Solving', icon: 'cpu' },
    { id: 'comp-2', title: 'Client Communication', icon: 'message-square' },
    { id: 'comp-3', title: 'System Architecture', icon: 'layers' },
    { id: 'comp-4', title: 'Team Leadership', icon: 'users' },
    { id: 'comp-5', title: 'Adaptability', icon: 'zap' }
  ],
  socials: [
    { id: 'soc-github', platform: 'GitHub', url: '', enabled: false, icon: 'github' },
    { id: 'soc-linkedin', platform: 'LinkedIn', url: '', enabled: false, icon: 'linkedin' },
    { id: 'soc-twitter', platform: 'Twitter', url: '', enabled: false, icon: 'twitter' },
    { id: 'soc-instagram', platform: 'Instagram', url: '', enabled: false, icon: 'instagram' },
    { id: 'soc-youtube', platform: 'YouTube', url: '', enabled: false, icon: 'youtube' },
    { id: 'soc-facebook', platform: 'Facebook', url: '', enabled: false, icon: 'facebook' },
    { id: 'soc-dribbble', platform: 'Dribbble', url: '', enabled: false, icon: 'dribbble' },
    { id: 'soc-twitch', platform: 'Twitch', url: '', enabled: false, icon: 'twitch' }
  ],
  customSections: []
};

// SVG Default Portrait Template
const DEFAULT_SVG_PORTRAIT = `
<svg class="portrait-svg" viewBox="0 0 400 520" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Developer Portrait">
  <defs>
    <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2A2A2A"/>
      <stop offset="50%" stop-color="#181818"/>
      <stop offset="100%" stop-color="#0E0E0E"/>
    </linearGradient>
    <radialGradient id="rimLight" cx="50%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="400" height="520" fill="url(#avatarGrad)"/>
  <circle cx="200" cy="180" r="140" fill="url(#rimLight)"/>
  <path d="M200 100 C150 100 125 140 125 195 C125 240 155 270 200 270 C245 270 275 240 275 195 C275 140 250 100 200 100 Z" fill="#242424" stroke="rgba(255,255,255,0.18)" stroke-width="1.5"/>
  <path d="M125 180 C120 130 150 85 200 85 C255 85 282 125 275 180 C265 140 245 115 200 115 C155 115 135 140 125 180 Z" fill="#3D3D3D"/>
  <path d="M140 160 C155 135 180 125 210 125 C240 125 260 140 268 165 C255 148 235 140 210 140 C180 140 158 150 140 160 Z" fill="#525252"/>
  <rect x="150" y="180" width="40" height="24" rx="6" fill="#141414" stroke="#A0A0A0" stroke-width="2"/>
  <rect x="210" y="180" width="40" height="24" rx="6" fill="#141414" stroke="#A0A0A0" stroke-width="2"/>
  <line x1="190" y1="192" x2="210" y2="192" stroke="#A0A0A0" stroke-width="2"/>
  <path d="M175 265 L175 310 L225 310 L225 265 Z" fill="#1E1E1E"/>
  <path d="M110 370 C110 320 145 305 175 305 L225 305 C255 305 290 320 290 370 L330 520 L70 520 Z" fill="#181818" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
  <path d="M175 305 L200 370 L225 305 Z" fill="#101010"/>
  <line x1="40" y1="40" x2="120" y2="40" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <line x1="40" y1="40" x2="40" y2="120" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <line x1="360" y1="480" x2="280" y2="480" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <line x1="360" y1="480" x2="360" y2="400" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
</svg>
`;

let currentData = null;
let firestoreDb = null;
let isFirebaseConnected = false;

// 2. STATE STORAGE & RETRIEVAL
function loadLocalData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      currentData = JSON.parse(raw);
      // Data migration to fix broken icons
      if (currentData.socials) {
        currentData.socials.forEach(s => {
          if (!s.icon || s.icon === 'link' || s.icon === 'null') {
            s.icon = s.platform.toLowerCase().replace(/[^a-z0-9]/g, '');
          }
        });
      }
      if (currentData.projects) {
        currentData.projects.forEach(p => {
          if (typeof p.url !== 'string') p.url = '';
        });
      }
    } else {
      currentData = JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
  } catch (e) {
    console.error('Failed to load local data, using defaults:', e);
    currentData = JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
  return currentData;
}

function saveLocalData(data) {
  currentData = data;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Local storage error:', e);
  }
}

function getSecurityPin() {
  return localStorage.getItem(SECURITY_KEY) || DEFAULT_PIN;
}

function setSecurityPin(newPin) {
  localStorage.setItem(SECURITY_KEY, newPin);
}

function getStoredFirebaseConfig() {
  const raw = localStorage.getItem(FIREBASE_CONFIG_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error(e);
    }
  }
  
  // Return hardcoded config for public visitors (Safe because writes are protected by Rules)
  return {
    apiKey: "AIzaSyCLIK7SpqzTdNP-9X9zSAOG4OavxWE8q1E",
    authDomain: "my-portfolio-bf33a.firebaseapp.com",
    projectId: "my-portfolio-bf33a",
    storageBucket: "my-portfolio-bf33a.firebasestorage.app",
    messagingSenderId: "859331816205",
    appId: "1:859331816205:web:4d8450bfbbb162d92b9e44",
    measurementId: "G-8YTEY77ERE"
  };
}

function setStoredFirebaseConfig(configObj) {
  localStorage.setItem(FIREBASE_CONFIG_KEY, JSON.stringify(configObj));
}

// 3. FIREBASE FIRESTORE SYNC ENGINE
async function initFirebaseSync() {
  const config = getStoredFirebaseConfig();
  const cloudStatusBadge = document.getElementById('cloudStatusBadge');
  const cloudStatusText = document.getElementById('cloudStatusText');
  const cloudStatusCard = document.getElementById('cloudStatusCard');
  const cloudConnectionTitle = document.getElementById('cloudConnectionTitle');
  const cloudConnectionSubtitle = document.getElementById('cloudConnectionSubtitle');

  const updateStatusUI = (connected, msg) => {
    isFirebaseConnected = connected;
    if (cloudStatusBadge) {
      if (connected) {
        cloudStatusBadge.classList.add('connected');
        if (cloudStatusText) cloudStatusText.textContent = 'CLOUD SYNC ACTIVE';
      } else {
        cloudStatusBadge.classList.remove('connected');
        if (cloudStatusText) cloudStatusText.textContent = msg || 'LOCAL MODE';
      }
    }
    if (cloudStatusCard) {
      if (connected) {
        cloudStatusCard.classList.add('connected');
        if (cloudConnectionTitle) cloudConnectionTitle.textContent = '🟢 Firebase Cloud Sync: Connected & Active';
        if (cloudConnectionSubtitle) cloudConnectionSubtitle.textContent = 'All changes made in your admin dashboard sync to all visitors in real-time.';
      } else {
        cloudStatusCard.classList.remove('connected');
        if (cloudConnectionTitle) cloudConnectionTitle.textContent = '⚪ Firebase Cloud Sync: Offline / Local Mode';
        if (cloudConnectionSubtitle) cloudConnectionSubtitle.textContent = 'Connect your free Firebase Firestore database below to enable real-time 1-second global updates.';
      }
    }
  };

  if (!config || !config.apiKey || !config.projectId) {
    updateStatusUI(false, 'LOCAL MODE');
    return;
  }

  try {
    if (!window.FirebaseApp) {
      // Wait briefly if script module is still parsing
      await new Promise(res => setTimeout(res, 200));
    }

    if (window.FirebaseApp) {
      const { initializeApp, getFirestore, doc, getDoc } = window.FirebaseApp;
      const app = initializeApp(config, 'portfolio-app-' + Date.now());
      firestoreDb = getFirestore(app);

      // Fetch latest document from Firestore
      const docRef = doc(firestoreDb, 'portfolio', 'content');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const cloudData = docSnap.data();
        saveLocalData(cloudData);
        renderPortfolio(cloudData);
      }
      updateStatusUI(true);
    }
  } catch (err) {
    console.warn('Firebase sync initialization notice:', err.message);
    updateStatusUI(false, 'CLOUD OFFLINE');
  }
}

async function syncToFirebase(data) {
  if (!firestoreDb || !isFirebaseConnected) {
    return false;
  }
  try {
    const { doc, setDoc } = window.FirebaseApp;
    const docRef = doc(firestoreDb, 'portfolio', 'content');
    
    // Attach the security PIN to the payload for database-level authentication
    const payload = {
      ...data,
      _adminPin: getSecurityPin()
    };
    
    await setDoc(docRef, payload);
    return true;
  } catch (err) {
    console.error('Firebase save error:', err);
    return false;
  }
}

// 4. TOAST NOTIFICATIONS
function showToast(message) {
  const toast = document.getElementById('osToast');
  const msgEl = document.getElementById('toastMsg');
  if (!toast || !msgEl) return;
  msgEl.textContent = message;
  toast.classList.add('active');
  setTimeout(() => {
    toast.classList.remove('active');
  }, 3200);
}

// 5. MAIN VIEW RENDERER
function renderPortfolio(data) {
  const viewName = document.getElementById('viewName');
  const viewRole = document.getElementById('viewRole');
  const viewEmail = document.getElementById('viewEmail');
  const viewBio = document.getElementById('viewBio');
  const viewYearText = document.getElementById('viewYearText');
  const viewSystemStatus = document.getElementById('viewSystemStatus');
  const emailPill = document.getElementById('emailPill');

  if (viewName) viewName.textContent = data.profile.name || 'YOUR NAME';
  if (viewRole) viewRole.textContent = data.profile.role || 'FULL-STACK DEVELOPER';
  if (viewEmail) viewEmail.textContent = data.profile.email || 'user@domain.com';
  if (viewBio) viewBio.textContent = data.profile.bio || '';
  if (viewYearText) viewYearText.textContent = data.profile.year || '2026';
  if (viewSystemStatus) viewSystemStatus.textContent = data.profile.systemStatus || 'SYSTEM ONLINE';
  if (emailPill) emailPill.href = `mailto:${data.profile.email || ''}`;

  // Portrait Image
  const wrapper = document.getElementById('portraitImageWrapper');
  if (wrapper) {
    if (data.profile.portraitType === 'custom' && data.profile.portraitSrc) {
      wrapper.innerHTML = `<img src="${data.profile.portraitSrc}" alt="${data.profile.name}" class="portrait-img">`;
    } else {
      wrapper.innerHTML = DEFAULT_SVG_PORTRAIT;
    }
  }

  // Experience & Education Timeline
  const expList = document.getElementById('experienceTimelineList');
  if (expList) {
    expList.innerHTML = (data.projects || []).map(p => {
      const linkBtn = p.url ? `<a href="${escapeHtml(p.url)}" target="_blank" rel="noopener noreferrer" class="timeline-link-btn" title="View Project">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>` : '';
      return `
        <div class="timeline-item" data-id="${p.id}">
          <div class="timeline-node">
            <span class="node-ring"></span>
            <span class="node-core"></span>
          </div>
          <div class="timeline-content">
            <div class="timeline-heading-row">
              <h3 class="timeline-heading">${escapeHtml(p.title)}</h3>
              ${linkBtn}
            </div>
            <p class="timeline-sub">${escapeHtml(p.subtitle)}</p>
            ${p.tag ? `<span class="timeline-tag">${escapeHtml(p.tag)}</span>` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  // Technical Skills Nodes
  const skillsList = document.getElementById('technicalSkillsList');
  if (skillsList) {
    skillsList.innerHTML = (data.skills || []).map(s => `
      <div class="tech-node-item" data-id="${s.id}">
        <div class="tech-node-bullet">
          <span class="bullet-inner"></span>
        </div>
        <div class="tech-node-info">
          <span class="tech-node-title">${escapeHtml(s.title)}</span>
          <span class="tech-node-detail">${escapeHtml(s.detail)}</span>
        </div>
      </div>
    `).join('');
  }

  // Work & Automation
  const viewWorkSummary = document.getElementById('viewWorkSummary');
  const viewAvailability = document.getElementById('viewAvailability');
  if (viewWorkSummary) viewWorkSummary.textContent = data.work.summary || '';
  if (viewAvailability) viewAvailability.textContent = data.work.availability || '';

  // Core Competencies
  const compList = document.getElementById('competenciesList');
  if (compList) {
    compList.innerHTML = (data.competencies || []).map(c => `
      <div class="competency-pill" data-id="${c.id}">
        <i data-lucide="${c.icon || 'tag'}" class="pill-mini-icon"></i>
        <span>${escapeHtml(c.title)}</span>
      </div>
    `).join('');
  }

  // Socials — Lucide removed brand icons, so use inline SVGs
  const SOCIAL_SVG_MAP = {
    'github': '<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>',
    'linkedin': '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>',
    'twitter': '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',
    'instagram': '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>',
    'youtube': '<path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>',
    'facebook': '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>',
    'dribbble': '<path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.81zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.91 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>',
    'twitch': '<path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>',
    'discord': '<path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>',
    'tiktok': '<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>',
    'reddit': '<path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>',
    'pinterest': '<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>',
    'whatsapp': '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>',
    'telegram': '<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>',
    'snapchat': '<path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301a.32.32 0 01.139-.03c.07 0 .2.015.299.09a.292.292 0 01.12.27c-.008.15-.105.27-.196.349a3.86 3.86 0 01-.145.109c-.18.12-.42.239-.63.33a2.27 2.27 0 01-.554.166c-.025.095-.055.3-.055.45 0 .15.015.27.04.39.18 1.68 2.07 3.72 4.32 4.11.225.045.435.24.435.48a.56.56 0 01-.09.27c-.405.63-1.695.855-2.16.945-.15.029-.27.06-.344.09-.09.045-.12.12-.15.225-.022.06-.045.12-.075.195-.105.3-.195.45-.375.51a.58.58 0 01-.18.03c-.255 0-.66-.135-1.14-.3-.36-.12-.78-.27-1.26-.345a4.79 4.79 0 00-.72-.06c-.3 0-.555.045-.84.135-.405.12-.855.375-1.38.675C14.408 18.766 13.167 19.5 12 19.5s-2.408-.735-3.42-1.38c-.525-.3-.975-.555-1.38-.675a3.37 3.37 0 00-.84-.135c-.255 0-.495.015-.72.06-.48.075-.9.225-1.26.345-.48.165-.885.3-1.14.3a.58.58 0 01-.18-.03c-.18-.06-.27-.21-.375-.51-.03-.075-.045-.135-.075-.195-.03-.105-.06-.18-.15-.225-.075-.03-.195-.06-.345-.09-.465-.09-1.755-.315-2.16-.945a.56.56 0 01-.09-.27c0-.24.21-.435.435-.48 2.25-.39 4.14-2.43 4.32-4.11.025-.12.04-.24.04-.39 0-.15-.03-.36-.06-.45a2.22 2.22 0 01-.554-.165c-.21-.09-.45-.21-.63-.33a3.86 3.86 0 01-.144-.11c-.09-.078-.189-.198-.198-.348a.288.288 0 01.12-.27.34.34 0 01.3-.09c.07 0 .14.01.14.01.374.181.734.301 1.033.301.196 0 .33-.045.4-.09a18.32 18.32 0 01-.032-.51l-.004-.06c-.104-1.628-.23-3.654.3-4.847C7.86 1.069 11.216.793 12.206.793z"/>'
  };
  const socialsWrap = document.getElementById('socialsWrap');
  if (socialsWrap) {
    const activeSocials = (data.socials || []).filter(s => s.enabled && s.url);
    socialsWrap.innerHTML = activeSocials.map(s => {
      const platformKey = (s.platform || '').toLowerCase().trim();
      const svgPaths = SOCIAL_SVG_MAP[platformKey];
      const iconHtml = svgPaths
        ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">${svgPaths}</svg>`
        : `<i data-lucide="${escapeHtml(s.icon || 'link')}"></i>`;
      return `
        <a href="${escapeHtml(s.url)}" target="_blank" class="social-icon-pill" title="${escapeHtml(s.platform)}">
          ${iconHtml}
        </a>
      `;
    }).join('');
  }

  // Custom Sections
  const customSectionsContainer = document.getElementById('customSectionsContainer');
  if (customSectionsContainer) {
    customSectionsContainer.innerHTML = (data.customSections || []).map(section => `
      <div class="content-row">
        <div class="section-title-wrapper">
          <h2 class="section-title">${escapeHtml(section.title)}</h2>
          <div class="title-line"></div>
          <div class="dot-matrix" aria-hidden="true">
            <span></span><span></span><span></span>
            <span></span><span></span><span></span>
          </div>
        </div>
        <div class="tech-nodes-list">
          ${(section.items || []).map(item => `
            <div class="tech-node-item">
              <div class="tech-node-bullet"><span class="bullet-inner"></span></div>
              <div class="tech-node-info">
                <span class="tech-node-title">${escapeHtml(item.title)}</span>
                <span class="tech-node-detail">${escapeHtml(item.detail)}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  if (window.lucide) window.lucide.createIcons();
  populateSearchModal(data);
}

// 6. SEARCH & COMMAND PALETTE
function populateSearchModal(data) {
  const modalResults = document.getElementById('modalResults');
  if (!modalResults) return;

  let itemsHtml = `
    <div class="result-item" data-action="email">
      <i data-lucide="mail"></i>
      <div>
        <strong>Contact Developer</strong>
        <span>${escapeHtml(data.profile.email)}</span>
      </div>
    </div>
  `;

  (data.projects || []).forEach(p => {
    itemsHtml += `
      <div class="result-item" data-action="experience">
        <i data-lucide="briefcase"></i>
        <div>
          <strong>${escapeHtml(p.title)}</strong>
          <span>${escapeHtml(p.subtitle)}</span>
        </div>
      </div>
    `;
  });

  (data.skills || []).forEach(s => {
    itemsHtml += `
      <div class="result-item" data-action="skills">
        <i data-lucide="code"></i>
        <div>
          <strong>${escapeHtml(s.title)}</strong>
          <span>${escapeHtml(s.detail)}</span>
        </div>
      </div>
    `;
  });

  modalResults.innerHTML = itemsHtml;
  if (window.lucide) window.lucide.createIcons();
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}

// 7. SECRET PIN AUTHENTICATION & STEALTH DASHBOARD CONTROLLER
function initStealthAdmin() {
  const authModal = document.getElementById('authModal');
  const authForm = document.getElementById('authForm');
  const authPinInput = document.getElementById('authPinInput');
  const authErrorMsg = document.getElementById('authErrorMsg');
  const authCancelBtn = document.getElementById('authCancelBtn');
  const secretAdminTrigger = document.getElementById('secretAdminTrigger');

  const adminModal = document.getElementById('adminModal');
  const closeAdminBtn = document.getElementById('closeAdminBtn');
  const cancelAdminBtn = document.getElementById('cancelAdminBtn');
  const saveChangesBtn = document.getElementById('saveChangesBtn');
  const saveAndCloseBtn = document.getElementById('saveAndCloseBtn');
  const resetDefaultsBtn = document.getElementById('resetDefaultsBtn');

  // Inputs
  const inputName = document.getElementById('inputName');
  const inputRole = document.getElementById('inputRole');
  const inputEmail = document.getElementById('inputEmail');
  const inputYear = document.getElementById('inputYear');
  const inputBio = document.getElementById('inputBio');
  const inputSystemStatus = document.getElementById('inputSystemStatus');
  const inputPortraitUrl = document.getElementById('inputPortraitUrl');
  const portraitFileInput = document.getElementById('portraitFileInput');
  const useDefaultAvatarBtn = document.getElementById('useDefaultAvatarBtn');
  const removePhotoBtn = document.getElementById('removePhotoBtn');
  const adminPortraitPreview = document.getElementById('adminPortraitPreview');
  const inputWorkSummary = document.getElementById('inputWorkSummary');
  const inputAvailability = document.getElementById('inputAvailability');
  const inputFirebaseConfig = document.getElementById('inputFirebaseConfig');
  const testCloudConnectionBtn = document.getElementById('testCloudConnectionBtn');
  const inputNewPin = document.getElementById('inputNewPin');

  let workingData = null;

  const requestAuth = () => {
    if (authModal) {
      authModal.setAttribute('open', 'true');
      if (authPinInput) {
        authPinInput.value = '';
        setTimeout(() => authPinInput.focus(), 60);
      }
      if (authErrorMsg) authErrorMsg.classList.remove('visible');
    }
  };

  const closeAuth = () => {
    if (authModal) authModal.removeAttribute('open');
  };

  const openDashboard = () => {
    closeAuth();
    workingData = JSON.parse(JSON.stringify(currentData));
    populateAdminForm(workingData);
    if (adminModal) adminModal.setAttribute('open', 'true');
  };

  const closeDashboard = () => {
    if (adminModal) adminModal.removeAttribute('open');
  };

  // Form Submit for PIN
  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredPin = (authPinInput.value || '').trim();
      const validPin = getSecurityPin();

      if (enteredPin === validPin) {
        openDashboard();
      } else {
        if (authErrorMsg) {
          authErrorMsg.classList.add('visible');
          authPinInput.value = '';
          authPinInput.focus();
        }
      }
    });
  }

  if (authCancelBtn) authCancelBtn.addEventListener('click', closeAuth);
  if (closeAdminBtn) closeAdminBtn.addEventListener('click', closeDashboard);
  if (cancelAdminBtn) cancelAdminBtn.addEventListener('click', closeDashboard);

  // Hidden Trigger 1: Triple click indicator dot
  let clickCount = 0;
  let clickTimer = null;
  if (secretAdminTrigger) {
    secretAdminTrigger.addEventListener('click', () => {
      clickCount++;
      clearTimeout(clickTimer);
      if (clickCount >= 3) {
        clickCount = 0;
        requestAuth();
      } else {
        clickTimer = setTimeout(() => { clickCount = 0; }, 600);
      }
    });
  }

  // Hidden Trigger 2: Check URL query parameter (?admin=1 or #admin)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('admin') || window.location.hash === '#admin') {
    setTimeout(requestAuth, 300);
  }

  // Hidden Trigger 3: Secret Keyboard Shortcut (Ctrl+Shift+A or Cmd+Shift+A)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
      e.preventDefault();
      if (adminModal && adminModal.hasAttribute('open')) {
        closeDashboard();
      } else if (authModal && authModal.hasAttribute('open')) {
        closeAuth();
      } else {
        requestAuth();
      }
    }
  });

  // Admin Tab Navigation
  const tabBtns = document.querySelectorAll('.admin-tabs-nav .tab-btn');
  const tabPanes = document.querySelectorAll('.admin-tab-content-wrap .tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.getAttribute('data-tab'));
      if (target) target.classList.add('active');
    });
  });

  // Populate Admin Form Fields
  function populateAdminForm(data) {
    if (inputName) inputName.value = data.profile.name || '';
    if (inputRole) inputRole.value = data.profile.role || '';
    if (inputEmail) inputEmail.value = data.profile.email || '';
    if (inputYear) inputYear.value = data.profile.year || '2026';
    if (inputBio) inputBio.value = data.profile.bio || '';
    if (inputSystemStatus) inputSystemStatus.value = data.profile.systemStatus || 'SYSTEM ONLINE';
    if (inputPortraitUrl) inputPortraitUrl.value = data.profile.portraitType === 'custom' ? data.profile.portraitSrc : '';
    if (inputWorkSummary) inputWorkSummary.value = data.work.summary || '';
    if (inputAvailability) inputAvailability.value = data.work.availability || '';
    if (inputNewPin) inputNewPin.value = '';

    const storedCfg = getStoredFirebaseConfig();
    if (inputFirebaseConfig) {
      inputFirebaseConfig.value = storedCfg ? JSON.stringify(storedCfg, null, 2) : '';
    }

    // Ensure array fields exist
    data.projects = data.projects || [];
    data.skills = data.skills || [];
    data.competencies = data.competencies || [];
    data.socials = data.socials || [];
    data.customSections = data.customSections || [];

    updatePortraitPreview(data);
    renderAdminProjectsList(data.projects);
    renderAdminSkillsList(data.skills);
    renderAdminCompetenciesList(data.competencies);
    renderAdminSocialsList(data.socials);
    renderAdminCustomSectionsList(data.customSections);
  }

  function updatePortraitPreview(data) {
    if (!adminPortraitPreview) return;
    if (data.profile.portraitType === 'custom' && data.profile.portraitSrc) {
      adminPortraitPreview.innerHTML = `<img src="${data.profile.portraitSrc}" alt="Preview">`;
    } else {
      adminPortraitPreview.innerHTML = DEFAULT_SVG_PORTRAIT;
    }
  }

  // Handle Image Upload
  if (portraitFileInput) {
    portraitFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 2.5 * 1024 * 1024) {
        alert('Image exceeds 2.5MB. Please choose a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        workingData.profile.portraitType = 'custom';
        workingData.profile.portraitSrc = event.target.result;
        if (inputPortraitUrl) inputPortraitUrl.value = '';
        updatePortraitPreview(workingData);
      };
      reader.readAsDataURL(file);
    });
  }

  if (inputPortraitUrl) {
    inputPortraitUrl.addEventListener('input', (e) => {
      const url = e.target.value.trim();
      if (url) {
        workingData.profile.portraitType = 'custom';
        workingData.profile.portraitSrc = url;
      } else {
        workingData.profile.portraitType = 'default';
        workingData.profile.portraitSrc = '';
      }
      updatePortraitPreview(workingData);
    });
  }

  if (useDefaultAvatarBtn) {
    useDefaultAvatarBtn.addEventListener('click', () => {
      workingData.profile.portraitType = 'default';
      workingData.profile.portraitSrc = '';
      if (inputPortraitUrl) inputPortraitUrl.value = '';
      updatePortraitPreview(workingData);
    });
  }

  if (removePhotoBtn) {
    removePhotoBtn.addEventListener('click', () => {
      workingData.profile.portraitType = 'default';
      workingData.profile.portraitSrc = '';
      if (inputPortraitUrl) inputPortraitUrl.value = '';
      updatePortraitPreview(workingData);
    });
  }

  // Test Firebase Cloud Connection
  if (testCloudConnectionBtn) {
    testCloudConnectionBtn.addEventListener('click', async () => {
      let cfgText = (inputFirebaseConfig.value || '').trim();
      if (!cfgText) {
        alert('Please paste your Firebase Configuration object first.');
        return;
      }
      try {
        // Parse JS object or JSON format
        if (cfgText.startsWith('const') || cfgText.startsWith('var') || cfgText.startsWith('let')) {
          const match = cfgText.match(/=\s*({[\s\S]*})/);
          if (match) cfgText = match[1];
        }
        const parsed = JSON.parse(cfgText);
        setStoredFirebaseConfig(parsed);
        showToast('Testing Firebase Cloud connection...');
        await initFirebaseSync();
        if (isFirebaseConnected) {
          showToast('🟢 Firebase Connected & Synced Successfully!');
        } else {
          showToast('⚠️ Could not connect to Firestore. Check project rules.');
        }
      } catch (err) {
        alert('Error parsing Firebase configuration: ' + err.message);
      }
    });
  }

  // Projects list in Admin
  const adminProjectsList = document.getElementById('adminProjectsList');
  const addProjectBtn = document.getElementById('addProjectBtn');

  function renderAdminProjectsList(projects) {
    if (!adminProjectsList) return;
    adminProjectsList.innerHTML = projects.map((p, idx) => `
      <div class="item-edit-card" data-index="${idx}">
        <div class="item-card-top">
          <span class="item-badge-order">#${idx + 1}</span>
          <button type="button" class="btn-icon-danger delete-project-btn" data-index="${idx}" title="Delete Project">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
        <div class="form-group">
          <label>Project / Degree Title</label>
          <input type="text" class="proj-title-input" value="${escapeHtml(p.title)}" placeholder="Title">
        </div>
        <div class="form-grid-2">
          <div class="form-group">
            <label>Subtitle / Role</label>
            <input type="text" class="proj-sub-input" value="${escapeHtml(p.subtitle)}" placeholder="Subtitle">
          </div>
          <div class="form-group">
            <label>Tag / Tech Notes</label>
            <input type="text" class="proj-tag-input" value="${escapeHtml(p.tag || '')}" placeholder="Tag">
          </div>
        </div>
        <div class="form-group">
          <label>Project Link (URL)</label>
          <input type="url" class="proj-url-input" value="${escapeHtml(p.url || '')}" placeholder="https://github.com/...">
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();

    adminProjectsList.querySelectorAll('.delete-project-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        workingData.projects.splice(index, 1);
        renderAdminProjectsList(workingData.projects);
      });
    });

    adminProjectsList.querySelectorAll('.item-edit-card').forEach((card, idx) => {
      const titleInp = card.querySelector('.proj-title-input');
      const subInp = card.querySelector('.proj-sub-input');
      const tagInp = card.querySelector('.proj-tag-input');
      const urlInp = card.querySelector('.proj-url-input');

      titleInp.addEventListener('input', () => { workingData.projects[idx].title = titleInp.value; });
      subInp.addEventListener('input', () => { workingData.projects[idx].subtitle = subInp.value; });
      tagInp.addEventListener('input', () => { workingData.projects[idx].tag = tagInp.value; });
      urlInp.addEventListener('input', () => { workingData.projects[idx].url = urlInp.value; });
    });
  }

  if (addProjectBtn) {
    addProjectBtn.addEventListener('click', () => {
      workingData.projects.push({
        id: `proj-${Date.now()}`,
        title: 'New Project Title',
        subtitle: 'Architecture & Tech Stack',
        tag: 'Active Project',
        url: ''
      });
      renderAdminProjectsList(workingData.projects);
      adminProjectsList.scrollTop = adminProjectsList.scrollHeight;
    });
  }

  // Skills list in Admin
  const adminSkillsList = document.getElementById('adminSkillsList');
  const addSkillBtn = document.getElementById('addSkillBtn');

  function renderAdminSkillsList(skills) {
    if (!adminSkillsList) return;
    adminSkillsList.innerHTML = skills.map((s, idx) => `
      <div class="item-edit-card" data-index="${idx}">
        <div class="item-card-top">
          <span class="item-badge-order">Skill #${idx + 1}</span>
          <button type="button" class="btn-icon-danger delete-skill-btn" data-index="${idx}" title="Delete Skill">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
        <div class="form-grid-2">
          <div class="form-group">
            <label>Skill / Domain</label>
            <input type="text" class="skill-title-input" value="${escapeHtml(s.title)}" placeholder="e.g. Python & Systems">
          </div>
          <div class="form-group">
            <label>Details / Frameworks</label>
            <input type="text" class="skill-detail-input" value="${escapeHtml(s.detail)}" placeholder="e.g. FastAPI, AsyncIO">
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();

    adminSkillsList.querySelectorAll('.delete-skill-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        workingData.skills.splice(index, 1);
        renderAdminSkillsList(workingData.skills);
      });
    });

    adminSkillsList.querySelectorAll('.item-edit-card').forEach((card, idx) => {
      const titleInp = card.querySelector('.skill-title-input');
      const detailInp = card.querySelector('.skill-detail-input');

      titleInp.addEventListener('input', () => { workingData.skills[idx].title = titleInp.value; });
      detailInp.addEventListener('input', () => { workingData.skills[idx].detail = detailInp.value; });
    });
  }

  if (addSkillBtn) {
    addSkillBtn.addEventListener('click', () => {
      workingData.skills.push({
        id: `skill-${Date.now()}`,
        title: 'New Skill Category',
        detail: 'Tools, frameworks, and libraries'
      });
      renderAdminSkillsList(workingData.skills);
      adminSkillsList.scrollTop = adminSkillsList.scrollHeight;
    });
  }

  // Competencies in Admin
  const adminCompetenciesList = document.getElementById('adminCompetenciesList');
  const addCompetencyBtn = document.getElementById('addCompetencyBtn');

  function renderAdminCompetenciesList(competencies) {
    if (!adminCompetenciesList) return;
    adminCompetenciesList.innerHTML = competencies.map((c, idx) => `
      <div class="item-edit-card" data-index="${idx}">
        <div class="item-card-top">
          <span class="item-badge-order">Competency #${idx + 1}</span>
          <button type="button" class="btn-icon-danger delete-comp-btn" data-index="${idx}" title="Delete Competency">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
        <div class="form-grid-2">
          <div class="form-group">
            <label>Tag Title</label>
            <input type="text" class="comp-title-input" value="${escapeHtml(c.title)}" placeholder="e.g. System Architecture">
          </div>
          <div class="form-group">
            <label>Lucide Icon Name</label>
            <input type="text" class="comp-icon-input" value="${escapeHtml(c.icon || 'tag')}" placeholder="cpu, zap, users, layers...">
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();

    adminCompetenciesList.querySelectorAll('.delete-comp-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        workingData.competencies.splice(index, 1);
        renderAdminCompetenciesList(workingData.competencies);
      });
    });

    adminCompetenciesList.querySelectorAll('.item-edit-card').forEach((card, idx) => {
      const titleInp = card.querySelector('.comp-title-input');
      const iconInp = card.querySelector('.comp-icon-input');

      titleInp.addEventListener('input', () => { workingData.competencies[idx].title = titleInp.value; });
      iconInp.addEventListener('input', () => { workingData.competencies[idx].icon = iconInp.value; });
    });
  }

  if (addCompetencyBtn) {
    addCompetencyBtn.addEventListener('click', () => {
      workingData.competencies.push({
        id: `comp-${Date.now()}`,
        title: 'New Competency',
        icon: 'zap'
      });
      renderAdminCompetenciesList(workingData.competencies);
      adminCompetenciesList.scrollTop = adminCompetenciesList.scrollHeight;
    });
  }

  // Socials in Admin
  const adminSocialsList = document.getElementById('adminSocialsList');
  function renderAdminSocialsList(socials) {
    if (!adminSocialsList) return;
    
    // Ensure all predefined socials exist in data
    const predefinedSocials = DEFAULT_DATA.socials.map(s => s.id);
    const missingSocials = DEFAULT_DATA.socials.filter(ds => !socials.find(s => s.id === ds.id));
    if (missingSocials.length > 0) {
      socials.push(...JSON.parse(JSON.stringify(missingSocials)));
    }

    adminSocialsList.innerHTML = socials.map((s, idx) => `
      <div class="item-edit-card" data-index="${idx}">
        <div class="form-grid-2">
          <div class="form-group" style="display:flex; align-items:center; gap:0.5rem; justify-content:space-between;">
            <label style="display:flex; align-items:center; gap:0.5rem; margin:0;"><i data-lucide="${s.icon}"></i> ${escapeHtml(s.platform)}</label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer; font-size:0.8rem;">
              <input type="checkbox" class="social-enable-cb" ${s.enabled ? 'checked' : ''}> Show
            </label>
          </div>
          <div class="form-group">
            <input type="url" class="social-url-input" value="${escapeHtml(s.url)}" placeholder="https://...">
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();

    adminSocialsList.querySelectorAll('.item-edit-card').forEach((card, idx) => {
      const cb = card.querySelector('.social-enable-cb');
      const urlInp = card.querySelector('.social-url-input');
      cb.addEventListener('change', () => { workingData.socials[idx].enabled = cb.checked; });
      urlInp.addEventListener('input', () => { workingData.socials[idx].url = urlInp.value; });
    });
  }

  // Custom Sections in Admin
  const adminCustomSectionsList = document.getElementById('adminCustomSectionsList');
  const addCustomSectionBtn = document.getElementById('addCustomSectionBtn');
  
  function renderAdminCustomSectionsList(sections) {
    if (!adminCustomSectionsList) return;
    adminCustomSectionsList.innerHTML = sections.map((sec, sIdx) => `
      <div class="item-edit-card" style="border-left:3px solid var(--accent-blue);" data-index="${sIdx}">
        <div class="item-card-top">
          <span class="item-badge-order">Section: ${escapeHtml(sec.title)}</span>
          <button type="button" class="btn-icon-danger delete-section-btn" data-index="${sIdx}" title="Delete Section">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
        <div class="form-group">
          <label>Section Title</label>
          <input type="text" class="section-title-input" value="${escapeHtml(sec.title)}" placeholder="e.g. AWARDS">
        </div>
        
        <div class="section-items-container" style="margin-top:1rem; padding-left:1rem; border-left:1px dashed var(--border-line);">
          <label>Section Items</label>
          ${(sec.items || []).map((item, iIdx) => `
            <div class="form-grid-2" style="margin-bottom:0.75rem; align-items:end;">
              <div class="form-group" style="margin:0;">
                <input type="text" class="item-title-input" data-sidx="${sIdx}" data-iidx="${iIdx}" value="${escapeHtml(item.title)}" placeholder="Item Title">
              </div>
              <div class="form-group" style="margin:0; display:flex; gap:0.5rem;">
                <input type="text" class="item-detail-input" data-sidx="${sIdx}" data-iidx="${iIdx}" value="${escapeHtml(item.detail)}" placeholder="Item Detail">
                <button type="button" class="btn-icon-danger delete-item-btn" data-sidx="${sIdx}" data-iidx="${iIdx}"><i data-lucide="x"></i></button>
              </div>
            </div>
          `).join('')}
          <button type="button" class="btn-secondary add-item-btn" data-sidx="${sIdx}" style="margin-top:0.5rem; font-size:0.75rem; padding:0.25rem 0.5rem;"><i data-lucide="plus" style="width:12px;height:12px;"></i> Add Item</button>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();

    adminCustomSectionsList.querySelectorAll('.delete-section-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sIdx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        workingData.customSections.splice(sIdx, 1);
        renderAdminCustomSectionsList(workingData.customSections);
      });
    });

    adminCustomSectionsList.querySelectorAll('.section-title-input').forEach((inp, idx) => {
      inp.addEventListener('input', () => { workingData.customSections[idx].title = inp.value; });
    });

    adminCustomSectionsList.querySelectorAll('.item-title-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const sIdx = parseInt(e.target.getAttribute('data-sidx'), 10);
        const iIdx = parseInt(e.target.getAttribute('data-iidx'), 10);
        workingData.customSections[sIdx].items[iIdx].title = e.target.value;
      });
    });

    adminCustomSectionsList.querySelectorAll('.item-detail-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const sIdx = parseInt(e.target.getAttribute('data-sidx'), 10);
        const iIdx = parseInt(e.target.getAttribute('data-iidx'), 10);
        workingData.customSections[sIdx].items[iIdx].detail = e.target.value;
      });
    });

    adminCustomSectionsList.querySelectorAll('.delete-item-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sIdx = parseInt(e.currentTarget.getAttribute('data-sidx'), 10);
        const iIdx = parseInt(e.currentTarget.getAttribute('data-iidx'), 10);
        workingData.customSections[sIdx].items.splice(iIdx, 1);
        renderAdminCustomSectionsList(workingData.customSections);
      });
    });

    adminCustomSectionsList.querySelectorAll('.add-item-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sIdx = parseInt(e.currentTarget.getAttribute('data-sidx'), 10);
        workingData.customSections[sIdx].items = workingData.customSections[sIdx].items || [];
        workingData.customSections[sIdx].items.push({ id: `cs-i-${Date.now()}`, title: 'New Item', detail: 'Item Detail' });
        renderAdminCustomSectionsList(workingData.customSections);
      });
    });
  }

  if (addCustomSectionBtn) {
    addCustomSectionBtn.addEventListener('click', () => {
      workingData.customSections = workingData.customSections || [];
      workingData.customSections.push({
        id: `cs-${Date.now()}`,
        title: 'NEW SECTION',
        items: []
      });
      renderAdminCustomSectionsList(workingData.customSections);
      adminCustomSectionsList.scrollTop = adminCustomSectionsList.scrollHeight;
    });
  }

  // Collect all data
  function collectFormData() {
    if (inputName) workingData.profile.name = inputName.value.trim();
    if (inputRole) workingData.profile.role = inputRole.value.trim();
    if (inputEmail) workingData.profile.email = inputEmail.value.trim();
    if (inputYear) workingData.profile.year = inputYear.value.trim();
    if (inputBio) workingData.profile.bio = inputBio.value.trim();
    if (inputSystemStatus) workingData.profile.systemStatus = inputSystemStatus.value.trim();
    if (inputWorkSummary) workingData.work.summary = inputWorkSummary.value.trim();
    if (inputAvailability) workingData.work.availability = inputAvailability.value.trim();

    if (inputNewPin && inputNewPin.value.trim()) {
      setSecurityPin(inputNewPin.value.trim());
    }

    if (inputFirebaseConfig && inputFirebaseConfig.value.trim()) {
      try {
        let val = inputFirebaseConfig.value.trim();
        if (val.startsWith('const') || val.startsWith('var') || val.startsWith('let')) {
          const match = val.match(/=\s*({[\s\S]*})/);
          if (match) val = match[1];
        }
        const parsed = JSON.parse(val);
        setStoredFirebaseConfig(parsed);
      } catch (e) {}
    }

    // Explicitly gather Projects from DOM
    const adminProjectsList = document.getElementById('adminProjectsList');
    if (adminProjectsList) {
      workingData.projects = [];
      adminProjectsList.querySelectorAll('.item-edit-card').forEach(card => {
        const titleInp = card.querySelector('.proj-title-input');
        const subInp = card.querySelector('.proj-sub-input');
        const tagInp = card.querySelector('.proj-tag-input');
        const urlInp = card.querySelector('.proj-url-input');
        workingData.projects.push({
          id: `proj-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          title: titleInp ? titleInp.value : '',
          subtitle: subInp ? subInp.value : '',
          tag: tagInp ? tagInp.value : '',
          url: urlInp ? urlInp.value.trim() : ''
        });
      });
    }

    // Explicitly gather Skills from DOM
    const adminSkillsList = document.getElementById('adminSkillsList');
    if (adminSkillsList) {
      workingData.skills = [];
      adminSkillsList.querySelectorAll('.item-edit-card').forEach(card => {
        const titleInp = card.querySelector('.skill-title-input');
        const detailInp = card.querySelector('.skill-detail-input');
        workingData.skills.push({
          id: `skill-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          title: titleInp ? titleInp.value : '',
          detail: detailInp ? detailInp.value : ''
        });
      });
    }

    // Explicitly gather Competencies from DOM
    const adminCompetenciesList = document.getElementById('adminCompetenciesList');
    if (adminCompetenciesList) {
      workingData.competencies = [];
      adminCompetenciesList.querySelectorAll('.item-edit-card').forEach(card => {
        const titleInp = card.querySelector('.comp-title-input');
        const iconInp = card.querySelector('.comp-icon-input');
        workingData.competencies.push({
          id: `comp-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          title: titleInp ? titleInp.value : '',
          icon: (iconInp ? iconInp.value : 'tag') || 'tag'
        });
      });
    }

    // Socials are updated via event listeners, so no need to scrape from DOM.

    // Explicitly gather Custom Sections from DOM
    const adminCustomSectionsList = document.getElementById('adminCustomSectionsList');
    if (adminCustomSectionsList) {
      workingData.customSections = [];
      adminCustomSectionsList.querySelectorAll('.item-edit-card').forEach(card => {
        const titleInp = card.querySelector('.section-title-input');
        if (titleInp) {
          const sec = {
            id: `cs-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            title: titleInp.value,
            items: []
          };
          card.querySelectorAll('.form-grid-2').forEach(itemGrid => {
            const iTitle = itemGrid.querySelector('.item-title-input');
            const iDetail = itemGrid.querySelector('.item-detail-input');
            if (iTitle && iDetail) {
              sec.items.push({
                id: `cs-i-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                title: iTitle.value,
                detail: iDetail.value
              });
            }
          });
          workingData.customSections.push(sec);
        }
      });
    }

    return workingData;
  }

  // Save changes action
  const applySave = async (closeAfter = false) => {
    const finalData = collectFormData();
    saveLocalData(finalData);
    renderPortfolio(finalData);

    const synced = await syncToFirebase(finalData);
    if (synced) {
      showToast('🟢 Changes saved & synced globally to Firebase Cloud!');
    } else {
      showToast('💾 Saved locally (Connect Firebase in Cloud tab for global sync)');
    }

    if (closeAfter) closeDashboard();
  };

  if (saveChangesBtn) saveChangesBtn.addEventListener('click', () => applySave(false));
  if (saveAndCloseBtn) saveAndCloseBtn.addEventListener('click', () => applySave(true));

  // Reset to Defaults
  if (resetDefaultsBtn) {
    resetDefaultsBtn.addEventListener('click', async () => {
      if (confirm('Are you sure you want to reset all portfolio data back to the original default state?')) {
        workingData = JSON.parse(JSON.stringify(DEFAULT_DATA));
        saveLocalData(workingData);
        populateAdminForm(workingData);
        renderPortfolio(workingData);
        await syncToFirebase(workingData);
        showToast('Reset to original default configuration');
      }
    });
  }
}

// 8. INITIALIZE APP & EVENT LISTENERS
document.addEventListener('DOMContentLoaded', async () => {
  // Live UTC System Clock
  const systemClock = document.getElementById('systemClock');
  const updateClock = () => {
    if (!systemClock) return;
    const now = new Date();
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    systemClock.textContent = `${hours}:${minutes}:${seconds} UTC`;
  };
  updateClock();
  setInterval(updateClock, 1000);

  // Load local data & render
  const localData = loadLocalData();
  renderPortfolio(localData);
  initStealthAdmin();

  // Initialize Firebase Cloud sync (fetches newest cloud document if available)
  await initFirebaseSync();

  // Click-to-Copy Email Pill
  const emailPill = document.getElementById('emailPill');
  const viewEmail = document.getElementById('viewEmail');

  if (emailPill && viewEmail) {
    emailPill.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = viewEmail.textContent.trim();
      
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          const textarea = document.createElement('textarea');
          textarea.value = email;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }

        emailPill.classList.add('copied');
        setTimeout(() => {
          emailPill.classList.remove('copied');
        }, 2200);
      } catch (err) {
        console.error('Failed to copy email:', err);
        window.location.href = `mailto:${email}`;
      }
    });
  }

  // Search Modal
  const searchBtn = document.getElementById('searchBtn');
  const commandModal = document.getElementById('commandModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const commandInput = document.getElementById('commandInput');
  const modalResults = document.getElementById('modalResults');

  const openModal = () => {
    if (commandModal) {
      commandModal.setAttribute('open', 'true');
      if (commandInput) {
        commandInput.value = '';
        setTimeout(() => commandInput.focus(), 50);
      }
      filterResults('');
    }
  };

  const closeModal = () => {
    if (commandModal) commandModal.removeAttribute('open');
  };

  if (searchBtn) searchBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  if (commandModal) {
    commandModal.addEventListener('click', (e) => {
      if (e.target === commandModal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (commandModal && commandModal.hasAttribute('open')) {
        closeModal();
      } else {
        openModal();
      }
    } else if (e.key === 'Escape') {
      if (commandModal && commandModal.hasAttribute('open')) closeModal();
      const authModal = document.getElementById('authModal');
      if (authModal && authModal.hasAttribute('open')) authModal.removeAttribute('open');
      const adminModal = document.getElementById('adminModal');
      if (adminModal && adminModal.hasAttribute('open')) adminModal.removeAttribute('open');
    }
  });

  const filterResults = (query) => {
    if (!modalResults) return;
    const items = modalResults.querySelectorAll('.result-item');
    const q = query.toLowerCase().trim();
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (!q || text.includes(q)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  };

  if (commandInput) {
    commandInput.addEventListener('input', (e) => {
      filterResults(e.target.value);
    });
  }

  if (modalResults) {
    modalResults.addEventListener('click', (e) => {
      const item = e.target.closest('.result-item');
      if (!item) return;
      const action = item.getAttribute('data-action');
      if (action === 'email' && emailPill) {
        closeModal();
        emailPill.click();
      } else if (action === 'experience') {
        closeModal();
        const expSection = document.querySelector('.experience-col');
        if (expSection) expSection.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'skills') {
        closeModal();
        const skillsSection = document.querySelector('.skills-col');
        if (skillsSection) skillsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Window Controls
  const dotMinimize = document.querySelector('.dot-minimize');
  const dotMaximize = document.querySelector('.dot-maximize');
  const osWindow = document.getElementById('osWindow');

  if (dotMinimize && osWindow) {
    dotMinimize.addEventListener('click', () => {
      osWindow.style.transform = 'scale(0.97)';
      osWindow.style.opacity = '0.7';
      setTimeout(() => {
        osWindow.style.transform = 'scale(1)';
        osWindow.style.opacity = '1';
      }, 350);
    });
  }

  if (dotMaximize && osWindow) {
    dotMaximize.addEventListener('click', () => {
      osWindow.style.transform = 'scale(1.02)';
      setTimeout(() => {
        osWindow.style.transform = 'scale(1)';
      }, 250);
    });
  }
});
