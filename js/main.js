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

  // Scroll → fundo escuro e FABs
  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }

    // Lógica dos Floating Buttons (mobile, index.html)
    const fabContainer = document.getElementById('fabContainer');
    const hero = document.getElementById('hero');
    const footer = document.getElementById('footer');

    if (fabContainer && hero && footer && window.innerWidth <= 900) {
      const heroBottom = hero.getBoundingClientRect().bottom;
      const footerTop = footer.getBoundingClientRect().top;
      
      if (heroBottom < 0 && footerTop > window.innerHeight) {
        fabContainer.classList.add('visible');
      } else {
        fabContainer.classList.remove('visible');
      }
    }
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
    { file: '14-08', label: 'Sexta-feira · 14/08' },
    { file: '15-08', label: 'Sábado · 15/08' },
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
 * Abre imagens em tela cheia com navegação entre fotos
 * Suporta: setas (desktop), swipe (mobile), teclado
 ─────────────────────────────────────────────────────── */
(function initLightbox() {
  const overlay = document.getElementById('imageLightbox');
  const imgEl = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  const counterEl = document.getElementById('lightboxCounter');
  const downloadBtn = document.getElementById('lightboxDownload');

  if (!overlay || !imgEl) return;

  // Estado da galeria
  let galleryList = [];    // lista de { hdUrl, rawSrc, folder, num }
  let currentIndex = -1;

  function closeLightbox() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    setTimeout(() => {
      if (!overlay.classList.contains('active')) {
        imgEl.src = '';
      }
    }, 300);
  }

  function showPhoto(index) {
    if (index < 0 || index >= galleryList.length) return;
    currentIndex = index;

    const item = galleryList[currentIndex];
    imgEl.src = item.hdUrl;

    // Atualiza counter
    if (counterEl) {
      counterEl.textContent = `${currentIndex + 1} / ${galleryList.length}`;
    }

    // Mostra/esconde setas
    if (prevBtn) prevBtn.style.display = currentIndex > 0 ? '' : 'none';
    if (nextBtn) nextBtn.style.display = currentIndex < galleryList.length - 1 ? '' : 'none';
  }

  function goPrev() {
    if (currentIndex > 0) showPhoto(currentIndex - 1);
  }

  function goNext() {
    if (currentIndex < galleryList.length - 1) showPhoto(currentIndex + 1);
  }

  // Função global para abrir a galeria com navegação (chamada por galeria.js)
  window.openGalleryLightbox = function (list, index) {
    galleryList = list;
    currentIndex = index;

    showPhoto(index);

    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  // Função global simples (retrocompatível — usada pela agenda)
  window.openLightbox = function (src) {
    galleryList = [{ hdUrl: src, rawSrc: '', folder: '', num: 0 }];
    currentIndex = 0;

    imgEl.src = src;
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Esconde navegação para uso simples
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    if (counterEl) counterEl.textContent = '';
    if (downloadBtn) downloadBtn.style.display = 'none';
  };

  // ── Botões de navegação
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); goPrev(); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); goNext(); });
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  // ── Download dentro do lightbox
  if (downloadBtn) {
    downloadBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const item = galleryList[currentIndex];
      if (!item || !item.rawSrc) return;

      const span = downloadBtn.querySelector('span');
      const originalText = span ? span.textContent : '';

      if (span) span.textContent = '...';
      downloadBtn.style.pointerEvents = 'none';
      downloadBtn.style.opacity = '0.7';

      try {
        const response = await fetch(`${item.rawSrc}?v=${Date.now()}`);
        if (!response.ok) throw new Error('Erro ao buscar imagem');

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const tempLink = document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = url;
        tempLink.download = `door-pg_${item.folder}_${String(item.num).padStart(2, '0')}.jpg`;

        document.body.appendChild(tempLink);
        tempLink.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(tempLink);
      } catch (error) {
        console.error('Erro no download:', error);
        alert('Não foi possível baixar a imagem. Tente novamente mais tarde.');
      } finally {
        if (span) span.textContent = originalText;
        downloadBtn.style.pointerEvents = 'auto';
        downloadBtn.style.opacity = '1';
      }
    });
  }

  // ── Fecha ao clicar fora da imagem (mas não nos botões)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox();
  });

  // ── Teclado: ESC, ← , →
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'ArrowRight') goNext();
  });

  // ── Swipe touch (mobile)
  let touchStartX = 0;
  let touchStartY = 0;
  let isSwiping = false;

  overlay.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    isSwiping = true;
  }, { passive: true });

  overlay.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    isSwiping = false;

    const deltaX = e.changedTouches[0].screenX - touchStartX;
    const deltaY = e.changedTouches[0].screenY - touchStartY;

    // Só navega se o swipe horizontal for maior que o vertical (evita scroll acidental)
    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY)) return;

    if (deltaX < 0) goNext();   // swipe para esquerda → próxima
    else goPrev();              // swipe para direita → anterior
  }, { passive: true });
})();
