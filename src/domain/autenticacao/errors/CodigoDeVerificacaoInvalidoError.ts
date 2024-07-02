export class CodigoDeVerificacaoInvalidoError extends Error {
    constructor() {
      super("O código de verificação digitado está incorreto.");
      this.name = "CodigoDeVerificacaoInvalidoError";
    }
  }
  