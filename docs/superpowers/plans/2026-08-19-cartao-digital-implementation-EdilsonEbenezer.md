
# Cartão Digital (Stack Analytics) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and test the "Stack Analytics" single-page portfolio site for Edilson Coelho Moraes as a Next.js + Tailwind app, from empty repo to a production-buildable, fully tested site.

**Architecture:** A single Next.js App Router page (`app/page.tsx`) composes seven presentational sections (`Navbar`, `Hero`, `Skills`, `StoryCarousel`, `Portfolio`, `Contact`, `Footer`) plus a fixed `VideoBackground` layer, all reading their copy from one typed data module (`lib/site-data.ts`) so content stays consistent and testable in one place. No backend, no API routes — the site is fully static and deploys as-is to Vercel.

**Tech Stack:** Next.js (App Router, TypeScript), Tailwind CSS v4 (CSS-first `@theme` tokens, no `tailwind.config.js`), Vitest + React Testing Library + jsdom for tests, `react-icons` for the four contact/social glyphs (WhatsApp, e-mail, LinkedIn, GitHub).

**Spec:** [docs/superpowers/specs/2026-08-18-cartao-digital-design.md](../specs/2026-08-18-cartao-digital-design.md)

## Global Constraints

- Site is 100% em português — sem alternância de idioma (PT/EN).
- Sem backend, CMS ou API — site estático, pronto para deploy na Vercel sem configuração extra.
- Paleta: fundo grafite (`#0B0D10` base / `#12151A` cards), acento dourado (`#C9A24B` / `#D4AF6A`) — nada de verde.
- Título do Hero é exatamente `Full Stack Developer | Data Analytics` — sem selo de "anos de experiência" e sem a expressão "em formação" nesta seção (essas nuances só aparecem na seção Minha História).
- Vídeo de fundo (`vdieo.mp4` → servido como `/video/background.mp4`) fica fixo atrás de toda a página, com overlay escuro sólido a **opacidade 0.8**.
- CTA da seção Portfólio abre `https://porfifolio-theta.vercel.app` em nova aba (`target="_blank" rel="noopener noreferrer"`).
- WhatsApp em todos os pontos de contato usa exatamente `https://api.whatsapp.com/send?phone=5561993998764&text=.`.
- Layout mobile-first (a referência de design fornecida pelo usuário é um print de celular).
- Ícones de Python e PyAutoGUI não existem como arquivos soltos — são recortados de `bainer.png` (ver Task 2, coordenadas exatas já validadas visualmente).
- Logo é um recorte quadrado de `aguia.png` mascarado em círculo via CSS (`rounded-full`) no momento da renderização — não é pré-processado com canal alfa.

---

## File Structure

```
cartao-digital/
  app/
    layout.tsx          # <html>/<body>, fonte, metadata
    globals.css          # Tailwind v4 import + @theme tokens
    page.tsx              # composição final da home
    page.test.tsx
  components/
    VideoBackground.tsx
    VideoBackground.test.tsx
    Navbar.tsx
    Navbar.test.tsx
    Hero.tsx
    Hero.test.tsx
    Skills.tsx
    Skills.test.tsx
    StoryCarousel.tsx
    StoryCarousel.test.tsx
    Portfolio.tsx
    Portfolio.test.tsx
    Contact.tsx
    Contact.test.tsx
    Footer.tsx
    Footer.test.tsx
    SocialIcon.tsx
  lib/
    site-data.ts
    site-data.test.ts
  test/
    setup.test.tsx        # sanity check do pipeline de testes
    assets.test.ts         # confere se os arquivos públicos existem
  public/
    icons/                 # 14 ícones de tecnologia
    hero/                   # bainer.png, developer.png
    story/                   # 6 fotos da trajetória, numeradas
    video/background.mp4
    logo-aguia-square.png
  vitest.config.ts
  vitest.setup.ts
  postcss.config.mjs
  next.config.ts
  tsconfig.json
  package.json
  README.md
```

Cada seção da home é um componente próprio com um único id de âncora — mantém a Navbar, o teste de integração da página e o próprio conteúdo desacoplados: mudar o texto de uma seção nunca deveria exigir tocar nas outras.

---

### Task 1: Scaffold do projeto Next.js + Tailwind v4 + tooling de testes

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `.gitignore`
- Create: `app/layout.tsx`, `app/globals.css`, `app/page.tsx`
- Create: `vitest.config.ts`, `vitest.setup.ts`, `test/setup.test.tsx`

**Interfaces:**
- Produces: comando `npm test` (Vitest) e `npm run build` (Next.js) funcionando; alias de import `@/*` apontando para a raiz do projeto; classes utilitárias Tailwind `bg-graphite-950`, `bg-graphite-900`, `text-ink`, `text-ink-muted`, `bg-gold-500`, `text-gold-400`, `border-gold-500` (com suporte a modificador de opacidade `/NN`) disponíveis em qualquer componente.

- [ ] **Step 1: Inicializar o `package.json` e instalar dependências de runtime**

```bash
npm init -y
npm install next@latest react@latest react-dom@latest
```

- [ ] **Step 2: Instalar dependências de desenvolvimento (TypeScript, Tailwind v4, lint, testes)**

