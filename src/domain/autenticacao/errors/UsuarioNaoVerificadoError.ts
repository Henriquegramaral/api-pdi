export class UsuarioNaoVerificadoError extends Error {
    constructor() {
      super("O usuário não foi verificado, é necessário fazer a confirmação no email!.");
      this.name = "DadosInvalidosUsuarioError";
    }
  }
  