# Nuki — Animação da jornada (Planner · Personaliza · Inspetor)

Hero/seção animada em scroll para a landing page. Vanilla HTML/CSS/JS, sem build e sem dependências.

## Como rodar
- **Mais simples:** dê duplo clique em `index.html` (abre no navegador via `file://`).
- **Com live reload (recomendado no VS Code):** instale a extensão **Live Server** e clique em "Go Live". As animações de scroll ficam mais fiéis servidas por HTTP.

## Estrutura
- `index.html` — conteúdo (textos, módulos, imagens) + meta/SEO/Open Graph no `<head>`
- `styles.css` — estilos (paleta e tipografia oficiais da Nuki nas variáveis `:root`)
- `script.js` — animações (reveal/stagger, troca de imagem por beat, nav de progresso, count-up, parallax)
- `img/` — assets **otimizados** servidos: WebP 1x/2x + fallback PNG (já no tamanho de exibição), favicons e a imagem de compartilhamento `og-cover.png`

## Imagens
Já estão otimizadas e prontas para servir (~1,3MB no total): cada tela vem em **WebP (1x + 2x) com fallback PNG**, entregue via `<picture>` + `srcset/sizes`, no tamanho real de exibição. Convenção de larguras:
- frames desktop: `740` + `1480`
- frames de celular: `320` + `640`
- logo: `122` + `244`

Para **trocar uma tela**: gere o novo arquivo nessas larguras (WebP + um PNG 1x de fallback) — qualquer ferramenta serve (ex.: [squoosh.app](https://squoosh.app) ou `cwebp`/`sharp` localmente) — coloque em `img/` seguindo o padrão `nome-<largura>.webp/.png` e atualize o `src`/`srcset` do `<figure class="shot">` correspondente em `index.html`.

## O que editar
- **Imagens:** cada beat tem um `<figure class="shot">` com `<picture>` (WebP + fallback PNG e `srcset/sizes`). Veja a seção "Imagens" acima para trocar uma tela.
- **Números:** os destaques usam `data-target` (ex.: `60`, `100`, `10`, `95`). São **placeholders** — troque pelas métricas reais. Sufixo opcional via `data-suffix` (`%`, `x`).
- **Cores/fonte:** tudo nas variáveis CSS no topo de `styles.css` (`--verde`, `--laranja`, etc.). Não altere se quiser manter a identidade.
- **Ritmo das animações:** durações/easing em `styles.css` (`.reveal`, `.shot`) e velocidade do parallax no atributo `data-parallax` de cada `.bgnum` no `index.html`.
