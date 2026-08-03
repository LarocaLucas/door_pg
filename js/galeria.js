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
 * Registro de categorias/meses.
 * @type {Array<{id: string, label: string}>}
 */
const CATEGORIAS = [
  { id: '08-2026', label: 'Agosto 2026' },
  { id: '07-2026', label: 'Julho 2026' },
  { id: 'petroski', label: 'Petroski' },
  { id: '06-2026', label: 'Junho 2026' },
  { id: '05-2026', label: 'Maio 2026' },
];

/**
 * Registro de eventos disponíveis na galeria.
 * @type {Array<{folder: string, label: string, total: number, categoria: string}>}
 */
const EVENTOS = [
  { folder: '25-07-2026', label: '25 · 07 · 2026', total: 111, categoria: '07-2026' },
  { folder: '24-07-2026', label: '24 · 07 · 2026', total: 101, categoria: '07-2026' },
  { folder: '18-07-2026', label: '18 · 07 · 2026', total: 94, categoria: '07-2026' },
  { folder: '17-07-2026', label: '17 · 07 · 2026', total: 92, categoria: '07-2026' },
  { folder: '11-07-2026', label: '11 · 07 · 2026', total: 80, categoria: '07-2026' },
  { folder: '10-07-2026', label: '10 · 07 · 2026', total: 177, categoria: 'petroski' },
  { folder: '05-07-2026', label: '05 · 07 · 2026', total: 212, categoria: '07-2026' },
  { folder: '04-07-2026', label: '04 · 07 · 2026', total: 128, categoria: '07-2026' },
  { folder: '03-07-2026', label: '03 · 07 · 2026', total: 95, categoria: '07-2026' },
  { folder: '27-06-2026', label: '27 · 06 · 2026', total: 101, categoria: '06-2026' },
  { folder: '26-06-2026', label: '26 · 06 · 2026', total: 123, categoria: '06-2026' },
  { folder: '24-06-2026', label: '24 · 06 · 2026', total: 111, categoria: '06-2026' },
  { folder: '20-06-2026', label: '20 · 06 · 2026', total: 172, categoria: '06-2026' },
  { folder: '19-06-2026', label: '19 · 06 · 2026', total: 177, categoria: '06-2026' },
  { folder: '13-06-2026', label: '13 · 06 · 2026', total: 194, categoria: '06-2026' },
  { folder: '12-06-2026', label: '12 · 06 · 2026', total: 127, categoria: '06-2026' },
  { folder: '06-06-2026', label: '06 · 06 · 2026', total: 165, categoria: '06-2026' },
  { folder: '05-06-2026', label: '05 · 06 · 2026', total: 187, categoria: '06-2026' },
  { folder: '03-06-2026', label: '03 · 06 · 2026', total: 119, categoria: '06-2026' },
  { folder: '23-05-2026', label: '23 · 05 · 2026', total: 129, categoria: '05-2026' },
  { folder: '16-05-2026', label: '16 · 05 · 2026', total: 67, categoria: '05-2026' },
  { folder: '09-05-2026', label: '09 · 05 · 2026', total: 128, categoria: '05-2026' },
  { folder: '08-05-2026', label: '08 · 05 · 2026', total: 79, categoria: '05-2026' },
  { folder: '07-05-2026', label: '07 · 05 · 2026', total: 107, categoria: '05-2026' },  
];

/** Estado da galeria */
let categoriaAtiva = CATEGORIAS[0]?.id ?? null;
let eventoAtivo = null;

/* ── Inicialização ────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderCategorias();
  if (categoriaAtiva) selectCategoria(categoriaAtiva);
});

/* ── Renderiza abas de categoria (Meses / Especiais) ─ */
function renderCategorias() {
  const container = document.getElementById('galCategorias');
  if (!container) return;

  CATEGORIAS.forEach(({ id, label }) => {
    const btn = document.createElement('button');
    btn.className = 'cat-btn' + (id === categoriaAtiva ? ' active' : '');
    btn.textContent = label;
    btn.setAttribute('aria-pressed', id === categoriaAtiva);
    
    btn.addEventListener('click', () => {
      if (id === categoriaAtiva) return;
      selectCategoria(id);
    });
    
    container.appendChild(btn);
  });
}

function selectCategoria(id) {
  categoriaAtiva = id;

  // Atualiza estado visual das abas primárias
  const container = document.getElementById('galCategorias');
  if (container) {
    container.querySelectorAll('.cat-btn').forEach(b => {
      b.classList.toggle('active', b.textContent === CATEGORIAS.find(c => c.id === id).label);
      b.setAttribute('aria-pressed', b.classList.contains('active'));
    });
  }

  renderDatas(id);
}

