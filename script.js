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
      tag: 'Production Ready • Scalable Backend'
    },
    {
      id: 'proj-2',
      title: 'IoT Tourist Safety Prototype',
      subtitle: 'Real-time System & Hardware Architecture',
      tag: 'ESP32 / Telemetry • Live Tracking'
    },
    {
      id: 'proj-3',
      title: 'College Schedule Manager',
      subtitle: 'Full-Stack Web App',
      tag: 'Automated Conflict Resolution'
    },
    {
      id: 'proj-4',
      title: 'Computer Engineering Degree',
      subtitle: 'Core Software & Systems Foundation',
      tag: 'Data Structures & Distributed Systems'
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
  ]
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
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
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
    expList.innerHTML = (data.projects || []).map(p => `
      <div class="timeline-item" data-id="${p.id}">
        <div class="timeline-node">
          <span class="node-ring"></span>
          <span class="node-core"></span>
        </div>
        <div class="timeline-content">
          <h3 class="timeline-heading">${escapeHtml(p.title)}</h3>
          <p class="timeline-sub">${escapeHtml(p.subtitle)}</p>
          ${p.tag ? `<span class="timeline-tag">${escapeHtml(p.tag)}</span>` : ''}
        </div>
      </div>
    `).join('');
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

    updatePortraitPreview(data);
    renderAdminProjectsList(data.projects || []);
    renderAdminSkillsList(data.skills || []);
    renderAdminCompetenciesList(data.competencies || []);
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

      titleInp.addEventListener('input', () => { workingData.projects[idx].title = titleInp.value; });
      subInp.addEventListener('input', () => { workingData.projects[idx].subtitle = subInp.value; });
      tagInp.addEventListener('input', () => { workingData.projects[idx].tag = tagInp.value; });
    });
  }

  if (addProjectBtn) {
    addProjectBtn.addEventListener('click', () => {
      workingData.projects.push({
        id: `proj-${Date.now()}`,
        title: 'New Project Title',
        subtitle: 'Architecture & Tech Stack',
        tag: 'Active Project'
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
