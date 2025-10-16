/**
 * API Route para envio de emails do formulário de contato
 * 
 * Implementação da Issue #1: Configuração do formulário de contato
 * - Utiliza Nodemailer com autenticação Gmail (senha de app)
 * - Envia email de notificação para o destinatário
 * - Envia email de confirmação para o remetente
 * - Validação com Zod schema
 * 
 * Variáveis de ambiente necessárias:
 * - EMAIL_HOST: smtp.gmail.com
 * - EMAIL_PORT: 587
 * - EMAIL_USER: email do Gmail
 * - EMAIL_PASS: senha de app do Gmail (16 caracteres)
 * - EMAIL_FROM: email remetente
 * - EMAIL_TO: email destinatário
 */

import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations'

/**
 * Cria transporter do Nodemailer para Gmail
 * Configurado para usar autenticação com senha de app (mais seguro que OAuth2 para este caso)
 */
function createEmailTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // true para 465, false para outras portas
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    // Verifica se as variáveis de ambiente estão configuradas
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
      return NextResponse.json(
        { error: 'Configuração de email não encontrada' },
        { status: 500 }
      )
    }

    const body = await request.json()
    
    // Valida os dados com Zod
    const validation = contactFormSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: validation.error.errors },
        { status: 400 }
      )
    }

    const { name, email, subject, message, phone } = validation.data

    // Cria o transporter
    const transporter = createEmailTransporter()

    // Email para o destinatário (você)
    const emailToOwner = {
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: process.env.EMAIL_TO,
      subject: `[Portfolio] ${subject}`,
      html: `
        <h2>Nova mensagem do formulário de contato</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone || 'Não informado'}</p>
        <p><strong>Assunto:</strong> ${subject}</p>
        <p><strong>Mensagem:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        <hr>
        <p><small>Enviado através do formulário de contato do portfolio</small></p>
      `,
    }

    // Email de confirmação para o remetente
    const confirmationEmail = {
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Confirmação - Mensagem recebida',
      html: `
        <h2>Obrigado pelo contato, ${name}!</h2>
        <p>Recebi sua mensagem sobre: <strong>${subject}</strong></p>
        <p>Retornarei em breve com uma resposta detalhada.</p>
        <hr>
        <p><strong>Sua mensagem:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        <br>
        <p>Atenciosamente,<br>Bruno Guimarães</p>
      `,
    }

    // Envia ambos os emails
    await Promise.all([
      transporter.sendMail(emailToOwner),
      transporter.sendMail(confirmationEmail),
    ])

    return NextResponse.json(
      { success: true, message: 'Email enviado com sucesso' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Erro ao enviar email:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// Método OPTIONS para CORS
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  )
}