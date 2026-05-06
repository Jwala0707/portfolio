export const heroData = {
  name: 'Jwala Singh',
  role: 'Software Engineer',
  roles: ['Full Stack Developer', 'Python Engineer', 'React.js Developer', 'Software Engineer'],
  location: 'Jaipur, Rajasthan',
  desc: 'Results-oriented engineer crafting scalable, performant applications. Passionate about clean code, intuitive UI, and systems that scale.',
  email: 'jwalasingh0510@gmail.com',
  phone: '+91-9334849686',
  linkedin: 'https://linkedin.com/in/jwalasingh',
  github: 'https://github.com/jwalasingh',
  stats: [
    { num: 3, suffix: '', label: 'Projects Built' },
    { num: 15, suffix: '+', label: 'Technologies' },
    { num: 3, suffix: '+', label: 'Years Coding' },
  ],
}

export const skillsData = [
  {
    icon: '⌨',
    color: 'violet',
    label: 'Languages',
    type: 'bars',
    items: [
      { name: 'Python', pct: 88 },
      { name: 'JavaScript', pct: 82 },
      { name: 'SQL', pct: 75 },
      { name: 'HTML / CSS', pct: 85 },
    ],
  },
  {
    icon: '⚡',
    color: 'pink',
    label: 'Frameworks & Libraries',
    type: 'tags',
    items: ['React.js', 'Redux', 'Node.js', 'Express.js', 'Django', 'Flask', 'Tkinter'],
  },
  {
    icon: '🗄',
    color: 'cyan',
    label: 'Databases',
    type: 'tags',
    items: ['MySQL', 'MongoDB', 'SQLite'],
  },
  {
    icon: '🛠',
    color: 'gold',
    label: 'Tools & Workflow',
    type: 'tags',
    items: ['Git', 'GitHub', 'VS Code', 'REST APIs', 'Agile', 'DSA', 'OOP', 'SDLC'],
  },
  {
    icon: '✦',
    color: 'green',
    label: 'Professional Attributes',
    type: 'tags',
    items: ['Problem Solving', 'Critical Thinking', 'Teamwork', 'Debugging', 'Clean Code', 'Performance Optimisation'],
  },
]

export const projectsData = [
  {
    num: '001',
    icon: '🛒',
    title: 'Quipo App',
    desc: 'B2B Grocery Service with smart product recommendation engine. Analyzes user behavior patterns to surface relevant items. Fully responsive across all viewports.',
    stack: ['React.js', 'JavaScript', 'Responsive UI', 'Recommendation Engine'],
    color: 'gold',
  },
  {
    num: '002',
    icon: '👥',
    title: 'Employee Attendance System',
    desc: 'Full-featured attendance tracking with normalized database schema. Built for efficiency, accuracy and clean data management across departments.',
    stack: ['Python', 'SQL', 'SQLite', 'Tkinter', 'Normalized DB'],
    color: 'cyan',
  },
  {
    num: '003',
    icon: '🅿',
    title: 'Smart Parking System',
    desc: 'Full-stack real-time parking platform with slot tracking, QR-based ticket generation, user access control, live slot updates and interactive dashboard UI.',
    stack: ['React.js', 'Node.js', 'MongoDB', 'REST API', 'QR Code', 'Real-time'],
    color: 'green',
  },
]

export const experienceData = [
  {
    role: 'Frontend Web Development Intern',
    company: 'UptoSkills',
    location: 'Remote',
    period: 'Jun 2025 – Sep 2025',
    points: [
      'Built responsive UI components using React.js and Redux, improving UX and load performance.',
      'Refactored legacy codebase to modular architecture, enhancing maintainability and scalability.',
      'Collaborated in an Agile team environment using Git for version control and code review.',
    ],
    tags: ['React.js', 'Redux', 'Git', 'Agile / Scrum'],
  },
]

export const educationData = [
  {
    icon: '🎓',
    degree: 'B.Tech — Computer Science',
    inst: 'NIMS University, Jaipur',
    year: '2022 — 2026',
    badge: 'CGPA: 6.8',
    courses: 'DSA · OOP · Operating Systems · DBMS · Software Engineering',
  },
  {
    icon: '📚',
    degree: 'Class 12 — BSEB',
    inst: 'S.S.S.G.S College',
    year: '2019 — 2021',
  },
  {
    icon: '🏫',
    degree: 'Class 10 — BSEB',
    inst: 'K.S Highschool',
    year: '2019',
  },
]

export const journeyData = [
  { year: '2019', title: 'Class 10', sub: 'K.S Highschool · BSEB', note: 'Foundation ✦', color: '#6e5ef8' },
  { year: '2021', title: 'Class 12', sub: 'S.S.S.G.S College · BSEB', note: 'Higher Studies ✦', color: '#a064ff' },
  { year: '2022 — 2026', title: 'B.Tech CSE', sub: 'NIMS University, Jaipur', note: 'CGPA 6.8 · DSA · OOP · DBMS', color: '#f050a0' },
  { year: '2023', title: 'Quipo App', sub: 'B2B Grocery Platform', note: 'React · Recommendations AI', color: '#ffbe3c' },
  { year: '2024 – 2025', title: 'Intern @ UptoSkills', sub: 'Frontend Web Dev · Remote', note: 'React · Redux · Agile Team', color: '#00e5ff' },
  { year: '2026 ✦ NOW', title: 'B.Tech Graduate', sub: 'Smart Parking · Full Stack', note: 'React · Node · MongoDB · QR', color: '#1affa0', current: true },
]
