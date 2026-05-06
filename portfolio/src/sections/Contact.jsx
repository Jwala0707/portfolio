import { heroData } from '../data/portfolioData'
import useReveal from '../components/useReveal'
import styles from './Contact.module.css'

const contacts = [
  { icon: '✉', label: 'Email', value: heroData.email, href: `mailto:${heroData.email}`, color: 'violet' },
  { icon: '📞', label: 'Phone', value: heroData.phone, href: `tel:${heroData.phone}`, color: 'pink' },
  { icon: 'in', label: 'LinkedIn', value: 'Jwala Singh', href: heroData.linkedin, color: 'cyan', mono: true },
  { icon: 'gh', label: 'GitHub', value: 'View Repositories', href: heroData.github, color: 'green', mono: true },
]

const COLOR_MAP = {
  violet: styles.violet,
  pink:   styles.pink,
  cyan:   styles.cyan,
  green:  styles.green,
}

export default function Contact() {
  const headerRef = useReveal()
  const wrapRef = useReveal()

  return (
    <section className="section" id="contact">
      <div className="sec-header reveal" ref={headerRef}>
        <div className="sec-eyebrow"><div className="sec-line" /> 06 — Connect</div>
        <h2 className="sec-title">Get In <span>Touch</span></h2>
      </div>

      <p className={styles.sub}>
        Open to full-time opportunities, freelance projects, and collaborations.
        Let's build something great together.
      </p>

      <div className={`reveal ${styles.grid}`} ref={wrapRef}>
        {contacts.map(c => (
          <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer" className={`contact-card ${styles.card} ${COLOR_MAP[c.color]}`}>
            <div className={`${styles.ci} ${c.mono ? styles.ciMono : ''}`}
              style={c.mono ? { fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '.8rem' } : {}}>
              {c.icon}
            </div>
            <div>
              <div className={styles.clabel}>{c.label}</div>
              <div className={styles.cval}>{c.value}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
