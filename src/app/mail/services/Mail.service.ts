import { Injectable, Scope } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { VerificacaoUsuarioModel } from '../../cadastro/dataproviders/models/VerificacaoUsuarioModel';

@Injectable({scope: Scope.REQUEST})
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(verificacaoUsuario: VerificacaoUsuarioModel) {
    const maxAttempts = 3;
    let attempt = 0;
    let success = false;
    let lastError: any;

    while (attempt < maxAttempts && !success) {
      try {
        await this.mailerService.sendMail({
          to: verificacaoUsuario.usuario.email,
          subject: 'Bem-vindo ao PDI MAKER! Confirme seu E-mail',
          template: './confirmation',
          context: {
            nome: verificacaoUsuario.usuario.nome,
            codigoVerificacao: verificacaoUsuario.codigoVerificacao
          },
        });
        success = true;
      } catch (error) {
        attempt++;
        lastError = error;
        if (attempt >= maxAttempts) {
          console.log(`Falha ao enviar e-mail após ${maxAttempts} tentativas: ${lastError.message}`);
        }
      }
    }
  }
}
