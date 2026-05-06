import { educationData } from '../data/portfolioData'
import useReveal from '../components/useReveal'
import styles from './Education.module.css'

function EduCard({ edu, delay }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal edu-card ${styles.card}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className={styles.icon}>{edu.icon}</div>
      <div className={styles.degree}>{edu.degree}</div>
      <div className={styles.inst}>{edu.inst}</div>
      <div className={styles.year}>{edu.year}</div>
      {edu.badge && <span className={styles.badge}>{edu.badge}</span>}
      {edu.courses && <div className={styles.courses}>{edu.courses}</div>}
    </div>
  )
}

export default function Education() {
  const headerRef = useReveal()
  return (
    <section className="section" id="education">
      <div className="sec-header reveal" ref={headerRef}>
        <div className="sec-eyebrow"><div className="sec-line" /> 05 — Academics</div>
        <h2 className="sec-title">Education <span>Background</span></h2>
      </div>
      <div className={styles.grid}>
        {educationData.map((edu, i) => (
          <EduCard key={i} edu={edu} delay={i * 80} />
        ))}
      </div>
    </section>
  )
}
