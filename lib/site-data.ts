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
  images: string[];
  period: string;
  title: string;
  description: string;
};

export const storySlides: StorySlide[] = [
  {
    images: ["/story/01-chef-prime.jpg"],
    period: "2018 – 2019",
    title: "Chegada em Brasília",
    description:
      "Recém-chegado à capital, comecei como açougueiro, aprendendo na prática o valor do trabalho duro.",
  },
  {
    images: ["/story/02-chef-acougue.jpg"],
    period: "Jun 2022 – Dez 2022",
    title: "Chefe de Açougue",
    description:
      "Assumi a gestão de equipe, estoque e operações na Alves e Barroso, desenvolvendo liderança.",
  },
  {
    images: ["/story/ipanema.jpg"],
    period: "Abr 2023 – Dez 2024",
    title: "Vigilante — Ipanema Segurança",
    description:
      "Migrei para a área de segurança privada, atuando na prevenção de riscos e gestão de ocorrências.",
  },
  {
    images: ["/story/03-bras.jpg", "/story/04-vig.jpg"],
    period: "Dez 2024 – Atual",
    title: "Vigilante — Brasília Segurança S/A",
    description:
      "Atuo hoje na segurança patrimonial, controle de acesso e monitoramento, enquanto construo minha nova carreira.",
  },
  {
    images: ["/story/05-dev-edilson.png"],
    period: "Em transição",
    title: "Formação em Tecnologia",
    description:
      "Concluí Análise e Desenvolvimento de Sistemas e iniciei a pós-graduação em Data Analytics e IA Aplicada a Negócios.",
  },
  {
    images: ["/story/06-desenvolvedor.png"],
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
