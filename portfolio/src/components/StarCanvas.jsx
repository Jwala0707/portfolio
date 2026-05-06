import { useEffect, useRef } from 'react'

export default function StarCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let stars = []
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const mkStar = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 0.8 + 0.2,
      a: Math.random(),
      da: (Math.random() - 0.5) * 0.005,
      dx: (Math.random() - 0.5) * 0.08,
      dy: (Math.random() - 0.5) * 0.08,
      col: ['rgba(110,94,248,', 'rgba(240,80,160,', 'rgba(0,229,255,', 'rgba(26,255,160,'][Math.floor(Math.random() * 4)],
    })

    for (let i = 0; i < 200; i++) stars.push(mkStar())

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(s => {
        s.a += s.da
        if (s.a <= 0 || s.a >= 1) s.da *= -1
        s.x += s.dx; s.y += s.dy
        if (s.x < 0) s.x = canvas.width
        if (s.x > canvas.width) s.x = 0
        if (s.y < 0) s.y = canvas.height
        if (s.y > canvas.height) s.y = 0
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = s.col + s.a + ')'
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return <canvas id="bg-canvas" ref={canvasRef} />
}
