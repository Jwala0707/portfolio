import { useEffect, useRef, useState } from 'react'
import { skillsData } from '../data/portfolioData'
import useReveal from '../components/useReveal'
import styles from './Skills.module.css'

const TAG_COLORS = {
  violet: styles.tagViolet,
  pink:   styles.tagPink,
  cyan:   styles.tagCyan,
  gold:   styles.tagGold,
  green:  styles.tagGreen,
}

const ICON_COLORS = {
  violet: styles.iconViolet,
  pink:   styles.iconPink,
  cyan:   styles.iconCyan,
  gold:   styles.iconGold,
  green:  styles.iconGreen,
}

const BAR_COLORS = {
  Python:       styles.barViolet,
  JavaScript:   styles.barPink,
  SQL:          styles.barCyan,
  'HTML / CSS': styles.barGold,
}

function SkillBar({ name, pct }) {
  const [width, setWidth] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setWidth(pct); obs.disconnect() }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [pct])

  return (
    <div className={styles.sbarItem} ref={ref}>
      <div className={styles.sbarHead}>
        <span className={styles.sbarName}>{name}</span>
        <span className={styles.sbarPct}>{pct}%</span>
      </div>
      <div className={styles.sbarTrack}>
        <div
          className={`${styles.sbarFill} ${BAR_COLORS[name] || styles.barViolet}`}
          style={{ width: `${width}%`, transition: 'width 1.2s cubic-bezier(.16,1,.3,1)' }}
        />
      </div>
    </div>
  )
}

function SkillBlock({ skill, delay }) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      className={`reveal skill-block ${styles.block} ${skill.label === 'Professional Attributes' ? styles.full : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.sbHeader}>
        <div className={`${styles.sbIcon} ${ICON_COLORS[skill.color]}`}>{skill.icon}</div>
        <div>
          <div className={styles.sbLabel}>Category</div>
          <div className={styles.sbName}>{skill.label}</div>
        </div>
      </div>

      {skill.type === 'bars' ? (
        <div className={styles.bars}>
          {skill.items.map(item => <SkillBar key={item.name} name={item.name} pct={item.pct} />)}
        </div>
      ) : (
        <div className={styles.tags}>
          {skill.items.map(item => (
            <span key={item} className={`${styles.tag} ${TAG_COLORS[skill.color]}`}>{item}</span>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Skills() {
  const headerRef = useReveal()
  return (
    <section className="section" id="skills">
      <div className="sec-header reveal" ref={headerRef}>
        <div className="sec-eyebrow"><div className="sec-line" /> 01 — Expertise</div>
        <h2 className="sec-title">Technical <span>Arsenal</span></h2>
      </div>
      <div className={styles.grid}>
        {skillsData.map((skill, i) => (
          <SkillBlock key={skill.label} skill={skill} delay={i * 60} />
        ))}
      </div>
    </section>
  )
}
