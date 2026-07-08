/**
 * DOOR PG — main.js
 * Módulos: countdown, navbar, hero slideshow,
 *          conheça slideshow, agenda, modal, reveal
 */

'use strict';


/* ── 2. NAVBAR ─────────────────────────────────────────
 * Adiciona classe 'scrolled' ao rolar a página
 * Controla menu mobile
 ─────────────────────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // Scroll → fundo escuro
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Toggle mobile
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });

    // Fecha ao clicar em link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();


/* ── 3. HERO SLIDESHOW ─────────────────────────────────
 * Troca as 13 fotos de assets/images/hero/ a cada 4s
 * Gera slides e dots dinamicamente
 ─────────────────────────────────────────────────────── */
(function initHeroSlideshow() {
  const container = document.getElementById('heroSlides');
  const dotsEl = document.getElementById('heroDots');
  if (!container) return;

  const TOTAL = 13;   // total de fotos na pasta hero
  const INTERVAL = 4000; // ms entre slides
  let current = 0;
  let timer;

  // Gerar slides
  const slides = [];
  for (let i = 1; i <= TOTAL; i++) {
    const div = document.createElement('div');
    div.className = 'hero-slide' + (i === 1 ? ' active' : '');
    const rawUrl = `https://fotos.doorpg.com.br/hero/${String(i).padStart(2, '0')}.jpg`;
    // Usamos proxy wsrv.nl para comprimir as imagens originais gigantes (~20MB) para tamanho Web (1920px)
    div.style.backgroundImage = `url('https://wsrv.nl/?url=${encodeURIComponent(rawUrl)}&w=1920&q=80')`;
    container.appendChild(div);
    slides.push(div);
  }

  // Gerar dots
  const dots = [];
  if (dotsEl) {
    slides.forEach((_, idx) => {
      const btn = document.createElement('button');
      btn.className = 'hero-dot' + (idx === 0 ? ' active' : '');
      btn.setAttribute('aria-label', `Slide ${idx + 1}`);
      btn.addEventListener('click', () => goTo(idx));
      dotsEl.appendChild(btn);
      dots.push(btn);
    });
  }

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = idx;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  function next() { goTo((current + 1) % slides.length); }

  timer = setInterval(next, INTERVAL);

  // Pausa ao hover
  container.addEventListener('mouseenter', () => clearInterval(timer));
  container.addEventListener('mouseleave', () => { timer = setInterval(next, INTERVAL); });
})();


/* ── 4. CONHEÇA A DOOR — SLIDESHOW ─────────────────────
 * Rotaciona as 18 fotos de assets/images/conheca/
 * 6 slots exibidos por vez, troca a cada 5s com stagger
 ─────────────────────────────────────────────────────── */
(function initConhecaSlideshow() {
  const grid = document.getElementById('conhecaGrid');
  if (!grid) return;

  const TOTAL = 15;
  const SLOTS = 6;
  const INTERVAL = 5000;
  let offset = 0;

  // Pré-carregar caminhos do R2 via proxy para reduzir o peso
  const fotos = Array.from({ length: TOTAL }, (_, i) => {
    const rawUrl = `https://fotos.doorpg.com.br/conheca/${String(i + 1).padStart(2, '0')}.jpg`;
    return `https://wsrv.nl/?url=${encodeURIComponent(rawUrl)}&w=600&q=80`;
  });

  const slots = grid.querySelectorAll('.c-slot img');

  function render(animate) {
    slots.forEach((img, i) => {
      const idx = (offset + i) % TOTAL;
      const slot = img.closest('.c-slot');
      // Garante que o slot não muda de tamanho ao trocar foto
      if (slot && !slot.dataset.locked) {
        slot.dataset.locked = '1';
        slot.style.height = slot.offsetHeight + 'px';
      }
      if (animate) {
        img.style.transition = 'opacity 0.4s ease';
        img.style.opacity = '0';
        setTimeout(() => {
          img.src = fotos[idx];
          img.style.opacity = '1';
        }, i * 80);
      } else {
        img.src = fotos[idx];
        img.style.opacity = '1';
        img.style.transition = 'none';
      }
    });
  }

  // Render inicial — espera DOM estar pronto
  render(false);

  setInterval(() => {
    offset = (offset + SLOTS) % TOTAL;
    render(true);
  }, INTERVAL);
})();


/* ── 5. AGENDA ─────────────────────────────────────────
 * Nome do arquivo = "dd-mm.jpeg" → extrai a data
 * Mapeia dia da semana para exibir no card
 ─────────────────────────────────────────────────────── */
(function initAgenda() {
  const grid = document.getElementById('agendaGrid');
  if (!grid) return;

  /**
   * Lista das artes da semana atual.
   * Formato: { file: 'dd-mm', label: 'Sexta, 04/04' }
   * Atualize semanalmente adicionando novas imagens à pasta
   * e registrando aqui.
   */
  const AGENDA = [
    { file: '10-07', label: 'Sexta-feira · 10/07' },
    { file: '11-07', label: 'Sábado · 11/07' },
  ];

  AGENDA.forEach(({ file, label }) => {
    const card = document.createElement('div');
    card.className = 'agenda-card';

    const img = document.createElement('img');
    // Adicionado ?v=2 para quebrar o cache de imagens atualizadas com o mesmo nome
    img.src = `https://fotos.doorpg.com.br/agenda/${file}.jpeg?v=2`;
    img.alt = label;
    img.loading = 'lazy';
    img.style.cursor = 'pointer'; // Indica que é clicável

    // Abre o lightbox ao clicar na imagem
    img.addEventListener('click', () => {
      if (window.openLightbox) window.openLightbox(img.src);
    });

    const dateTag = document.createElement('div');
    dateTag.className = 'agenda-date';
    dateTag.textContent = label;

    card.appendChild(img);
    card.appendChild(dateTag);
    grid.appendChild(card);
  });
})();


/* ── 6. MODAL INGRESSOS ────────────────────────────────
 * Abre ao clicar em "Ingressos" no nav
 * Fecha ao clicar no X ou fora do modal
 ─────────────────────────────────────────────────────── */
(function initModal() {
  const modal = document.getElementById('modalIngressos');
  const closeBtn = document.getElementById('modalClose');
  const openBtn = document.getElementById('ingressosBtn');

  if (!modal) return;

  function open() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Abre ao clicar no botão de ingressos
  if (openBtn) {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      open();
    });
  }

  // Fecha ao clicar no X
  if (closeBtn) closeBtn.addEventListener('click', close);

  // Fecha ao clicar fora do modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  // Fecha com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) close();
  });
})();


/* ── 7. SCROLL REVEAL ──────────────────────────────────
 * Observa elementos com classe .reveal e adiciona
 * .visible quando entram no viewport
 ─────────────────────────────────────────────────────── */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // observa uma vez só
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
})();


/* ── 8. LIGHTBOX DE IMAGENS ─────────────────────────────
 * Abre imagens em tela cheia ao serem clicadas
 ─────────────────────────────────────────────────────── */
(function initLightbox() {
  const overlay = document.getElementById('imageLightbox');
  const imgEl = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');

  if (!overlay || !imgEl) return;

  function closeLightbox() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    // Limpa a imagem antiga após a animação de fade (evita piscar a foto velha na próxima abertura)
    setTimeout(() => {
      if (!overlay.classList.contains('active')) {
        imgEl.src = '';
      }
    }, 300);
  }

  // Função global para abrir
  window.openLightbox = function (src) {
    imgEl.src = src;
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  // Fecha ao clicar no X
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  // Fecha ao clicar fora da imagem
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox();
  });

  // Fecha com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeLightbox();
  });
})();
