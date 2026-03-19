# GUIA DE MANUTENÇÃO — Door PG

Documento de referência para atualização semanal do site.  
Leia com atenção antes de fazer qualquer alteração.

---

## PARTE 1 — ATUALIZAR A AGENDA SEMANAL

A agenda mostra as artes de cada noite da semana. É atualizada toda semana com novas imagens.

### 1.1 Padrão de nome dos arquivos

Cada arte deve ser nomeada com a data no formato `dd-mm.jpeg`

**Exemplos:**
```
04-04.jpeg   ← sexta-feira, 04 de abril
05-04.jpeg   ← sábado, 05 de abril
06-04.jpeg   ← domingo, 06 de abril
```

> ⚠️ **Atenção:** O formato é sempre `dd-mm`, nunca `mm-dd` ou com ano.  
> A extensão é sempre `.jpeg` (não `.jpg`, não `.png`).

---

### 1.2 Onde colocar as imagens

Pasta: `assets/images/agenda/`

```
Site Door/
└── assets/
    └── images/
        └── agenda/
            ├── 04-04.jpeg   ← nova arte
            ├── 05-04.jpeg   ← nova arte
            └── ...
```

> Pode deixar artes antigas na pasta — elas não aparecem no site a menos que estejam registradas no código.

---

### 1.3 Registrar as novas datas no código

Abra o arquivo `js/main.js` e localize o trecho:

```javascript
const AGENDA = [
  { file: '02-04', label: 'Quarta-feira · 02/04' },
  { file: '03-04', label: 'Quinta-feira · 03/04'  },
  { file: '04-04', label: 'Sexta-feira · 04/04'   },
  { file: '05-04', label: 'Sábado · 05/04'         },
];
```

**Substitua pelo novo fim de semana.** Exemplo para a semana de 11/04:

```javascript
const AGENDA = [
  { file: '10-04', label: 'Quinta-feira · 10/04' },
  { file: '11-04', label: 'Sexta-feira · 11/04'  },
  { file: '12-04', label: 'Sábado · 12/04'        },
  { file: '13-04', label: 'Domingo · 13/04'        },
];
```

**Dias da semana em português:**
| Inglês | Português |
|--------|-----------|
| Monday | Segunda-feira |
| Tuesday | Terça-feira |
| Wednesday | Quarta-feira |
| Thursday | Quinta-feira |
| Friday | Sexta-feira |
| Saturday | Sábado |
| Sunday | Domingo |

> Coloque apenas os dias que terão evento. Se não tiver quinta, não inclua na lista.

---

### 1.4 Salvar e publicar

Depois de atualizar o arquivo `main.js` e colocar as imagens na pasta, rode no terminal:

```bash
cd "/home/ubuntu/Documents/Site Door"
git add .
git commit -m "agenda: semana de DD/MM"
git push
```

> O site atualiza automaticamente em 1-2 minutos após o push.

---

---

## PARTE 2 — ADICIONAR NOVO ÁLBUM NA GALERIA

Após cada evento, as fotos ficam disponíveis na página `galeria.html` para os clientes baixarem.

### 2.1 Padrão de nome da pasta

Cada evento tem sua própria pasta dentro de `assets/images/galeria/`  
O nome da pasta segue o formato: `DD-MM-AAAA`

**Exemplos:**
```
11-04-2026   ← evento de sexta, 11 de abril de 2026
12-04-2026   ← evento de sábado, 12 de abril de 2026
```

> ⚠️ **Atenção:** Uma noite = uma pasta. Se tiver evento na sexta E no sábado, são duas pastas separadas.

---

### 2.2 Padrão de nome das fotos

As fotos dentro da pasta devem ser numeradas sequencialmente com dois dígitos:

```
01.jpg
02.jpg
03.jpg
...
15.jpg
```

> ⚠️ A extensão deve ser `.jpg`. Sempre com zero à esquerda: `01`, `02`... não `1`, `2`.

---

### 2.3 Onde colocar as pastas

```
Site Door/
└── assets/
    └── images/
        └── galeria/
            ├── 04-04-2026/    ← já existe
            │   ├── 01.jpg
            │   ├── 02.jpg
            │   └── ...
            ├── 05-04-2026/    ← já existe
            │   ├── 01.jpg
            │   └── ...
            └── 11-04-2026/    ← NOVA PASTA
                ├── 01.jpg
                ├── 02.jpg
                └── ...
```

