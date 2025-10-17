// Layout raiz - apenas define estrutura básica HTML
// O conteúdo real é gerenciado pelo layout do locale

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