```bash
npm install -D typescript @types/node @types/react @types/react-dom \
  tailwindcss @tailwindcss/postcss \
  eslint eslint-config-next \
  vitest @vitejs/plugin-react jsdom \
  @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 3: Editar os scripts do `package.json`**

Abrir `package.json` e substituir o bloco `"scripts"` gerado pelo `npm init` por:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "test": "vitest run"
}
```

- [ ] **Step 4: Criar `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 5: Criar `next.config.ts` e `postcss.config.mjs`**

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

```js
// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

- [ ] **Step 6: Criar `.gitignore`**

```
/node_modules
/.next/
/out/
/coverage
.DS_Store
*.pem
npm-debug.log*
.env*.local
.vercel
*.tsbuildinfo
next-env.d.ts
```

- [ ] **Step 7: Criar o layout raiz e os tokens de tema (Tailwind v4, `@theme`)**

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Stack Analytics | Edilson Coelho Moraes",
  description:
    "Portfólio de Edilson Coelho Moraes — Full Stack Developer e Data Analytics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} font-sans bg-graphite-950 text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-graphite-950: #0b0d10;
  --color-graphite-900: #12151a;
  --color-gold-400: #d4af6a;
  --color-gold-500: #c9a24b;
  --color-ink: #f5f5f5;
  --color-ink-muted: #b8bcc4;
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}

body {
  background-color: var(--color-graphite-950);
  color: var(--color-ink);
}
```

```tsx
// app/page.tsx (será substituído por completo na Task 11)
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <p>Stack Analytics — em construção</p>
    </main>
  );
}
```

- [ ] **Step 8: Configurar o Vitest**

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
```

```ts
// vitest.setup.ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 9: Escrever um teste de sanidade do pipeline**

```tsx
// test/setup.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

function Sample() {
  return <p>ok</p>;
}

describe("testing pipeline", () => {
  it("renders and finds text via jsdom + React Testing Library", () => {
    render(<Sample />);
    expect(screen.getByText("ok")).toBeInTheDocument();
  });
});
```

- [ ] **Step 10: Rodar os testes**

Run: `npm test`
Expected: `test/setup.test.tsx` passa (1 passed), sem outros arquivos de teste ainda.

- [ ] **Step 11: Rodar o build de produção**

Run: `npm run build`
Expected: termina com `Compiled successfully` (confirma que o Next.js e o bloco `@theme` do Tailwind v4 compilam sem erro).

- [ ] **Step 12: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs .gitignore app vitest.config.ts vitest.setup.ts test
git commit -m "chore: scaffold Next.js + Tailwind v4 + Vitest tooling"
```

---

### Task 2: Preparar e organizar os assets em `/public`

**Files:**
- Create: `public/icons/*.png`, `public/hero/*.png`, `public/story/*.jpg|*.png`, `public/video/background.mp4`, `public/logo-aguia-square.png`
- Test: `test/assets.test.ts`

**Interfaces:**
- Consumes: arquivos de origem já existentes na raiz do projeto (`bainer.png`, `developer.png`, `aguia.png`, `vdieo.mp4`, `chef-prime.jpg`, `chef-acougue.jpg`, `bras.jpg`, `vig.jpg`, `dev-edilson.png`, `desenvolvedor.png`, e os ícones soltos `N8N.png`, `css.png`, `excel.png`, `html.png`, `js.png`, `nexts.png`, `nodejs.png`, `powerbi.png`, `react.png`, `sql.png`, `tailwind.png`, `claudecode.png`).
- Produces: os caminhos públicos exatos que `lib/site-data.ts` (Task 3) vai referenciar — `/icons/<nome>.png`, `/hero/bainer.png`, `/hero/developer.png`, `/story/01-chef-prime.jpg` … `/story/06-desenvolvedor.png`, `/video/background.mp4`, `/logo-aguia-square.png`.

- [ ] **Step 1: Criar as pastas públicas**

```bash
mkdir -p public/icons public/hero public/story public/video
```

- [ ] **Step 2: Copiar os ícones de tecnologia já existentes**

```bash
cp N8N.png css.png excel.png html.png js.png nexts.png nodejs.png powerbi.png react.png sql.png tailwind.png claudecode.png public/icons/
```

- [ ] **Step 3: Recortar os ícones de Python e PyAutoGUI a partir de `bainer.png`**

Coordenadas já validadas visualmente (recorte limpo, sem vazamento de ícones vizinhos):

```bash
ffmpeg -y -i bainer.png -vf "crop=138:148:1060:307" public/icons/python.png
ffmpeg -y -i bainer.png -vf "crop=185:150:1583:452" public/icons/pyautogui.png
```

- [ ] **Step 4: Copiar as imagens do Hero**

```bash
cp bainer.png developer.png public/hero/
```

- [ ] **Step 5: Copiar e renumerar as fotos da seção Minha História**

Ordem cronológica definida com o usuário (2018 até hoje):

```bash
cp chef-prime.jpg public/story/01-chef-prime.jpg
cp chef-acougue.jpg public/story/02-chef-acougue.jpg
cp bras.jpg public/story/03-bras.jpg
cp vig.jpg public/story/04-vig.jpg
cp dev-edilson.png public/story/05-dev-edilson.png
cp desenvolvedor.png public/story/06-desenvolvedor.png
```

- [ ] **Step 6: Recortar a logo circular a partir de `aguia.png`**

