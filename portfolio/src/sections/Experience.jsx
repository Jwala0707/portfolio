import { experienceData } from '../data/portfolioData'
import useReveal from '../components/useReveal'
import styles from './Experience.module.css'

export default function Experience() {
  const headerRef = useReveal()
  const timelineRef = useReveal()

  return (
    <section className="section" id="experience">
      <div className="sec-header reveal" ref={headerRef}>
        <div className="sec-eyebrow"><div className="sec-line" /> 04 — Work</div>
        <h2 className="sec-title">Professional <span>Experience</span></h2>
      </div>

      <div className={`reveal ${styles.timeline}`} ref={timelineRef}>
        {experienceData.map((exp, i) => (
          <div key={i} className={styles.item}>
            <div className={styles.dot} />
            <div className={styles.top}>
              <div>
                <div className={styles.role}>{exp.role}</div>
                <div className={styles.company}>{exp.company} · {exp.location}</div>
              </div>
              <span className={styles.badge}>{exp.period}</span>
            </div>
            <ul className={styles.pts}>
              {exp.points.map((pt, j) => (
                <li key={j}>{pt}</li>
              ))}
            </ul>
            <div className={styles.tags}>
              {exp.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
