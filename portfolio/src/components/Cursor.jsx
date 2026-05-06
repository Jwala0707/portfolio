import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const cur = cursorRef.current
    const ringEl = ringRef.current

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      cur.style.left = e.clientX + 'px'
      cur.style.top = e.clientY + 'px'

      // Particle trail
      const now = Date.now()
      if (!onMove._last || now - onMove._last > 60) {
        onMove._last = now
        const colors = ['#6e5ef8', '#f050a0', '#00e5ff', '#1affa0']
        const p = document.createElement('div')
        p.className = 'p-trail'
        const size = 2 + Math.random() * 4
        p.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;width:${size}px;height:${size}px;background:${colors[Math.floor(Math.random() * 4)]};`
        document.body.appendChild(p)
        setTimeout(() => p.remove(), 700)
      }
    }

    const animRing = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12
      ringEl.style.left = ring.current.x + 'px'
      ringEl.style.top = ring.current.y + 'px'
      rafRef.current = requestAnimationFrame(animRing)
    }
    rafRef.current = requestAnimationFrame(animRing)

    const onEnter = () => {
      cur.style.width = '6px'; cur.style.height = '6px'
      ringEl.style.width = '52px'; ringEl.style.height = '52px'
      ringEl.style.borderColor = 'rgba(110,94,248,.8)'
    }
    const onLeave = () => {
      cur.style.width = '10px'; cur.style.height = '10px'
      ringEl.style.width = '36px'; ringEl.style.height = '36px'
      ringEl.style.borderColor = 'rgba(110,94,248,.5)'
    }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, .skill-block, .proj-card, .edu-card, .contact-card').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div id="cursor" ref={cursorRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  )
}
