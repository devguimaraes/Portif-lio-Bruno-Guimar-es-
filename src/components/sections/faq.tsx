"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HelpCircle,
  Clock,
  CreditCard,
  Globe,
  Wrench,
  MessageCircle,
} from "lucide-react";

// Perguntas frequentes organizadas por categoria
const faqCategories = [
  {
    title: "Projetos e Prazos",
    icon: Clock,
    questions: [
      {
        question: "Qual o prazo médio de entrega?",
        answer:
          "Varia de 7 a 45 dias dependendo da complexidade do projeto. Sites simples ficam prontos em 1-2 semanas, aplicações web complexas podem levar 4-6 semanas.",
      },
      {
        question: "Como é definido o cronograma do projeto?",
        answer:
          "Após o briefing inicial, criamos um cronograma detalhado com marcos e entregas. Você acompanha o progresso através de reuniões semanais e acesso ao repositório.",
      },
      {
        question: "É possível acelerar a entrega?",
        answer:
          "Sim, oferecemos opção de entrega expressa com custo adicional de 30-50%. Ideal para projetos com urgência comercial.",
      },
    ],
  },
  {
    title: "Pagamento e Orçamento",
    icon: CreditCard,
    questions: [
      {
        question: "Como funciona o pagamento?",
        answer:
          "Trabalhamos com 50% no início e 50% na entrega. Para projetos maiores (acima de R$ 10.000), parcelamos em 3-4 etapas conforme marcos do projeto.",
      },
      {
        question: "Quais formas de pagamento aceitas?",
        answer:
          "PIX, transferência bancária, cartão de crédito (via PagSeguro) e boleto. Para clientes internacionais, aceitamos PayPal e Wise.",
      },
      {
        question: "O orçamento pode mudar durante o projeto?",
        answer:
          "O escopo inicial é fixo. Mudanças são possíveis mediante novo orçamento. Pequenos ajustes estão inclusos nas revisões.",
      },
    ],
  },
  {
    title: "Serviços e Tecnologia",
    icon: Globe,
    questions: [
      {
        question: "Quais tecnologias vocês utilizam?",
        answer:
          "React, Next.js, TypeScript, Node.js, PostgreSQL, Supabase, Tailwind CSS. Sempre utilizamos tecnologias modernas e bem estabelecidas no mercado.",
      },
      {
        question: "Fazem projetos internacionais?",
        answer:
          "Sim, atendemos clientes do mundo todo. Temos experiência com projetos em inglês e espanhol, incluindo adequação a fusos horários diferentes.",
      },
      {
        question: "O site será responsivo?",
        answer:
          "Todos os projetos são desenvolvidos mobile-first, garantindo perfeita visualização em smartphones, tablets e desktops.",
      },
    ],
  },
  {
    title: "Suporte e Manutenção",
    icon: Wrench,
    questions: [
      {
        question: "Vocês fazem manutenção?",
        answer:
          "Sim! Oferecemos planos de manutenção mensal a partir de R$ 200, incluindo atualizações, backups, monitoramento e suporte técnico.",
      },
      {
        question: "Quanto tempo de suporte está incluído?",
        answer:
          "Todo projeto inclui 30 dias de suporte gratuito após a entrega. Isso cobre correções de bugs e pequenos ajustes.",
      },
      {
        question: "E se eu precisar de novas funcionalidades depois?",
        answer:
          "Desenvolvemos novas funcionalidades mediante orçamento específico. Clientes com plano de manutenção têm 20% de desconto.",
      },
    ],
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header da seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Perguntas Frequentes
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tire suas dúvidas sobre nossos serviços, processos e metodologia.
            Não encontrou sua pergunta? Entre em contato conosco.
          </p>
        </motion.div>

        {/* Grid de categorias de FAQ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <category.icon className="h-5 w-5 text-primary" />
                    </div>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {category.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="space-y-2">
                      <h4 className="font-semibold text-sm leading-relaxed">
                        {faq.question}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                      {faqIndex < category.questions.length - 1 && (
                        <hr className="my-4 border-muted" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 bg-primary/5 rounded-lg"
        >
          <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Ainda tem dúvidas?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Nossa equipe está pronta para esclarecer qualquer questão sobre seu
            projeto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              Falar Conosco
            </a>
            <a
              href="https://wa.me/5521969715247"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-input bg-background rounded-md font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              WhatsApp Direto
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