Recorte quadrado 430×430 centrado na cabeça da águia (já validado visualmente — enquadra cabeça e ombros sem sobras):

```bash
ffmpeg -y -i aguia.png -vf "crop=430:430:95:20" public/logo-aguia-square.png
```

- [ ] **Step 7: Copiar o vídeo de fundo**

```bash
cp vdieo.mp4 public/video/background.mp4
```

- [ ] **Step 8: Escrever o teste que confere a existência de cada asset público**

```ts
// test/assets.test.ts
import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";

const publicDir = path.resolve(__dirname, "../public");

const expectedFiles = [
  "icons/python.png",
  "icons/pyautogui.png",
  "icons/js.png",
  "icons/react.png",
  "icons/nodejs.png",
  "icons/html.png",
  "icons/css.png",
  "icons/tailwind.png",
  "icons/sql.png",
  "icons/powerbi.png",
  "icons/excel.png",
  "icons/N8N.png",
  "icons/claudecode.png",
  "icons/nexts.png",
  "hero/bainer.png",
  "hero/developer.png",
  "story/01-chef-prime.jpg",
  "story/02-chef-acougue.jpg",
  "story/03-bras.jpg",
  "story/04-vig.jpg",
  "story/05-dev-edilson.png",
  "story/06-desenvolvedor.png",
  "logo-aguia-square.png",
  "video/background.mp4",
];

describe("public assets", () => {
  it.each(expectedFiles)("has %s", (file) => {
    expect(existsSync(path.join(publicDir, file))).toBe(true);
  });
});
```

- [ ] **Step 9: Rodar os testes**

Run: `npm test`
Expected: todos os casos de `test/assets.test.ts` passam (24 arquivos confirmados), além do teste da Task 1 continuando a passar.

- [ ] **Step 10: Commit**

```bash
git add public test/assets.test.ts
git commit -m "feat: organize and crop static assets into /public"
```

---

### Task 3: Módulo central de conteúdo (`lib/site-data.ts`)

**Files:**
- Create: `lib/site-data.ts`
- Test: `lib/site-data.test.ts`

**Interfaces:**
- Consumes: caminhos públicos produzidos na Task 2.
- Produces (usado por todos os componentes das Tasks 4–11):
  - `type NavLink = { label: string; href: string }` e `navLinks: NavLink[]`
  - `type Skill = { name: string; icon: string }` e `skills: Skill[]`
  - `type StorySlide = { image: string; period: string; title: string; description: string }` e `storySlides: StorySlide[]`
  - `type SocialIconName = "whatsapp" | "email" | "linkedin" | "github"`
  - `type ContactLink = { label: string; href: string; icon: SocialIconName }` e `contactLinks: ContactLink[]`
  - `portfolioUrl: string`
  - `location: string`

- [ ] **Step 1: Escrever o teste do módulo de dados**

```ts
// lib/site-data.test.ts
import { describe, it, expect } from "vitest";
import {
  navLinks,
  skills,
  storySlides,
  contactLinks,
  portfolioUrl,
  location,
} from "./site-data";

describe("site-data", () => {
  it("has 5 nav links matching site sections in order", () => {
    expect(navLinks.map((l) => l.href)).toEqual([
      "#inicio",
      "#habilidades",
      "#historia",
      "#portfolio",
      "#contato",
    ]);
  });

  it("has 14 skills including Python, PyAutoGUI and Next.js", () => {
    expect(skills).toHaveLength(14);
    const names = skills.map((s) => s.name);
    expect(names).toContain("Python");
    expect(names).toContain("PyAutoGUI");
    expect(names).toContain("Next.js");
  });

  it("has 6 story slides in chronological order", () => {
    expect(storySlides).toHaveLength(6);
    expect(storySlides[0].image).toBe("/story/01-chef-prime.jpg");
    expect(storySlides[5].image).toBe("/story/06-desenvolvedor.png");
  });

  it("has the exact WhatsApp deep link", () => {
    const whatsapp = contactLinks.find((c) => c.icon === "whatsapp");
    expect(whatsapp?.href).toBe(
      "https://api.whatsapp.com/send?phone=5561993998764&text=."
    );
  });

  it("points the portfolio CTA at the external portfolio", () => {
    expect(portfolioUrl).toBe("https://porfifolio-theta.vercel.app");
  });

  it("has the correct location label", () => {
    expect(location).toBe("Brasília, DF");
  });
});
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npm test`
Expected: FAIL — `lib/site-data.ts` ainda não existe (`Cannot find module './site-data'`).

- [ ] **Step 3: Implementar `lib/site-data.ts`**

