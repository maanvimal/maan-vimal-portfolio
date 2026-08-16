import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import PhoenixPortrait from './PhoenixPortrait.jsx'
import {
  capabilities,
  experiencePlaceholders,
  processSteps,
  selectedWork,
  toolkitCategories,
} from '../data/aboutContent.js'

function AboutWorldContent({ portrait }) {
  const worldRef = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const worldElement = worldRef.current
    const heroItems = worldElement.querySelectorAll('[data-about-hero-item]')
    const sections = worldElement.querySelectorAll('[data-about-section]')
    const context = gsap.context(() => {
      gsap.from(heroItems, {
        autoAlpha: 0,
        y: 18,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
      })
      gsap.set(sections, { autoAlpha: 0, y: 24 })
    }, worldElement)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
      context.revert()
    }
  }, [])

  return (
    <div ref={worldRef} className="about-world">
      <section className="about-hero" aria-labelledby="about-title">
        <PhoenixPortrait portrait={portrait} worldId="about" />
        <div className="about-hero__content">
          <p className="about-content__label" data-about-hero-item>
            About
          </p>
          <h1 id="about-title" data-about-hero-item>
            Maan Vimal
          </h1>
          <p className="about-content__roles" data-about-hero-item>
            Prompt Engineer · AI Workflow Designer · Generative AI Creator
          </p>
          <p className="about-content__intro" data-about-hero-item>
            I design AI-powered creative workflows, visual experiences, and
            production systems that turn ideas into finished work.
          </p>
          <p className="about-content__disciplines" data-about-hero-item>
            AI workflows · image &amp; video generation · storytelling · creative
            direction
          </p>
          <p className="about-content__invitation" data-about-hero-item>
            Explore the work, systems, and creative projects behind the process.
          </p>
        </div>
      </section>

      <div className="about-world__sections">
        <section className="about-profile" data-about-section aria-labelledby="profile-title">
          <p className="about-section__number">01 — Profile</p>
          <div className="about-section__split">
            <h2 id="profile-title">Creative thinking, built into systems.</h2>
            <p>
              I work at the intersection of AI, creative production, and systems
              design. My focus is not only on generating individual outputs, but
              on building workflows that make ideas easier to develop, test, and
              bring to completion.
            </p>
          </div>
        </section>

        <section className="about-capabilities" data-about-section aria-labelledby="capabilities-title">
          <p className="about-section__number">02 — What I Do</p>
          <h2 id="capabilities-title">Capabilities with creative and technical range.</h2>
          <div className="about-capability-grid">
            {capabilities.map((capability, index) => (
              <article key={capability.title} className="about-capability">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-process" data-about-section aria-labelledby="process-title">
          <p className="about-section__number">03 — How I Work</p>
          <h2 id="process-title">From an idea to a working production system.</h2>
          <ol className="about-process__steps">
            {processSteps.map(([number, title, description]) => (
              <li key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="about-toolkit" data-about-section aria-labelledby="toolkit-title">
          <p className="about-section__number">04 — Toolkit</p>
          <h2 id="toolkit-title">Tools in context, not a keyword list.</h2>
          <div className="about-toolkit__grid">
            {toolkitCategories.map((category) => (
              <article key={category.name}>
                <h3>{category.name}</h3>
                <p>{category.tools.join(' · ')}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-work" data-about-section aria-labelledby="work-title">
          <p className="about-section__number">05 — Selected Work</p>
          <h2 id="work-title">Projects that extend into their own worlds.</h2>
          <div className="about-work__grid">
            {selectedWork.map((project) => (
              <article key={project.name} className="about-work__project">
                <div className="about-work__media" aria-hidden="true">
                  <span>Project media forthcoming</span>
                </div>
                <p>{project.category}</p>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <span className="about-work__destination">{project.destination}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="about-experience" data-about-section aria-labelledby="experience-title">
          <p className="about-section__number">06 — Education / Experience</p>
          <h2 id="experience-title">Professional context, added with verified detail.</h2>
          <div className="about-experience__grid">
            {experiencePlaceholders.map(([title, description]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-contact" data-about-section aria-labelledby="contact-title">
          <p className="about-section__number">07 — Resume / Contact</p>
          <h2 id="contact-title">Maan Vimal</h2>
          <p>
            Professional resume access and contact details can be added here once
            verified links are available.
          </p>
          <div className="about-contact__actions">
            <button type="button" disabled>
              Resume link pending
            </button>
            <button type="button" disabled>
              Contact link pending
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutWorldContent
