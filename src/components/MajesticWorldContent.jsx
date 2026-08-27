import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import PhoenixPortrait from './PhoenixPortrait.jsx'
import MajesticScene from './majestic/MajesticScene.jsx'
import {
  artisticDisciplines,
  artisticProcessStages,
  commercialWorkSection,
  majesticClosing,
  majesticHero,
  majesticPhilosophy,
  majesticStudio,
  majesticTailsBrand,
  visualDirectionPillars,
} from '../data/majesticContent.js'

function MajesticWorldContent({ onWorldChange, portrait, thoughtMessage, thoughtTriggerKey }) {
  const worldRef = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const worldElement = worldRef.current
    const heroItems = worldElement.querySelectorAll('[data-majestic-hero-item]')
    const sections = worldElement.querySelectorAll('[data-majestic-section]')

    const context = gsap.context(() => {
      gsap.from(heroItems, {
        autoAlpha: 0,
        y: 22,
        duration: 0.85,
        stagger: 0.12,
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
              duration: 0.7,
              ease: 'power3.out',
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
      context.revert()
    }
  }, [])

  return (
    <div ref={worldRef} className="majestic-world">
      {/* Step 5: Minimal Base R3F Canvas */}
      <MajesticScene />

      {/* 01 — MAJESTIC HERO */}
      <section className="majestic-hero" aria-labelledby="majestic-title">
        <PhoenixPortrait
          portrait={portrait}
          worldId="majestic"
          thoughtMessage={thoughtMessage}
          thoughtTriggerKey={thoughtTriggerKey}
        />
        <div className="majestic-hero__content">
          <div className="majestic-hero__header" data-majestic-hero-item>
            <span className="majestic-hero__champagne-dot" aria-hidden="true" />
            <span className="majestic-hero__realm-id">{majesticHero.realmId}</span>
            <span className="majestic-hero__eyebrow">{majesticHero.eyebrow}</span>
          </div>

          <h1 id="majestic-title" className="majestic-hero__title" data-majestic-hero-item>
            {majesticHero.title}
          </h1>

          <p className="majestic-hero__subtitle" data-majestic-hero-item>
            {majesticHero.subtitle}
          </p>

          <p className="majestic-hero__intro" data-majestic-hero-item>
            {majesticHero.intro}
          </p>

          <div className="majestic-hero__meta" data-majestic-hero-item>
            <p className="majestic-hero__disciplines">
              {majesticHero.disciplines}
            </p>
            <p className="majestic-hero__invitation">
              {majesticHero.invitation}
            </p>
          </div>
        </div>
      </section>

      <div className="majestic-world__sections">
        {/* 01 — THE STUDIO */}
        <section
          className="majestic-section majestic-studio"
          data-majestic-section
          aria-labelledby="majestic-studio-title"
        >
          <header className="majestic-section__header">
            <span className="majestic-section__index">01</span>
            <span className="majestic-section__tag">THE STUDIO</span>
            <span className="majestic-section__rule" aria-hidden="true" />
          </header>

          <div className="majestic-studio__grid">
            <div className="majestic-studio__narrative">
              <h2 id="majestic-studio-title" className="majestic-studio__headline">
                {majesticStudio.headline}
              </h2>
              {majesticStudio.paragraphs.map((p, i) => (
                <p key={i} className="majestic-studio__para">
                  {p}
                </p>
              ))}
            </div>

            <div className="majestic-studio__pillars">
              <span className="majestic-studio__pillars-label">STUDIO PILLARS</span>
              <div className="majestic-studio__pillars-list">
                {majesticStudio.pillars.map((pillar) => (
                  <div key={pillar.code} className="majestic-pillar-card">
                    <div className="majestic-pillar-card__head">
                      <span className="majestic-pillar-card__code">[{pillar.code}]</span>
                      <h3>{pillar.title}</h3>
                    </div>
                    <p>{pillar.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 02 — THE PHILOSOPHY (LOCKED MASTERPIECE — UNTOUCHED) */}
        <section
          className="majestic-section majestic-philosophy"
          data-majestic-section
          aria-labelledby="philosophy-title"
        >
          <header className="majestic-section__header">
            <span className="majestic-section__index">02</span>
            <span className="majestic-section__tag">THE PHILOSOPHY</span>
            <span className="majestic-section__rule" aria-hidden="true" />
          </header>

          <div className="majestic-philosophy__statement-card">
            <div className="majestic-philosophy__frame-corner majestic-philosophy__frame-corner--tl" />
            <div className="majestic-philosophy__frame-corner majestic-philosophy__frame-corner--br" />
            <blockquote id="philosophy-title" className="majestic-philosophy__quote">
              &ldquo;{majesticPhilosophy.quote}&rdquo;
            </blockquote>
            <p className="majestic-philosophy__commentary">
              {majesticPhilosophy.commentary}
            </p>
            <span className="majestic-philosophy__author">
              {majesticPhilosophy.author}
            </span>
          </div>
        </section>

        {/* 03 — ARTISTIC DISCIPLINES (Digital Pet Portrait Works) */}
        <section
          className="majestic-section majestic-create"
          data-majestic-section
          aria-labelledby="what-i-create-title"
        >
          <header className="majestic-section__header">
            <span className="majestic-section__index">03</span>
            <span className="majestic-section__tag">ARTISTIC DISCIPLINES</span>
            <span className="majestic-section__rule" aria-hidden="true" />
          </header>

          <h2 id="what-i-create-title" className="majestic-section__heading">
            Bespoke portrait styles &amp; creative treatments.
          </h2>

          <div className="majestic-portraits__list">
            {artisticDisciplines.map((item) => (
              <article key={item.code} className="majestic-portrait-showcase">
                <div className="majestic-portrait-showcase__visual">
                  <div className="majestic-portrait-showcase__frame">
                    <div className="majestic-portrait-showcase__reticle majestic-portrait-showcase__reticle--tl" />
                    <div className="majestic-portrait-showcase__reticle majestic-portrait-showcase__reticle--br" />
                    <img
                      src={item.image.src}
                      alt={item.image.alt}
                      className="majestic-portrait-showcase__image"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="majestic-portrait-showcase__info">
                  <div className="majestic-portrait-showcase__meta">
                    <span className="majestic-portrait-showcase__code">/{item.code}</span>
                    <span className="majestic-portrait-showcase__style">{item.style}</span>
                  </div>
                  <h3 className="majestic-portrait-showcase__title">{item.title}</h3>
                  <p className="majestic-portrait-showcase__desc">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 04 — THE ARTISTIC PROCESS */}
        <section
          className="majestic-section majestic-process"
          data-majestic-section
          aria-labelledby="artistic-process-title"
        >
          <header className="majestic-section__header">
            <span className="majestic-section__index">04</span>
            <span className="majestic-section__tag">THE ARTISTIC PROCESS</span>
            <span className="majestic-section__rule" aria-hidden="true" />
          </header>

          <h2 id="artistic-process-title" className="majestic-section__heading">
            From photo to timeless portrait.
          </h2>

          <div className="majestic-process__container">
            <div className="majestic-process__track" aria-hidden="true" />
            <ol className="majestic-process__sequence">
              {artisticProcessStages.map((stage) => (
                <li key={stage.step} className="majestic-process__step">
                  <div className="majestic-process__node-head">
                    <span className="majestic-process__step-num">{stage.step}</span>
                    <span className="majestic-process__phase">{stage.phase}</span>
                  </div>
                  <p className="majestic-process__detail">{stage.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 05 — THE STUDIO BRAND */}
        <section
          className="majestic-section majestic-tails"
          data-majestic-section
          aria-labelledby="majestic-tails-brand-title"
        >
          <header className="majestic-section__header">
            <span className="majestic-section__index">05</span>
            <span className="majestic-section__tag">THE STUDIO BRAND</span>
            <span className="majestic-section__rule" aria-hidden="true" />
          </header>

          <article className="majestic-tails__showcase">
            <div className="majestic-tails__frame">
              <div className="majestic-tails__reticle majestic-tails__reticle--tl" />
              <div className="majestic-tails__reticle majestic-tails__reticle--br" />
              <div className="majestic-tails__screen">
                <div className="majestic-tails__visual-wrap">
                  <img
                    src={majesticTailsBrand.visual.src}
                    alt={majesticTailsBrand.visual.alt}
                    className="majestic-tails__visual-img"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="majestic-tails__details">
              <div className="majestic-tails__badge-row">
                <span className="majestic-tails__badge">{majesticTailsBrand.badge}</span>
                <span className="majestic-tails__type">{majesticTailsBrand.type}</span>
              </div>

              <h2 id="majestic-tails-brand-title" className="majestic-tails__name">
                {majesticTailsBrand.title}
              </h2>

              <p className="majestic-tails__summary">{majesticTailsBrand.summary}</p>

              <div className="majestic-tails__focus-list">
                <span className="majestic-tails__focus-label">STUDIO ARCHITECTURE</span>
                <ul>
                  {majesticTailsBrand.focusAreas.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </section>

        {/* 06 — VISUAL DIRECTION */}
        <section
          className="majestic-section majestic-direction"
          data-majestic-section
          aria-labelledby="visual-direction-title"
        >
          <header className="majestic-section__header">
            <span className="majestic-section__index">06</span>
            <span className="majestic-section__tag">VISUAL DIRECTION</span>
            <span className="majestic-section__rule" aria-hidden="true" />
          </header>

          <h2 id="visual-direction-title" className="majestic-section__heading">
            Warmth, Luxury, and Character Expression.
          </h2>

          <div className="majestic-direction__grid">
            {visualDirectionPillars.map((p) => (
              <article key={p.num} className="majestic-direction-pillar">
                <div className="majestic-direction-pillar__header">
                  <span className="majestic-direction-pillar__num">[{p.num}]</span>
                  <h3>{p.title}</h3>
                </div>
                <p>{p.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 07 — CLIENT / COMMERCIAL WORK */}
        <section
          className="majestic-section majestic-commercial"
          data-majestic-section
          aria-labelledby="commercial-work-title"
        >
          <header className="majestic-section__header">
            <span className="majestic-section__index">07</span>
            <span className="majestic-section__tag">COMMERCIAL COMMISSIONS</span>
            <span className="majestic-section__rule" aria-hidden="true" />
          </header>

          <div className="majestic-commercial__card">
            <div className="majestic-commercial__header">
              <span className="majestic-commercial__tag">{commercialWorkSection.statusTag}</span>
              <h2 id="commercial-work-title" className="majestic-commercial__title">
                {commercialWorkSection.title}
              </h2>
              <p className="majestic-commercial__subtitle">{commercialWorkSection.subtitle}</p>
            </div>

            <div className="majestic-commercial__grid">
              {commercialWorkSection.collaborations.map((collab, index) => (
                <div key={index} className="majestic-commercial-item">
                  <h3>{collab.category}</h3>
                  <p>{collab.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 08 — CLOSING & WORLD LINKS */}
        <section
          className="majestic-section majestic-closing"
          data-majestic-section
          aria-labelledby="majestic-closing-title"
        >
          <header className="majestic-section__header">
            <span className="majestic-section__index">08</span>
            <span className="majestic-section__tag">STUDIO SIGN-OFF</span>
            <span className="majestic-section__rule" aria-hidden="true" />
          </header>

          <div className="majestic-closing__body">
            <h2 id="majestic-closing-title" className="majestic-closing__headline">
              {majesticClosing.headline}
            </h2>
            <p className="majestic-closing__narrative">{majesticClosing.narrative}</p>
            <p className="majestic-closing__author">{majesticClosing.authorNote}</p>

            <div className="majestic-closing__actions">
              {majesticClosing.worldLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  className="majestic-closing__button"
                  onClick={() => onWorldChange?.(link.worldId)}
                >
                  <span className="majestic-closing__button-dot">&#9670;</span>
                  <span>{link.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default MajesticWorldContent
