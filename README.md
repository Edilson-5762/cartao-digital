# Cartão Digital — Edilson Moraes

Portfólio pessoal (cartão de visitas digital) de **Edilson Moraes**, desenvolvedor Full Stack em transição de carreira, especializando-se em Data Analytics e IA aplicada a negócios.

🔗 **Site no ar:** [cartaodigital.developeredilsonebenezer.com.br](https://cartaodigital.developeredilsonebenezer.com.br)

---

## Objetivo

Este projeto é o meu cartão de visitas digital. O objetivo é duplo:

1. **Contar minha história** — de açougueiro, passando por vigilância patrimonial, até a formação em Análise e Desenvolvimento de Sistemas e a transição para desenvolvimento de software e análise de dados. A seção "Minha História" apresenta essa trajetória em ordem cronológica.
2. **Abrir portas com recrutadores e empresas** — reunindo em um só lugar minhas habilidades técnicas, projetos de portfólio e canais de contato direto (WhatsApp, e-mail, LinkedIn, GitHub), para facilitar a avaliação técnica e o primeiro contato.

## Sobre o projeto

Site institucional de página única (single page), com:

- **Hero** — nome, título profissional e disponibilidade para novas oportunidades.
- **Habilidades** — grade de tecnologias dominadas (linguagens, frameworks, ferramentas de dados e automação).
- **Minha História** — carrossel com a linha do tempo da carreira.
- **Portfólio** — link para o portfólio de projetos completo.
- **Contato** — WhatsApp, e-mail, LinkedIn e GitHub.

## Tecnologias usadas

| Categoria | Stack |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack, `output: "export"`) |
| Linguagem | TypeScript |
| UI | React 19, Tailwind CSS v4 |
| Ícones | react-icons |
| Testes | Vitest + React Testing Library + jsdom |
| Lint | ESLint (flat config, `eslint-config-next`) |
| CI/CD | GitHub Actions |
| Hospedagem | Hostinger (deploy estático via Git) |

## Estrutura do projeto

```
app/            # App Router — layout raiz e página única
components/     # Seções da página (Hero, Skills, StoryCarousel, Portfolio, Contact, Footer, Navbar...)
lib/            # Dados do site (links, skills, timeline, contatos) centralizados em site-data.ts
public/         # Imagens, ícones e vídeo servidos estaticamente
test/           # Setup e testes globais (Vitest)
docs/           # Spec e plano de implementação do projeto
.github/workflows/  # Pipeline de build e deploy automático
```

Cada componente de seção tem seu teste correspondente (`Componente.test.tsx`) ao lado do código.

## Como rodar localmente

Pré-requisitos: Node.js 20+ e npm.

```bash
git clone https://github.com/Edilson-5762/cartao-digital.git
cd cartao-digital
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Testes

```bash
npm test
```

Executa a suíte completa com Vitest (componentes, dados do site e setup) em ambiente jsdom.

## Lint

```bash
npm run lint
```

## Build de produção

```bash
npm run build
```

Como o `next.config.ts` define `output: "export"`, o build gera uma pasta `out/` com HTML/CSS/JS totalmente estáticos — sem necessidade de servidor Node em produção, compatível com qualquer hospedagem estática (incluindo hospedagem compartilhada/PHP).

## CI/CD — Deploy automático

O deploy é 100% automatizado via GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)):

1. Todo push na branch `main` dispara o workflow.
2. O workflow instala as dependências (`npm ci`) e roda `npm run build`.
3. O conteúdo estático gerado (`out/`) é publicado (force-push) na branch `deploy`.
4. A Hostinger está conectada à branch `deploy` (diretório `public_html`) e publica automaticamente a cada atualização — nenhum passo manual é necessário para colocar uma mudança no ar.

Fluxo de branches:

- **`main`** — código-fonte, é a branch de trabalho/produção do repositório.
- **`deploy`** — branch gerada automaticamente pelo pipeline (não deve ser editada manualmente; qualquer commit direto nela é sobrescrito no próximo deploy).

## Segurança

- **Site 100% estático**: não há backend, banco de dados ou processamento de formulários no servidor — elimina classes inteiras de vulnerabilidades (SQL injection, RCE, exposição de credenciais de servidor).
- **Sem segredos no repositório**: nenhuma variável de ambiente ou credencial é usada pelo site; `.env*.local` está no `.gitignore` por padrão.
- **Contato sem exposição de dados**: os links de contato usam `mailto:` e a API pública do WhatsApp (`wa.me`/`api.whatsapp.com`), sem coleta ou armazenamento de dados de visitantes.
- **Integração GitHub → Hostinger com escopo mínimo**: o GitHub App da Hostinger foi autorizado apenas para este repositório (`cartao-digital`), não para todos os repositórios da conta.
- **Permissões mínimas no CI**: o workflow do GitHub Actions declara `permissions: contents: write` apenas (sem acesso a issues, packages ou outros escopos), restrito ao necessário para publicar a branch `deploy`.
- **Dependências**: gerenciadas via `package-lock.json` (instalação determinística com `npm ci` no CI).

## Governança

- **Branch principal**: `main` é a fonte da verdade; alterações no site partem dela.
- **Convenção de commits**: mensagens no padrão `feat:`, `fix:`, `docs:`, `chore:` descrevendo a mudança.
- **Documentação viva**: spec de design e plano de implementação versionados em [docs/superpowers/](docs/superpowers/), mantendo o histórico de decisões do projeto.
- **Qualidade**: cada componente novo deve vir acompanhado de teste (Vitest + Testing Library) e passar no lint antes de ir para `main`.
- **Deploy**: nunca manual — sempre via pipeline (`main` → Actions → `deploy` → Hostinger), garantindo que o que está em produção é sempre rastreável a um commit específico.

## Contato

- **WhatsApp**: [(61) 99399-8764](https://api.whatsapp.com/send?phone=5561993998764&text=.)
- **E-mail**: [contato@developeredilsonebenezer.com.br](mailto:contato@developeredilsonebenezer.com.br)
- **LinkedIn**: [linkedin.com/in/edilson-moraes-047128408](https://www.linkedin.com/in/edilson-moraes-047128408)
- **GitHub**: [github.com/Edilson-5762](https://github.com/Edilson-5762/)
- **Portfólio de projetos**: [porfifolio-theta.vercel.app](https://porfifolio-theta.vercel.app)
