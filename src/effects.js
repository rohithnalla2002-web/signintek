import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initSite() {
  const $ = (s) => document.querySelector(s)
  const $$ = (s) => [...document.querySelectorAll(s)]
  const listeners = []
  const intervals = []
  const timeouts = []
  let rafIds = []
  let running = true

  const on = (target, event, handler, options) => {
    if (!target) return
    target.addEventListener(event, handler, options)
    listeners.push([target, event, handler, options])
  }

  timeouts.push(setTimeout(() => $('.loader')?.classList.add('done'), 1700))

  const nav = $('#nav')
  const onScroll = () => {
    nav?.classList.toggle('scrolled', window.scrollY > 35)
    const max = document.documentElement.scrollHeight - innerHeight
    const p = max ? (window.scrollY / max) * 100 : 0
    const bar = $('.progress i')
    if (bar) bar.style.height = p + '%'
  }
  on(window, 'scroll', onScroll, { passive: true })

  const menu = $('.menu')
  const panel = $('.mobile-panel')
  const close = $('.close')
  on(menu, 'click', () => panel?.classList.add('open'))
  on(close, 'click', () => panel?.classList.remove('open'))
  $$('.mobile-panel a').forEach((a) => on(a, 'click', () => panel?.classList.remove('open')))

  const cursor = $('.cursor')
  if (cursor) {
    let x = innerWidth / 2
    let y = innerHeight / 2
    let tx = x
    let ty = y
    on(window, 'pointermove', (e) => {
      tx = e.clientX
      ty = e.clientY
      document.documentElement.style.setProperty('--mx', e.clientX + 'px')
      document.documentElement.style.setProperty('--my', e.clientY + 'px')
    })
    const loop = () => {
      if (!running) return
      x += (tx - x) * 0.17
      y += (ty - y) * 0.17
      cursor.style.left = x + 'px'
      cursor.style.top = y + 'px'
      rafIds.push(requestAnimationFrame(loop))
    }
    loop()
    $$('a,.service,.solution-card,.industry-panel,.principle-list article').forEach((el) => {
      on(el, 'mouseenter', () => {
        cursor.style.width = '54px'
        cursor.style.height = '54px'
        cursor.style.background = 'rgba(39,211,255,.08)'
      })
      on(el, 'mouseleave', () => {
        cursor.style.width = '26px'
        cursor.style.height = '26px'
        cursor.style.background = 'transparent'
      })
    })
  }

  function network(canvas, count = 95) {
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w = 0
    let h = 0
    let dpr = 1
    let pts = []
    let mx = -9999
    let my = -9999
    const reduced = matchMedia('(prefers-reduced-motion:reduce)').matches
    function resize() {
      w = canvas.clientWidth
      h = canvas.clientHeight
      dpr = Math.min(devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      pts = Array.from({ length: Math.min(count, Math.max(28, (w * h) / 15000)) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 0.35,
        p: Math.random() * 6.28,
      }))
    }
    function draw() {
      if (!running) return
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        if (!reduced) {
          p.x += p.vx
          p.y += p.vy
          p.p += 0.01
          if (p.x < 0 || p.x > w) p.vx *= -1
          if (p.y < 0 || p.y > h) p.vy *= -1
        }
        const d = Math.hypot(p.x - mx, p.y - my)
        if (d < 170 && !reduced && d > 0.01) {
          p.x += ((p.x - mx) / d) * 0.05
          p.y += ((p.y - my) / d) * 0.05
        }
        ctx.fillStyle = 'rgba(39,211,255,.72)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r + Math.sin(p.p) * 0.3, 0, Math.PI * 2)
        ctx.fill()
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i]
          const b = pts[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 135) {
            ctx.strokeStyle = 'rgba(39,211,255,' + (1 - d / 135) * 0.13 + ')'
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      if (!reduced) rafIds.push(requestAnimationFrame(draw))
    }
    on(canvas, 'pointermove', (e) => {
      const r = canvas.getBoundingClientRect()
      mx = e.clientX - r.left
      my = e.clientY - r.top
    })
    on(canvas, 'pointerleave', () => {
      mx = -9999
      my = -9999
    })
    on(window, 'resize', resize, { passive: true })
    resize()
    draw()
  }

  network($('#heroCanvas'), 115)
  network($('#ctaCanvas'), 80)

  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches
  if (!reduce) {
    const intro = gsap.timeline({ defaults: { ease: 'power4.out' } })
    intro
      .from('.hero-grid', { opacity: 0, duration: 1.2, delay: 0.5 })
      .from('.hero-lines i', { scaleX: 0, transformOrigin: 'left', stagger: 0.08, duration: 0.7 }, '-=.8')
      .from('.hero-book', { y: 70, scale: 0.72, opacity: 0, duration: 1.35, ease: 'power4.out' }, '-=.65')
      .from('.hero-book .book-shell', { rotationY: -48, transformOrigin: '50% 50%', duration: 1.4, ease: 'power3.out' }, '-=.95')
      .from('.hero-book .book-page', { rotationY: -24, transformOrigin: '0% 50%', stagger: 0.08, duration: 1.05, ease: 'power3.out' }, '-=1.05')
      .from('.hero-book .book-caption,.hero-book .book-float', { y: 20, opacity: 0, stagger: 0.12, duration: 0.55 }, '-=.8')
      .from('.hero-system', { scale: 0.7, opacity: 0, duration: 1 }, '-=.9')
      .from('.eyebrow', { y: 24, opacity: 0, duration: 0.6 }, '-=.55')
      .from('.hero h1 .mask em,.hero h1 .mask strong,.hero h1 .mask', { y: 100, opacity: 0, stagger: 0.08, duration: 1 }, '-=.35')
      .from('.hero-lead', { y: 28, opacity: 0, duration: 0.65 }, '-=.55')
      .from('.hero-actions', { y: 25, opacity: 0, duration: 0.6 }, '-=.35')
      .from('.hero-bottom', { y: 20, opacity: 0, duration: 0.6 }, '-=.25')

    gsap.to('.hero-grid', { backgroundPosition: '0 70px', ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })
    gsap.to('.hero-book', { y: -55, x: 18, rotation: -1, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })
    gsap.to('.hero-book .book-shell', { rotationY: -10, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })
    gsap.to('.hero-system', { y: -110, rotation: 18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })
    gsap.to('.hero-copy', { y: -90, opacity: 0.25, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })

    const reveal = (selector, vars = {}) =>
      $$(selector).forEach((el, i) =>
        gsap.from(el, {
          opacity: 0,
          y: 55,
          filter: 'blur(7px)',
          duration: 0.9,
          delay: (i % 4) * 0.06,
          ease: 'power3.out',
          ...vars,
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        })
      )

    reveal('.about-copy h2')
    reveal('.about-copy>p:not(.kicker)')
    reveal('.about-art', { y: 80, scale: 0.94 })
    reveal('.about-side div', { x: 35 })
    gsap.from('.about-art img', { y: 35, scale: 0.94, opacity: 0, duration: 1.2, scrollTrigger: { trigger: '.about-art', start: 'top 78%', once: true } })
    gsap.to('.about-art img', { y: -25, ease: 'none', scrollTrigger: { trigger: '.about-art', start: 'top bottom', end: 'bottom top', scrub: 1 } })
    reveal('.service', { y: 45 })
    gsap.from('.service-stage', { scale: 0.6, rotation: -12, opacity: 0, duration: 1.2, scrollTrigger: { trigger: '.service-stage', start: 'top 75%', once: true } })
    gsap.to('.service-stage', { y: -45, rotation: 5, ease: 'none', scrollTrigger: { trigger: '.services', start: 'top bottom', end: 'bottom top', scrub: 1 } })
    reveal('.data-copy h2', { y: 75 })
    gsap.from('.pipe-node', { scale: 0.5, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'back.out(1.4)', scrollTrigger: { trigger: '.pipeline', start: 'top 76%', once: true } })
    gsap.from('.pipe-arrow', { opacity: 0, scale: 0.5, stagger: 0.08, duration: 0.4, scrollTrigger: { trigger: '.pipeline', start: 'top 76%', once: true } })
    gsap.to('.data-back', { scale: 1.25, ease: 'none', scrollTrigger: { trigger: '.data-section', start: 'top bottom', end: 'bottom top', scrub: 1 } })
    reveal('.solution-card', { y: 80, scale: 0.96 })
    gsap.from('.solution-card .solution-visual', { clipPath: 'inset(0 0 100% 0)', stagger: 0.08, duration: 1, scrollTrigger: { trigger: '.solution-scroller', start: 'top 78%', once: true } })
    gsap.set('.industry-panel, .industry-panel .ip-content', { opacity: 1, y: 0, clearProps: 'opacity,transform' })
    gsap.from('.process-journey article', { y: 55, opacity: 0, stagger: 0.1, duration: 0.7, scrollTrigger: { trigger: '.process-journey', start: 'top 78%', once: true } })
    gsap.to('.journey-line i', { width: '100%', scrollTrigger: { trigger: '.process-journey', start: 'top 70%', end: 'bottom 70%', scrub: 1 } })
    gsap.from('.process-console', { y: 90, opacity: 0, scale: 0.96, duration: 1, scrollTrigger: { trigger: '.process-console', start: 'top 80%', once: true } })
    gsap.from('.principle-copy', { x: -60, opacity: 0, duration: 1, scrollTrigger: { trigger: '.principles', start: 'top 75%', once: true } })
    gsap.from('.principle-list article', { x: 60, opacity: 0, stagger: 0.12, duration: 0.7, scrollTrigger: { trigger: '.principle-list', start: 'top 76%', once: true } })
    gsap.to('.principle-orbit', { y: -35, rotation: 12, ease: 'none', scrollTrigger: { trigger: '.principles', start: 'top bottom', end: 'bottom top', scrub: 1 } })
    gsap.from('.career-layout>div:first-child', { x: -55, opacity: 0, duration: 1, scrollTrigger: { trigger: '.careers', start: 'top 75%', once: true } })
    gsap.from('.career-stage', { x: 80, opacity: 0, rotation: 5, duration: 1.1, scrollTrigger: { trigger: '.career-stage', start: 'top 78%', once: true } })
    gsap.to('.career-stage', { y: -35, rotation: -2, ease: 'none', scrollTrigger: { trigger: '.careers', start: 'top bottom', end: 'bottom top', scrub: 1 } })
    gsap.from('.contact-copy', { x: -55, opacity: 0, duration: 1, scrollTrigger: { trigger: '.contact', start: 'top 76%', once: true } })
    gsap.from('.contact-visual', { scale: 0.55, opacity: 0, rotation: 25, duration: 1.3, ease: 'back.out(1.4)', scrollTrigger: { trigger: '.contact', start: 'top 76%', once: true } })
    gsap.to('.contact-visual', { y: -35, rotation: -10, ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom top', scrub: 1 } })
  }

  $$('.service').forEach((card) => {
    card.style.setProperty('--service-color', card.dataset.color || '#247BFF')
    on(card, 'mouseenter', () => {
      $$('.service').forEach((x) => x.classList.remove('active'))
      card.classList.add('active')
    })
    on(card, 'pointermove', (e) => {
      if (matchMedia('(prefers-reduced-motion:reduce)').matches) return
      const r = card.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      card.style.transform = `translateY(-10px) rotateX(${-y * 7}deg) rotateY(${x * 9}deg)`
      const icon = card.querySelector('.service-icon')
      if (icon) icon.style.transform = `translateZ(65px) rotateX(${-y * 12}deg) rotateY(${x * 16}deg) scale(1.08)`
    })
    on(card, 'pointerleave', () => {
      card.style.transform = ''
      const icon = card.querySelector('.service-icon')
      if (icon) icon.style.transform = ''
    })
  })

  $$('.industry-panel').forEach((p) =>
    on(p, 'mouseenter', () => {
      $$('.industry-panel').forEach((x) => x.classList.remove('active'))
      p.classList.add('active')
    })
  )

  const commandDeck = $('.industry-command-3d')
  if (commandDeck && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
    on(commandDeck, 'pointermove', (e) => {
      const r = commandDeck.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      commandDeck.style.transform = `perspective(1300px) rotateX(${y * -2.8}deg) rotateY(${x * 3.8}deg)`
    })
    on(commandDeck, 'pointerleave', () => {
      commandDeck.style.transform = ''
    })
  }

  const portal = $('.industry-portal-3d')
  if (portal && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
    on(portal, 'pointermove', (e) => {
      const r = portal.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      portal.style.transform = `perspective(1400px) rotateX(${y * -2.2}deg) rotateY(${x * 3.2}deg)`
    })
    on(portal, 'pointerleave', () => {
      portal.style.transform = ''
    })
  }

  $$('.magnet').forEach((el) => {
    on(el, 'pointermove', (e) => {
      if (matchMedia('(prefers-reduced-motion:reduce)').matches) return
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left - r.width / 2) * 0.12
      const y = (e.clientY - r.top - r.height / 2) * 0.12
      el.style.transform = `translate(${x}px,${y}px)`
    })
    on(el, 'pointerleave', () => {
      el.style.transform = ''
    })
  })

  const book = $('.hero-book')
  if (book && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
    on(book, 'pointermove', (e) => {
      const r = book.getBoundingClientRect()
      const rx = ((e.clientY - r.top - r.height / 2) / r.height) * 6
      const ry = ((e.clientX - r.left - r.width / 2) / r.width) * -9
      gsap.to('.hero-book .book-shell', { rotationX: 2 + rx, rotationY: -7 + ry, duration: 0.55, ease: 'power3.out', overwrite: true })
    })
    on(book, 'pointerleave', () => gsap.to('.hero-book .book-shell', { rotationX: 2, rotationY: -7, duration: 0.8, ease: 'power3.out' }))

    const pages = $$('.hero-book .book-page')
    const indicator = $$('.book-page-indicator span')
    const pageState = { index: 0, busy: false, cycle: 0 }

    function updateIndicator() {
      indicator.forEach((el, i) => el.classList.toggle('active', i === pageState.index))
    }
    function stackPages() {
      pages.forEach((p, i) => {
        p.classList.remove('is-turned', 'turning')
        p.style.zIndex = String(8 - i)
        p.style.transform = `translateX(${i * 4}px) rotateY(${-i * 1.2}deg)`
        p.style.opacity = '1'
      })
    }
    function turnPage() {
      if (pageState.busy || !pages.length || document.hidden) return
      const current = pages[pageState.index]
      if (!current) return
      pageState.busy = true
      current.classList.add('turning')
      const tl = gsap.timeline({
        onComplete: () => {
          current.classList.remove('turning')
          current.classList.add('is-turned')
          current.style.zIndex = String(3 + pageState.index)
          current.style.transform = 'rotateY(-180deg)'
          pageState.index += 1
          updateIndicator()
          pageState.busy = false
          if (pageState.index >= pages.length) timeouts.push(setTimeout(resetBook, 1400))
        },
      })
      tl.to(current, { rotationY: -18, duration: 0.16, ease: 'power2.out' })
        .to(current, { rotationY: -112, duration: 0.48, ease: 'power2.inOut' })
        .to(current, { rotationY: -158, duration: 0.28, ease: 'power2.in' })
        .to(current, { rotationY: -180, duration: 0.3, ease: 'power3.out' })
    }
    function resetBook() {
      if (pageState.busy || !pages.length) return
      pageState.busy = true
      const tl = gsap.timeline({
        onComplete: () => {
          pageState.index = 0
          pageState.cycle += 1
          stackPages()
          updateIndicator()
          pageState.busy = false
        },
      })
      pages
        .slice()
        .reverse()
        .forEach((p, i) => {
          tl.to(p, { rotationY: -135, duration: 0.18, ease: 'power2.in' }, i * 0.28)
            .to(p, { rotationY: -55, duration: 0.24, ease: 'power2.inOut' }, i * 0.28 + 0.18)
            .to(p, { rotationY: 0, duration: 0.32, ease: 'power3.out' }, i * 0.28 + 0.42)
        })
    }

    stackPages()
    updateIndicator()
    on(book, 'click', () => turnPage())
    intervals.push(setInterval(turnPage, 5200))
  }

  return () => {
    running = false
    listeners.forEach(([target, event, handler, options]) => target.removeEventListener(event, handler, options))
    timeouts.forEach(clearTimeout)
    intervals.forEach(clearInterval)
    rafIds.forEach(cancelAnimationFrame)
    ScrollTrigger.getAll().forEach((t) => t.kill())
    gsap.killTweensOf('*')
  }
}