```ts
// lib/site-data.ts
export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Início", href: "#inicio" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Minha História", href: "#historia" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Contato", href: "#contato" },
];

export type Skill = {
  name: string;
  icon: string;
};

export const skills: Skill[] = [
  { name: "Python", icon: "/icons/python.png" },
  { name: "JavaScript", icon: "/icons/js.png" },
  { name: "React", icon: "/icons/react.png" },
  { name: "Node.js", icon: "/icons/nodejs.png" },
  { name: "HTML", icon: "/icons/html.png" },
  { name: "CSS", icon: "/icons/css.png" },
  { name: "Tailwind", icon: "/icons/tailwind.png" },
  { name: "SQL", icon: "/icons/sql.png" },
  { name: "Power BI", icon: "/icons/powerbi.png" },
  { name: "Excel", icon: "/icons/excel.png" },
  { name: "N8N", icon: "/icons/N8N.png" },
  { name: "PyAutoGUI", icon: "/icons/pyautogui.png" },
  { name: "Claude AI", icon: "/icons/claudecode.png" },
  { name: "Next.js", icon: "/icons/nexts.png" },
];

export type StorySlide = {
  image: string;
  period: string;
  title: string;
  description: string;
};

export const storySlides: StorySlide[] = [
  {
    image: "/story/01-chef-prime.jpg",
    period: "2018 – 2019",
    title: "Chegada em Brasília",
    description:
      "Recém-chegado à capital, comecei como açougueiro, aprendendo na prática o valor do trabalho duro.",
  },
  {
    image: "/story/02-chef-acougue.jpg",
    period: "Jun 2022 – Dez 2022",
    title: "Chefe de Açougue",
    description:
      "Assumi a gestão de equipe, estoque e operações na Alves e Barroso, desenvolvendo liderança.",
  },
  {
    image: "/story/03-bras.jpg",
    period: "Abr 2023 – Dez 2024",
    title: "Vigilante — Ipanema Segurança",
    description:
      "Migrei para a área de segurança privada, atuando na prevenção de riscos e gestão de ocorrências.",
  },
  {
    image: "/story/04-vig.jpg",
    period: "Dez 2024 – Atual",
    title: "Vigilante — Brasília Segurança S/A",
    description:
      "Atuo hoje na segurança patrimonial, controle de acesso e monitoramento, enquanto construo minha nova carreira.",
  },
  {
    image: "/story/05-dev-edilson.png",
    period: "Em transição",
    title: "Formação em Tecnologia",
    description:
      "Concluí Análise e Desenvolvimento de Sistemas e iniciei a pós-graduação em Data Analytics e IA Aplicada a Negócios.",
  },
  {
    image: "/story/06-desenvolvedor.png",
    period: "Hoje",
    title: "Full Stack Developer em transição de carreira",
    description:
      "Aplico Python, JavaScript, React, Node e IA no desenvolvimento de soluções, unindo disciplina e uma nova paixão.",
  },
];

export type SocialIconName = "whatsapp" | "email" | "linkedin" | "github";

export type ContactLink = {
  label: string;
  href: string;
  icon: SocialIconName;
};

export const contactLinks: ContactLink[] = [
  {
    label: "(61) 99399-8764",
    href: "https://api.whatsapp.com/send?phone=5561993998764&text=.",
    icon: "whatsapp",
  },
  {
    label: "contato@developeredilsonebenezer.com.br",
    href: "mailto:contato@developeredilsonebenezer.com.br",
    icon: "email",
  },
  {
    label: "linkedin.com/in/edilson-moraes-047128408",
    href: "https://www.linkedin.com/in/edilson-moraes-047128408",
    icon: "linkedin",
  },
  {
    label: "github.com/Edilson-5762",
    href: "https://github.com/Edilson-5762/",
    icon: "github",
  },
];

export const portfolioUrl = "https://porfifolio-theta.vercel.app";
export const location = "Brasília, DF";
```

- [ ] **Step 4: Rodar os testes e confirmar que passam**

Run: `npm test`
Expected: PASS em todos os testes de `lib/site-data.test.ts`.

- [ ] **Step 5: Commit**

```bash
git add lib
git commit -m "feat: add central site content data module"
```

---

### Task 4: `VideoBackground` (vídeo fixo + overlay a 0.8 de opacidade)

**Files:**
- Create: `components/VideoBackground.tsx`
- Test: `components/VideoBackground.test.tsx`

**Interfaces:**
- Consumes: `/video/background.mp4` (Task 2).
- Produces: `export function VideoBackground(): JSX.Element` — sem props, renderizado uma única vez em `app/page.tsx` (Task 11).

- [ ] **Step 1: Escrever o teste**

```tsx
// components/VideoBackground.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { VideoBackground } from "./VideoBackground";

describe("VideoBackground", () => {
  it("renders a looping muted autoplay background video", () => {
    const { container } = render(<VideoBackground />);
    const video = container.querySelector("video") as HTMLVideoElement;
    expect(video).not.toBeNull();
    expect(video.getAttribute("src")).toBe("/video/background.mp4");
    expect(video.autoplay).toBe(true);
    expect(video.loop).toBe(true);
    expect(video.muted).toBe(true);
  });

  it("renders an 80%-opacity dark overlay above the video", () => {
    render(<VideoBackground />);
    const overlay = screen.getByTestId("video-overlay");
    expect(overlay.className).toContain("bg-graphite-950/80");
  });
});
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npm test`
Expected: FAIL — `./VideoBackground` não existe.

- [ ] **Step 3: Implementar o componente**

