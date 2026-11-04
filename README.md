# Door PG — site oficial

Site institucional da Door PG, balada de Ponta Grossa (PR): apresentação da casa, agenda semanal, reservas por WhatsApp e galeria de fotos por evento com download.

- **Status:** no ar
- **Endereço:** https://doorpg.com.br
- **Cliente:** Door PG (dono do site); desenvolvimento pela laroca.dev

## Principais funções

- Hero com slideshow, faixa de marcas parceiras e linha do tempo da casa.
- Agenda semanal com a arte de cada dia, lida da nuvem.
- Reservas por WhatsApp (camarote, bistrô, aniversariante) e localização com Google Maps.
- Galeria por evento com download em qualidade original.

## Stack

HTML5, CSS3 e JavaScript puros (Jamstack, sem build). Fontes Bebas Neue e Montserrat. Fotos da galeria e da agenda ficam em armazenamento de objetos (Cloudflare R2), fora do repositório.

## Estrutura

```
index.html, galeria.html   páginas
css/                       style.css, galeria.css, motion.css
js/                        main.js, galeria.js, motion.js
assets/                    imagens e logos
GUIA-MANUTENCAO.md         como atualizar agenda e galeria
```

## Rodar localmente

```bash
python -m http.server 8000   # abrir http://localhost:8000
```

## Publicar

Cloudflare Pages, automático a cada push na `main`. Atualização de agenda e galeria: veja `GUIA-MANUTENCAO.md`.

## Licença

Proprietário — todos os direitos reservados.

## Contato

Desenvolvido pela [laroca.dev](https://laroca.dev) · contato@laroca.dev