---

### 2.4 Registrar o novo evento no código

Abra o arquivo `js/galeria.js` e localize o trecho:

```javascript
const EVENTOS = [
  { folder: '04-04-2026', label: '04 · 04 · 2026', total: 5 },
  { folder: '05-04-2026', label: '05 · 04 · 2026', total: 7 },
  // Adicione novos eventos aqui ↓
];
```

**Adicione uma nova linha** para o evento novo. Exemplo:

```javascript
const EVENTOS = [
  { folder: '04-04-2026', label: '04 · 04 · 2026', total: 5  },
  { folder: '05-04-2026', label: '05 · 04 · 2026', total: 7  },
  { folder: '11-04-2026', label: '11 · 04 · 2026', total: 43 }, // ← novo
];
```

> O campo `total` deve ser o número exato de fotos na pasta.  
> Para contar: `ls assets/images/galeria/11-04-2026/ | wc -l`

---

### 2.5 Ordem dos eventos na galeria

Os eventos aparecem como botões na ordem em que estão no array.  
**O mais recente deve vir primeiro** para facilitar o acesso dos clientes:

```javascript
const EVENTOS = [
  { folder: '11-04-2026', label: '11 · 04 · 2026', total: 43 }, // ← mais recente primeiro
  { folder: '05-04-2026', label: '05 · 04 · 2026', total: 7  },
  { folder: '04-04-2026', label: '04 · 04 · 2026', total: 5  },
];
```

---

### 2.6 Salvar e publicar

```bash
cd "/home/ubuntu/Documents/Site Door"
git add .
git commit -m "galeria: adiciona fotos do evento DD/MM"
git push
```

---

---

## PARTE 3 — REMOVER O BOTÃO "PULAR" DO COUNTDOWN

Antes do lançamento oficial (01/04/2026), o botão "Entrar no site →" deve ser removido para que visitantes não pulem o countdown.

Abra `index.html` e localize:

```html
<button class="cd-skip" id="cdSkip">Entrar no site →</button>
```

Apague essa linha inteira e salve. Depois:

```bash
git add index.html
git commit -m "feat: remove botão skip do countdown para lançamento"
git push
```

---

## PARTE 4 — CHECKLIST SEMANAL COMPLETO

Use esta lista toda semana antes do fim de semana:

```
[ ] 1. Receber artes da agenda do designer
[ ] 2. Renomear arquivos para dd-mm.jpeg
[ ] 3. Copiar para assets/images/agenda/
[ ] 4. Abrir js/main.js e atualizar array AGENDA
[ ] 5. git add . && git commit -m "agenda: semana de DD/MM" && git push
[ ] 6. Conferir no site se as artes apareceram corretamente
```

Após cada evento:

```
[ ] 1. Receber fotos do fotógrafo
[ ] 2. Renomear para 01.jpg, 02.jpg, 03.jpg...
[ ] 3. Criar pasta assets/images/galeria/DD-MM-AAAA/
[ ] 4. Copiar fotos para a pasta
[ ] 5. Contar total de fotos
[ ] 6. Abrir js/galeria.js e adicionar novo evento no array EVENTOS
[ ] 7. git add . && git commit -m "galeria: evento DD/MM" && git push
[ ] 8. Conferir no site se as fotos aparecem e o download funciona
```

---

## DÚVIDAS FREQUENTES

**As artes não aparecem na agenda:**
- Confirme que o nome do arquivo é exatamente `dd-mm.jpeg` (extensão `.jpeg`)
- Confirme que o arquivo está em `assets/images/agenda/`
- Confirme que a entrada no array `AGENDA` do `main.js` tem o `file` correto (sem extensão)

**As fotos da galeria não aparecem:**
- Confirme que as fotos estão em `assets/images/galeria/DD-MM-AAAA/`
- Confirme que os arquivos se chamam `01.jpg`, `02.jpg` (com zero à esquerda, extensão `.jpg`)
- Confirme que o `total` no array `EVENTOS` bate com o número real de fotos

**O site não atualizou após o push:**
- Aguarde 1-2 minutos e atualize com `Ctrl+Shift+R`
- Se ainda não atualizou, verifique se o push foi bem sucedido com `git log --oneline -3`
