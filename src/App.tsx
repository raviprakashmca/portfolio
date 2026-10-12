import { useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import {
  education,
  experience,
  metrics,
  profile,
  skills,
  summary,
} from './data/resume'
import './App.css'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Highlights the nav item for the section currently in view */
function useActiveSection() {
  const [active, setActive] = useState('about')
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])
  return active
}

/* Fades elements marked .reveal into view as they scroll in */
function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.reveal')
    if (prefersReducedMotion()) {
      items.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            observer.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/* Animates the numeric part of a value like "3M+" when it scrolls into view */
function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? Number(match[1]) : 0
  const suffix = match ? match[2] : ''
  const isNumeric = match !== null
  const ref = useRef<HTMLSpanElement>(null)
  const [n, setN] = useState(() => (prefersReducedMotion() ? target : 0))

  useEffect(() => {
    const el = ref.current
    if (!el || !isNumeric || prefersReducedMotion()) return
    let frame = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1100)
        const eased = 1 - Math.pow(1 - t, 3)
        setN(Math.round(eased * target))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    })
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target, isNumeric])

  if (!match) return <span>{value}</span>
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <h2 className="section-heading">
      <span className="section-index">{index}</span>
      {title}
    </h2>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V16M8 7.75v.01M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.4-2.6S16 11.4 16 13v3" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 4h3l1.5 4-2 1.3a11 11 0 0 0 7.2 7.2l1.3-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  )
}

function App() {
  const active = useActiveSection()
  useReveal()
  const year = new Date().getFullYear()
  const pageRef = useRef<HTMLDivElement>(null)

  // Soft spotlight that follows the cursor (desktop pointer only)
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !pageRef.current) return
    pageRef.current.style.setProperty('--mx', `${e.clientX}px`)
    pageRef.current.style.setProperty('--my', `${e.clientY}px`)
  }

  const tel = `tel:${profile.phone.replace(/[^+\d]/g, '')}`
  const linkedinUrl = `https://${profile.linkedin}`

  return (
    <div className="page" ref={pageRef} onPointerMove={onPointerMove}>
      <div className="spotlight" aria-hidden="true" />

      {/* Compact top bar — shown on smaller screens only */}
      <header className="topbar">
        <a href="#top" className="monogram" aria-label="Back to top">
          RP
        </a>
        <nav aria-label="Sections">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={active === s.id ? 'is-active' : undefined}
            >
              {s.label}
            </a>
          ))}
        </nav>
      </header>

      <div className="layout" id="top">
        {/* Intro column — sticky on desktop */}
        <aside className="intro">
          <div className="intro-main">
            <p className="eyebrow">
              <span className="status-dot" aria-hidden="true" />
              {profile.role} · {profile.location}
            </p>
            <h1>{profile.name}</h1>
            <p className="lede">
              I design, run and optimise{' '}
              <em>cloud-native .NET microservices</em> that stay fast and
              reliable under heavy data loads.
            </p>
            <p className="tagline">{profile.tagline}</p>

            <nav className="side-nav" aria-label="Sections">
              {sections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={active === s.id ? 'is-active' : undefined}
                >
                  <span className="side-nav-index">0{i + 1}</span>
                  <span className="side-nav-line" aria-hidden="true" />
                  <span className="side-nav-label">{s.label}</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="intro-footer">
            <div className="hero-actions">
              <a className="btn btn-primary" href={`mailto:${profile.email}`}>
                Get in touch
              </a>
              <a
                className="btn"
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>
            <ul className="socials" aria-label="Contact links">
              <li>
                <a href={`mailto:${profile.email}`} aria-label="Email">
                  <MailIcon />
                </a>
              </li>
              <li>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
              </li>
              <li>
                <a href={tel} aria-label="Phone">
                  <PhoneIcon />
                </a>
              </li>
            </ul>
          </div>
        </aside>

        {/* Scrolling content column */}
        <main className="content">
          <section id="about" className="section">
            <SectionHeading index="01" title="About" />
            <div className="prose reveal">
              {summary.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <dl className="metrics reveal">
              {metrics.map((m) => (
                <div key={m.label}>
                  <dt>{m.label}</dt>
                  <dd>
                    <CountUp value={m.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="experience" className="section">
            <SectionHeading index="02" title="Experience" />
            <ol className="timeline">
              {experience.map((r) => (
                <li
                  key={`${r.company}-${r.start}`}
                  className={`role reveal${r.highlights ? ' role-featured' : ''}`}
                >
                  <div className="role-dates">
                    {r.start}
                    {r.end && <> — {r.end}</>}
                  </div>
                  <div className="role-body">
                    <h3>
                      {r.title}
                      <span className="at"> · </span>
                      <span className="company">{r.company}</span>
                    </h3>
                    {r.client && (
                      <p className="role-meta">Client engagement: {r.client}</p>
                    )}
                    {r.note && <p className="role-meta">{r.note}</p>}
                    {r.highlights && (
                      <ul className="highlights">
                        {r.highlights.map((h) => (
                          <li key={h.slice(0, 24)}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="skills" className="section">
            <SectionHeading index="03" title="Skills" />
            <div className="skills">
              {skills.map((g) => (
                <div key={g.group} className="skill-group reveal">
                  <h3>{g.group}</h3>
                  <ul>
                    {g.items.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section id="education" className="section">
            <SectionHeading index="04" title="Education" />
            <ul className="education">
              {education.map((e) => (
                <li key={e.degree} className="reveal">
                  <div>
                    <h3>{e.degree}</h3>
                    <p>{e.school}</p>
                  </div>
                  <span className="score">{e.score}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="contact" className="section contact">
            <SectionHeading index="05" title="Contact" />
            <p className="contact-lede reveal">
              Open to conversations about backend engineering, cloud
              architecture and high-scale API platforms.
            </p>
            <ul className="contact-list reveal">
              <li>
                <span>Email</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li>
                <span>Phone</span>
                <a href={tel}>{profile.phone}</a>
              </li>
              <li>
                <span>LinkedIn</span>
                <a href={linkedinUrl} target="_blank" rel="noreferrer">
                  {profile.linkedin}
                </a>
              </li>
              <li>
                <span>Location</span>
                <p>{profile.location}</p>
              </li>
            </ul>
          </section>

          <footer className="footer">
            <span>
              © {year} {profile.name}
            </span>
            <a href="#top">Back to top ↑</a>
          </footer>
        </main>
      </div>
    </div>
  )
}

export default App
