import { BadRequestException, Body, Controller, InternalServerErrorException, Post, Scope } from "@nestjs/common";
import { UsuarioModel } from "../dataproviders/models/UsuarioModel";
import { CadastraUsuarioService } from "src/domain/cadastro/services/CadastraUsuario.service";
import { VerificacaoUsuarioModel } from "../dataproviders/models/VerificacaoUsuarioModel";
import { UsuarioJaCadastradoError } from "src/domain/cadastro/errors/UsuarioJaCadastradoError";

@Controller({path: 'usuario', scope: Scope.REQUEST})
export class UsuarioController {
    constructor(private readonly cadastraUsuarioService: CadastraUsuarioService){};

    @Post()
    async salvaUsuario(@Body() usuario: UsuarioModel) : Promise<VerificacaoUsuarioModel>{
        try {
            return await this.cadastraUsuarioService.execute(usuario);            
        } catch (error) {
            if(error instanceof UsuarioJaCadastradoError){
                throw new BadRequestException((error as Error).message);
            }else{
                throw new InternalServerErrorException("Ocorreu um erro desconhecido.");
            }
        }
    }
    
}