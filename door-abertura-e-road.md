# Tarefa: animação de abertura "fechadura" + texto novo do Road 07/05 no site da Door

**Projeto:** `E:\Arquivos\Projetos\Door\door_pg` (site estático: HTML + CSS + JS puro, sem build, sem framework)
**Arquivos que você vai mexer:** `index.html`, `css/style.css`, `js/main.js`. Nada além disso.
**Não mexa** em mais nada do site (layout, cores, fontes, outras seções, galeria). Não crie arquivos novos. Não instale dependências.

São duas mudanças independentes:

1. **Abertura do hero pela fechadura:** quando o site abre, a tela fica preta e as fotos do hero aparecem por dentro de uma fechadura pequena no centro. Ela cresce até cobrir a tela inteira. Depois, o logo, o texto e os botões sobem com um fade, um de cada vez.
2. **Texto atualizado do item 07·05·2026 da seção Road**, porque a inauguração já aconteceu.

---

## Como a animação funciona (entenda antes de codar)

- As fotos (`.hero-slides`) e o degradê (`.hero-overlay`) vão ficar dentro de um novo wrapper, `.hero-media`.
- Esse wrapper recebe um **`mask-image` em CSS**: um SVG em formato de fechadura (um círculo com um trapézio embaixo). Com `mask-size: 7vmin`, só aparece uma fechadura pequena no meio da tela, e o resto fica preto (o fundo do `#hero`).
- Quando o JS coloca a classe **`is-unlocked`** no `#hero`, o `mask-size` faz uma transição até `520vmax`. A fechadura cresce tanto que cobre a tela inteira. Isso dura 1,5 s, com 0,5 s de atraso e a curva `cubic-bezier(0.76, 0, 0.24, 1)`.
- Ao fim da transição, o JS coloca a classe **`is-open`**, que **remove a máscara**. Isso é importante: máscara ativa pesa na rolagem e no slideshow.
- O conteúdo do hero (logo, texto, botões) usa **transition**, não keyframes. Ele entra aos 1500 ms, 1650 ms e 1800 ms, ou seja, só quando a fechadura já abriu.
- Tudo depende da classe **`js`** no `<html>`. Se o JavaScript falhar, o site aparece normal, sem máscara e sem conteúdo invisível.
- Quem tem **movimento reduzido** ativado no sistema (`prefers-reduced-motion`) vê o hero já aberto, sem animação.

---

## Passo 1: `index.html`

### 1a. Marcar que o JS está ativo

Dentro do `<head>`, **logo antes** da linha `<link rel="stylesheet" href="css/style.css?...">`, adicione:

```html
  <script>document.documentElement.classList.add('js')</script>
```

### 1b. Envolver as fotos e o degradê no wrapper da máscara

Procure isto dentro de `<section id="hero">`:

```html
    <div class="hero-slides" id="heroSlides">
      <!-- JS popula dinamicamente de assets/images/hero/ (01 a 13) -->
    </div>
    <div class="hero-overlay"></div>
```

Troque por:

```html
    <div class="hero-media" id="heroMedia">
      <div class="hero-slides" id="heroSlides">
        <!-- JS popula dinamicamente de assets/images/hero/ (01 a 13) -->
      </div>
      <div class="hero-overlay"></div>
    </div>
```

Mantenha o `id="heroSlides"`, porque o slideshow atual usa esse id. O resto do hero (`.hero-content`, `.hero-dots`, `.hero-ig-badge`) fica **fora** do `.hero-media`, exatamente como está.

### 1c. Atualizar a versão dos arquivos (cache)

Troque o `?v=20260918` do `css/style.css` e do `js/main.js` por `?v=20260928`. Sem isso, quem já visitou o site continua vendo a versão antiga.

---

## Passo 2: `css/style.css`

### 2a. Hero com fundo preto e camada isolada

Procure:

```css
#hero {
  min-height: 100vh; position: relative;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
```

Troque por:

```css
#hero {
  min-height: 100vh; position: relative;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
  background: #000;
  isolation: isolate;
}

.hero-media { position: absolute; inset: 0; z-index: 0; }
```

### 2b. Tirar as animações antigas (fadeUp) do conteúdo do hero

