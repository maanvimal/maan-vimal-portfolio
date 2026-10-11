import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import PhoenixPortrait from './PhoenixPortrait.jsx'
import AboutScene from './about/AboutScene.jsx'
import { CampaignStill, CampaignVideo } from './about/CampaignMedia.jsx'
import { CampaignLightbox } from './about/CampaignLightbox.jsx'
import { aboutContent } from '../data/portfolioContent.js'

function AboutWorldContent({
  onWorldChange,
  portrait,
  thoughtMessage,
  thoughtTriggerKey,
}) {
  const worldRef = useRef(null)
  const [lightboxImage, setLightboxImage] = useState(null)
  const [activeTrigger, setActiveTrigger] = useState(null)

  const handleOpenLightbox = (image, triggerEl) => {
    setActiveTrigger(triggerEl ? { current: triggerEl } : null)
    setLightboxImage(image)
  }

  const handleCloseLightbox = () => {
    setLightboxImage(null)
  }

  const {
    codingTeaser,
    contact,
    experience,
    hero,
    majesticTeaser,
    midnightRyu,
    mythosTeaser,
    pendant,
    practice,
  } = aboutContent

  useEffect(() => {
    const root = worldRef.current
    if (!root) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const heroElements = root.querySelectorAll('[data-about-hero-item]')
    const sectionElements = root.querySelectorAll('[data-about-section]')

    if (prefersReducedMotion) {
      heroElements.forEach((el) => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
      sectionElements.forEach((el) => {
        el.classList.add('is-visible')
      })
      return undefined
    }

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
          stagger: 0.1,
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
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
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

      {/* ====================================================================
          01 — HERO / INTRODUCTION
          ==================================================================== */}
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

          <p className="about-hero__heading" data-about-hero-item>
            {hero.heading}
          </p>

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

          {/* Quick jump navigation for immediate work discovery */}
          <nav className="about-hero__nav" data-about-hero-item aria-label="About world quick jump">
            {hero.quickLinks.map((link) => (
              <a key={link.href} href={link.href} className="about-hero__nav-link">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="about-world__sections">
        {/* ====================================================================
            02 — FEATURED CAMPAIGN: MIDNIGHT-RYU (Primary Featured Project)
            ==================================================================== */}
        <section
          id="midnight-ryu"
          className="about-section about-campaign about-campaign--ryu"
          data-about-section
          data-about-section-id="midnight-ryu"
          aria-labelledby="ryu-campaign-title"
        >
          <header className="about-section__header">
            <span className="about-section__number">{midnightRyu.index}</span>
            <span className="about-section__title">{midnightRyu.tag}</span>
            <span className="about-section__rule" aria-hidden="true" />
          </header>

          <div className="about-campaign__header-block">
            <div className="about-campaign__titles">
              <span className="about-campaign__subtitle">{midnightRyu.subtitle}</span>
              <h2 id="ryu-campaign-title" className="about-campaign__title">
                {midnightRyu.title}
              </h2>
            </div>
          </div>

          {/* Desktop Two-Column Editorial Stage (Left: Landscape + Story; Right: Portrait) */}
          <div className="about-campaign__media-stage about-campaign__media-stage--dual">
            {/* LEFT COLUMN: Landscape Film + Campaign Story Block */}
            <div className="about-campaign__media-col about-campaign__media-col--landscape">
              <CampaignVideo
                src={midnightRyu.media.landscapeVideo.src}
                title={midnightRyu.media.landscapeVideo.title}
                aspect={midnightRyu.media.landscapeVideo.aspect}
                badge={midnightRyu.media.landscapeVideo.formatBadge}
                description={midnightRyu.media.landscapeVideo.description}
              />

              {/* Campaign Story Block occupying corresponding vertical space under landscape video */}
              <article className="about-campaign__story-block" aria-label="Midnight-Ryu Campaign Narrative">
                <span className="about-campaign__story-eyebrow">
                  {midnightRyu.story.eyebrow}
                </span>
                <h3 className="about-campaign__story-headline">
                  {midnightRyu.story.headline}
                </h3>
                <p className="about-campaign__story-copy">
                  {midnightRyu.story.copy}
                </p>

                <div className="about-campaign__story-section">
                  <span className="about-campaign__story-sublabel">
                    {midnightRyu.story.creativeDirectionLabel}
                  </span>
                  <p className="about-campaign__story-direction-text">
                    {midnightRyu.story.creativeDirection}
                  </p>
                </div>

                <div className="about-campaign__story-section">
                  <span className="about-campaign__story-sublabel">
                    {midnightRyu.story.focusLabel}
                  </span>
                  <ul className="about-campaign__tags-list">
                    {midnightRyu.story.creativeFocus.map((focus) => (
                      <li key={focus} className="about-campaign__tag">
                        {focus}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="about-campaign__story-closing">
                  <p className="about-campaign__story-closing-line">
                    {midnightRyu.story.closingLine}
                  </p>
                </div>
              </article>
            </div>

            {/* RIGHT COLUMN: Portrait Campaign Film */}
            <div className="about-campaign__media-col about-campaign__media-col--portrait">
              <CampaignVideo
                src={midnightRyu.media.portraitVideo.src}
                title={midnightRyu.media.portraitVideo.title}
                aspect={midnightRyu.media.portraitVideo.aspect}
                badge={midnightRyu.media.portraitVideo.formatBadge}
                description={midnightRyu.media.portraitVideo.description}
              />
            </div>
          </div>

          {/* Luxury 5-Still Contact Sheet Gallery */}
          <div className="about-campaign__gallery-block">
            <div className="about-campaign__gallery-header">
              <h3 className="about-campaign__gallery-heading">CAMPAIGN CONTACT SHEET — 5 KEYFRAMES</h3>
              <span className="about-campaign__gallery-meta">CINEMATIC KEYFRAMES · 4K GENERATIVE MASTER</span>
            </div>
            <div className="about-campaign__gallery-grid">
              {midnightRyu.media.stills.map((still, idx) => (
                <CampaignStill
                  key={still.code}
                  src={still.src}
                  title={still.title}
                  caption={still.caption}
                  code={still.code}
                  index={idx}
                  aspect="16:9"
                  onSelect={handleOpenLightbox}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            03 — FEATURED CAMPAIGN: JAGRIT — THE THIRD EYE OF MAHADEV
            ==================================================================== */}
        <section
          id="pendant-campaign"
          className="about-section about-campaign about-campaign--jagrit"
          data-about-section
          data-about-section-id="pendant"
          aria-labelledby="jagrit-campaign-title"
        >
          <header className="about-section__header">
            <span className="about-section__number">{pendant.index}</span>
            <span className="about-section__title">{pendant.tag}</span>
            <span className="about-section__rule" aria-hidden="true" />
          </header>

          {/* 1. JAGRIT Title, Subtitle, and Sacred Tagline */}
          <div className="about-campaign__header-block about-campaign__header-block--jagrit">
            <span className="about-campaign__subtitle about-jagrit__eyebrow">
              {pendant.eyebrow}
            </span>
            <div className="about-campaign__titles">
              <h2 id="jagrit-campaign-title" className="about-campaign__title about-jagrit__title">
                {pendant.title}
              </h2>
              <span className="about-jagrit__subtitle">{pendant.subtitle}</span>
            </div>
            <div className="about-jagrit__tagline-badge">
              <span className="about-jagrit__tagline-devanagari">{pendant.taglineHindi}</span>
              <span className="about-jagrit__tagline-divider" aria-hidden="true">·</span>
              <span className="about-jagrit__tagline-en">{pendant.taglineEnglish}</span>
            </div>
          </div>

          {/* 2. Campaign Film with Concise Caption */}
          <div className="about-campaign__media-stage about-campaign__media-stage--single about-campaign__media-stage--jagrit">
            <CampaignVideo
              src={pendant.media.film.src}
              title={pendant.media.film.title}
              aspect={pendant.media.film.aspect}
              badge={pendant.media.film.formatBadge}
              description={pendant.media.film.description}
            />
          </div>

          {/* 3. Detailed Campaign Narrative & Creative Direction */}
          <div className="about-jagrit__story-container">
            <div className="about-jagrit__story-grid">
              <div className="about-jagrit__story-content">
                <span className="about-jagrit__section-tag">PROJECT NARRATIVE</span>
                {pendant.narrative.map((para, i) => (
                  <p key={i} className="about-jagrit__story-paragraph">
                    {para}
                  </p>
                ))}
              </div>

              <div className="about-jagrit__story-aside">
                <span className="about-jagrit__section-tag">CREATIVE DIRECTION</span>
                <ul className="about-jagrit__direction-list">
                  {pendant.creativeDirection.map((item) => (
                    <li key={item} className="about-jagrit__direction-item">
                      <span className="about-jagrit__bullet" aria-hidden="true">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 4. Four Creative Pillars */}
            <div className="about-jagrit__pillars-block">
              <div className="about-jagrit__pillars-header">
                <span className="about-jagrit__section-tag">CAMPAIGN PILLARS</span>
                <h3 className="about-jagrit__pillars-title">The Four Dimensions of JAGRIT</h3>
              </div>
              <div className="about-jagrit__pillars-grid">
                {pendant.pillars.map((pillar) => (
                  <div key={pillar.number} className="about-jagrit__pillar-card">
                    <span className="about-jagrit__pillar-num">{pillar.number}</span>
                    <h4 className="about-jagrit__pillar-name">{pillar.title}</h4>
                    <p className="about-jagrit__pillar-desc">{pillar.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5. Five-Image Portrait Gallery */}
          <div className="about-campaign__gallery-block about-jagrit__gallery-block">
            <div className="about-campaign__gallery-header">
              <h3 className="about-campaign__gallery-heading">CAMPAIGN PORTRAIT STUDIES — 5 KEYFRAMES</h3>
              <span className="about-campaign__gallery-meta">PORTRAIT ARTWORK · TAP IMAGE TO ENLARGE</span>
            </div>
            <div className="about-campaign__gallery-grid about-campaign__gallery-grid--portrait">
              {pendant.media.stills.map((still, idx) => (
                <CampaignStill
                  key={still.code}
                  src={still.src}
                  title={still.title}
                  caption={still.caption}
                  code={still.code}
                  index={idx}
                  aspect="portrait"
                  onSelect={handleOpenLightbox}
                />
              ))}
            </div>
          </div>

          {/* 6. Campaign Closing Line */}
          <footer className="about-campaign__footer about-jagrit__footer">
            <p className="about-campaign__closing-line about-jagrit__closing-line">
              {pendant.closingLine}
            </p>
          </footer>
        </section>

        {/* ====================================================================
            04 — MYTHOS UNVEILED TEASER
            ==================================================================== */}
        <section
          id="mythos-teaser"
          className="about-section about-teaser about-teaser--mythos"
          data-about-section
          data-about-section-id="mythos-teaser"
          aria-labelledby="mythos-teaser-title"
        >
          <header className="about-section__header">
            <span className="about-section__number">{mythosTeaser.index}</span>
            <span className="about-section__title">{mythosTeaser.tag}</span>
            <span className="about-section__rule" aria-hidden="true" />
          </header>

          <div className="about-teaser__card">
            <div className="about-teaser__visual">
              <img
                src={mythosTeaser.previewImage}
                alt={mythosTeaser.previewAlt}
                className="about-teaser__artwork"
                loading="lazy"
              />
              <div className="about-teaser__emblem-wrap" aria-hidden="true">
                <img
                  src={mythosTeaser.emblem}
                  alt=""
                  className="about-teaser__emblem"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="about-teaser__info">
              <span className="about-teaser__sub">{mythosTeaser.subtitle}</span>
              <h2 id="mythos-teaser-title" className="about-teaser__heading">
                {mythosTeaser.title}
              </h2>
              <blockquote className="about-teaser__quote">
                "{mythosTeaser.quote}"
              </blockquote>
              <ul className="about-teaser__highlights">
                {mythosTeaser.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
              <div className="about-teaser__cta-wrap">
                <button
                  type="button"
                  className="about-teaser__cta-btn about-teaser__cta-btn--mythos"
                  onClick={() => onWorldChange?.(mythosTeaser.targetWorld)}
                >
                  <span>{mythosTeaser.cta}</span>
                  <span className="about-teaser__arrow" aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            05 — MAJESTIC TAILS STUDIO TEASER
            ==================================================================== */}
        <section
          id="majestic-teaser"
          className="about-section about-teaser about-teaser--majestic"
          data-about-section
          data-about-section-id="majestic-teaser"
          aria-labelledby="majestic-teaser-title"
        >
          <header className="about-section__header">
            <span className="about-section__number">{majesticTeaser.index}</span>
            <span className="about-section__title">{majesticTeaser.tag}</span>
            <span className="about-section__rule" aria-hidden="true" />
          </header>

          <div className="about-teaser__card">
            <div className="about-teaser__visual">
              <img
                src={majesticTeaser.previewImage}
                alt={majesticTeaser.previewAlt}
                className="about-teaser__artwork"
                loading="lazy"
              />
              <div className="about-teaser__emblem-wrap" aria-hidden="true">
                <img
                  src={majesticTeaser.emblem}
                  alt=""
                  className="about-teaser__emblem"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="about-teaser__info">
              <span className="about-teaser__sub">{majesticTeaser.subtitle}</span>
              <h2 id="majestic-teaser-title" className="about-teaser__heading">
                {majesticTeaser.title}
              </h2>
              <blockquote className="about-teaser__quote">
                "{majesticTeaser.quote}"
              </blockquote>
              <ul className="about-teaser__highlights">
                {majesticTeaser.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
              <div className="about-teaser__cta-wrap">
                <button
                  type="button"
                  className="about-teaser__cta-btn about-teaser__cta-btn--majestic"
                  onClick={() => onWorldChange?.(majesticTeaser.targetWorld)}
                >
                  <span>{majesticTeaser.cta}</span>
                  <span className="about-teaser__arrow" aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            06 — CODING & TECHNICAL PROJECTS (Compact Supporting Section)
            ==================================================================== */}
        <section
          id="coding-teaser"
          className="about-section about-coding-teaser"
          data-about-section
          data-about-section-id="coding-teaser"
          aria-labelledby="coding-teaser-title"
        >
          <header className="about-section__header">
            <span className="about-section__number">{codingTeaser.index}</span>
            <span className="about-section__title">{codingTeaser.tag}</span>
            <span className="about-section__rule" aria-hidden="true" />
          </header>

          <div className="about-coding-teaser__lead-block">
            <span className="about-coding-teaser__sub">{codingTeaser.subtitle}</span>
            <h2 id="coding-teaser-title" className="about-coding-teaser__heading">
              {codingTeaser.title}
            </h2>
            <p className="about-coding-teaser__lead">{codingTeaser.lead}</p>
          </div>

          <div className="about-coding-teaser__grid">
            {codingTeaser.projects.map((proj) => (
              <article key={proj.name} className="about-coding-card">
                <div className="about-coding-card__head">
                  <img src={proj.mark} alt="" className="about-coding-card__mark" aria-hidden="true" />
                  <div className="about-coding-card__meta">
                    <span className="about-coding-card__type">{proj.type}</span>
                    <h3 className="about-coding-card__name">{proj.name}</h3>
                  </div>
                </div>
                <p className="about-coding-card__desc">{proj.description}</p>
                <div className="about-coding-card__stack">
                  <span>{proj.stack}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="about-coding-teaser__cta-block">
            <button
              type="button"
              className="about-teaser__cta-btn about-teaser__cta-btn--coding"
              onClick={() => onWorldChange?.(codingTeaser.targetWorld)}
            >
              <span>{codingTeaser.cta}</span>
              <span className="about-teaser__arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </section>

        {/* ====================================================================
            07 — RETAINED PROFILE, CAPABILITIES & PROCESS (High-Impact Condensed)
            ==================================================================== */}
        <section
          id="practice"
          className="about-section about-practice"
          data-about-section
          data-about-section-id="practice"
          aria-labelledby="practice-title"
        >
          <header className="about-section__header">
            <span className="about-section__number">{practice.index}</span>
            <span className="about-section__title">{practice.tag}</span>
            <span className="about-section__rule" aria-hidden="true" />
          </header>

          <div className="about-practice__lead-grid">
            <div className="about-practice__profile-side">
              <h2 id="practice-title" className="about-practice__headline">
                {practice.profileHeadline}
              </h2>
              <p className="about-practice__narrative">{practice.profileNarrative}</p>
            </div>
            <div className="about-practice__sequence-side">
              <h3 className="about-practice__subhead">PRODUCTION PROGRESSION</h3>
              <ol className="about-practice__sequence-list">
                {practice.process.map(([num, phase, desc]) => (
                  <li key={num} className="about-practice__seq-item">
                    <span className="about-practice__seq-num">{num}</span>
                    <div className="about-practice__seq-body">
                      <strong>{phase}</strong>
                      <p>{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* 6 Focused Capabilities */}
          <div className="about-practice__capabilities">
            <h3 className="about-practice__subhead">CORE CREATIVE & SYSTEM CAPABILITIES</h3>
            <div className="about-practice__capabilities-grid">
              {practice.capabilities.map((cap) => (
                <article key={cap.code} className="about-capability-tile">
                  <div className="about-capability-tile__head">
                    <span className="about-capability-tile__code">[{cap.code}]</span>
                    <h4>{cap.title}</h4>
                  </div>
                  <p>{cap.description}</p>
                </article>
              ))}
            </div>
          </div>

          {/* Toolkit Taxonomy Wall */}
          <div className="about-practice__toolkit">
            <h3 className="about-practice__subhead">TOOLKIT TAXONOMY</h3>
            <div className="about-practice__toolkit-grid">
              {practice.toolkit.map((cat) => (
                <div key={cat.name} className="about-toolkit-col">
                  <span className="about-toolkit-col__name">{cat.name}</span>
                  <p className="about-toolkit-col__tools">{cat.tools.join(' · ')}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            08 — EDUCATION / EXPERIENCE
            ==================================================================== */}
        <section
          id="experience"
          className="about-section about-experience"
          data-about-section
          data-about-section-id="experience"
          aria-labelledby="experience-title"
        >
          <header className="about-section__header">
            <span className="about-section__number">{experience.index}</span>
            <span className="about-section__title">{experience.tag}</span>
            <span className="about-section__rule" aria-hidden="true" />
          </header>

          <h2 id="experience-title" className="about-section__heading">
            {experience.title}
          </h2>

          <div className="about-experience__timeline">
            {experience.items.map((item, index) => (
              <article
                key={item.role + index}
                className="about-experience__entry"
              >
                <div className="about-experience__lead">
                  <span className="about-experience__index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3>{item.role}</h3>
                </div>
                <div className="about-experience__body">
                  <div className="about-experience__meta">
                    <span className="about-experience__org">{item.organization}</span>
                    <span className="about-experience__dot" aria-hidden="true">·</span>
                    <span className="about-experience__period">{item.period}</span>
                  </div>
                  {item.details && item.details.length > 0 && (
                    <ul className="about-experience__list">
                      {item.details.map((detail, dIdx) => (
                        <li key={dIdx}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ====================================================================
            09 — RESUME / CONTACT
            ==================================================================== */}
        <section
          id="contact"
          className="about-section about-contact"
          data-about-section
          data-about-section-id="contact"
          aria-labelledby="contact-title"
        >
          <header className="about-section__header">
            <span className="about-section__number">{contact.index}</span>
            <span className="about-section__title">{contact.tag}</span>
            <span className="about-section__rule" aria-hidden="true" />
          </header>

          <div className="about-contact__signoff">
            <h2 id="contact-title" className="about-contact__signature">
              {contact.signature}
            </h2>
            <p className="about-contact__identity">{contact.identity}</p>
            <div className="about-contact__info">
              <a href={`mailto:${contact.email}`} className="about-contact__link">
                {contact.email}
              </a>
              <span className="about-contact__divider" aria-hidden="true">·</span>
              <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="about-contact__link">
                {contact.phone}
              </a>
            </div>
            <p className="about-contact__note">{contact.note}</p>
            <div className="about-contact__actions">
              {contact.actions.map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="about-contact__button about-contact__button--active"
                  target={action.type === 'resume' ? '_blank' : undefined}
                  rel={action.type === 'resume' ? 'noopener noreferrer' : undefined}
                >
                  {action.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Cinematic Full-Resolution Image Lightbox Overlay */}
      <CampaignLightbox
        activeImage={lightboxImage}
        onClose={handleCloseLightbox}
        triggerRef={activeTrigger}
      />
    </div>
  )
}

export default AboutWorldContent
