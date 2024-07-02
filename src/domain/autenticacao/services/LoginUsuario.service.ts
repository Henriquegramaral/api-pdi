import { Injectable, Scope } from "@nestjs/common";
import { UsuarioModel } from "src/app/cadastro/dataproviders/models/UsuarioModel";
import { UsuarioProvider } from "src/app/cadastro/dataproviders/UsuarioProvider";
import { DadosInvalidosUsuarioError } from "../errors/DadosInvalidosUsuarioError";
import { UsuarioNaoVerificadoError } from "../errors/UsuarioNaoVerificadoError";

@Injectable({scope: Scope.REQUEST})
export default class LoginUsuarioService {
    constructor(private readonly usuarioProvider: UsuarioProvider){};

    async execute(usuario: UsuarioModel) : Promise<UsuarioModel>{   
        const usuarioBd = await this.usuarioProvider.findByEmail(usuario.email);

        if(!usuarioBd || usuario.senha != usuarioBd.senha){
            throw new DadosInvalidosUsuarioError();
        }else
        if(!usuarioBd.verificado){
            throw new UsuarioNaoVerificadoError();
        }

        return usuarioBd;
    }
}