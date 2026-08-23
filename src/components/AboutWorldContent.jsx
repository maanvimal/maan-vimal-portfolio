import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import PhoenixPortrait from './PhoenixPortrait.jsx'
import AboutScene from './about/AboutScene.jsx'
import {
  capabilities,
  experiencePlaceholders,
  processSteps,
  selectedWork,
  toolkitCategories,
} from '../data/aboutContent.js'

function AboutWorldContent({ portrait, thoughtMessage, thoughtTriggerKey }) {
  const worldRef = useRef(null)

  useEffect(() => {
    const root = worldRef.current
    if (!root) return

    const heroElements = root.querySelectorAll('[data-about-hero-item]')
    const sections = root.querySelectorAll('[data-about-section]')

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

    sections.forEach((section) => observer.observe(section))

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
            <span className="about-hero__label">About</span>
            <span className="about-hero__dot" aria-hidden="true" />
            <span className="about-hero__chapter">00 / Intro</span>
          </div>

          <h1 id="about-title" className="about-hero__title" data-about-hero-item>
            Maan Vimal
          </h1>

          <p className="about-hero__roles" data-about-hero-item>
            Prompt Engineer · AI Workflow Designer · Generative AI Creator
          </p>

          <p className="about-hero__intro" data-about-hero-item>
            I design AI-powered creative workflows, visual experiences, and
            production systems that turn ideas into finished work.
          </p>

          <div className="about-hero__meta" data-about-hero-item>
            <p className="about-hero__disciplines">
              AI workflows · image &amp; video generation · storytelling · creative
              direction
            </p>
            <p className="about-hero__invitation">
              Explore the work, systems, and creative projects behind the process.
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
            <span className="about-section__number">01</span>
            <span className="about-section__title">Profile</span>
            <span className="about-section__rule" aria-hidden="true" />
          </header>

          <div className="about-profile__grid">
            <h2 id="profile-title" className="about-profile__headline">
              Creative thinking, built into systems.
            </h2>
            <div className="about-profile__narrative">
              <p>
                I work at the intersection of AI, creative production, and systems
                design. My focus is not only on generating individual outputs, but
                on building workflows that make ideas easier to develop, test, and
                bring to completion.
              </p>
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
            <span className="about-section__number">02</span>
            <span className="about-section__title">What I Do</span>
            <span className="about-section__rule" aria-hidden="true" />
          </header>

          <h2 id="capabilities-title" className="about-section__heading">
            Capabilities with creative and technical range.
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
            <span className="about-section__number">03</span>
            <span className="about-section__title">How I Work</span>
            <span className="about-section__rule" aria-hidden="true" />
          </header>

          <h2 id="process-title" className="about-section__heading">
            From an idea to a working production system.
          </h2>

          <div className="about-process__container">
            <div className="about-process__rail" aria-hidden="true" />
            <ol className="about-process__sequence">
              {processSteps.map(([number, title, description]) => (
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
            <span className="about-section__number">04</span>
            <span className="about-section__title">Toolkit</span>
            <span className="about-section__rule" aria-hidden="true" />
          </header>

          <h2 id="toolkit-title" className="about-section__heading">
            Tools in context, not a keyword list.
          </h2>

          <div className="about-toolkit__matrix">
            {toolkitCategories.map((category, index) => (
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
            <span className="about-section__number">05</span>
            <span className="about-section__title">Selected Work</span>
            <span className="about-section__rule" aria-hidden="true" />
          </header>

          <h2 id="work-title" className="about-section__heading">
            Projects that extend into their own worlds.
          </h2>

          <div className="about-work__exhibition">
            {selectedWork.map((project) => (
              <article
                key={project.name}
                className="about-work__portal-card"
                data-portal-world={project.id || ''}
              >
                <div className="about-work__frame" aria-hidden="true">
                  <span className="about-work__reticle about-work__reticle--tl" />
                  <span className="about-work__reticle about-work__reticle--br" />
                  <span className="about-work__media-label">Project media forthcoming</span>
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
            <span className="about-section__number">06</span>
            <span className="about-section__title">Education / Experience</span>
            <span className="about-section__rule" aria-hidden="true" />
          </header>

          <h2 id="experience-title" className="about-section__heading">
            Professional context, added with verified detail.
          </h2>

          <div className="about-experience__timeline">
            {experiencePlaceholders.map(([title, description], index) => (
              <article key={title} className="about-experience__entry">
                <div className="about-experience__lead">
                  <span className="about-experience__index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3>{title}</h3>
                </div>
                <div className="about-experience__body">
                  <p>{description}</p>
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
            <span className="about-section__number">07</span>
            <span className="about-section__title">Resume / Contact</span>
            <span className="about-section__rule" aria-hidden="true" />
          </header>

          <div className="about-contact__signoff">
            <h2 id="contact-title" className="about-contact__signature">
              Maan Vimal
            </h2>
            <p className="about-contact__note">
              Professional resume access and contact details can be added here once
              verified links are available.
            </p>
            <div className="about-contact__actions">
              <button type="button" className="about-contact__button" disabled>
                Resume link pending
              </button>
              <button type="button" className="about-contact__button" disabled>
                Contact link pending
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutWorldContent
