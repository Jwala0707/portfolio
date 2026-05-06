import useReveal from '../components/useReveal'
import { journeyData } from '../data/portfolioData'
import styles from './Journey.module.css'

function MilestoneCard({ item, index }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal ${styles.msRow}`} style={{ transitionDelay: `${index * 100}ms` }}>
      {/* Left: dot + line */}
      <div className={styles.msLeft}>
        <div className={styles.msDot} style={{ background: item.color, boxShadow: `0 0 16px ${item.color}` }}>
          {item.current && <div className={styles.msDotPulse} style={{ borderColor: item.color }} />}
        </div>
        {index < journeyData.length - 1 && (
          <div className={styles.msLine} style={{ background: `linear-gradient(180deg, ${item.color}60, transparent)` }} />
        )}
      </div>

      {/* Card */}
      <div className={`${styles.msCard} ${item.current ? styles.msCardCurrent : ''}`}
        style={{ borderColor: item.color + '40' }}>
        <span className={styles.msYear} style={{ color: item.color }}>{item.year}</span>
        <div className={styles.msTitle}>{item.title}</div>
        <div className={styles.msSub}>{item.sub}</div>
        <div className={styles.msNote}>{item.note}</div>
        {item.current && (
          <span className={styles.msBadge} style={{ color: item.color, borderColor: item.color + '50', background: item.color + '18' }}>
            🎓 Available for roles
          </span>
        )}
      </div>
    </div>
  )
}

export default function Journey() {
  const headerRef = useReveal()
  return (
    <section className="section" id="journey">
      <div className="sec-header reveal" ref={headerRef}>
        <div className="sec-eyebrow"><div className="sec-line" /> 02 — Journey</div>
        <h2 className="sec-title">Career <span>Roadmap</span></h2>
      </div>
      <div className={styles.timeline}>
        {journeyData.map((item, i) => (
          <MilestoneCard key={item.year} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
