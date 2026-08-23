import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import PhoenixPortrait from './PhoenixPortrait.jsx'
import LivingBookScene from './mythos/LivingBookScene.jsx'
import {
  cinematicProduction,
  mediaWatchArchive,
  mythosClosing,
  mythosHero,
  mythosProject,
  mythosUnveiledShowcase,
  productionPipelineStages,
  selectedEpisodes,
  storyEngineStages,
  visualLanguagePillars,
} from '../data/mythosContent.js'

function MythosWorldContent({ portrait, thoughtMessage, thoughtTriggerKey }) {
  const worldRef = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const worldElement = worldRef.current
    const heroItems = worldElement.querySelectorAll('[data-mythos-hero-item]')
    const sections = worldElement.querySelectorAll('[data-mythos-section]')

    const context = gsap.context(() => {
      gsap.from(heroItems, {
        autoAlpha: 0,
        y: 24,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
      })
      gsap.set(sections, { autoAlpha: 0, y: 30 })
    }, worldElement)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
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
    <div ref={worldRef} className="mythos-world">
      {/* Central 3D Living Book Layer */}
      <LivingBookScene />

      {/* 01 — MYTHOS HERO */}
      <section className="mythos-hero" aria-labelledby="mythos-title">
        <PhoenixPortrait
          portrait={portrait}
          worldId="mythos"
          thoughtMessage={thoughtMessage}
          thoughtTriggerKey={thoughtTriggerKey}
        />
        <div className="mythos-hero__content">
          <div className="mythos-hero__header" data-mythos-hero-item>
            <span className="mythos-hero__ember-dot" aria-hidden="true" />
            <span className="mythos-hero__realm-id">{mythosHero.realmId}</span>
            <span className="mythos-hero__eyebrow">{mythosHero.eyebrow}</span>
          </div>

          <h1 id="mythos-title" className="mythos-hero__title" data-mythos-hero-item>
            {mythosHero.title}
          </h1>

          <p className="mythos-hero__subtitle" data-mythos-hero-item>
            {mythosHero.subtitle}
          </p>

          <p className="mythos-hero__intro" data-mythos-hero-item>
            {mythosHero.intro}
          </p>

          <div className="mythos-hero__meta" data-mythos-hero-item>
            <p className="mythos-hero__disciplines">
              {mythosHero.disciplines}
            </p>
            <p className="mythos-hero__invitation">
              {mythosHero.invitation}
            </p>
          </div>
        </div>
      </section>

      <div className="mythos-world__sections">
        {/* 01 — THE PROJECT */}
        <section
          className="mythos-section mythos-project"
          data-mythos-section
          aria-labelledby="mythos-project-title"
        >
          <header className="mythos-section__header">
            <span className="mythos-section__index">01</span>
            <span className="mythos-section__tag">THE PROJECT</span>
            <span className="mythos-section__rule" aria-hidden="true" />
          </header>

          <div className="mythos-project__grid">
            <div className="mythos-project__narrative">
              <h2 id="mythos-project-title" className="mythos-project__headline">
                {mythosProject.headline}
              </h2>
              {mythosProject.paragraphs.map((p, i) => (
                <p key={i} className="mythos-project__para">
                  {p}
                </p>
              ))}
            </div>

            <div className="mythos-project__pillars">
              <span className="mythos-project__pillars-label">CORE FOUNDATIONS</span>
              <div className="mythos-project__pillars-list">
                {mythosProject.pillars.map((pillar) => (
                  <div key={pillar.code} className="mythos-pillar-card">
                    <div className="mythos-pillar-card__head">
                      <span className="mythos-pillar-card__code">[{pillar.code}]</span>
                      <h3>{pillar.title}</h3>
                    </div>
                    <p>{pillar.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 02 — THE STORY ENGINE */}
        <section
          className="mythos-section mythos-story-engine"
          data-mythos-section
          aria-labelledby="story-engine-title"
        >
          <header className="mythos-section__header">
            <span className="mythos-section__index">02</span>
            <span className="mythos-section__tag">THE STORY ENGINE</span>
            <span className="mythos-section__rule" aria-hidden="true" />
          </header>

          <h2 id="story-engine-title" className="mythos-section__heading">
            The three-tier narrative mechanism.
          </h2>

          <div className="mythos-story-engine__container">
            <div className="mythos-story-engine__track" aria-hidden="true" />
            <div className="mythos-story-engine__stages">
              {storyEngineStages.map((stg) => (
                <article key={stg.step} className="mythos-story-card">
                  <div className="mythos-story-card__header">
                    <span className="mythos-story-card__step">{stg.step}</span>
                    <span className="mythos-story-card__role">{stg.role}</span>
                  </div>
                  <h3 className="mythos-story-card__name">{stg.name}</h3>
                  <p className="mythos-story-card__desc">{stg.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 03 — CINEMATIC PRODUCTION */}
        <section
          className="mythos-section mythos-production"
          data-mythos-section
          aria-labelledby="cinematic-prod-title"
        >
          <header className="mythos-section__header">
            <span className="mythos-section__index">03</span>
            <span className="mythos-section__tag">CINEMATIC PRODUCTION</span>
            <span className="mythos-section__rule" aria-hidden="true" />
          </header>

          <h2 id="cinematic-prod-title" className="mythos-section__heading">
            Verified multi-model tools &amp; production craft.
          </h2>

          <div className="mythos-production__tools-grid">
            {cinematicProduction.tools.map((tool) => (
              <div key={tool.name} className="mythos-tool-node">
                <div className="mythos-tool-node__meta">
                  <span className="mythos-tool-node__name">{tool.name}</span>
                  <span className="mythos-tool-node__cat">{tool.category}</span>
                </div>
                <p className="mythos-tool-node__detail">{tool.detail}</p>
              </div>
            ))}
          </div>

          <div className="mythos-production__disciplines-block">
            <span className="mythos-production__disciplines-label">PRODUCTION DISCIPLINES</span>
            <div className="mythos-production__disciplines-grid">
              {cinematicProduction.disciplines.map((d, index) => (
                <div key={index} className="mythos-discipline-item">
                  <h3>{d.title}</h3>
                  <p>{d.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 04 — MYTHOS UNVEILED (Centerpiece) */}
        <section
          className="mythos-section mythos-unveiled"
          data-mythos-section
          aria-labelledby="mythos-unveiled-title"
        >
          <header className="mythos-section__header">
            <span className="mythos-section__index">04</span>
            <span className="mythos-section__tag">PRODUCTION ARCHIVE</span>
            <span className="mythos-section__rule" aria-hidden="true" />
          </header>

          <article className="mythos-unveiled__showcase">
            <div className="mythos-unveiled__frame">
              <div className="mythos-unveiled__reticle mythos-unveiled__reticle--tl" />
              <div className="mythos-unveiled__reticle mythos-unveiled__reticle--br" />
              <div className="mythos-unveiled__screen">
                <span className="mythos-unveiled__status-tag">
                  STATUS // {mythosUnveiledShowcase.status.toUpperCase()}
                </span>
                <span className="mythos-unveiled__media-note">
                  {mythosUnveiledShowcase.mediaPlaceholder}
                </span>
              </div>
            </div>

            <div className="mythos-unveiled__details">
              <div className="mythos-unveiled__badge-row">
                <span className="mythos-unveiled__badge">{mythosUnveiledShowcase.badge}</span>
                <span className="mythos-unveiled__type">{mythosUnveiledShowcase.type}</span>
              </div>

              <h2 id="mythos-unveiled-title" className="mythos-unveiled__name">
                {mythosUnveiledShowcase.title}
              </h2>

              <p className="mythos-unveiled__summary">{mythosUnveiledShowcase.summary}</p>

              <div className="mythos-unveiled__features">
                <span className="mythos-unveiled__features-label">UNIVERSE ARCHITECTURE</span>
                <ul>
                  {mythosUnveiledShowcase.features.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </section>

        {/* 05 — VISUAL LANGUAGE */}
        <section
          className="mythos-section mythos-visual-language"
          data-mythos-section
          aria-labelledby="visual-language-title"
        >
          <header className="mythos-section__header">
            <span className="mythos-section__index">05</span>
            <span className="mythos-section__tag">VISUAL LANGUAGE</span>
            <span className="mythos-section__rule" aria-hidden="true" />
          </header>

          <h2 id="visual-language-title" className="mythos-section__heading">
            Aged Bronze, Deep Ember, and Ancient Atmosphere.
          </h2>

          <div className="mythos-visual-language__grid">
            {visualLanguagePillars.map((p) => (
              <article key={p.num} className="mythos-visual-pillar">
                <div className="mythos-visual-pillar__header">
                  <span className="mythos-visual-pillar__num">[{p.num}]</span>
                  <h3>{p.title}</h3>
                </div>
                <p>{p.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 06 — PRODUCTION PIPELINE */}
        <section
          className="mythos-section mythos-pipeline"
          data-mythos-section
          aria-labelledby="pipeline-title"
        >
          <header className="mythos-section__header">
            <span className="mythos-section__index">06</span>
            <span className="mythos-section__tag">PRODUCTION PIPELINE</span>
            <span className="mythos-section__rule" aria-hidden="true" />
          </header>

          <h2 id="pipeline-title" className="mythos-section__heading">
            The end-to-end cinematic generation workflow.
          </h2>

          <div className="mythos-pipeline__container">
            <div className="mythos-pipeline__track" aria-hidden="true" />
            <div className="mythos-pipeline__stages">
              {productionPipelineStages.map((stg) => (
                <div key={stg.step} className="mythos-pipeline__node">
                  <div className="mythos-pipeline__node-head">
                    <span className="mythos-pipeline__node-num">{stg.step}</span>
                    <span className="mythos-pipeline__node-phase">{stg.phase}</span>
                  </div>
                  <p className="mythos-pipeline__node-detail">{stg.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 07 — SELECTED EPISODE / WORK */}
        <section
          className="mythos-section mythos-episode"
          data-mythos-section
          aria-labelledby="selected-work-title"
        >
          <header className="mythos-section__header">
            <span className="mythos-section__index">07</span>
            <span className="mythos-section__tag">SELECTED WORK</span>
            <span className="mythos-section__rule" aria-hidden="true" />
          </header>

          <h2 id="selected-work-title" className="mythos-section__heading">
            Episodic Universe &amp; Mythology Archive
          </h2>

          <div className="mythos-episode__grid">
            {selectedEpisodes.map((ep) => (
              <article key={ep.id} className="mythos-episode-card">
                <div className="mythos-episode-card__frame">
                  <div className="mythos-episode-card__reticle mythos-episode-card__reticle--tl" />
                  <div className="mythos-episode-card__reticle mythos-episode-card__reticle--br" />
                  <div className="mythos-episode-card__screen">
                    <span className="mythos-episode-card__code">{ep.code}</span>
                    <span className="mythos-episode-card__note">{ep.mediaNote}</span>
                  </div>
                </div>

                <div className="mythos-episode-card__body">
                  <div className="mythos-episode-card__status-row">
                    <span className="mythos-episode-card__status">{ep.status}</span>
                    <span className="mythos-episode-card__aspect">{ep.aspect}</span>
                  </div>
                  <h3 className="mythos-episode-card__title">{ep.title}</h3>
                  <p className="mythos-episode-card__premise">{ep.premise}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 08 — MEDIA / WATCH */}
        <section
          className="mythos-section mythos-media"
          data-mythos-section
          aria-labelledby="cinematic-theater-title"
        >
          <header className="mythos-section__header">
            <span className="mythos-section__index">08</span>
            <span className="mythos-section__tag">CINEMATIC THEATER</span>
            <span className="mythos-section__rule" aria-hidden="true" />
          </header>

          <div className="mythos-media__theater">
            <div className="mythos-media__master-frame">
              <div className="mythos-media__reticle mythos-media__reticle--tl" />
              <div className="mythos-media__reticle mythos-media__reticle--br" />
              <div className="mythos-media__screen">
                <span className="mythos-media__tag">{mediaWatchArchive.statusTag}</span>
                <h3 className="mythos-media__title">{mediaWatchArchive.title}</h3>
                <p className="mythos-media__note">{mediaWatchArchive.note}</p>
              </div>
            </div>

            <div className="mythos-media__slots-grid">
              {mediaWatchArchive.mediaSlots.map((slot, index) => (
                <div key={index} className="mythos-media-slot">
                  <span className="mythos-media-slot__status">[{slot.status}]</span>
                  <span className="mythos-media-slot__label">{slot.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 09 — CLOSING */}
        <section
          className="mythos-section mythos-closing"
          data-mythos-section
          aria-labelledby="mythos-closing-title"
        >
          <header className="mythos-section__header">
            <span className="mythos-section__index">09</span>
            <span className="mythos-section__tag">RETURN</span>
            <span className="mythos-section__rule" aria-hidden="true" />
          </header>

          <div className="mythos-closing__body">
            <h2 id="mythos-closing-title" className="mythos-closing__statement">
              {mythosClosing.statement}
            </h2>
            <p className="mythos-closing__narrative">{mythosClosing.narrative}</p>
            <p className="mythos-closing__author">{mythosClosing.authorNote}</p>

            <div className="mythos-closing__actions">
              {mythosClosing.worldLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  className="mythos-closing__button"
                  disabled
                >
                  <span className="mythos-closing__button-symbol">&#9670;</span>
                  <span>{link.label}</span>
                </button>
              ))}
            </div>
          </div>

          <footer className="mythos-world__colophon" aria-hidden="true">
            <span>MYTHOS_CHAMBER // ONLINE</span>
            <span>&#9670;</span>
            <span>WORLD: MYTHOS_V1</span>
            <span>&#9670;</span>
            <span>ARCHITECT: MAAN VIMAL</span>
          </footer>
        </section>
      </div>
    </div>
  )
}

export default MythosWorldContent