/* ── Renderiza botões de datas filhas da categoria ── */
function renderDatas(catId) {
  const container = document.getElementById('galDatas');
  if (!container) return;
  container.innerHTML = '';

  const eventosDaCategoria = EVENTOS.filter(e => e.categoria === catId);
  if (!eventosDaCategoria.length) {
    eventoAtivo = null;
    renderFotos(null);
    return;
  }

  // Seleciona o primeiro evento dessa categoria por padrão
  eventoAtivo = eventosDaCategoria[0].folder;

  eventosDaCategoria.forEach(({ folder, label }) => {
    const btn = document.createElement('button');
    btn.className = 'evento-btn' + (folder === eventoAtivo ? ' active' : '');
    btn.textContent = label;
    btn.setAttribute('aria-pressed', folder === eventoAtivo);
    
    btn.addEventListener('click', () => {
      if (folder === eventoAtivo) return;
      eventoAtivo = folder;

      // Atualiza estado visual das abas secundárias
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

  // Carrega as fotos do evento recém-selecionado
  renderFotos(eventoAtivo);
}

/* ── Renderiza fotos do evento ────────────────────── */
/** Lista de fotos do evento ativo — usada pelo lightbox para navegação */
let currentGalleryList = [];

function renderFotos(folder) {
  const grid = document.getElementById('galGrid');
  const empty = document.getElementById('galEmpty');
  if (!grid) return;

  // Limpa o grid
  grid.innerHTML = '';
  currentGalleryList = [];

  if (!folder) {
    if (empty) empty.style.display = 'block';
    return;
  }

  const evento = EVENTOS.find(e => e.folder === folder);
  if (!evento) {
    if (empty) empty.style.display = 'block';
    return;
  }

  if (empty) empty.style.display = 'none';

  // Monta a lista de fotos para o lightbox
  for (let i = 1; i <= evento.total; i++) {
    const rawSrc = `https://fotos.doorpg.com.br/${folder}/${String(i).padStart(2, "0")}.jpg`;
    const hdUrl = `https://wsrv.nl/?url=${encodeURIComponent(rawSrc)}&w=1200&q=85`;
    currentGalleryList.push({ hdUrl, rawSrc, folder, num: i });
  }

  // Cria cards para cada foto
  for (let i = 1; i <= evento.total; i++) {
    const src = `https://fotos.doorpg.com.br/${folder}/${String(i).padStart(2, "0")}.jpg`;
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
  // Usamos o proxy gratuito wsrv.nl para criar uma miniatura de 400px (aprox. 30KB)
  // Isso evita o travamento catastrófico de carregar 50 arquivos de 20MB simultaneamente
  img.src = `https://wsrv.nl/?url=${encodeURIComponent(src)}&w=400&q=80`;
  img.alt = `Foto ${num} — Door PG ${folder}`;
  img.loading = 'lazy'; // carregamento lazy para performance

  // Trata erro — mostra placeholder cinza em vez de esconder
  img.addEventListener('error', () => {
    img.style.display = 'none';
    card.style.background = '#111';
    card.style.minHeight = '200px';
    const msg = document.createElement('span');
    msg.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#444;font-size:0.7rem;letter-spacing:0.2em';
    msg.textContent = `FOTO ${String(num).padStart(2, '0')}`;
    card.appendChild(msg);
  });

  // Overlay com download
  const overlay = document.createElement('div');
  overlay.className = 'foto-overlay';
  overlay.style.cursor = 'zoom-in';

  // Abre o lightbox ao clicar no overlay com navegação
  overlay.addEventListener('click', () => {
    if (window.openGalleryLightbox) {
      window.openGalleryLightbox(currentGalleryList, num - 1);
    }
  });

  // Botão de download — usa fetch para forçar download do R2 (Cross-Origin)
  const dlLink = document.createElement('button');
  dlLink.className = 'foto-download';
  dlLink.setAttribute('aria-label', `Baixar foto ${num}`);
  dlLink.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
    <span>Baixar</span>
  `;

  dlLink.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const span = dlLink.querySelector('span');
    const originalText = span.textContent;

    // Feedback visual de carregamento
    span.textContent = '...';
    dlLink.style.pointerEvents = 'none';
    dlLink.style.opacity = '0.7';

    try {
      // Usamos um timestamp (?v=...) para ignorar o cache da Cloudflare.
      // Como o cache antigo não tinha os headers de CORS, o fetch falharia.
      // O cache-buster força uma resposta nova (com CORS) diretamente do R2.
      const response = await fetch(`${src}?v=${new Date().getTime()}`);
      if (!response.ok) throw new Error('Erro ao buscar imagem');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = url;
      tempLink.download = `door-pg_${folder}_${String(num).padStart(2, '0')}.jpg`;

      document.body.appendChild(tempLink);
      tempLink.click();

      // Limpeza
      window.URL.revokeObjectURL(url);
      document.body.removeChild(tempLink);
    } catch (error) {
      console.error('Erro no download:', error);
      alert('Não foi possível baixar a imagem. Tente novamente mais tarde.');
    } finally {
      span.textContent = originalText;
      dlLink.style.pointerEvents = 'auto';
      dlLink.style.opacity = '1';
    }
  });

  overlay.appendChild(dlLink);
  card.appendChild(numEl);
  card.appendChild(img);
  card.appendChild(overlay);

  return card;
}
