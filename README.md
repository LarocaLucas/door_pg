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
- Countdown animado até 01/04/2026 — some automaticamente na data
- Hero com slideshow das 13 fotos (troca a cada 4s)
- Faixa de marcas parceiras com logos reais e animação infinita
- Conheça a Door: rotação de 18 fotos (6 por vez, troca a cada 5s)

### Páginas
- `index.html` — Home completa
- `galeria.html` — Galeria de fotos por evento com download em qualidade original

### Estrutura de arquivos
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
        ├── agenda/          ← artes da semana (dd-mm.jpeg)
        ├── conheca/         ← 18 fotos: 01-18.jpg
        ├── galeria/
        │   └── DD-MM-AAAA/  ← fotos: 01.jpg, 02.jpg...
        ├── hero/            ← 13 fotos: 01-13.jpg
        └── logos/
            ├── logo-door.png
            ├── logo-completa.png
            └── marcas/      ← logos das marcas parceiras
```

### Funcionalidades
- Countdown até 01/04/2026 com botão "pular"
- Hero slideshow automático
- Faixa de marcas com logos brancos
- Agenda semanal por dia
- Reservas via WhatsApp (Camarote / Bistrô / Aniversariante)
- Modal "Em breve" para ingressos
- Galeria por evento com download em qualidade original
- Responsivo para mobile

---

## Manutenção

Ver **`GUIA-MANUTENCAO.md`** para instruções detalhadas.

---

## Futuro

- Ingressos: integração com Sympla ou Ingresse
- Domínio: `door.com.br`
- Atualizar endereço no Google Maps quando confirmado

---

*Desenvolvido por [Lucas Laroca](https://larocalucas.github.io/djlaroca/)*
