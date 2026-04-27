/**
 * DOOR PG — galeria.js
 *
 * Gerencia a exibição de fotos por evento.
 * ─────────────────────────────────────────────────────
 * COMO ADICIONAR UM NOVO EVENTO:
 *   1. Crie a pasta: assets/images/galeria/DD-MM-AAAA/
 *   2. Coloque as fotos numeradas: 1.jpg, 2.jpg, ...
 *   3. Adicione uma entrada no array EVENTOS abaixo:
 *      { folder: 'DD-MM-AAAA', label: 'Dia Mês Ano', total: N }
 * ─────────────────────────────────────────────────────
 */

'use strict';

/**
 * Registro de eventos disponíveis na galeria.
 * @type {Array<{folder: string, label: string, total: number}>}
 */
const EVENTOS = [
  { folder: '04-04-2026', label: '04 · 04 · 2026', total: 5 },
  { folder: '05-04-2026', label: '05 · 04 · 2026', total: 7 },
  // Adicione novos eventos aqui ↓
];

/** Evento selecionado no momento */
let eventoAtivo = EVENTOS[0]?.folder ?? null;

/* ── Inicialização ────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderEventos();
  if (eventoAtivo) renderFotos(eventoAtivo);
});

/* ── Renderiza botões de evento ───────────────────── */
function renderEventos() {
  const container = document.getElementById('galEventos');
  if (!container) return;

  EVENTOS.forEach(({ folder, label }) => {
    const btn = document.createElement('button');
    btn.className = 'evento-btn' + (folder === eventoAtivo ? ' active' : '');
    btn.textContent = label;
    btn.setAttribute('aria-pressed', folder === eventoAtivo);
    btn.addEventListener('click', () => {
      if (folder === eventoAtivo) return;
      eventoAtivo = folder;

      // Atualiza estado dos botões
      container.querySelectorAll('.evento-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      renderFotos(folder);
    });
    container.appendChild(btn);
  });
}

/* ── Renderiza fotos do evento ────────────────────── */
function renderFotos(folder) {
  const grid  = document.getElementById('galGrid');
  const empty = document.getElementById('galEmpty');
  if (!grid) return;

  // Limpa o grid
  grid.innerHTML = '';

  const evento = EVENTOS.find(e => e.folder === folder);
  if (!evento) {
    if (empty) empty.style.display = 'block';
    return;
  }

  if (empty) empty.style.display = 'none';

  // Cria cards para cada foto
  for (let i = 1; i <= evento.total; i++) {
    const src  = `https://fotos.doorpg.com.br/${folder}/${String(i).padStart(2,"0")}.jpg`;
    const card = criarFotoCard(src, i, folder);
    grid.appendChild(card);
  }
}

/**
 * Cria um card de foto com botão de download.
 * O download usa o atributo `download` do HTML5 —
 * funciona para arquivos do mesmo domínio.
 *
 * @param {string} src    - Caminho da imagem
 * @param {number} num    - Número da foto
 * @param {string} folder - Pasta do evento (para nome do arquivo)
 * @returns {HTMLElement}
 */
function criarFotoCard(src, num, folder) {
  const card = document.createElement('div');
  card.className = 'foto-card';

  // Número decorativo
  const numEl = document.createElement('span');
  numEl.className = 'foto-num';
  numEl.textContent = String(num).padStart(2, '0');

  // Imagem
  const img = document.createElement('img');
  img.src     = src;
  img.alt     = `Foto ${num} — Door PG ${folder}`;
  img.loading = 'lazy'; // carregamento lazy para performance

  // Trata erro — mostra placeholder cinza em vez de esconder
  img.addEventListener('error', () => {
    img.style.display = 'none';
    card.style.background = '#111';
    card.style.minHeight = '200px';
    const msg = document.createElement('span');
    msg.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#444;font-size:0.7rem;letter-spacing:0.2em';
    msg.textContent = `FOTO ${String(num).padStart(2,'0')}`;
    card.appendChild(msg);
  });

  // Overlay com download
  const overlay = document.createElement('div');
  overlay.className = 'foto-overlay';

  // Link de download — força download com qualidade original
  const dlLink = document.createElement('a');
  dlLink.className = 'foto-download';
  dlLink.href      = src;
  dlLink.download  = `door-pg_${folder}_${String(num).padStart(2,'0')}.jpg`;
  dlLink.setAttribute('aria-label', `Baixar foto ${num}`);
  dlLink.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
    Baixar
  `;

  overlay.appendChild(dlLink);
  card.appendChild(numEl);
  card.appendChild(img);
  card.appendChild(overlay);

  return card;
}
