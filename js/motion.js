/**
 * DOOR PG — motion.js (v2.0)
 * Camada de movimento sobre o site atual: rolagem suave, títulos em 3D,
 * entradas, road que acende, cartões com inclinação 3D e a porta da
 * localização se desenhando. Usa GSAP + ScrollTrigger + Lenis (CDN).
 * Com movimento reduzido ou sem as bibliotecas, não faz nada e o site
 * continua exatamente como era.
 */

(function initMotion() {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover)').matches;
  if (reduceMotion || !window.gsap || !window.ScrollTrigger) return;

  document.documentElement.classList.add('has-motion');
  gsap.registerPlugin(ScrollTrigger);
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const EASE = 'expo.out';


  /* ── ROLAGEM SUAVE ─────────────────────────────────────
   * Modal, menu e lightbox travam a página com body.style.overflow;
   * o Lenis para junto para não rolar por baixo deles.
   ─────────────────────────────────────────────────────── */
  let lenis = null;
  if (window.Lenis) {
    lenis = new Lenis({ lerp: 0.1, anchors: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    let locked = false;
    new MutationObserver(() => {
      const want = document.body.style.overflow === 'hidden';
      if (want === locked) return;
      locked = want;
      want ? lenis.stop() : lenis.start();
    }).observe(document.body, { attributes: true, attributeFilter: ['style'] });
  }


  /* ── NAVBAR ────────────────────────────────────────────
   * Some ao descer e volta ao subir (nunca com o menu aberto)
   ─────────────────────────────────────────────────────── */
  (function navHide() {
    const navbar = $('#navbar');
    const links = $('#navLinks');
    if (!navbar) return;
    let lastY = window.scrollY;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      const menuOpen = links && links.classList.contains('open');
      navbar.classList.toggle('nav-hidden', !menuOpen && y > lastY && y > window.innerHeight * 0.7);
      lastY = y;
    }, { passive: true });
  })();


  /* ── HERO ──────────────────────────────────────────────
   * A abertura pela fechadura continua no main.js/style.css.
   * Aqui: profundidade com o mouse e saída suave ao rolar.
   ─────────────────────────────────────────────────────── */
  (function hero() {
    const hero = $('#hero');
    if (!hero) return;
    const slides = $('.hero-slides', hero);
    const content = $('.hero-content', hero);

    if (canHover && slides && content) {
      const sx = gsap.quickTo(slides, 'x', { duration: 1.2, ease: 'power3' });
      const sy = gsap.quickTo(slides, 'y', { duration: 1.2, ease: 'power3' });
      const cx = gsap.quickTo(content, 'x', { duration: 1.2, ease: 'power3' });
      const cy = gsap.quickTo(content, 'y', { duration: 1.2, ease: 'power3' });
      hero.addEventListener('pointermove', e => {
        const px = e.clientX / window.innerWidth - 0.5;
        const py = e.clientY / window.innerHeight - 0.5;
        sx(px * -26); sy(py * -18);
        cx(px * 14); cy(py * 10);
      });
    }

    const out = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
    content && gsap.to(content, { yPercent: 28, opacity: 0, ease: 'none', scrollTrigger: out });
    slides && gsap.to(slides, { scale: 1.12, ease: 'none', scrollTrigger: out });
  })();


  /* ── TÍTULOS DAS SEÇÕES ────────────────────────────────
   * Número, rótulo e título entram juntos; as letras giram em 3D
   ─────────────────────────────────────────────────────── */
  function splitChars(el) {
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    const walk = node => {
      [...node.childNodes].forEach(child => {
        if (child.nodeType === 1) { walk(child); return; }
        if (child.nodeType !== 3) return;
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.append(part); return; }
          const word = document.createElement('span');
          word.style.display = 'inline-block';
          word.style.whiteSpace = 'nowrap';
          word.setAttribute('aria-hidden', 'true');
          [...part].forEach(c => {
            const ch = document.createElement('span');
            ch.className = 'ch';
            ch.textContent = c;
            word.append(ch);
          });
          frag.append(word);
        });
        child.replaceWith(frag);
      });
    };
    walk(el);
    return $$('.ch', el);
  }

  $$('.section-header').forEach(header => {
    const num = $('.section-num', header);
    const label = $('.section-label', header);
    const title = $('.section-title', header);
    const chars = title ? splitChars(title) : [];

    gsap.timeline({ scrollTrigger: { trigger: header, start: 'top 82%', once: true } })
      .from(num, { yPercent: 60, opacity: 0, duration: 1.2, ease: EASE })
      .from(label, { x: -24, opacity: 0, duration: 1, ease: EASE }, 0.1)
      .from(chars, {
        rotationX: -95, yPercent: 40, opacity: 0,
        duration: 1.1, ease: EASE, stagger: 0.028,
      }, 0.15);
  });


  /* ── ENTRADAS ──────────────────────────────────────────
   * Blocos sobem em sequência quando chegam na tela
   ─────────────────────────────────────────────────────── */
  const rise = ['.reveal', '.galeria-cta-banner', '.conheca-footer', '.agenda-cta', '.reservas-sub', '.footer-inner > *', '.footer-bottom'];
  const risers = $$(rise.join(',')).filter(el => !el.closest('.road-timeline'));
  gsap.set(risers, { y: 44, opacity: 0 });
  ScrollTrigger.batch(risers, {
    start: 'top 90%', once: true,
    onEnter: els => gsap.to(els, { y: 0, opacity: 1, duration: 1.1, ease: EASE, stagger: 0.12 }),
  });

  // Fotos do "Conheça": abrem de baixo para cima, uma de cada vez
  const slots = $$('.conheca-grid .c-slot');
  if (slots.length) {
    gsap.from(slots, {
      clipPath: 'inset(100% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut', stagger: 0.09,
      scrollTrigger: { trigger: '.conheca-grid', start: 'top 80%', once: true },
    });
  }


  /* ── ROAD ──────────────────────────────────────────────
   * A linha acende conforme a rolagem e cada marco acende ao chegar
   ─────────────────────────────────────────────────────── */
  (function road() {
    const timeline = $('.road-timeline');
    if (!timeline) return;
    const line = document.createElement('span');
    line.className = 'road-progress';
    line.setAttribute('aria-hidden', 'true');
    timeline.prepend(line);

    gsap.to(line, {
      scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: timeline, start: 'top 65%', end: 'bottom 65%', scrub: true },
    });

    $$('.road-item', timeline).forEach(item => {
      gsap.from(item, {
        x: -36, opacity: 0, duration: 1.1, ease: EASE,
        scrollTrigger: { trigger: item, start: 'top 88%', once: true },
      });
      ScrollTrigger.create({
        trigger: item, start: 'top 65%',
        onEnter: () => item.classList.add('is-lit'),
        onLeaveBack: () => item.classList.remove('is-lit'),
      });
    });
  })();


  /* ── CARTÕES COM LUZ E INCLINAÇÃO 3D ───────────────────
   * Agenda: inclina seguindo o ponteiro, com reflexo
   * Reservas e contato: foco de luz acompanha o ponteiro
   ─────────────────────────────────────────────────────── */
  function followPointer(el, onMove) {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', `${x * 100}%`);
      el.style.setProperty('--my', `${y * 100}%`);
      onMove && onMove(x, y);
    });
  }

  const agendaCards = $$('.agenda-card');
  if (agendaCards.length) {
    gsap.set(agendaCards, { transformPerspective: 1000 });
    gsap.from(agendaCards, {
      y: 70, rotationX: 16, opacity: 0, duration: 1.3, ease: EASE, stagger: 0.12,
      scrollTrigger: { trigger: '#agendaGrid', start: 'top 85%', once: true },
    });
  }
  if (canHover) {
    agendaCards.forEach(card => {
      const glare = document.createElement('span');
      glare.className = 'card-glare';
      glare.setAttribute('aria-hidden', 'true');
      card.append(glare);
      const rx = gsap.quickTo(card, 'rotationX', { duration: 0.7, ease: 'power3' });
      const ry = gsap.quickTo(card, 'rotationY', { duration: 0.7, ease: 'power3' });
      const lift = gsap.quickTo(card, 'y', { duration: 0.7, ease: 'power3' });
      followPointer(card, (x, y) => { ry((x - 0.5) * 12); rx((0.5 - y) * 12); lift(-6); });
      card.addEventListener('pointerleave', () => { rx(0); ry(0); lift(0); });
    });
    $$('.reserva-card, .contato-card').forEach(card => followPointer(card));
  }


  /* ── PORTA DA LOCALIZAÇÃO ──────────────────────────────
   * O desenho da porta se traça ao entrar na tela
   ─────────────────────────────────────────────────────── */
  (function doorDrawing() {
    const svg = $('.local-art svg');
    if (!svg) return;
    const shapes = $$('path, circle, rect', svg).filter(s => s.getAttribute('stroke'));
    shapes.forEach(s => {
      const len = s.getTotalLength();
      s.style.strokeDasharray = len;
      s.style.strokeDashoffset = len;
    });
    const dots = $$('circle[fill="white"], text', svg);
    gsap.set(dots, { opacity: 0 });
    gsap.timeline({ scrollTrigger: { trigger: svg, start: 'top 80%', once: true } })
      .to(shapes, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut', stagger: 0.12 })
      .to(dots, { opacity: (i, el) => el.getAttribute('opacity') || 1, duration: 0.8, stagger: 0.1 }, '-=0.6');
  })();


  // Fotos e fontes mudam alturas depois de carregar: recalcula os gatilhos
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
