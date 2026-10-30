# door_pg (site da Door)

Antes de mexer, leia o README.md e o GUIA-MANUTENCAO.md.

## Grafo de conhecimento (graphify + Obsidian)
- Este projeto da Door tem grafo do graphify em `graphify-out/` (fora do git). Consulte antes de abrir muitos arquivos: `graphify query "<pergunta>"`, `graphify explain "<nó>"`, `graphify god-nodes`. Relatório: `graphify-out/GRAPH_REPORT.md`.
- Atualizar ao concluir cada etapa (rode **de dentro da pasta**: o CLI quebra caminhos com espaço): `graphify update .` para o código (local, sem LLM); se mudou documentação, `/graphify . --update` (o próprio agente extrai os documentos com subagentes; não use o Gemini). Depois, `graphify export obsidian --graph graphify-out/graph.json --dir "E:/Arquivos/Obsidian/Door/<projeto>"`.
- Visualização: cofre do Obsidian `E:\Arquivos\Obsidian\Door` (plugin 3D Graph). Sem hooks do graphify (conflitam com o code-review-graph).

## Registro de andamento
- 30/10/2026 (Claude): branch `feat/json-r2` (PR sem merge; a main publica o site). Agenda e galeria passam a ler `site/agenda.json` e `site/galeria.json` do R2 com fallback para as listas embutidas; grade usa `mini/NN.webp` quando `miniaturas: true`; otimizações (lazy, width/height, preconnect, defer, fetchpriority). Arquivos: `js/main.js`, `js/galeria.js`, `index.html`, `galeria.html`, `GUIA-MANUTENCAO.md`. Testes: Playwright 390 e 1440 px, JSON ausente (igual ao atual) e simulado (filtra datas passadas, mini webp), sem erros no console; Lighthouse antes/depois no PR. Próximo: dono avaliar o PR e só então juntar.
