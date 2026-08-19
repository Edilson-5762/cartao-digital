# Cartão Digital — Portfólio de Edilson Coelho Moraes

**Data:** 2026-08-18
**Status:** Aprovado para implementação

## Visão geral

Site pessoal (cartão digital / portfólio) em página única com navegação por âncora, para apresentar Edilson Coelho Moraes como Full Stack Developer com atuação também em Data Analytics. O site conta sua transição de carreira (de açougueiro e vigilante para desenvolvedor), exibe suas tecnologias, direciona para o portfólio de projetos já existente e concentra os canais de contato.

Marca do site: **Stack Analytics** (assinatura: Edilson Ebenezer), com logo baseada em recorte circular da imagem `aguia.png`.

## Stack técnica

- **Framework:** Next.js (App Router) + TypeScript
- **Estilo:** Tailwind CSS
- **Deploy alvo:** Vercel, site 100% estático (sem backend/API)
- **Imagens:** `next/image` para otimização automática
- **Responsividade:** mobile-first (a referência de layout fornecida é um print de celular)

## Identidade visual

- **Base:** grafite/chumbo quase preto (`#0B0D10` fundo geral, `#12151A` para cards/seções), sem uso de verde.
- **Acento:** dourado âmbar (`#C9A24B` / `#D4AF6A`), usado em CTAs, ícones ativos, bordas de destaque e detalhes da logo.
- **Texto:** branco (`#F5F5F5`) para títulos, cinza-claro (`#B8BCC4`) para texto secundário.
- **Tipografia:** sans-serif moderna (ex: Inter ou Geist, já nativa em projetos Next.js), pesos fortes em títulos.
- **Logo:** `aguia.png` recortada e mascarada em círculo (estilo brasão) + wordmark "Stack Analytics" / assinatura "Edilson Ebenezer" — posicionada no canto superior esquerdo da navbar fixa.

## Fundo em vídeo (global)

- Vídeo `vdieo.mp4` (1920x1080, ~9s) em loop, mudo, autoplay, `position: fixed`, atrás de todo o conteúdo da página (single-page, então "todas as páginas" = a página inteira).
- Camada de overlay escura sólida (tom da paleta base) sobreposta ao vídeo com **opacidade 0.8**, garantindo que o vídeo fique como textura de fundo sutil e o texto permaneça legível em qualquer seção.
- Implementado como componente próprio (`VideoBackground`) fora do fluxo de scroll normal, para não impactar performance de rolagem.

## Estrutura da página e seções

### Navbar (fixa, sticky no topo)
- Logo (águia circular + "Stack Analytics" / "Edilson Ebenezer") à esquerda.
- Links de âncora à direita: Início, Habilidades, Minha História, Portfólio, Contato.
- Sem seletor de idioma (site somente em português).

### 1. Início (Hero)
- Banner `bainer.png` adaptado no topo da seção, logo abaixo da navbar, mantendo proporção/composição da imagem de referência fornecida pelo usuário.
- Título: **"Full Stack Developer | Data Analytics"**.
- Sem selo de "anos de experiência" e sem a expressão "em formação" nesta seção (essas nuances ficam reservadas à seção Minha História).
- Foto `developer.png` usada como avatar ao lado do texto (posição equivalente ao avatar ilustrado da imagem de referência).
- Bullets de proposta de valor (ex.: "Código limpo e performático", "Soluções web escaláveis", "Análise de dados orientada a negócio") — sem menção a tempo de experiência.
- Botões: "Meus projetos" (âncora para #portfolio) e "Fale comigo" (âncora para #contato, onde todos os canais estão reunidos).

### 2. Habilidades
- Grid de cards, cada um com ícone + nome da tecnologia.
- Tecnologias: Python, JavaScript, React, Node.js, HTML, CSS, Tailwind, SQL, Power BI, Excel, N8N, PyAutoGUI, Claude AI, Next.js.
- Ícones de Python e PyAutoGUI recortados de `bainer.png` (alta resolução) e salvos como PNGs individuais, no mesmo estilo visual dos demais ícones já fornecidos em `/assets`.
- Ícone do Next.js incluído conforme solicitado (arquivo `nexts.png`), mesmo não estando listado no currículo — sinaliza a tecnologia usada para construir o próprio site.

### 3. Minha História (carrossel)
Componente de carrossel (setas de navegação + suporte a swipe/touch, sem biblioteca pesada) contando a trajetória profissional em 6 etapas, cada uma com foto, ano/período aproximado e um texto curto:

1. **chef-prime.jpg** — 2018/2019, chegada em Brasília, início como açougueiro.
2. **chef-acougue.jpg** — Jun/2022–Dez/2022, chefe de açougue (Alves e Barroso), gestão de equipe e estoque.
3. **bras.jpg** — Abr/2023–Dez/2024, vigilante na Ipanema Segurança.
4. **vig.jpg** — Dez/2024–atual, vigilante na Brasília Segurança S/A.
5. **dev-edilson.png** — momento de transição de carreira: graduado em ADS, cursando pós em Data Analytics e IA Aplicada a Negócios.
6. **desenvolvedor.png** — momento atual como desenvolvedor full stack em transição.

### 4. Portfólio
- Seção com mensagem convidando o visitante a conhecer os projetos.
- CTA que abre `https://porfifolio-theta.vercel.app` em nova aba (`target="_blank"`, `rel="noopener noreferrer"`).

### 5. Contato
Informações extraídas do currículo, todas com links clicáveis:
- Telefone/WhatsApp: (61) 99399-8764 → `https://api.whatsapp.com/send?phone=5561993998764&text=.`
- E-mail: `contato@developeredilsonebenezer.com.br` (link `mailto:`)
- LinkedIn: `https://www.linkedin.com/in/edilson-moraes-047128408`
- GitHub: `https://github.com/Edilson-5762/`
- Localização: Brasília, DF (texto, sem link)

### Rodapé
- Ícone do WhatsApp (SVG inline) linkando para o WhatsApp do usuário, conforme pedido explícito na seção Início/rodapé.
- Ícones adicionais de LinkedIn, GitHub e e-mail (SVG inline, sem necessidade de arquivo de imagem).

## Organização de assets

- `/public/icons/` — ícones de tecnologia (os já existentes em `/assets`, mais Python e PyAutoGUI recortados de `bainer.png`, mais `nexts.png`).
- `/public/story/` — as 6 fotos da seção Minha História.
- `/public/hero/` — `bainer.png` e `developer.png`.
- `/public/logo-aguia.png` — águia recortada/mascarada em círculo.
- `/public/video/vdieo.mp4` — vídeo de fundo.

## Fora de escopo

- Sem alternância de idioma (PT/EN) — site somente em português.
- Sem backend, CMS ou formulário de contato com envio server-side (contato é só via links diretos).
- Sem página de projetos detalhada dentro deste site — projetos ficam no portfólio externo já existente.
