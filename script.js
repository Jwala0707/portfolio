/**
 * JWALA SINGH — 3D DEVELOPER & DATA ANALYST PORTFOLIO
 * Interaction Engine for the YouTube 3D Portfolio Template
 * 
 * Features:
 * 1. Ambient Spotlight Dust / Starfield Canvas Simulation
 * 2. 3D Puzzle Portrait Assembly with Flying Pieces & Mouse Tilt
 * 3. 3D Interactive Floating Physics Spheres for "MY TECHSTACK" (00:09 in video)
 * 4. Experience Timeline Milestones Sync & 3D Flip Cards
 * 5. Tilted Dashboards Desk with Multi-Directional Fling & Modal
 * 6. Contact Automations (WhatsApp, Call, Email Copy Toast)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. AMBIENT DUST / STARFIELD CANVAS (Matching Video Spotlight Atmosphere)
  // ==========================================================================
  const starsCanvas = document.getElementById('ambientStars');
  if (starsCanvas) {
    const ctx = starsCanvas.getContext('2d');
    let width = starsCanvas.width = window.innerWidth;
    let height = starsCanvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = starsCanvas.width = window.innerWidth;
      height = starsCanvas.height = window.innerHeight;
    });

    const particles = [];
    const PARTICLE_COUNT = 45;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.6,
        speedY: Math.random() * 0.4 + 0.15,
        speedX: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.6 + 0.2
      });
    }

    function animateStars() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y > height) {
          p.y = -5;
          p.x = Math.random() * width;
        }
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(254, 240, 138, ${p.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(245, 158, 11, 0.4)';
        ctx.fill();
      });

      requestAnimationFrame(animateStars);
    }
    animateStars();
  }


  // ==========================================================================
  // 2. 3D PUZZLE ASSEMBLY EFFECT (Hero Section: 00:00 - 00:02)
  // ==========================================================================
  const puzzleBoard = document.getElementById('puzzleBoard');
  const puzzleOverlay = document.getElementById('puzzleOverlay');
  const btnScatter = document.getElementById('btnScatterPuzzle');
  const puzzleStatusText = document.getElementById('puzzleStatusText');
  const puzzleScene = document.getElementById('puzzleScene');
  const puzzleCard = document.querySelector('.puzzle-card');

  const GRID_ROWS = 4;
  const GRID_COLS = 4;
  let pieces = [];
  let isAssembled = false;

  function createPuzzlePieces() {
    if (!puzzleBoard) return;
    puzzleBoard.innerHTML = '';
    pieces = [];

    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.dataset.row = row;
        piece.dataset.col = col;

        const bgX = (col / (GRID_COLS - 1)) * 100;
        const bgY = (row / (GRID_ROWS - 1)) * 100;
        piece.style.backgroundPosition = `${bgX}% ${bgY}%`;

        // Calculate random 3D scatter trajectory (coming from all 4 sides)
        const angle = Math.random() * Math.PI * 2;
        const distance = 250 + Math.random() * 260;
        const scatterX = Math.cos(angle) * distance;
        const scatterY = Math.sin(angle) * distance;
        const scatterZ = 120 + Math.random() * 320;
        const rotX = (Math.random() - 0.5) * 120;
        const rotY = (Math.random() - 0.5) * 120;
        const rotZ = (Math.random() - 0.5) * 160;

        piece.dataset.scatterTransform = `translate3d(${scatterX.toFixed(0)}px, ${scatterY.toFixed(0)}px, ${scatterZ.toFixed(0)}px) rotateX(${rotX.toFixed(0)}deg) rotateY(${rotY.toFixed(0)}deg) rotateZ(${rotZ.toFixed(0)}deg)`;

        piece.style.transform = piece.dataset.scatterTransform;
        piece.style.opacity = '0.15';

        puzzleBoard.appendChild(piece);
        pieces.push(piece);
      }
    }
  }

  function assemblePuzzle() {
    isAssembled = false;
    if (puzzleOverlay) puzzleOverlay.classList.remove('active');
    if (puzzleStatusText) puzzleStatusText.textContent = '3D Puzzle: Assembling...';

    pieces.forEach((piece) => {
      const row = parseInt(piece.dataset.row);
      const col = parseInt(piece.dataset.col);
      const distFromCenter = Math.abs(row - 1.5) + Math.abs(col - 1.5);
      const delay = distFromCenter * 85 + Math.random() * 50;

      setTimeout(() => {
        piece.style.transform = 'translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg)';
        piece.style.opacity = '1';
      }, delay);
    });

    setTimeout(() => {
      isAssembled = true;
      if (puzzleOverlay) puzzleOverlay.classList.add('active');
      if (puzzleScene) puzzleScene.classList.add('puzzle-lock-flash');
      if (puzzleStatusText) puzzleStatusText.textContent = '3D Puzzle: Locked & Assembled ✨';
      setTimeout(() => {
        if (puzzleScene) puzzleScene.classList.remove('puzzle-lock-flash');
      }, 900);
    }, 1050);
  }

  function scatterPuzzle() {
    isAssembled = false;
    if (puzzleOverlay) puzzleOverlay.classList.remove('active');
    if (puzzleStatusText) puzzleStatusText.textContent = '3D Puzzle: Scattered';

    pieces.forEach((piece) => {
      piece.style.transform = piece.dataset.scatterTransform;
      piece.style.opacity = '0.25';
    });
  }

  if (btnScatter) {
    btnScatter.addEventListener('click', () => {
      if (isAssembled) {
        scatterPuzzle();
        setTimeout(assemblePuzzle, 600);
      } else {
        assemblePuzzle();
      }
    });
  }

  // Interactive 3D Card Tilt
  if (puzzleCard) {
    puzzleCard.addEventListener('mousemove', (e) => {
      const rect = puzzleCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const tiltX = (y / (rect.height / 2)) * -12;
      const tiltY = (x / (rect.width / 2)) * 12;
      puzzleCard.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    puzzleCard.addEventListener('mouseleave', () => {
      puzzleCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  createPuzzlePieces();
  setTimeout(assemblePuzzle, 400);


  // ==========================================================================
  // 3. "MY TECHSTACK" 3D FLOATING PHYSICS SPHERES (Video Template: 00:09 - 00:10)
  // ==========================================================================
  const techCanvas = document.getElementById('techPhysicsCanvas');
  const techStage = document.getElementById('techPhysicsStage');
  const techInspectName = document.getElementById('techInspectName');
  const techInspectWhere = document.getElementById('techInspectWhere');
  const techInspectLearnt = document.getElementById('techInspectLearnt');
  const techBadges = document.querySelectorAll('.t-badge');

  const TECH_SKILLS = [
    { name: 'Python', symbol: 'PY', where: 'Kaleidonex Technologies, UptoSkills, TaskFlow, Telecom Churn', learnt: 'Engineered automated ETL data extraction pipelines, Flask REST APIs, and statistical modeling routines.', radius: 46 },
    { name: 'SQL / MySQL', symbol: 'SQL', where: 'Kaleidonex Technologies & UptoSkills', learnt: 'Formulated multi-table JOINs, CTEs, subqueries, and window functions for analytical reporting pipelines.', radius: 44 },
    { name: 'Power BI', symbol: 'PBI', where: 'UptoSkills & Tata Group Simulation', learnt: 'Constructed multi-page executive dashboards, DAX KPI calculations, and interactive drill-downs.', radius: 45 },
    { name: 'Tableau', symbol: 'TAB', where: 'UptoSkills Analytical Visualizations', learnt: 'Engineered operational throughput dashboards, geographic choropleths, and trend diagnostics.', radius: 42 },
    { name: 'Flask', symbol: 'FLASK', where: 'TaskFlow Full Stack REST API', learnt: 'Designed modular backend blueprints, custom error handling, and lightweight SQLite ORM persistence.', radius: 40 },
    { name: 'Django & DRF', symbol: 'DJ', where: 'Academic Full Stack Architecture', learnt: 'Configured model serializers, token authentication, and decoupled RESTful web service endpoints.', radius: 43 },
    { name: 'Node.js', symbol: 'NODE', where: 'Smart Parking System', learnt: 'Engineered asynchronous non-blocking event-driven API handlers for live reservation lifecycles.', radius: 42 },
    { name: 'MongoDB', symbol: 'MONGO', where: 'Smart Parking System', learnt: 'Structured flexible NoSQL document schemas, embedded documents, and real-time state updates.', radius: 40 },
    { name: 'Pandas', symbol: 'PD', where: 'Telecom Churn Analysis & UptoSkills', learnt: 'Processed 7,043 customer records with missing value imputation, grouping, and matrix aggregations.', radius: 41 },
    { name: 'NumPy', symbol: 'NP', where: 'Statistical Vectorized Operations', learnt: 'Executed high-speed numerical array transforms, linear algebra calculations, and probability modeling.', radius: 38 },
    { name: 'Postman', symbol: 'POST', where: 'API QA & Integration Testing', learnt: 'Built test collections, automated status code assertions, and validated production-grade endpoints.', radius: 39 },
    { name: 'JWT & RBAC', symbol: 'JWT', where: 'TaskFlow Security Layer', learnt: 'Implemented signed stateless token lifecycles, refresh rotation, and role-based route guards.', radius: 38 },
    { name: 'React', symbol: 'REACT', where: 'UptoSkills Frontend Internship, TaskFlow', learnt: 'Developed reusable React.js components, integrated REST APIs to handle JSON data, and debugged UI workflows.', radius: 41 },
    { name: 'PostgreSQL', symbol: 'PG', where: 'Relational Database Architecture', learnt: 'Enforced ACID constraints, foreign key cascades, indexing, and query performance tuning.', radius: 40 }
  ];

  if (techCanvas && techStage) {
    const ctx = techCanvas.getContext('2d');
    let stageW = techCanvas.width = techStage.clientWidth;
    let stageH = techCanvas.height = techStage.clientHeight;

    window.addEventListener('resize', () => {
      stageW = techCanvas.width = techStage.clientWidth;
      stageH = techCanvas.height = techStage.clientHeight;
    });

    // Create 3D Physics Sphere objects
    const spheres = TECH_SKILLS.map((tech, i) => {
      return {
        ...tech,
        x: 80 + Math.random() * (stageW - 160),
        y: 60 + Math.random() * (stageH - 140),
        vx: (Math.random() - 0.5) * 1.6,
        vy: (Math.random() - 0.5) * 1.6,
        baseRadius: tech.radius,
        currentRadius: tech.radius,
        targetRadius: tech.radius,
        isHovered: false
      };
    });

    let mouseX = -1000;
    let mouseY = -1000;

    techStage.addEventListener('mousemove', (e) => {
      const rect = techStage.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });

    techStage.addEventListener('mouseleave', () => {
      mouseX = -1000;
      mouseY = -1000;
    });

    // Select skill to inspect
    function updateTechInspector(skill) {
      if (techInspectName) techInspectName.textContent = skill.name;
      if (techInspectWhere) techInspectWhere.textContent = skill.where;
      if (techInspectLearnt) techInspectLearnt.textContent = skill.learnt;

      techBadges.forEach(b => {
        b.classList.toggle('active', b.dataset.skill.toLowerCase().includes(skill.name.toLowerCase()));
      });
    }

    // Badge click selection
    techBadges.forEach(b => {
      b.addEventListener('click', () => {
        const found = TECH_SKILLS.find(s => s.name.toLowerCase().includes(b.dataset.skill.toLowerCase()));
        if (found) {
          updateTechInspector(found);
          const sphere = spheres.find(s => s.name === found.name);
          if (sphere) {
            sphere.vx += (Math.random() - 0.5) * 4;
            sphere.vy += (Math.random() - 0.5) * 4;
          }
        }
      });
    });

    // Animation Loop
    function renderTechPhysics() {
      ctx.clearRect(0, 0, stageW, stageH);

      spheres.forEach(s => {
        // Physics update
        s.x += s.vx;
        s.y += s.vy;

        // Gentle drag / bounce off bounds
        if (s.x - s.currentRadius < 0) {
          s.x = s.currentRadius;
          s.vx *= -0.85;
        } else if (s.x + s.currentRadius > stageW) {
          s.x = stageW - s.currentRadius;
          s.vx *= -0.85;
        }

        if (s.y - s.currentRadius < 0) {
          s.y = s.currentRadius;
          s.vy *= -0.85;
        } else if (s.y + s.currentRadius > stageH) {
          s.y = stageH - s.currentRadius;
          s.vy *= -0.85;
        }

        // Mouse interaction: repulsion and hover detection
        const dx = mouseX - s.x;
        const dy = mouseY - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < s.currentRadius + 30) {
          s.isHovered = true;
          s.targetRadius = s.baseRadius * 1.15;
          // Gentle cursor push
          const angle = Math.atan2(dy, dx);
          s.vx -= Math.cos(angle) * 0.35;
          s.vy -= Math.sin(angle) * 0.35;
          updateTechInspector(s);
        } else {
          s.isHovered = false;
          s.targetRadius = s.baseRadius;
        }

        // Smooth radius transition
        s.currentRadius += (s.targetRadius - s.currentRadius) * 0.15;

        // Damping velocity
        s.vx *= 0.99;
        s.vy *= 0.99;

        // RENDER 3D SPHERE (Specular highlight, glossy gradient)
        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.currentRadius, 0, Math.PI * 2);

        // 3D Spherical Radial Gradient
        const grad = ctx.createRadialGradient(
          s.x - s.currentRadius * 0.35,
          s.y - s.currentRadius * 0.35,
          s.currentRadius * 0.1,
          s.x,
          s.y,
          s.currentRadius
        );

        if (s.isHovered) {
          grad.addColorStop(0, '#FFFFFF');
          grad.addColorStop(0.3, '#FFF08A');
          grad.addColorStop(0.7, '#F59E0B');
          grad.addColorStop(1, '#92400E');
          ctx.shadowColor = 'rgba(253, 224, 71, 0.8)';
          ctx.shadowBlur = 24;
        } else {
          grad.addColorStop(0, '#FFFDF8');
          grad.addColorStop(0.35, '#F4ECE1');
          grad.addColorStop(0.75, '#D5C4B0');
          grad.addColorStop(1, '#8C7D6B');
          ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
          ctx.shadowBlur = 10;
        }

        ctx.fillStyle = grad;
        ctx.fill();

        // Subtle 3D Rim stroke
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = s.isHovered ? '#FDE047' : 'rgba(254, 240, 138, 0.4)';
        ctx.stroke();

        // 3D Specular reflection glint
        ctx.beginPath();
        ctx.ellipse(
          s.x - s.currentRadius * 0.35,
          s.y - s.currentRadius * 0.38,
          s.currentRadius * 0.25,
          s.currentRadius * 0.12,
          -Math.PI / 4,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.fill();

        // Text Label
        ctx.font = `bold ${Math.round(s.currentRadius * 0.38)}px 'Space Grotesk', sans-serif`;
        ctx.fillStyle = s.isHovered ? '#1C1917' : '#292524';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(s.symbol, s.x, s.y);

        ctx.restore();
      });

      requestAnimationFrame(renderTechPhysics);
    }
    renderTechPhysics();
  }


  // ==========================================================================
  // 4. TIMELINE MILESTONES & 3D FLIP CARDS
  // ==========================================================================
  const milestoneItems = document.querySelectorAll('.milestone-item');
  const flipCards = document.querySelectorAll('.flip-exp-card');

  milestoneItems.forEach(item => {
    item.addEventListener('click', () => {
      milestoneItems.forEach(m => m.classList.remove('active-milestone'));
      item.classList.add('active-milestone');

      const targetId = `card-${item.dataset.target}`;
      const targetCard = document.getElementById(targetId);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetCard.classList.add('is-flipped');
        setTimeout(() => targetCard.classList.remove('is-flipped'), 2200);
      }
    });
  });

  flipCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('is-flipped');
    });
  });


  // ==========================================================================
  // 5. DASHBOARDS DESK: TILTED PHOTO PILE WITH MULTI-DIRECTIONAL FLING
  // ==========================================================================
  const photoPile = document.getElementById('photoPile');
  const printCards = Array.from(document.querySelectorAll('.print-card'));
  const btnFlingNext = document.getElementById('btnFlingNext');
  const btnReshuffle = document.getElementById('btnReshuffle');
  const btnToggleGrid = document.getElementById('btnToggleGrid');
  const deskCounter = document.getElementById('deskCounter');

  // Spotlight Lightbox Elements
  const dashboardModal = document.getElementById('dashboardModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalFlingBtn = document.getElementById('modalFlingBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalTools = document.getElementById('modalTools');
  const modalImage = document.getElementById('modalImage');

  let isGridView = false;

  const FLING_CLASSES = [
    'flung-top-left',
    'flung-top-right',
    'flung-bottom-left',
    'flung-bottom-right'
  ];

  function layoutDeskPile() {
    printCards.forEach((card, index) => {
      card.className = 'print-card';
      const tilt = parseFloat(card.dataset.tilt) || 0;
      const x = parseFloat(card.dataset.x) || 0;
      const y = parseFloat(card.dataset.y) || 0;
      const zIndex = index + 1;

      card.style.zIndex = zIndex;
      card.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${tilt}deg)`;
      card.style.opacity = '1';
      card.style.pointerEvents = 'auto';
    });

    updateDeskCounter();
  }

  function updateDeskCounter() {
    if (!deskCounter) return;
    const remainingCount = printCards.filter(c => !FLING_CLASSES.some(cls => c.classList.contains(cls))).length;
    deskCounter.textContent = `Showing Photo ${printCards.length - remainingCount + 1} of ${printCards.length}`;
  }

  function flingTopCard() {
    let topCard = null;
    for (let i = printCards.length - 1; i >= 0; i--) {
      const card = printCards[i];
      if (!FLING_CLASSES.some(cls => card.classList.contains(cls))) {
        topCard = card;
        break;
      }
    }

    if (!topCard) {
      layoutDeskPile();
      return;
    }

    const randomFlingClass = FLING_CLASSES[Math.floor(Math.random() * FLING_CLASSES.length)];
    topCard.classList.add(randomFlingClass);
    updateDeskCounter();
  }

  function openDashboardModal(card) {
    const img = card.querySelector('img');
    const title = card.dataset.title || card.querySelector('.caption-title').textContent;
    const tools = card.dataset.tools || 'Power BI • Python • SQL';

    modalTitle.textContent = title;
    modalTools.textContent = tools;
    modalImage.src = img.src;
    dashboardModal.classList.add('active');
    dashboardModal.dataset.currentCardIndex = card.dataset.index;
  }

  function closeDashboardModal() {
    dashboardModal.classList.remove('active');
  }

  printCards.forEach(card => {
    card.addEventListener('click', () => {
      openDashboardModal(card);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeDashboardModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeDashboardModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeDashboardModal);

  if (modalFlingBtn) {
    modalFlingBtn.addEventListener('click', () => {
      const cardIdx = dashboardModal.dataset.currentCardIndex;
      if (cardIdx !== undefined) {
        const card = printCards.find(c => c.dataset.index === cardIdx);
        if (card) {
          const randomFlingClass = FLING_CLASSES[Math.floor(Math.random() * FLING_CLASSES.length)];
          card.classList.add(randomFlingClass);
          updateDeskCounter();
        }
      }
      closeDashboardModal();
    });
  }

  if (btnFlingNext) btnFlingNext.addEventListener('click', flingTopCard);
  if (btnReshuffle) btnReshuffle.addEventListener('click', layoutDeskPile);

  if (btnToggleGrid) {
    btnToggleGrid.addEventListener('click', () => {
      isGridView = !isGridView;
      if (isGridView) {
        photoPile.classList.add('grid-view');
        btnToggleGrid.textContent = '🎴 Switch to Pile View';
        if (btnFlingNext) btnFlingNext.style.display = 'none';
        if (btnReshuffle) btnReshuffle.style.display = 'none';
      } else {
        photoPile.classList.remove('grid-view');
        btnToggleGrid.textContent = '▦ Switch to Grid View';
        if (btnFlingNext) btnFlingNext.style.display = 'inline-flex';
        if (btnReshuffle) btnReshuffle.style.display = 'inline-flex';
        layoutDeskPile();
      }
    });
  }

  layoutDeskPile();


  // ==========================================================================
  // 6. CONTACT ACTIONS & FORM INTEGRATION
  // ==========================================================================
  const btnCopyEmail = document.getElementById('btnCopyEmail');
  const toast = document.getElementById('toast');
  const contactForm = document.getElementById('contactForm');
  const btnSendWhatsAppForm = document.getElementById('btnSendWhatsAppForm');
  const formFeedback = document.getElementById('formFeedback');

  const PHONE_NUMBER = '919334849686';
  const EMAIL_ADDRESS = 'jwalasingh0510@gmail.com';

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', () => {
      navigator.clipboard.writeText(EMAIL_ADDRESS).then(() => {
        showToast('Email copied to clipboard: ' + EMAIL_ADDRESS);
      }).catch(() => {
        showToast('Email: ' + EMAIL_ADDRESS);
      });
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const subject = document.getElementById('messageSubject').value.trim();
      const body = document.getElementById('messageBody').value.trim();

      const fullSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject} - from ${name}`);
      const fullBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${body}`);

      window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${fullSubject}&body=${fullBody}`;

      if (formFeedback) {
        formFeedback.style.color = '#FDE047';
        formFeedback.textContent = 'Drafting email in your default client...';
      }
    });
  }

  if (btnSendWhatsAppForm) {
    btnSendWhatsAppForm.addEventListener('click', () => {
      const name = document.getElementById('senderName').value.trim() || 'Hiring Manager';
      const subject = document.getElementById('messageSubject').value.trim() || 'Backend & Data Role';
      const body = document.getElementById('messageBody').value.trim() || 'Hello Jwala, I would like to connect regarding an opportunity.';

      const waText = encodeURIComponent(
        `Hi Jwala,\nMy name is *${name}*.\n*Subject:* ${subject}\n\n${body}`
      );

      window.open(`https://wa.me/${PHONE_NUMBER}?text=${waText}`, '_blank', 'noopener,noreferrer');
    });
  }


  // ==========================================================================
  // 7. NAVBAR SCROLL SPY & MOBILE TOGGLE
  // ==========================================================================
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSectionId = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

});
