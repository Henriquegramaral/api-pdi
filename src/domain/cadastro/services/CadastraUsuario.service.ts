import { Injectable, Scope } from "@nestjs/common";
import { UsuarioProvider } from "src/app/cadastro/dataproviders/UsuarioProvider";
import { VerificacaoUsuarioProvider } from "src/app/cadastro/dataproviders/VerificacaoUsuarioProvider";
import { UsuarioModel } from "src/app/cadastro/dataproviders/models/UsuarioModel";
import { UsuarioJaCadastradoError } from "../errors/UsuarioJaCadastradoError";
import { VerificacaoUsuarioModel } from "src/app/cadastro/dataproviders/models/VerificacaoUsuarioModel";
import { GetRandomNumberService } from "src/domain/util/services/GetRandomNumber.service";
import { MailService } from "src/app/mail/services/Mail.service";

@Injectable({scope: Scope.REQUEST})
export class CadastraUsuarioService {
    constructor(private readonly usuarioProvider: UsuarioProvider, 
                private readonly verificacaoUsuarioProvider: VerificacaoUsuarioProvider,
                private readonly getRandomNumberService: GetRandomNumberService,
                private readonly mailService: MailService){};

    async execute(usuario: UsuarioModel) : Promise<VerificacaoUsuarioModel> {
        const usuarioModel: UsuarioModel = await this.usuarioProvider.findByEmail(usuario.email);

        if(usuarioModel && usuarioModel.verificado){
            throw new UsuarioJaCadastradoError();
        }

        const verificacaoUsuarioModel = new VerificacaoUsuarioModel();
        verificacaoUsuarioModel.usuario = !usuarioModel ? usuario : usuarioModel;
        verificacaoUsuarioModel.codigoVerificacao = this.getRandomNumberService.execute();
        verificacaoUsuarioModel.utilizado = false;

        const verificacaoUsuarioModelSalvo = await this.verificacaoUsuarioProvider.saveVerificacaoUsuario(verificacaoUsuarioModel);

        this.mailService.sendUserConfirmation(verificacaoUsuarioModelSalvo);

        return verificacaoUsuarioModelSalvo;
    }
}