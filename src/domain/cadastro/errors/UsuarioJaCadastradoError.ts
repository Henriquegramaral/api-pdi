export class UsuarioJaCadastradoError extends Error {
    constructor() {
      super("Já existe um usuário cadastrado com este email.");
      this.name = "UsuarioJaCadastradoError";
    }
  }
  