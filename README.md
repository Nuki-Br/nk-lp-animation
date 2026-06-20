# Nuki — Animação da jornada (Planner · Personaliza · Inspetor)

Hero/seção animada em scroll para a landing page. Vanilla HTML/CSS/JS, sem build e sem dependências.

## Como rodar
- **Mais simples:** dê duplo clique em `index.html` (abre no navegador via `file://`).
- **Com live reload (recomendado no VS Code):** instale a extensão **Live Server** e clique em "Go Live". As animações de scroll ficam mais fiéis servidas por HTTP.

## Estrutura
- `index.html` — conteúdo (textos, módulos, slots de imagem)
- `styles.css` — estilos (paleta e tipografia oficiais da Nuki nas variáveis `:root`)
- `script.js` — animações (reveal/stagger, troca de frames, nav de progresso, count-up, parallax)

## O que editar
- **Imagens:** cada módulo tem 3 frames. Troque cada `<div class="frame">…</div>` por uma imagem:
  ```html
  <div class="frame" data-frame="0"><img src="img/planner-memorial.jpg" alt="Planner — memorial"></div>
  ```
  O `object-fit: cover` já está pronto. Sugestão: criar uma pasta `img/`.
- **Números:** os destaques usam `data-target` (ex.: `60`, `100`, `10`, `95`). São **placeholders** — troque pelas métricas reais. Sufixo opcional via `data-suffix` (`%`, `x`).
- **Cores/fonte:** tudo nas variáveis CSS no topo de `styles.css` (`--verde`, `--laranja`, etc.). Não altere se quiser manter a identidade.
- **Ritmo das animações:** durações/easing em `styles.css` (`.reveal`, `.frame`) e velocidade do parallax no atributo `data-parallax` de cada `.bgnum` no `index.html`.