Hoje `.hero-unlock`, `.hero-logo-img`, `.hero-logo-fallback`, `.hero-desc` e `.hero-ctas` têm, cada um, uma linha assim:

```css
  animation: fadeUp 0.8s 0.4s ease forwards; opacity: 0;
```

**Apague essa linha `animation: fadeUp ...; opacity: 0;` nesses 5 seletores** (só dentro do bloco do hero). O restante de cada regra continua igual. **Não apague** o `@keyframes fadeUp` no fim do arquivo, porque outras partes do site podem usar.

Motivo: o fadeUp começa a 0,2 s, com a tela ainda preta, e brigaria com a nova sequência.

### 2c. Colar o bloco da abertura

Logo **depois** da regra `.hero-ctas { ... }`, cole:

```css
/* ── Abertura pela fechadura ─────────────────────────────
 * A fechadura funciona como máscara: começa pequena e cresce até cobrir a tela.
 * .is-unlocked dispara a abertura; .is-open remove a máscara no fim (alivia a rolagem).
 ─────────────────────────────────────────────────────── */
.js #hero:not(.is-open) .hero-media {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 60'%3E%3Ccircle cx='20' cy='16' r='12'/%3E%3Cpath d='M11 26 L8.5 54 L31.5 54 L29 26 Z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 60'%3E%3Ccircle cx='20' cy='16' r='12'/%3E%3Cpath d='M11 26 L8.5 54 L31.5 54 L29 26 Z'/%3E%3C/svg%3E");
  -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
  -webkit-mask-position: 50% 46%; mask-position: 50% 46%;
  -webkit-mask-size: 7vmin auto; mask-size: 7vmin auto;
  transition: -webkit-mask-size 1500ms cubic-bezier(0.76, 0, 0.24, 1) 500ms,
              mask-size 1500ms cubic-bezier(0.76, 0, 0.24, 1) 500ms;
}
.js #hero.is-unlocked:not(.is-open) .hero-media {
  -webkit-mask-size: 520vmax auto; mask-size: 520vmax auto;
}

/* Conteúdo entra depois que a fechadura abre, um item de cada vez */
.js .hero-content > * {
  opacity: 0; transform: translateY(14px);
  transition: opacity 900ms ease, transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
}
.js #hero.is-unlocked .hero-content > * { opacity: 1; transform: none; }
.js #hero.is-unlocked .hero-content > :nth-child(1),
.js #hero.is-unlocked .hero-content > :nth-child(2) { transition-delay: 1500ms; }
.js #hero.is-unlocked .hero-content > :nth-child(3) { transition-delay: 1650ms; }
.js #hero.is-unlocked .hero-content > :nth-child(4) { transition-delay: 1800ms; }

/* Pontinhos e selo do Instagram: só fade (os pontinhos já usam transform para centralizar) */
.js .hero-dots,
.js .hero-ig-badge { opacity: 0; transition: opacity 900ms ease, color 0.3s; }
.js #hero.is-unlocked .hero-dots,
.js #hero.is-unlocked .hero-ig-badge { opacity: 1; transition-delay: 1950ms, 0s; }
```

Sobre os `nth-child`: em `.hero-content`, os filhos são a imagem do logo e o `h1` de fallback (os dois contam como o logo), o texto e os botões. Se a ordem no HTML for diferente, ajuste os números para que a sequência continue sendo **logo → texto → botões**.

Os pontinhos e o selo recebem **só opacidade** de propósito: o `.hero-dots` já usa `transform: translateX(-50%)` para ficar centralizado, e mexer no transform tiraria ele do lugar. No selo, a transição de `color` continua na lista para não perder o hover.

### 2d. Movimento reduzido (acessibilidade)

No fim do arquivo, cole:

```css
/* ── Movimento reduzido ──────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .js #hero:not(.is-open) .hero-media { -webkit-mask-image: none; mask-image: none; }
  .js .hero-content > * { transition: none; opacity: 1; transform: none; }
  .js .hero-dots, .js .hero-ig-badge { opacity: 1; }
}
```

---

## Passo 3: `js/main.js`

Procure o início do módulo do hero:

