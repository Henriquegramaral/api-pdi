import { VerificacaoUsuarioProvider } from "src/app/cadastro/dataproviders/VerificacaoUsuarioProvider";
import { VerificacaoUsuarioModel } from "src/app/cadastro/dataproviders/models/VerificacaoUsuarioModel";
import { CodigoDeVerificacaoInvalidoError } from "../errors/CodigoDeVerificacaoInvalidoError";
import { Injectable, Scope } from "@nestjs/common";

@Injectable({scope: Scope.REQUEST})
export default class VerificaUsuarioService {
    constructor(private readonly verificacaoUsuarioProvider: VerificacaoUsuarioProvider){};

    async execute(verificacaoUsuario: VerificacaoUsuarioModel) : Promise<VerificacaoUsuarioModel>{   
        const verificacao = await this.verificacaoUsuarioProvider.findAllByUserId(verificacaoUsuario.usuario.id);
        for (let ver of verificacao) {
          if(ver.codigoVerificacao == verificacaoUsuario.codigoVerificacaoDigitadoUsuario && !ver.utilizado){
                ver.utilizado = true;
                ver.usuario.verificado = true;
                return await this.verificacaoUsuarioProvider.saveVerificacaoUsuario(ver);
          }
        }
        throw new CodigoDeVerificacaoInvalidoError();
    }
}