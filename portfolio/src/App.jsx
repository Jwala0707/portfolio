import Cursor from './components/Cursor'
import StarCanvas from './components/StarCanvas'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Skills from './sections/Skills'
import Journey from './sections/Journey'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Education from './sections/Education'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function App() {
  return (
    <>
      <Cursor />
      <StarCanvas />
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Journey />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
