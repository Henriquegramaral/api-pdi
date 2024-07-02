export class DadosInvalidosUsuarioError extends Error {
    constructor() {
      super("Não foi possível realizar o login, dados inválidos!.");
      this.name = "DadosInvalidosUsuarioError";
    }
  }
  