```tsx
// components/VideoBackground.tsx
export function VideoBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video
        className="h-full w-full object-cover"
        src="/video/background.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div
        data-testid="video-overlay"
        className="absolute inset-0 bg-graphite-950/80"
      />
    </div>
  );
}
```

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/VideoBackground.tsx components/VideoBackground.test.tsx
git commit -m "feat: add fixed background video with 0.8 opacity overlay"
```

---

### Task 5: `Navbar` (logo circular + navegação por âncora + menu mobile)

**Files:**
- Create: `components/Navbar.tsx`
- Test: `components/Navbar.test.tsx`

**Interfaces:**
- Consumes: `navLinks` de `lib/site-data.ts` (Task 3); `/logo-aguia-square.png` (Task 2).
- Produces: `export function Navbar(): JSX.Element` — sem props.

- [ ] **Step 1: Escrever o teste**

```tsx
// components/Navbar.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "./Navbar";
import { navLinks } from "@/lib/site-data";

describe("Navbar", () => {
  it("shows the Stack Analytics logo and signature", () => {
    render(<Navbar />);
    expect(screen.getByAltText("Logo Stack Analytics")).toBeInTheDocument();
    expect(screen.getByText("Stack Analytics")).toBeInTheDocument();
    expect(screen.getByText("Edilson Ebenezer")).toBeInTheDocument();
  });

  it("renders every nav link with the right anchor", () => {
    render(<Navbar />);
    navLinks.forEach((link) => {
      const anchors = screen.getAllByRole("link", { name: link.label });
      expect(anchors[0]).toHaveAttribute("href", link.href);
    });
  });

  it("toggles the mobile menu on button click", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const toggle = screen.getByLabelText("Abrir menu");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });
});
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npm test`
Expected: FAIL — `./Navbar` não existe.

- [ ] **Step 3: Implementar o componente**

```tsx
// components/Navbar.tsx
"use client";

import { useState } from "react";
import { navLinks } from "@/lib/site-data";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-graphite-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src="/logo-aguia-square.png"
            alt="Logo Stack Analytics"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="leading-tight">
            <p className="font-semibold text-ink">Stack Analytics</p>
            <p className="text-xs text-ink-muted">Edilson Ebenezer</p>
          </div>
        </div>

        <nav className="hidden gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink hover:text-gold-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Abrir menu"
          aria-expanded={mobileOpen}
          className="text-ink md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-4 border-t border-white/10 px-4 py-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/Navbar.tsx components/Navbar.test.tsx