```js
(function initHeroSlideshow() {
  const container = document.getElementById('heroSlides');
  const dotsEl = document.getElementById('heroDots');
  if (!container) return;
```

Logo **depois** do `if (!container) return;` e **antes** do bloco `// No mobile, roda o vídeo...`, cole:

```js
  // Abertura pela fechadura (a animação em si está no CSS)
  // is-unlocked dispara; is-open remove a máscara ao terminar, para não pesar na rolagem
  const hero = document.getElementById('hero');
  const media = document.getElementById('heroMedia');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const openHero = () => hero.classList.add('is-open');
  if (reduceMotion) openHero();
  else {
    media && media.addEventListener('transitionend', e => {
      if (e.target === media && e.propertyName.includes('mask')) openHero();
    });
    setTimeout(openHero, 2600); // garantia, caso o transitionend não dispare
  }
  // Dois frames de espera garantem que o navegador pintou o estado inicial antes de animar
  requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('is-unlocked')));
```

Esse código precisa ficar **antes** do `return` do mobile, porque a abertura também tem que acontecer no celular (em cima do vídeo).

(Conferido: o `main.js` atual não tem nenhuma `const reduceMotion`, então pode declarar do jeito que está acima.)

---

## Passo 4: texto novo do Road (07·05·2026)

No `index.html`, na seção Road, procure o último `road-item`:

```html
        <div class="road-right">
          <h3>Unlock the Dark ↗</h3>
          <p>A nova fase começa. Inauguração oficial no dia 07 de maio de 2026. Novo endereço, mesma essência — elevada. A Door volta mais forte, pronta para reescrever a noite de Ponta Grossa.</p>
          <a href="#contato" class="btn-primary road-btn">Em breve →</a>
        </div>
```

Troque por:

```html
        <div class="road-right">
          <h3>Unlock the Dark ↗</h3>
          <p>A nova fase começa. Novo endereço, mesma essência — elevada. A Door volta mais forte e reescreve a noite de Ponta Grossa, toda sexta e sábado.</p>
          <a href="#agenda" class="btn-primary road-btn">Ver a agenda da semana →</a>
        </div>
```

O que mudou: saiu "Inauguração oficial no dia 07 de maio de 2026" (já passou), "pronta para reescrever" virou "reescreve (...) toda sexta e sábado", e o botão "Em breve" agora leva para a agenda. Mantenha a data `07·05·2026` e o `road-dot--pulse`.

### 4b. (Mesmo motivo) metatags de compartilhamento

No `<head>`, o `og:description` e o `twitter:description` ainda falam "Inauguração oficial 07/05/2026". Troque os dois por:

```html
content="Unlock the Dark. Sexta e sábado a partir das 23h, em Ponta Grossa. Some doors close, others open."
```

No `<meta name="keywords">`, tire o termo `inauguração 2026`.

---

## Passo 5: testar antes de entregar

1. Rode um servidor local na pasta do projeto: `python -m http.server 8080`. Abra `http://localhost:8080`.
2. **Recarregue com Ctrl+F5.** Esperado: tela preta, fotos aparecendo por uma fechadura pequena no centro, a fechadura crescendo até a tela cheia (~2 s) e, depois, logo → texto → botões subindo em sequência.
3. Role a página até o fim e volte: o hero precisa estar normal, **sem máscara** (no DevTools, o `#hero` tem as classes `is-unlocked is-open`).
4. Veja no DevTools com a janela em **390 px de largura** (celular): a abertura acontece em cima do vídeo.
5. No DevTools, abra Rendering → **Emulate CSS prefers-reduced-motion: reduce** e recarregue: o hero aparece aberto, sem animação.
6. O Console tem que estar **sem erros**.
7. Confira a seção **Road**: texto novo no 07·05·2026, e o botão rola até a agenda.
8. Safari/iPhone: o `-webkit-mask-*` já está incluído, então não remova as linhas com prefixo.

## Regras

- Não faça commit, push nem deploy. Deixe só local para o Lucas avaliar.
- Não mude nada fora do que está descrito aqui. Se algo no arquivo estiver diferente do que este guia mostra, adapte com o mínimo de mudança e avise no resumo final.
- No fim, liste o que alterou em cada arquivo.
