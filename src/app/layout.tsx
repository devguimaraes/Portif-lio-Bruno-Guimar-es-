import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/layout";
import { StructuredData } from "@/components/seo/structured-data";

// Configuração da fonte Inter
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Bruno Guimarães - Desenvolvedor Full Stack",
  description: "Desenvolvedor Full Stack especializado em React, Next.js, Node.js e WordPress. Criando soluções digitais inovadoras para empresas e startups.",
  keywords: "desenvolvedor, full stack, react, nextjs, nodejs, wordpress, freelancer, bruno guimarães, desenvolvimento web, aplicações web, ecommerce, sistemas web",
  authors: [{ name: "Bruno Guimarães" }],
  creator: "Bruno Guimarães",
  publisher: "Bruno Guimarães",
  metadataBase: new URL("https://brunoguimaraes.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://brunoguimaraes.dev",
    title: "Bruno Guimarães - Desenvolvedor Full Stack",
    description: "Desenvolvedor Full Stack especializado em React, Next.js, Node.js e WordPress. Criando soluções digitais inovadoras para empresas e startups.",
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
    description: "Desenvolvedor Full Stack especializado em React, Next.js, Node.js e WordPress.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={inter.variable}>
      <head>
        <StructuredData />
      </head>
      <body className="antialiased font-sans">
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
