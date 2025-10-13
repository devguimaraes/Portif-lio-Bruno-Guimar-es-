// Tipos principais do portfólio Bruno Guimarães

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: ProjectCategory;
  sector: string;
  url?: string;
  githubUrl?: string;
  imageUrl: string;
  results: ProjectResult[];
  featured: boolean;
  completedAt: string;
}

export interface ProjectResult {
  metric: string;
  value: string;
  description: string;
}

export type ProjectCategory =
  | "react"
  | "wordpress"
  | "ecommerce"
  | "institutional"
  | "application";

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  duration: string;
  category: ServiceCategory;
  popular?: boolean;
  fullService?: boolean;
}

export type ServiceCategory =
  | "development"
  | "seo"
  | "maintenance"
  | "migration"
  | "consulting";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  imageUrl?: string;
  projectId?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget: string;
  message: string;
}

export interface Skill {
  name: string;
  category: SkillCategory;
  level: number;
  icon?: string;
}

export type SkillCategory =
  | "frontend"
  | "backend"
  | "wordpress"
  | "marketing"
  | "tools"
  | "hosting";
