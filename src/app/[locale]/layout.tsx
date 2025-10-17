import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import "../../styles/typing-effect.css";
import { MainLayout } from "@/components/layout";
import { StructuredData } from "@/components/seo/structured-data";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Configuração da fonte Inter
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Lista de locales suportados
const locales = ['pt', 'en'];

export const metadata: Metadata = {
  title: "Bruno Guimarães - Desenvolvedor Full Stack",
  description:
    "Desenvolvedor Full Stack especializado em React, Next.js, Node.js e WordPress. Criando soluções digitais inovadoras para empresas e startups.",
  keywords:
    "desenvolvedor, full stack, react, nextjs, nodejs, wordpress, freelancer, bruno guimarães, desenvolvimento web, aplicações web, ecommerce, sistemas web",
  authors: [{ name: "Bruno Guimarães" }],
  creator: "Bruno Guimarães",
  publisher: "Bruno Guimarães",
  metadataBase: new URL("https://brunoguimaraes.dev"),
  alternates: {
    canonical: "/",
  },
  // Configuração de ícones do site (favicon)
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 64x64", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://brunoguimaraes.dev",
    title: "Bruno Guimarães - Desenvolvedor Full Stack",
    description:
      "Desenvolvedor Full Stack especializado em React, Next.js, Node.js e WordPress. Criando soluções digitais inovadoras para empresas e startups.",
    siteName: "Bruno Guimarães Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bruno Guimarães - Desenvolvedor Full Stack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bruno Guimarães - Desenvolvedor Full Stack",
    description:
      "Desenvolvedor Full Stack especializado em React, Next.js, Node.js e WordPress.",
    images: ["/og-image.jpg"],
    creator: "@brunoguimaraes",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Substitua pelo código real
  },
  category: "technology",
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  // Aguarda a resolução dos parâmetros
  const { locale } = await params;
  
  // Valida se o locale é suportado
  if (!locales.includes(locale)) {
    notFound();
  }

  // Carrega as mensagens de tradução para o locale atual
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={inter.variable}>
      <head>
        <StructuredData />
      </head>
      <body className="antialiased font-sans">
        <NextIntlClientProvider messages={messages}>
          <MainLayout>{children}</MainLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}