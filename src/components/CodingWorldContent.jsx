import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import PhoenixPortrait from './PhoenixPortrait.jsx'
import CodingScene from './coding/CodingScene.jsx'
import {
  aiDevelopmentPillars,
  capabilities,
  codingContact,
  codingProfile,
  codingProjects,
  engineeringProcess,
  projectLifecycleStages,
  techStackCategories,
} from '../data/codingContent.js'

function CodingWorldContent({ portrait }) {
  const worldRef = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const worldElement = worldRef.current
    const heroItems = worldElement.querySelectorAll('[data-coding-hero-item]')
    const sections = worldElement.querySelectorAll('[data-coding-section]')

    const context = gsap.context(() => {
      gsap.from(heroItems, {
        autoAlpha: 0,
        y: 20,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
      })
      gsap.set(sections, { autoAlpha: 0, y: 28 })
    }, worldElement)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              ease: 'power3.out',
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
      context.revert()
    }
  }, [])

  return (
    <div ref={worldRef} className="coding-world">
      {/* Underlying 3D Spatial Network Layer */}
      <CodingScene />

      {/* 01 — CODING HERO */}
      <section
        className="coding-hero"
        data-coding-section-id="hero"
        aria-labelledby="coding-title"
      >
        <PhoenixPortrait portrait={portrait} worldId="coding" />
        <div className="coding-hero__content">
          <div className="coding-hero__terminal-header" data-coding-hero-item>
            <span className="coding-hero__status-dot" aria-hidden="true" />
            <span className="coding-hero__sys-id">CODING // 00_INIT</span>
            <span className="coding-hero__status-label">SYS_ACTIVE</span>
          </div>

          <h1 id="coding-title" className="coding-hero__title" data-coding-hero-item>
            {codingProfile.name}
          </h1>

          <p className="coding-hero__roles" data-coding-hero-item>
            {codingProfile.roles}
          </p>

          <p className="coding-hero__intro" data-coding-hero-item>
            {codingProfile.intro}
          </p>

          <div className="coding-hero__meta" data-coding-hero-item>
            <p className="coding-hero__disciplines">
              {codingProfile.disciplines}
            </p>
            <p className="coding-hero__invitation">
              {codingProfile.invitation}
            </p>
          </div>
        </div>
      </section>

      <div className="coding-world__sections">
        {/* 02 — TECHNICAL PROFILE */}
        <section
          className="coding-section coding-profile"
          data-coding-section
          data-coding-section-id="profile"
          aria-labelledby="tech-profile-title"
        >
          <header className="coding-section__header">
            <span className="coding-section__index">01</span>
            <span className="coding-section__tag">TECHNICAL PROFILE</span>
            <span className="coding-section__rule" aria-hidden="true" />
          </header>

          <div className="coding-profile__grid">
            <div className="coding-profile__lead">
              <h2 id="tech-profile-title" className="coding-profile__headline">
                {codingProfile.narrativeLead}
              </h2>
              {codingProfile.narrativeBody.map((paragraph, i) => (
                <p key={i} className="coding-profile__para">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="coding-profile__principles">
              <span className="coding-profile__principles-label">CORE PRINCIPLES</span>
              <div className="coding-profile__principles-list">
                {codingProfile.principles.map((item) => (
                  <div key={item.code} className="coding-principle-card">
                    <div className="coding-principle-card__header">
                      <span className="coding-principle-card__code">[{item.code}]</span>
                      <h3>{item.title}</h3>
                    </div>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 03 — WHAT I BUILD */}
        <section
          className="coding-section coding-capabilities"
          data-coding-section
          data-coding-section-id="capabilities"
          aria-labelledby="what-i-build-title"
        >
          <header className="coding-section__header">
            <span className="coding-section__index">02</span>
            <span className="coding-section__tag">WHAT I BUILD</span>
            <span className="coding-section__rule" aria-hidden="true" />
          </header>

          <h2 id="what-i-build-title" className="coding-section__heading">
            Engineering across software, AI pipelines, and interactive interfaces.
          </h2>

          <div className="coding-capabilities__grid">
            {capabilities.map((cap) => (
              <article key={cap.title} className="coding-capability-node">
                <div className="coding-capability-node__meta">
                  <span className="coding-capability-node__code">/{cap.code}</span>
                  <span className="coding-capability-node__category">{cap.category}</span>
                </div>
                <h3>{cap.title}</h3>
                <p>{cap.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 04 — ENGINEERING APPROACH */}
        <section
          className="coding-section coding-process"
          data-coding-section
          data-coding-section-id="process"
          aria-labelledby="engineering-approach-title"
        >
          <header className="coding-section__header">
            <span className="coding-section__index">03</span>
            <span className="coding-section__tag">ENGINEERING APPROACH</span>
            <span className="coding-section__rule" aria-hidden="true" />
          </header>

          <h2 id="engineering-approach-title" className="coding-section__heading">
            Structured execution from specification to production.
          </h2>

          <div className="coding-process__container">
            <div className="coding-process__track" aria-hidden="true" />
            <ol className="coding-process__sequence">
              {engineeringProcess.map((proc) => (
                <li key={proc.step} className="coding-process__step">
                  <div className="coding-process__node-header">
                    <span className="coding-process__step-num">{proc.step}</span>
                    <span className="coding-process__phase">{proc.phase}</span>
                  </div>
                  <p className="coding-process__summary">{proc.summary}</p>
                  <div className="coding-process__tags">
                    {proc.tags.map((tag) => (
                      <span key={tag} className="coding-process__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 05 — TECH STACK */}
        <section
          className="coding-section coding-stack"
          data-coding-section
          data-coding-section-id="stack"
          aria-labelledby="tech-stack-title"
        >
          <header className="coding-section__header">
            <span className="coding-section__index">04</span>
            <span className="coding-section__tag">TECH STACK</span>
            <span className="coding-section__rule" aria-hidden="true" />
          </header>

          <h2 id="tech-stack-title" className="coding-section__heading">
            Verified technical toolkit &amp; production environments.
          </h2>

          <div className="coding-stack__categories">
            {techStackCategories.map((cat) => (
              <article key={cat.id} className="coding-stack__category-card">
                <div className="coding-stack__category-head">
                  <h3>{cat.name}</h3>
                  <span className="coding-stack__tag-badge">{cat.tag}</span>
                </div>
                <div className="coding-stack__tool-list">
                  {cat.tools.map((tool) => (
                    <div key={tool.name} className="coding-stack__tool-item">
                      <span className="coding-stack__tool-name">{tool.name}</span>
                      <span className="coding-stack__tool-detail">{tool.detail}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 06 — SELECTED PROJECTS */}
        <section
          className="coding-section coding-projects"
          data-coding-section
          data-coding-section-id="projects"
          aria-labelledby="selected-projects-title"
        >
          <header className="coding-section__header">
            <span className="coding-section__index">05</span>
            <span className="coding-section__tag">SELECTED PROJECTS</span>
            <span className="coding-section__rule" aria-hidden="true" />
          </header>

          <h2 id="selected-projects-title" className="coding-section__heading">
            Production applications and systems engineering.
          </h2>

          <div className="coding-projects__grid">
            {codingProjects.map((project) => (
              <article key={project.id} className="coding-project-card">
                <div className="coding-project-card__frame">
                  <div className="coding-project-card__reticle coding-project-card__reticle--tl" />
                  <div className="coding-project-card__reticle coding-project-card__reticle--br" />
                  <div className="coding-project-card__screen">
                    <span className="coding-project-card__status-indicator">
                      SYS_STATUS // {project.status.toUpperCase()}
                    </span>
                    <span className="coding-project-card__media-note">
                      {project.mediaPlaceholder}
                    </span>
                  </div>
                </div>

                <div className="coding-project-card__body">
                  <div className="coding-project-card__header-line">
                    <span className="coding-project-card__badge">{project.badge}</span>
                    <span className="coding-project-card__type">{project.type}</span>
                  </div>
                  <h3 className="coding-project-card__name">{project.title}</h3>
                  <p className="coding-project-card__desc">{project.description}</p>

                  <div className="coding-project-card__highlights">
                    <span className="coding-project-card__highlights-label">ARCHITECTURE HIGHLIGHTS</span>
                    <ul>
                      {project.highlights.map((h, index) => (
                        <li key={index}>{h}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="coding-project-card__stack-pills">
                    {project.stack.map((item) => (
                      <span key={item} className="coding-stack-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 07 — AI × DEVELOPMENT */}
        <section
          className="coding-section coding-ai-dev"
          data-coding-section
          data-coding-section-id="ai-dev"
          aria-labelledby="ai-dev-title"
        >
          <header className="coding-section__header">
            <span className="coding-section__index">06</span>
            <span className="coding-section__tag">AI × DEVELOPMENT</span>
            <span className="coding-section__rule" aria-hidden="true" />
          </header>

          <h2 id="ai-dev-title" className="coding-section__heading">
            The convergence of software engineering and artificial intelligence.
          </h2>

          <div className="coding-ai-dev__grid">
            {aiDevelopmentPillars.map((pillar) => (
              <article key={pillar.num} className="coding-ai-pillar">
                <div className="coding-ai-pillar__header">
                  <span className="coding-ai-pillar__num">[{pillar.num}]</span>
                  <h3>{pillar.title}</h3>
                </div>
                <p>{pillar.summary}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 08 — PROJECT ARCHITECTURE */}
        <section
          className="coding-section coding-architecture"
          data-coding-section
          data-coding-section-id="architecture"
          aria-labelledby="systems-arch-title"
        >
          <header className="coding-section__header">
            <span className="coding-section__index">07</span>
            <span className="coding-section__tag">SYSTEMS ARCHITECTURE</span>
            <span className="coding-section__rule" aria-hidden="true" />
          </header>

          <h2 id="systems-arch-title" className="coding-section__heading">
            End-to-end project lifecycle &amp; data flow.
          </h2>

          <div className="coding-architecture__pipeline">
            <div className="coding-architecture__flow-track" aria-hidden="true" />
            <div className="coding-architecture__stages">
              {projectLifecycleStages.map((stage) => (
                <div key={stage.step} className="coding-architecture__node">
                  <div className="coding-architecture__node-head">
                    <span className="coding-architecture__node-num">{stage.step}</span>
                    <span className="coding-architecture__node-icon">{stage.icon}</span>
                  </div>
                  <h3>{stage.name}</h3>
                  <p>{stage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 09 — GITHUB / CONTACT */}
        <section
          className="coding-section coding-contact"
          data-coding-section
          data-coding-section-id="contact"
          aria-labelledby="coding-contact-title"
        >
          <header className="coding-section__header">
            <span className="coding-section__index">08</span>
            <span className="coding-section__tag">SYSTEM EXIT</span>
            <span className="coding-section__rule" aria-hidden="true" />
          </header>

          <div className="coding-contact__body">
            <h2 id="coding-contact-title" className="coding-contact__name">
              {codingContact.title}
            </h2>
            <p className="coding-contact__subtitle">{codingContact.subtitle}</p>

            <div className="coding-contact__actions">
              {codingContact.actions.map((act) => (
                <button
                  key={act.label}
                  type="button"
                  className="coding-contact__button"
                  disabled
                >
                  <span className="coding-contact__button-prefix">&gt;</span>
                  <span>{act.label}</span>
                </button>
              ))}
            </div>
          </div>

          <footer className="coding-world__colophon" aria-hidden="true">
            <span>SYS_STATUS: ONLINE</span>
            <span>//</span>
            <span>WORLD: CODING_V1</span>
            <span>//</span>
            <span>STACK: REACT 19 + VITE 8 + GSAP</span>
          </footer>
        </section>
      </div>
    </div>
  )
}

export default CodingWorldContent
