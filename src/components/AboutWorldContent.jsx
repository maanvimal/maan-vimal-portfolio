import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import PhoenixPortrait from './PhoenixPortrait.jsx'
import AboutScene from './about/AboutScene.jsx'
import { aboutContent } from '../data/portfolioContent.js'

function AboutWorldContent({
  onWorldChange,
  portrait,
  thoughtMessage,
  thoughtTriggerKey,
}) {
  const worldRef = useRef(null)

  const {
    capabilities,
    contact,
    experience,
    hero,
    process,
    profile,
    sections,
    selectedWork,
    toolkit,
  } = aboutContent

  useEffect(() => {
    const root = worldRef.current
    if (!root) return

    const heroElements = root.querySelectorAll('[data-about-hero-item]')
    const sectionElements = root.querySelectorAll('[data-about-section]')

    const context = gsap.context(() => {
      // 1. Initial Hero Stagger Reveal
      gsap.fromTo(
        heroElements,
        {
          autoAlpha: 0,
          y: 28,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.2,
        }
      )
    }, root)

    // 2. IntersectionObserver for Scroll-triggered Section Enters
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    sectionElements.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
      context.revert()
    }
  }, [])

  return (
    <div ref={worldRef} className="about-world">
      {/* Underlying 3D Neural Spatial Network Layer */}
      <AboutScene />

      {/* 00 — HERO */}
      <section
        className="about-hero"
        data-about-section-id="hero"
        aria-labelledby="about-title"
      >
        <PhoenixPortrait
          portrait={portrait}
          worldId="about"
          thoughtMessage={thoughtMessage}
          thoughtTriggerKey={thoughtTriggerKey}
        />
        <div className="about-hero__content">
          <div className="about-hero__header" data-about-hero-item>
            <span className="about-hero__status-dot" aria-hidden="true" />
            <span className="about-hero__label">{hero.eyebrow}</span>
          </div>

          <h1 id="about-title" className="about-hero__title" data-about-hero-item>
            {hero.title}
          </h1>

          <p className="about-hero__roles" data-about-hero-item>
            {hero.roles}
          </p>

          <p className="about-hero__intro" data-about-hero-item>
            {hero.intro}
          </p>

          <div className="about-hero__meta" data-about-hero-item>
            <p className="about-hero__disciplines">
              {hero.disciplines}
            </p>
            <p className="about-hero__invitation">
              {hero.invitation}
            </p>
          </div>
        </div>
      </section>

      <div className="about-world__sections">
        {/* 01 — Profile */}
        <section
          className="about-section about-profile"
          data-about-section
          data-about-section-id="profile"
          aria-labelledby="profile-title"
        >
          <header className="about-section__header">
            <span className="about-section__number">{sections.profile.number}</span>
            <span className="about-section__title">{sections.profile.title}</span>
            <span className="about-section__rule" aria-hidden="true" />
          </header>

          <div className="about-profile__grid">
            <h2 id="profile-title" className="about-profile__headline">
              {profile.headline}
            </h2>
            <div className="about-profile__narrative">
              <p>{profile.narrative}</p>
            </div>
          </div>
        </section>

        {/* 02 — What I Do */}
        <section
          className="about-section about-capabilities"
          data-about-section
          data-about-section-id="capabilities"
          aria-labelledby="capabilities-title"
        >
          <header className="about-section__header">
            <span className="about-section__number">{sections.capabilities.number}</span>
            <span className="about-section__title">{sections.capabilities.title}</span>
            <span className="about-section__rule" aria-hidden="true" />
          </header>

          <h2 id="capabilities-title" className="about-section__heading">
            {sections.capabilities.heading}
          </h2>

          <div className="about-capabilities__layout">
            {capabilities.map((capability, index) => (
              <article key={capability.title} className="about-capability-item">
                <div className="about-capability-item__lead">
                  <span className="about-capability-item__index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3>{capability.title}</h3>
                </div>
                <p>{capability.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 03 — How I Work */}
        <section
          className="about-section about-process"
          data-about-section
          data-about-section-id="process"
          aria-labelledby="process-title"
        >
          <header className="about-section__header">
            <span className="about-section__number">{sections.process.number}</span>
            <span className="about-section__title">{sections.process.title}</span>
            <span className="about-section__rule" aria-hidden="true" />
          </header>

          <h2 id="process-title" className="about-section__heading">
            {sections.process.heading}
          </h2>

          <div className="about-process__container">
            <div className="about-process__rail" aria-hidden="true" />
            <ol className="about-process__sequence">
              {process.map(([number, title, description]) => (
                <li key={number} className="about-process__step">
                  <div className="about-process__badge">
                    <span className="about-process__num">{number}</span>
                  </div>
                  <div className="about-process__details">
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 04 — Toolkit */}
        <section
          className="about-section about-toolkit"
          data-about-section
          data-about-section-id="toolkit"
          aria-labelledby="toolkit-title"
        >
          <header className="about-section__header">
            <span className="about-section__number">{sections.toolkit.number}</span>
            <span className="about-section__title">{sections.toolkit.title}</span>
            <span className="about-section__rule" aria-hidden="true" />
          </header>

          <h2 id="toolkit-title" className="about-section__heading">
            {sections.toolkit.heading}
          </h2>

          <div className="about-toolkit__matrix">
            {toolkit.map((category, index) => (
              <article key={category.name} className="about-toolkit__row">
                <div className="about-toolkit__category">
                  <span className="about-toolkit__row-num">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3>{category.name}</h3>
                </div>
                <div className="about-toolkit__items">
                  <p>{category.tools.join(' · ')}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 05 — Selected Work */}
        <section
          className="about-section about-work"
          data-about-section
          data-about-section-id="work"
          aria-labelledby="work-title"
        >
          <header className="about-section__header">
            <span className="about-section__number">{sections.work.number}</span>
            <span className="about-section__title">{sections.work.title}</span>
            <span className="about-section__rule" aria-hidden="true" />
          </header>

          <h2 id="work-title" className="about-section__heading">
            {sections.work.heading}
          </h2>

          <div className="about-work__exhibition">
            {selectedWork.map((project) => (
              <article
                key={project.name}
                className="about-work__portal-card"
                data-portal-world={project.id || ''}
                role="button"
                tabIndex={0}
                aria-label={`${project.name} — ${project.destination}`}
                onClick={() => onWorldChange?.(project.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onWorldChange?.(project.id)
                  }
                }}
              >
                <div className="about-work__frame" aria-hidden="true">
                  <span className="about-work__reticle about-work__reticle--tl" />
                  <span className="about-work__reticle about-work__reticle--br" />
                  {project.image && (
                    <img
                      src={project.image}
                      alt=""
                      className="about-work__image"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="about-work__info">
                  <p className="about-work__category">{project.category}</p>
                  <h3 className="about-work__name">{project.name}</h3>
                  <p className="about-work__description">{project.description}</p>
                  <span className="about-work__destination">
                    {project.destination} <span className="about-work__arrow" aria-hidden="true">→</span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 06 — Education / Experience */}
        <section
          className="about-section about-experience"
          data-about-section
          data-about-section-id="experience"
          aria-labelledby="experience-title"
        >
          <header className="about-section__header">
            <span className="about-section__number">{sections.experience.number}</span>
            <span className="about-section__title">{sections.experience.title}</span>
            <span className="about-section__rule" aria-hidden="true" />
          </header>

          <h2 id="experience-title" className="about-section__heading">
            {sections.experience.heading}
          </h2>

          <div className="about-experience__timeline">
            {experience.map((item, index) => (
              <article
                key={item.heading || item.category || index}
                className="about-experience__entry"
              >
                <div className="about-experience__lead">
                  <span className="about-experience__index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3>{item.heading}</h3>
                </div>
                <div className="about-experience__body">
                  {item.role && (
                    <div className="about-experience__role-header">
                      <h4 className="about-experience__role-title">{item.role}</h4>
                      <div className="about-experience__meta">
                        {item.organization && (
                          <span className="about-experience__org">{item.organization}</span>
                        )}
                        {item.organization && item.period && (
                          <span className="about-experience__dot" aria-hidden="true">
                            ·
                          </span>
                        )}
                        {item.period && (
                          <span className="about-experience__period">{item.period}</span>
                        )}
                      </div>
                    </div>
                  )}
                  {item.summary && (
                    <p className="about-experience__summary">{item.summary}</p>
                  )}
                  {item.details && item.details.length > 0 && (
                    <ul className="about-experience__list">
                      {item.details.map((detail, dIdx) => (
                        <li key={dIdx}>{detail}</li>
                      ))}
                    </ul>
                  )}
                  {item.projects && item.projects.length > 0 && (
                    <div className="about-experience__projects">
                      {item.projects.map((proj, pIdx) => (
                        <div key={pIdx} className="about-experience__project-block">
                          <h5 className="about-experience__project-title">{proj.name}</h5>
                          <ul className="about-experience__list">
                            {proj.highlights.map((h, hIdx) => (
                              <li key={hIdx}>{h}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 07 — Resume / Contact */}
        <section
          className="about-section about-contact"
          data-about-section
          data-about-section-id="contact"
          aria-labelledby="contact-title"
        >
          <header className="about-section__header">
            <span className="about-section__number">{sections.contact.number}</span>
            <span className="about-section__title">{sections.contact.title}</span>
            <span className="about-section__rule" aria-hidden="true" />
          </header>

          <div className="about-contact__signoff">
            <h2 id="contact-title" className="about-contact__signature">
              {contact.signature}
            </h2>
            {contact.identity && (
              <p className="about-contact__identity">{contact.identity}</p>
            )}
            {(contact.email || contact.phone) && (
              <div className="about-contact__info">
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="about-contact__link"
                  >
                    {contact.email}
                  </a>
                )}
                {contact.email && contact.phone && (
                  <span className="about-contact__divider" aria-hidden="true">
                    ·
                  </span>
                )}
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                    className="about-contact__link"
                  >
                    {contact.phone}
                  </a>
                )}
              </div>
            )}
            <p className="about-contact__note">
              {contact.note}
            </p>
            <div className="about-contact__actions">
              {contact.actions.map((action) => {
                if (action.href) {
                  return (
                    <a
                      key={action.label}
                      href={action.href}
                      className="about-contact__button about-contact__button--active"
                      target={action.type === 'resume' ? '_blank' : undefined}
                      rel={action.type === 'resume' ? 'noopener noreferrer' : undefined}
                    >
                      {action.label}
                    </a>
                  )
                }
                return (
                  <button
                    key={action.label}
                    type="button"
                    className="about-contact__button"
                    title={action.status === 'pending-destination' ? 'Resume destination pending' : undefined}
                  >
                    {action.label}
                  </button>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutWorldContent
