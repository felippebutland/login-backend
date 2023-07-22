import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  async sendEmail(subject: string, to: string, token: string) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.SMTP_SENDER,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      await transporter.sendMail({
        to,
        from: process.env.SMTP_SENDER,
        subject,
        text: 'Olá seja bem vindo(a) a plataforma!',
        html: `<p>Segue o seu código de verificação <b>${token}</b>!</p>`,
      });
    } catch (error) {
      console.error('Erro ao enviar o e-mail:', error);
    }
  }
}
