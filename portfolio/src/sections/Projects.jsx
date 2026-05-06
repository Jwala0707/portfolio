import { useRef } from 'react'
import { projectsData } from '../data/portfolioData'
import useReveal from '../components/useReveal'
import styles from './Projects.module.css'

const ICON_STYLES = {
  gold:  { background: 'rgba(255,190,60,0.1)',  border: '1px solid rgba(255,190,60,0.3)' },
  cyan:  { background: 'rgba(0,229,255,0.08)',  border: '1px solid rgba(0,229,255,0.25)' },
  green: { background: 'rgba(26,255,160,0.08)', border: '1px solid rgba(26,255,160,0.25)' },
}

function ProjectCard({ project, delay }) {
  const revealRef = useReveal()
  const cardRef = useRef(null)

  const onMouseMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width - 0.5) * 12
    const y = ((e.clientY - r.top) / r.height - 0.5) * 8
    el.style.transform = `translateY(-10px) scale(1.01) rotateX(${-y}deg) rotateY(${x}deg)`
    el.style.transition = 'box-shadow .2s, border-color .2s'
  }
  const onMouseLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.transform = ''
    el.style.transition = 'all .5s'
  }

  return (
    <div ref={revealRef} className={`reveal ${styles.cardWrap}`} style={{ transitionDelay: `${delay}ms` }}>
      <div
        ref={cardRef}
        className={`proj-card ${styles.card}`}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div className={styles.topLine} />
        <div className={styles.num}>{project.num}</div>
        <div className={styles.icon} style={ICON_STYLES[project.color]}>{project.icon}</div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.desc}>{project.desc}</p>
        <div className={styles.stack}>
          {project.stack.map(t => <span key={t} className={styles.tech}>{t}</span>)}
        </div>
        <span className={styles.arrow}>View Details →</span>
      </div>
    </div>
  )
}

export default function Projects() {
  const headerRef = useReveal()
  return (
    <section className="section" id="projects">
      <div className="sec-header reveal" ref={headerRef}>
        <div className="sec-eyebrow"><div className="sec-line" /> 03 — Builds</div>
        <h2 className="sec-title">Featured <span>Projects</span></h2>
      </div>
      <div className={styles.grid}>
        {projectsData.map((p, i) => (
          <ProjectCard key={p.num} project={p} delay={i * 80} />
        ))}
      </div>
    </section>
  )
}
