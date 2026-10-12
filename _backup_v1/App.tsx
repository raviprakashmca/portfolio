import { useEffect, useState } from 'react'
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

function useActiveSection() {
  const [active, setActive] = useState('about')
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])
  return active
}

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <h2 className="section-heading">
      <span className="section-index">{index}</span>
      {title}
    </h2>
  )
}

function App() {
  const active = useActiveSection()
  const year = new Date().getFullYear()

  return (
    <div className="page">
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

      <main id="top">
        <section className="hero">
          <p className="eyebrow">
            {profile.role} · {profile.location}
          </p>
          <h1>{profile.name}</h1>
          <p className="lede">
            I design, run and optimise <em>cloud-native .NET microservices</em>{' '}
            that stay fast and reliable under heavy data loads.
          </p>
          <p className="tagline">{profile.tagline}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={`mailto:${profile.email}`}>
              Get in touch
            </a>
            <a
              className="btn"
              href={`https://${profile.linkedin}`}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
        </section>

        <section id="about" className="section">
          <SectionHeading index="01" title="About" />
          <div className="prose">
            {summary.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <dl className="metrics">
            {metrics.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="experience" className="section">
          <SectionHeading index="02" title="Experience" />
          <ol className="timeline">
            {experience.map((r) => (
              <li key={`${r.company}-${r.start}`} className="role">
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
              <div key={g.group} className="skill-group">
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
              <li key={e.degree}>
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
          <p className="contact-lede">
            Open to conversations about backend engineering, cloud architecture
            and high-scale API platforms.
          </p>
          <ul className="contact-list">
            <li>
              <span>Email</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <span>Phone</span>
              <a href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}>
                {profile.phone}
              </a>
            </li>
            <li>
              <span>LinkedIn</span>
              <a
                href={`https://${profile.linkedin}`}
                target="_blank"
                rel="noreferrer"
              >
                {profile.linkedin}
              </a>
            </li>
            <li>
              <span>Location</span>
              <p>{profile.location}</p>
            </li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <span>
          © {year} {profile.name}
        </span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  )
}

export default App
