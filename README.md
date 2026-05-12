# Door PG — Site Oficial

Site institucional da Door PG, desenvolvido para apresentação profissional, agenda de eventos, reservas e galeria de fotos com download.

🌐 **https://doorpg.com.br**  

---

## Sobre a Casa

Door PG é uma balada de Ponta Grossa — PR com identidade sofisticada e público elitizado, nascida em 2025 através da Produtora TF. A nova fase — **Unlock the Dark** — inaugura oficialmente em 17/04/2026.

**Instagram:** [@door_pg](https://instagram.com/door_pg)  
**WhatsApp:** +55 (42) 99108-1086  
**Localização:** Ponta Grossa — PR  
**Domínio:** doorpg.com.br (registrado no Registro.br)

---

## Hospedagem e Infraestrutura

O site utiliza arquitetura Jamstack e é hospedado na **Cloudflare**.

- **Hospedagem Front-end:** Cloudflare Pages (Deploy automático via branch `main` do GitHub)
- **Armazenamento de Mídia (Galeria/Agenda):** Cloudflare R2 (Bucket `door-fotos` em `fotos.doorpg.com.br`)
- **DNS:** Gerenciado pela Cloudflare

---

## Sobre o Site

### Design
- Estética luxury nightclub — minimalismo agressivo
- Paleta: preto puro `#000`, branco `#fff`, cinza `#888`, off-white `#c8b99a` (logos)
- Fontes: **Bebas Neue** (display) + **Montserrat** (corpo, weights 200–700)
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
        ├── conheca/        ← 18 fotos: 01-18.jpg
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
- Atualizar agenda semanal (Cloudflare R2)
- Adicionar novos álbuns na galeria (Cloudflare R2)

---

## Futuro

- **Ingressos:** integração com Sympla ou Ingresse quando operacional
- **www:** CNAME `www.doorpg.com.br` propaga automaticamente em até 48h

---

*Desenvolvido por [Laroca.dev](https://laroca.dev)*
