# Door PG — Site Oficial

Site institucional da Door PG, desenvolvido para apresentação profissional, agenda de eventos, reservas e galeria de fotos com download.

🌐 **https://doorpg.com.br**  
🔗 **https://larocalucas.github.io/door_pg/** (fallback)

---

## Sobre a Casa

Door PG é uma balada de Ponta Grossa — PR com identidade sofisticada e público elitizado, nascida em 2025 através da Produtora TF. A nova fase — **Unlock the Dark** — inaugura oficialmente em 17/04/2026.

**Instagram:** [@door_pg](https://instagram.com/door_pg)  
**WhatsApp:** +55 (42) 99108-1086  
**Localização:** Ponta Grossa — PR  
**Domínio:** doorpg.com.br (registrado no Registro.br)

---

## Hospedagem e DNS

Hospedado via **GitHub Pages** no repositório `LarocaLucas/door_pg`.

### Configuração DNS (Registro.br)
| Tipo | Nome | Dados |
|------|------|-------|
| A | doorpg.com.br | 185.199.108.153 |
| A | doorpg.com.br | 185.199.109.153 |
| A | doorpg.com.br | 185.199.110.153 |
| A | doorpg.com.br | 185.199.111.153 |
| CNAME | www.doorpg.com.br | larocalucas.github.io |

### GitHub Pages
- Repositório: `door_pg` → Settings → Pages → Branch: main → / (root)
- Custom domain: `doorpg.com.br`
- Enforce HTTPS: ✅ ativado
- Arquivo `CNAME` na raiz do repositório com conteúdo `doorpg.com.br`

---

## Sobre o Site

### Design
- Estética luxury nightclub — minimalismo agressivo
- Paleta: preto puro `#000`, branco `#fff`, cinza `#888`, off-white `#c8b99a` (logos)
- Fontes: **Bebas Neue** (display) + **Montserrat** (corpo, weights 200–700)
- Countdown animado até 16/04/2026 às 20h — some automaticamente na data
- Hero com slideshow de 13 fotos (troca a cada 4s)
- Faixa de marcas parceiras com logos reais brancos (marquee infinito)
- Conheça a Door: rotação de 18 fotos (6 por vez, troca a cada 5s)

### Páginas
- `index.html` — Home completa
- `galeria.html` — Galeria de fotos por evento com download em qualidade original

### Estrutura de arquivos
```
/
├── index.html
├── galeria.html
├── CNAME                  ← domínio doorpg.com.br
├── favicon.png
├── GUIA-MANUTENCAO.md     ← leia antes de atualizar o site
├── css/
│   ├── style.css
│   └── galeria.css
├── js/
│   ├── main.js            ← countdown, slideshow, agenda, modal
│   └── galeria.js         ← galeria com download
└── assets/
    └── images/
        ├── agenda/         ← artes da semana (dd-mm.jpeg)
        ├── conheca/        ← 18 fotos: 01-18.jpg
        ├── galeria/
        │   └── DD-MM-AAAA/ ← fotos: 01.jpg, 02.jpg...
        ├── hero/           ← 13 fotos: 01-13.jpg
        └── logos/
            ├── logo-door.png       ← nav (DOOR.)
            ├── logo-completa.png   ← hero (DOOR + UNLOCK THE DARK)
            ├── logo-footer.png     ← footer (logo TF off-white, extraída do PDF)
            ├── logo-quadrado.png   ← reserva
            └── marcas/             ← logos das marcas parceiras
                ├── coca-cola.svg
                ├── del-valle.svg
                ├── absolut.svg
                ├── johnnie-walker.svg
                ├── redbull.png
                ├── heineken.svg
                ├── budweiser.png
                ├── tanqueray.svg
                └── jose-cuervo.svg
```

### Funcionalidades
- Countdown até 16/04/2026 às 20h com botão "Entrar no site" permanente
- Hero slideshow automático com dots de navegação
- Conheça a Door: rotação de 18 fotos com stagger suave
- Faixa de marcas com logos brancos (18s desktop / 10s mobile)
- Histórico/roadmap com timeline animada
- Agenda semanal com artes por dia
- Banner de destaque para acesso à galeria de fotos
- Reservas via WhatsApp segmentadas (Camarote / Bistrô / Aniversariante)
- Localização com botão Google Maps
- Modal "Em breve" para ingressos (funciona em ambas as páginas)
- Galeria por evento com download em qualidade original
- Instagram no nav, footer e seções estratégicas
- Responsivo para mobile (viewport-fit=cover, touch-action, overflow-x bloqueado)

### Histórico da Casa (para referência do roadmap)
| Data | Evento |
|------|--------|
| 2025 | Fundação através da Produtora TF |
| 18/07/2025 | Inauguração |
| 19/09/2025 | Encerramento do espaço original |
| 16/04/2026 | Pré-inauguração (20h) |
| 17/04/2026 | Inauguração oficial |

---

## Manutenção

Ver **`GUIA-MANUTENCAO.md`** para instruções detalhadas sobre:
- Atualizar agenda semanal
- Adicionar novos álbuns na galeria
- Remover botão skip do countdown antes do lançamento

---

## Futuro

- **Ingressos:** integração com Sympla ou Ingresse quando operacional
- **www:** CNAME `www.doorpg.com.br` propaga automaticamente em até 48h

---

*Desenvolvido por [Laroca.dev](https://laroca.dev)*
