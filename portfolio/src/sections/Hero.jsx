import { useEffect, useRef, useState } from 'react'
import { heroData } from '../data/portfolioData'
import styles from './Hero.module.css'

function useCounter(target, suffix = '', duration = 1800, active = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const start = Date.now()
    const id = setInterval(() => {
      const prog = Math.min((Date.now() - start) / duration, 1)
      const ease = 1 - Math.pow(1 - prog, 4)
      setVal(Math.round(ease * target))
      if (prog >= 1) clearInterval(id)
    }, 16)
    return () => clearInterval(id)
  }, [active, target, duration])
  return val + suffix
}

function TypingRole() {
  const roles = heroData.roles
  const [text, setText] = useState('')
  const [ri, setRi] = useState(0)
  const [ci, setCi] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    const word = roles[ri]
    let t
    if (!del) {
      if (ci < word.length) t = setTimeout(() => { setText(word.slice(0, ci + 1)); setCi(c => c + 1) }, 80)
      else t = setTimeout(() => setDel(true), 1800)
    } else {
      if (ci > 0) t = setTimeout(() => { setText(word.slice(0, ci - 1)); setCi(c => c - 1) }, 40)
      else { setDel(false); setRi(r => (r + 1) % roles.length) }
    }
    return () => clearTimeout(t)
  }, [ci, del, ri])

  return <strong className={`${styles.roleStrong} type-cursor`}>{text}</strong>
}

export default function Hero() {
  const [counterOn, setCounterOn] = useState(false)
  const p = useCounter(3, '', 1800, counterOn)
  const t = useCounter(15, '+', 1800, counterOn)
  const y = useCounter(3, '+', 1800, counterOn)

  // Parallax orbs
  useEffect(() => {
    const onMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      document.querySelectorAll('.hero-glow').forEach((g, i) => {
        const f = (i + 1) * 12
        g.style.transform = `translate(${x * f}px,${y * f}px)`
      })
    }
    window.addEventListener('mousemove', onMove)
    setTimeout(() => setCounterOn(true), 1200)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.gridOverlay} />
      <div className={`hero-glow ${styles.hg1}`} />
      <div className={`hero-glow ${styles.hg2}`} />
      <div className={`hero-glow ${styles.hg3}`} />

      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <span className={styles.dot} />
          Available for Opportunities · {heroData.location}
        </div>

        <h1 className={styles.name}>
          <span className={styles.line1}>Jwala Singh</span>
          <span className={`${styles.line2} glitch`} data-text="Software Engineer">Software Engineer</span>
        </h1>

        <p className={styles.role}>
          <TypingRole /> · Python · React.js · Node.js
        </p>

        <p className={styles.desc}>{heroData.desc}</p>

        <div className={styles.btns}>
          <a href="#projects" className={styles.btnGlow}>
            View Projects
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#contact" className={styles.btnGhost}>Get In Touch</a>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        {[{ v: p, l: 'Projects Built' }, { v: t, l: 'Technologies' }, { v: y, l: 'Years Coding' }].map(s => (
          <div key={s.l} className={styles.statItem}>
            <div className={styles.statNum}>{s.v}</div>
            <div className={styles.statLabel}>{s.l}</div>
          </div>
        ))}
      </div>

      <div className={styles.scrollHint}>
        <div className={styles.scrollLine} />
        scroll to explore
      </div>
    </section>
  )
}