git commit -m "feat: add navbar with circular eagle logo and mobile menu"
```

---

### Task 6: `Hero` (banner, título, avatar, CTAs)

**Files:**
- Create: `components/Hero.tsx`
- Test: `components/Hero.test.tsx`

**Interfaces:**
- Consumes: `/hero/bainer.png`, `/hero/developer.png` (Task 2).
- Produces: `export function Hero(): JSX.Element` — sem props; `<section id="inicio">`.

- [ ] **Step 1: Escrever o teste**

```tsx
// components/Hero.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the exact title with no years-of-experience claim", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", {
        name: "Full Stack Developer | Data Analytics",
      })
    ).toBeInTheDocument();
    expect(screen.queryByText(/anos de experiência/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/em formação/i)).not.toBeInTheDocument();
  });

  it("shows the banner and the developer photo", () => {
    render(<Hero />);
    expect(
      screen.getByAltText("Banner Stack Analytics — Full Stack Developer")
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("Foto de Edilson Coelho Moraes")
    ).toBeInTheDocument();
  });

  it("links both CTAs to the right sections", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: "Meus projetos" })).toHaveAttribute(
      "href",
      "#portfolio"
    );
    expect(screen.getByRole("link", { name: "Fale comigo" })).toHaveAttribute(
      "href",
      "#contato"
    );
  });

  it("has a section id of inicio", () => {
    const { container } = render(<Hero />);
    expect(container.querySelector("#inicio")).not.toBeNull();
  });
});
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npm test`
Expected: FAIL — `./Hero` não existe.

- [ ] **Step 3: Implementar o componente**

```tsx
// components/Hero.tsx
export function Hero() {
  return (
    <section id="inicio" className="relative px-4 pb-16 pt-10">
      <div className="mx-auto max-w-6xl">
        <img
          src="/hero/bainer.png"
          alt="Banner Stack Analytics — Full Stack Developer"
          className="w-full rounded-2xl"
        />

        <div className="mt-10 grid items-center gap-8 md:grid-cols-[2fr_1fr]">
          <div>
            <p className="inline-block rounded-full border border-gold-500/40 px-3 py-1 text-xs text-gold-400">
              Disponível para novas oportunidades
            </p>
            <h1 className="mt-4 text-4xl font-bold text-ink md:text-5xl">
              Full Stack Developer | Data Analytics
            </h1>
            <p className="mt-2 text-ink-muted">Edilson Coelho Moraes</p>

            <ul className="mt-6 space-y-2 text-ink-muted">
              <li>Código limpo e performático</li>
              <li>Soluções web escaláveis</li>
              <li>Análise de dados orientada a negócio</li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#portfolio"
                className="rounded-full bg-gold-500 px-6 py-3 font-medium text-graphite-950"
              >
                Meus projetos
              </a>
              <a
                href="#contato"
                className="rounded-full border border-white/20 px-6 py-3 font-medium text-ink"
              >
                Fale comigo
              </a>
            </div>
          </div>

          <img
            src="/hero/developer.png"
            alt="Foto de Edilson Coelho Moraes"
            className="w-full max-w-xs justify-self-center rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/Hero.tsx components/Hero.test.tsx
git commit -m "feat: add hero section with banner, avatar and CTAs"
```

---

### Task 7: `Skills` (grid de ícone + nome)

**Files:**
- Create: `components/Skills.tsx`
- Test: `components/Skills.test.tsx`

**Interfaces:**
- Consumes: `skills` de `lib/site-data.ts` (Task 3).
- Produces: `export function Skills(): JSX.Element` — sem props; `<section id="habilidades">`.

- [ ] **Step 1: Escrever o teste**

```tsx
// components/Skills.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skills } from "./Skills";
import { skills } from "@/lib/site-data";

describe("Skills", () => {
  it("renders every skill name and icon", () => {
    render(<Skills />);
    skills.forEach((skill) => {
      expect(screen.getByAltText(skill.name)).toHaveAttribute(
        "src",
        skill.icon
      );
      expect(screen.getByText(skill.name)).toBeInTheDocument();
    });
  });

  it("has a section id of habilidades", () => {
    const { container } = render(<Skills />);
    expect(container.querySelector("#habilidades")).not.toBeNull();
  });
});
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npm test`
Expected: FAIL — `./Skills` não existe.

- [ ] **Step 3: Implementar o componente**

```tsx
// components/Skills.tsx
import { skills } from "@/lib/site-data";

export function Skills() {
  return (
    <section id="habilidades" className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-ink">
          Habilidades &amp; Tecnologias
        </h2>
        <p className="mt-2 text-ink-muted">Ferramentas que uso no dia a dia.</p>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-graphite-900 p-6"
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="h-12 w-12 object-contain"
              />
              <span className="text-sm text-ink">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/Skills.tsx components/Skills.test.tsx
git commit -m "feat: add skills grid with icon and name per technology"
```

---

### Task 8: `StoryCarousel` (carrossel "Minha História")

**Files:**
- Create: `components/StoryCarousel.tsx`
- Test: `components/StoryCarousel.test.tsx`

**Interfaces:**
- Consumes: `storySlides` de `lib/site-data.ts` (Task 3).
- Produces: `export function StoryCarousel(): JSX.Element` — sem props; `<section id="historia">`; estado interno (`index`) não é exposto a outros componentes.

- [ ] **Step 1: Escrever o teste**

```tsx
// components/StoryCarousel.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StoryCarousel } from "./StoryCarousel";
import { storySlides } from "@/lib/site-data";

describe("StoryCarousel", () => {
  it("starts on the first slide", () => {
    render(<StoryCarousel />);
    expect(screen.getByText(storySlides[0].title)).toBeInTheDocument();
  });

  it("advances to the next slide on click", async () => {
    const user = userEvent.setup();
    render(<StoryCarousel />);
    await user.click(screen.getByLabelText("Próximo slide"));
    expect(screen.getByText(storySlides[1].title)).toBeInTheDocument();
  });

  it("wraps from the last slide back to the first", async () => {
    const user = userEvent.setup();
    render(<StoryCarousel />);
    const next = screen.getByLabelText("Próximo slide");
    for (let i = 0; i < storySlides.length; i += 1) {
      await user.click(next);
    }
    expect(screen.getByText(storySlides[0].title)).toBeInTheDocument();
  });

  it("wraps backwards from the first slide to the last", async () => {
    const user = userEvent.setup();
    render(<StoryCarousel />);
    await user.click(screen.getByLabelText("Slide anterior"));
    expect(
      screen.getByText(storySlides[storySlides.length - 1].title)
    ).toBeInTheDocument();
  });

  it("jumps to a slide when its dot is clicked", async () => {
    const user = userEvent.setup();
    render(<StoryCarousel />);
    await user.click(screen.getByLabelText("Ir para slide 4"));
    expect(screen.getByText(storySlides[3].title)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npm test`
Expected: FAIL — `./StoryCarousel` não existe.

- [ ] **Step 3: Implementar o componente**

```tsx
// components/StoryCarousel.tsx
"use client";

import { useState } from "react";
import { storySlides } from "@/lib/site-data";

export function StoryCarousel() {
  const [index, setIndex] = useState(0);
  const slide = storySlides[index];

  function goNext() {
    setIndex((current) => (current + 1) % storySlides.length);
  }

  function goPrev() {
    setIndex((current) => (current - 1 + storySlides.length) % storySlides.length);
  }

  return (
    <section id="historia" className="px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-ink">Minha História</h2>
        <p className="mt-2 text-ink-muted">
          De açougueiro a vigilante, e agora em transição para desenvolvedor.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 md:items-center">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full rounded-2xl object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gold-400">{slide.period}</p>
            <h3 className="mt-1 text-2xl font-semibold text-ink">
              {slide.title}
            </h3>
            <p className="mt-3 text-ink-muted">{slide.description}</p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            type="button"
            aria-label="Slide anterior"
            onClick={goPrev}
            className="text-ink"
          >
            ←
          </button>

          <div className="flex gap-2">
            {storySlides.map((s, i) => (
              <button
                key={s.image}
                type="button"
                aria-label={`Ir para slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full ${
                  i === index ? "bg-gold-500" : "bg-white/20"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Próximo slide"
            onClick={goNext}
            className="text-ink"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/StoryCarousel.tsx components/StoryCarousel.test.tsx
git commit -m "feat: add career-journey carousel with wraparound navigation"
```

---

### Task 9: `Portfolio` (convite + CTA externo)

**Files:**
- Create: `components/Portfolio.tsx`
- Test: `components/Portfolio.test.tsx`

**Interfaces:**
- Consumes: `portfolioUrl` de `lib/site-data.ts` (Task 3).
- Produces: `export function Portfolio(): JSX.Element` — sem props; `<section id="portfolio">`.

- [ ] **Step 1: Escrever o teste**

```tsx
// components/Portfolio.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Portfolio } from "./Portfolio";
import { portfolioUrl } from "@/lib/site-data";

describe("Portfolio", () => {
  it("links the CTA to the external portfolio in a new tab", () => {
    render(<Portfolio />);
    const link = screen.getByRole("link", { name: "Ver meus projetos" });
    expect(link).toHaveAttribute("href", portfolioUrl);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("has a section id of portfolio", () => {
    const { container } = render(<Portfolio />);
    expect(container.querySelector("#portfolio")).not.toBeNull();
  });
});
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npm test`
Expected: FAIL — `./Portfolio` não existe.

- [ ] **Step 3: Implementar o componente**

```tsx
// components/Portfolio.tsx
import { portfolioUrl } from "@/lib/site-data";

export function Portfolio() {
  return (
    <section id="portfolio" className="px-4 py-16">
      <div className="mx-auto max-w-4xl rounded-2xl border border-gold-500/30 bg-graphite-900 p-10 text-center">
        <h2 className="text-3xl font-bold text-ink">Quer ver meus projetos?</h2>
        <p className="mt-3 text-ink-muted">
          Reuni meus projetos em um portfólio dedicado. Dá uma olhada no que
          venho construindo.
        </p>
        <a
          href={portfolioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-gold-500 px-8 py-3 font-medium text-graphite-950"
        >
          Ver meus projetos
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/Portfolio.tsx components/Portfolio.test.tsx
git commit -m "feat: add portfolio invite section linking to external portfolio"
```

---

### Task 10: `SocialIcon`, `Contact` e `Footer` (canais de contato + WhatsApp no rodapé)

**Files:**
- Create: `components/SocialIcon.tsx`, `components/Contact.tsx`, `components/Footer.tsx`
- Test: `components/Contact.test.tsx`, `components/Footer.test.tsx`

**Interfaces:**
- Consumes: `contactLinks`, `location`, `SocialIconName` de `lib/site-data.ts` (Task 3).
- Produces: `export function SocialIcon({ name, className }: { name: SocialIconName; className?: string }): JSX.Element`; `export function Contact(): JSX.Element` (`<section id="contato">`); `export function Footer(): JSX.Element`.

- [ ] **Step 1: Instalar `react-icons`**

```bash
npm install react-icons
```

- [ ] **Step 2: Escrever os testes**

```tsx
// components/Contact.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Contact } from "./Contact";
import { contactLinks, location } from "@/lib/site-data";

describe("Contact", () => {
  it("renders every contact channel with its exact link", () => {
    render(<Contact />);
    contactLinks.forEach((contact) => {
      const textNode = screen.getByText(contact.label);
      const anchor = textNode.closest("a");
      expect(anchor).toHaveAttribute("href", contact.href);
    });
  });

  it("shows the location", () => {
    render(<Contact />);
    expect(screen.getByText(location)).toBeInTheDocument();
  });

  it("has a section id of contato", () => {
    const { container } = render(<Contact />);
    expect(container.querySelector("#contato")).not.toBeNull();
  });
});
```

```tsx
// components/Footer.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";
import { contactLinks } from "@/lib/site-data";

describe("Footer", () => {
  it("shows a WhatsApp link pointing at the user's WhatsApp", () => {
    render(<Footer />);
    const whatsapp = contactLinks.find((c) => c.icon === "whatsapp");
    const link = screen.getByLabelText("Fale comigo no WhatsApp");
    expect(link).toHaveAttribute("href", whatsapp?.href);
    expect(link).toHaveAttribute("target", "_blank");
  });
});
```

- [ ] **Step 3: Rodar os testes e confirmar que falham**

Run: `npm test`
Expected: FAIL — `./Contact` e `./Footer` ainda não existem.

- [ ] **Step 4: Implementar `SocialIcon`**

```tsx
// components/SocialIcon.tsx
import { FaWhatsapp, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import type { SocialIconName } from "@/lib/site-data";

const icons: Record<SocialIconName, typeof FaWhatsapp> = {
  whatsapp: FaWhatsapp,
  email: FaEnvelope,
  linkedin: FaLinkedin,
  github: FaGithub,
};

export function SocialIcon({
  name,
  className,
}: {
  name: SocialIconName;
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden="true" />;
}
```

- [ ] **Step 5: Implementar `Contact`**

```tsx
// components/Contact.tsx
import { contactLinks, location } from "@/lib/site-data";
import { SocialIcon } from "./SocialIcon";

export function Contact() {
  return (
    <section id="contato" className="px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold text-ink">Contato</h2>
        <p className="mt-2 text-ink-muted">{location}</p>

        <ul className="mt-8 space-y-4">
          {contactLinks.map((contact) => (
            <li key={contact.href}>
              <a
                href={contact.href}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-graphite-900 p-4 text-ink hover:border-gold-500/50"
              >
                <SocialIcon name={contact.icon} className="h-5 w-5 text-gold-400" />
                {contact.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Implementar `Footer`**

```tsx
// components/Footer.tsx
import { contactLinks } from "@/lib/site-data";
import { SocialIcon } from "./SocialIcon";

export function Footer() {
  const whatsapp = contactLinks.find((contact) => contact.icon === "whatsapp");

  return (
    <footer className="border-t border-white/10 px-4 py-10 text-center">
      {whatsapp && (
        <a
          href={whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Fale comigo no WhatsApp"
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold-500 text-graphite-950"
        >
          <SocialIcon name="whatsapp" className="h-7 w-7" />
        </a>
      )}

      <p className="mt-4 text-sm text-ink-muted">
        © {new Date().getFullYear()} Stack Analytics — Edilson Ebenezer
      </p>
    </footer>
  );
}
```

- [ ] **Step 7: Rodar os testes e confirmar que passam**

Run: `npm test`
Expected: PASS em `Contact.test.tsx` e `Footer.test.tsx`.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json components/SocialIcon.tsx components/Contact.tsx components/Footer.tsx components/Contact.test.tsx components/Footer.test.tsx
git commit -m "feat: add contact section and footer with WhatsApp CTA"
```

---

### Task 11: Montar a home (`app/page.tsx`)

**Files:**
- Modify: `app/page.tsx`
- Create: `app/page.test.tsx`

**Interfaces:**
- Consumes: `VideoBackground`, `Navbar`, `Hero`, `Skills`, `StoryCarousel`, `Portfolio`, `Contact`, `Footer` (Tasks 4–10).
- Produces: `export default function Home(): JSX.Element` — a página completa renderizada em `/`.

- [ ] **Step 1: Escrever o teste de integração da página**

```tsx
// app/page.test.tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Home from "./page";

describe("Home page", () => {
  it("renders every section with the anchor ids the navbar links to", () => {
    const { container } = render(<Home />);
    ["#inicio", "#habilidades", "#historia", "#portfolio", "#contato"].forEach(
      (id) => {
        expect(container.querySelector(id)).not.toBeNull();
      }
    );
  });

  it("renders exactly one background video", () => {
    const { container } = render(<Home />);
    expect(container.querySelectorAll("video")).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npm test`
Expected: FAIL — `app/page.tsx` ainda renderiza só o placeholder "em construção", sem os ids de seção nem o vídeo.

- [ ] **Step 3: Substituir `app/page.tsx` pela composição final**

```tsx
// app/page.tsx
import { VideoBackground } from "@/components/VideoBackground";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { StoryCarousel } from "@/components/StoryCarousel";
import { Portfolio } from "@/components/Portfolio";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <VideoBackground />
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <StoryCarousel />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Rodar os testes e confirmar que passam**

Run: `npm test`
Expected: PASS em toda a suíte.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/page.test.tsx
git commit -m "feat: compose full home page from all sections"
```

---

### Task 12: Verificação final, README e commit de fechamento

**Files:**
- Create: `README.md`

**Interfaces:**
- Consumes: todo o projeto (Tasks 1–11).
- Produces: build de produção verificado; instruções de uso documentadas.

- [ ] **Step 1: Rodar a suíte completa de testes**

Run: `npm test`
Expected: todos os testes de `test/`, `lib/`, `components/` e `app/` passam.

- [ ] **Step 2: Rodar o build de produção**

Run: `npm run build`
Expected: termina com `Compiled successfully`, sem erros de tipo ou de lint bloqueantes.

- [ ] **Step 3: Escrever o README**

```markdown
# Stack Analytics — Cartão Digital

Portfólio pessoal de Edilson Coelho Moraes (Stack Analytics), construído
como página única em Next.js + Tailwind CSS.

## Rodando localmente

\`\`\`bash
npm install
npm run dev
\`\`\`

Abra http://localhost:3000.

## Testes

\`\`\`bash
npm test
\`\`\`

## Build de produção

\`\`\`bash
npm run build
npm run start
\`\`\`

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Vitest + React Testing Library

## Spec

Ver [docs/superpowers/specs/2026-08-18-cartao-digital-design.md](docs/superpowers/specs/2026-08-18-cartao-digital-design.md).
```

- [ ] **Step 4: Verificação manual no navegador**

Run: `npm run dev`
Abrir `http://localhost:3000` e conferir manualmente:
- O vídeo de fundo aparece atrás de todas as seções, escurecido pelo overlay.
- A navbar rola com âncoras funcionando para as 5 seções.
- Em largura de celular (~375px), o menu vira o botão hambúrguer e o hero empilha o avatar abaixo do texto.
- O carrossel "Minha História" avança/retrocede pelas 6 fotos na ordem correta.
- O botão "Ver meus projetos" abre `porfifolio-theta.vercel.app` em nova aba.
- O ícone de WhatsApp no rodapé abre uma conversa com o número correto.

- [ ] **Step 5: Commit final**

```bash
git add README.md
git commit -m "docs: add project README"
```

**Nota:** não dar `git push` neste momento — o usuário pediu explicitamente para testar o site localmente antes do push para `origin` (`https://github.com/Edilson-5762/cartao-digital.git`). O push é um passo manual, feito só quando o usuário confirmar.
