# Door PG — Site Oficial

Site institucional da Door PG, desenvolvido para apresentação profissional, agenda de eventos, reservas e galeria de fotos com download.

🌐 **https://larocalucas.github.io/door_pg/**

---

## Sobre a Casa

Door PG é uma balada de Ponta Grossa — PR com identidade sofisticada e público elitizado. A nova fase — **Unlock the Dark** — inaugura em 01/04/2026.

**Instagram:** [@door_pg](https://instagram.com/door_pg)  
**WhatsApp:** +55 (42) 99108-1086  
**Localização:** Ponta Grossa — PR

---

## Sobre o Site

### Design
- Estética luxury nightclub — minimalismo agressivo
- Paleta: preto puro `#000`, branco `#fff`, cinza `#888`
- Fontes: **Bebas Neue** (display) + **Montserrat** (corpo) + **Playfair Display** (itálico)
- Countdown animado com tela de loading até 01/04/2026
- Hero com slideshow das fotos da casa
- Faixa de marcas parceiras com animação infinita

### Páginas
- `index.html` — Home completa
- `galeria.html` — Galeria de fotos por evento com download

### Estrutura
```
/
├── index.html
├── galeria.html
├── favicon.png
├── css/
│   ├── style.css
│   └── galeria.css
├── js/
│   ├── main.js
│   └── galeria.js
└── assets/
    └── images/
        ├── agenda/        ← artes no formato dd-mm.jpeg
        ├── conheca/       ← 18 fotos numeradas 01-18.jpeg
        ├── galeria/
        │   ├── 04-04-2026/  ← fotos numeradas 1.jpeg, 2.jpeg...
        │   └── 05-04-2026/
        ├── hero/          ← 13 fotos numeradas 01-13.jpeg
        └── logos/         ← logo.png
```

### Funcionalidades
- Countdown até 01/04/2026 com botão "pular" para desenvolvimento
- Hero slideshow automático com dots de navegação
- Conheça a Door: rotação de 18 fotos (6 por vez, troca a cada 5s)
- Faixa de marcas parceiras (marquee infinito)
- Histórico/roadmap da balada com timeline
- Agenda semanal com artes por dia
- Reservas via WhatsApp segmentadas (Camarote / Bistrô / Aniversariante)
- Localização com botão Google Maps
- Modal "Em breve" para ingressos
- Galeria por evento com download em qualidade original
- Instagram fixo no nav, footer e seções estratégicas
- Responsivo para mobile

### Como adicionar novo evento na galeria
1. Crie a pasta: `assets/images/galeria/DD-MM-AAAA/`
2. Coloque as fotos numeradas: `1.jpeg`, `2.jpeg`, ...
3. Registre no array `EVENTOS` em `js/galeria.js`:
```js
{ folder: 'DD-MM-AAAA', label: 'DD · MM · AAAA', total: N }
```

### Como atualizar a agenda semanal
1. Coloque as novas artes em `assets/images/agenda/` no formato `dd-mm.jpeg`
2. Atualize o array `AGENDA` em `js/main.js`

---

## Hospedagem

Hospedado via **GitHub Pages** no repositório `LarocaLucas/door_pg`.

Ingressos: integração futura com **Sympla** ou **Ingresse**.

---

*Desenvolvido por [Lucas Laroca](https://larocalucas.github.io/djlaroca/)*
