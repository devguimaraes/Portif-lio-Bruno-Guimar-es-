// Constantes do portfólio Bruno Guimarães
import { useTranslations } from "next-intl";

// Função para obter informações pessoais traduzidas
export function getPersonalInfo(t: ReturnType<typeof useTranslations>) {
  return {
    name: "Bruno Guimarães",
    title: t('constants.personalInfo.title'),
    description: t('constants.personalInfo.description'),
    contact: {
      email: "devgmrs@gmail.com",
      phone: "(21) 96971-5247",
      location: "Rio de Janeiro, RJ",
    },
    social: {
      github: "https://github.com/devguimaraes",
      linkedin: "https://www.linkedin.com/in/bcguimaraes/",
      instagram: "https://www.instagram.com/brunoguimraes/",
    },
    experience: t('constants.personalInfo.experience'),
  } as const;
}

// Função para obter UVP traduzido
export function getUVP(t: ReturnType<typeof useTranslations>) {
  return t('constants.uvp');
}

// Função para obter métricas traduzidas
export function getMetrics(t: ReturnType<typeof useTranslations>) {
  return {
    projectsCompleted: t('constants.metrics.projectsCompleted'),
    averageROI: t('constants.metrics.averageROI'),
    satisfactionRate: t('constants.metrics.satisfactionRate'),
    averageLighthouse: t('constants.metrics.averageLighthouse'),
  } as const;
}

export const NAVIGATION_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/sobre", label: "Sobre" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/servicos", label: "Serviços" },
  { href: "/contato", label: "Contato" },
] as const;

// Função para obter tech stack traduzido
export function getTechStack(t: ReturnType<typeof useTranslations>) {
  return {
    frontend: t.raw('constants.techStack.frontend') as string[],
    wordpress: t.raw('constants.techStack.wordpress') as string[],
    backend: t.raw('constants.techStack.backend') as string[],
    databases: t.raw('constants.techStack.databases') as string[],
    marketing: t.raw('constants.techStack.marketing') as string[],
    hosting: t.raw('constants.techStack.hosting') as string[],
    tools: t.raw('constants.techStack.tools') as string[],
  } as const;
}

// Função para obter setores traduzidos
export function getSectors(t: ReturnType<typeof useTranslations>) {
  return t.raw('constants.sectors') as string[];
}
