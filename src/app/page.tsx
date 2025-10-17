import { redirect } from 'next/navigation';

// Página raiz que redireciona para o locale padrão
export default function RootPage() {
  redirect('/pt');
}