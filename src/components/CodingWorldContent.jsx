import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import PhoenixPortrait from './PhoenixPortrait.jsx'
import CodingScene from './coding/CodingScene.jsx'
import { codingContent } from '../data/portfolioContent.js'

function CodingWorldContent({ portrait, thoughtMessage, thoughtTriggerKey }) {
  const worldRef = useRef(null)

  const {
    aiDevelopment,
    campusShare,
    capabilities,
    engineeringProcess,
    hero,
    lifecycle,
    portfolioEngine,
    profile,
    projects,
    sections,
    techStack,
  } = codingContent

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const worldElement = worldRef.current
    const heroItems = worldElement.querySelectorAll('[data-coding-hero-item]')
    const sectionElements = worldElement.querySelectorAll('[data-coding-section]')

    const context = gsap.context(() => {
      gsap.from(heroItems, {
        autoAlpha: 0,
        y: 20,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
      })
      gsap.set(sectionElements, { autoAlpha: 0, y: 28 })
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

    sectionElements.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
      context.revert()
    }
  }, [])

  return (
    <div ref={worldRef} className="coding-world">
      {/* Underlying 3D Spatial Network Layer */}
      <CodingScene />

      {/* CODING HERO */}
      <section
        className="coding-hero"
        data-coding-section-id="hero"
        aria-labelledby="coding-title"
      >
        <PhoenixPortrait
          portrait={portrait}
          worldId="coding"
          thoughtMessage={thoughtMessage}
          thoughtTriggerKey={thoughtTriggerKey}
        />
        <div className="coding-hero__content">
          <div className="coding-hero__terminal-header" data-coding-hero-item>
            <span className="coding-hero__status-dot" aria-hidden="true" />
            <span className="coding-hero__sys-id">{hero.terminalId}</span>
            <span className="coding-hero__status-label">{hero.statusBadge}</span>
          </div>

          <h1 id="coding-title" className="coding-hero__title" data-coding-hero-item>
            {hero.name}
          </h1>

          <p className="coding-hero__roles" data-coding-hero-item>
            {hero.roles}
          </p>

          <p className="coding-hero__intro" data-coding-hero-item>
            {hero.intro}
          </p>

          <div className="coding-hero__meta" data-coding-hero-item>
            <p className="coding-hero__disciplines">
              {hero.disciplines}
            </p>
            <p className="coding-hero__invitation">
              {hero.invitation}
            </p>
          </div>
        </div>
      </section>

      <div className="coding-world__sections">
        {/* 01 — TECHNICAL PROFILE */}
        <section
          className="coding-section coding-profile"
          data-coding-section
          data-coding-section-id="profile"
          aria-labelledby="tech-profile-title"
        >
          <header className="coding-section__header">
            <span className="coding-section__index">{sections.profile.index}</span>
            <span className="coding-section__tag">{sections.profile.tag}</span>
            <span className="coding-section__rule" aria-hidden="true" />
          </header>

          <div className="coding-profile__grid">
            <div className="coding-profile__lead">
              <h2 id="tech-profile-title" className="coding-profile__headline">
                {profile.narrativeLead}
              </h2>
              {profile.narrativeBody.map((paragraph, i) => (
                <p key={i} className="coding-profile__para">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="coding-profile__principles">
              <span className="coding-profile__principles-label">CORE PRINCIPLES</span>
              <div className="coding-profile__principles-list">
                {profile.principles.map((item) => (
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

        {/* 02 — WHAT I BUILD */}
        <section
          className="coding-section coding-capabilities"
          data-coding-section
          data-coding-section-id="capabilities"
          aria-labelledby="what-i-build-title"
        >
          <header className="coding-section__header">
            <span className="coding-section__index">{sections.capabilities.index}</span>
            <span className="coding-section__tag">{sections.capabilities.tag}</span>
            <span className="coding-section__rule" aria-hidden="true" />
          </header>

          <h2 id="what-i-build-title" className="coding-section__heading">
            {sections.capabilities.heading}
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

        {/* 03 — ENGINEERING APPROACH */}
        <section
          className="coding-section coding-process"
          data-coding-section
          data-coding-section-id="process"
          aria-labelledby="engineering-approach-title"
        >
          <header className="coding-section__header">
            <span className="coding-section__index">{sections.process.index}</span>
            <span className="coding-section__tag">{sections.process.tag}</span>
            <span className="coding-section__rule" aria-hidden="true" />
          </header>

          <h2 id="engineering-approach-title" className="coding-section__heading">
            {sections.process.heading}
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

        {/* 04 — TECH STACK */}
        <section
          className="coding-section coding-stack"
          data-coding-section
          data-coding-section-id="stack"
          aria-labelledby="tech-stack-title"
        >
          <header className="coding-section__header">
            <span className="coding-section__index">{sections.stack.index}</span>
            <span className="coding-section__tag">{sections.stack.tag}</span>
            <span className="coding-section__rule" aria-hidden="true" />
          </header>

          <h2 id="tech-stack-title" className="coding-section__heading">
            {sections.stack.heading}
          </h2>

          <div className="coding-stack__categories">
            {techStack.map((cat) => (
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

        {/* 05 — SELECTED PROJECTS */}
        <section
          className="coding-section coding-projects"
          data-coding-section
          data-coding-section-id="projects"
          aria-labelledby="selected-projects-title"
        >
          <header className="coding-section__header">
            <span className="coding-section__index">{sections.projects.index}</span>
            <span className="coding-section__tag">{sections.projects.tag}</span>
            <span className="coding-section__rule" aria-hidden="true" />
          </header>

          <h2 id="selected-projects-title" className="coding-section__heading">
            {sections.projects.heading}
          </h2>

          <div className="coding-projects__grid">
            {projects.map((project) => (
              <article key={project.id} className="coding-project-card">
                <div className="coding-project-card__frame">
                  <div className="coding-project-card__reticle coding-project-card__reticle--tl" />
                  <div className="coding-project-card__reticle coding-project-card__reticle--br" />
                  <div className="coding-project-card__screen">
                    <span className="coding-project-card__status-indicator">
                      {project.statusIndicator || `SYS_STATUS // ${project.status.toUpperCase()}`}
                    </span>
                    {project.visual ? (
                      <div className="coding-project-card__visual-wrap">
                        <img
                          src={project.visual.src}
                          alt={project.visual.alt}
                          className="coding-project-card__visual-img"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <span className="coding-project-card__media-note">
                        {project.mediaPlaceholder}
                      </span>
                    )}
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
                    <span className="coding-project-card__highlights-label">
                      {sections.projects.highlightsLabel}
                    </span>
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

        {/* 06 — CAMPUS SHARE (DEDICATED SECTION) */}
        <section
          className="coding-section coding-deepdive"
          data-coding-section
          data-coding-section-id="campus-share"
          aria-labelledby="campus-share-title"
        >
          <header className="coding-section__header">
            <span className="coding-section__index">{sections.campusShare.index}</span>
            <span className="coding-section__tag">{sections.campusShare.tag}</span>
            <span className="coding-section__rule" aria-hidden="true" />
          </header>

          <h2 id="campus-share-title" className="coding-section__heading">
            {campusShare.title}
          </h2>

          <div className="coding-deepdive__grid">
            <div className="coding-deepdive__main">
              <p className="coding-deepdive__lead">{campusShare.lead}</p>

              <div className="coding-deepdive__block">
                <h3 className="coding-deepdive__block-title">{campusShare.whatIBuilt.title}</h3>
                {campusShare.whatIBuilt.paragraphs.map((para, i) => (
                  <p key={i} className="coding-deepdive__text">{para}</p>
                ))}
              </div>

              <div className="coding-deepdive__why-matters">
                <h3 className="coding-deepdive__block-title">{campusShare.whyItMatters.title}</h3>
                {campusShare.whyItMatters.paragraphs.map((para, i) => (
                  <p key={i} className="coding-deepdive__text">{para}</p>
                ))}
              </div>
            </div>

            <div className="coding-deepdive__side">
              <div className="coding-deepdive__panel">
                <div className="coding-deepdive__panel-head">
                  <span className="coding-deepdive__panel-badge">[ARCH_FOCUS]</span>
                  <h3 className="coding-deepdive__panel-title">{campusShare.engineeringFocus.title}</h3>
                </div>
                <ul className="coding-deepdive__list">
                  {campusShare.engineeringFocus.items.map((item, idx) => (
                    <li key={idx} className="coding-deepdive__list-item">
                      <span className="coding-deepdive__item-dot" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 07 — PORTFOLIO MULTI-WORLD ENGINE (DEDICATED SECTION) */}
        <section
          className="coding-section coding-deepdive"
          data-coding-section
          data-coding-section-id="portfolio-engine"
          aria-labelledby="portfolio-engine-title"
        >
          <header className="coding-section__header">
            <span className="coding-section__index">{sections.portfolioEngine.index}</span>
            <span className="coding-section__tag">{sections.portfolioEngine.tag}</span>
            <span className="coding-section__rule" aria-hidden="true" />
          </header>

          <h2 id="portfolio-engine-title" className="coding-section__heading">
            {portfolioEngine.title}
          </h2>

          <div className="coding-deepdive__grid">
            <div className="coding-deepdive__main">
              <p className="coding-deepdive__lead">{portfolioEngine.lead}</p>

              <div className="coding-deepdive__block">
                <h3 className="coding-deepdive__block-title">{portfolioEngine.whatIBuilt.title}</h3>
                <p className="coding-deepdive__text">{portfolioEngine.whatIBuilt.intro}</p>
                <div className="coding-deepdive__worlds-list">
                  {portfolioEngine.whatIBuilt.worlds.map((w) => (
                    <span key={w} className="coding-deepdive__world-tag">{w}</span>
                  ))}
                </div>
                <p className="coding-deepdive__text">{portfolioEngine.whatIBuilt.description}</p>
              </div>

              <div className="coding-deepdive__block">
                <h3 className="coding-deepdive__block-title">{portfolioEngine.engineeringFocus.title}</h3>
                {portfolioEngine.engineeringFocus.paragraphs.map((para, i) => (
                  <p key={i} className="coding-deepdive__text">{para}</p>
                ))}
              </div>

              <div className="coding-deepdive__why-matters">
                <h3 className="coding-deepdive__block-title">{portfolioEngine.whyItMatters.title}</h3>
                <p className="coding-deepdive__text">{portfolioEngine.whyItMatters.lead}</p>
                <ul className="coding-deepdive__principles-list">
                  {portfolioEngine.whyItMatters.points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="coding-deepdive__side">
              <div className="coding-deepdive__panel">
                <div className="coding-deepdive__panel-head">
                  <span className="coding-deepdive__panel-badge">[SYS_ENGINE]</span>
                  <h3 className="coding-deepdive__panel-title">{portfolioEngine.engineeringSystems.title}</h3>
                </div>
                <ul className="coding-deepdive__list">
                  {portfolioEngine.engineeringSystems.items.map((item, idx) => (
                    <li key={idx} className="coding-deepdive__list-item">
                      <span className="coding-deepdive__item-dot" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 08 — AI × DEVELOPMENT */}
        <section
          className="coding-section coding-ai-dev"
          data-coding-section
          data-coding-section-id="ai-dev"
          aria-labelledby="ai-dev-title"
        >
          <header className="coding-section__header">
            <span className="coding-section__index">{sections.aiDev.index}</span>
            <span className="coding-section__tag">{sections.aiDev.tag}</span>
            <span className="coding-section__rule" aria-hidden="true" />
          </header>

          <h2 id="ai-dev-title" className="coding-section__heading">
            {sections.aiDev.heading}
          </h2>

          <div className="coding-ai-dev__grid">
            {aiDevelopment.map((pillar) => (
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

        {/* 09 — SYSTEMS ARCHITECTURE */}
        <section
          className="coding-section coding-architecture"
          data-coding-section
          data-coding-section-id="architecture"
          aria-labelledby="systems-arch-title"
        >
          <header className="coding-section__header">
            <span className="coding-section__index">{sections.architecture.index}</span>
            <span className="coding-section__tag">{sections.architecture.tag}</span>
            <span className="coding-section__rule" aria-hidden="true" />
          </header>

          <h2 id="systems-arch-title" className="coding-section__heading">
            {sections.architecture.heading}
          </h2>

          <div className="coding-architecture__pipeline">
            <div className="coding-architecture__flow-track" aria-hidden="true" />
            <div className="coding-architecture__stages">
              {lifecycle.map((stage) => (
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
      </div>
    </div>
  )
}

export default CodingWorldContent
