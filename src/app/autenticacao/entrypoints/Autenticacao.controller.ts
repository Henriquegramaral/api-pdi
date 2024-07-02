import { BadRequestException, Body, Controller, InternalServerErrorException, Post, Scope } from "@nestjs/common";
import VerificaUsuarioService from "src/domain/autenticacao/services/VerificaUsuario.service";
import { VerificacaoUsuarioModel } from "src/app/cadastro/dataproviders/models/VerificacaoUsuarioModel";
import { CodigoDeVerificacaoInvalidoError } from "src/domain/autenticacao/errors/CodigoDeVerificacaoInvalidoError";
import { UsuarioModel } from "src/app/cadastro/dataproviders/models/UsuarioModel";
import LoginUsuarioService from "src/domain/autenticacao/services/LoginUsuario.service";
import { DadosInvalidosUsuarioError } from "src/domain/autenticacao/errors/DadosInvalidosUsuarioError";
import { UsuarioNaoVerificadoError } from "src/domain/autenticacao/errors/UsuarioNaoVerificadoError";

@Controller({path: 'autentica', scope: Scope.REQUEST})
export class AutenticacaoController {
    constructor(private readonly verificaUsuarioService: VerificaUsuarioService, private readonly loginUsuarioService: LoginUsuarioService){};

    @Post('verifica')
    async verifica(@Body() usuario: VerificacaoUsuarioModel) : Promise<VerificacaoUsuarioModel>{
        try {
            return await this.verificaUsuarioService.execute(usuario);            
        } catch (error) {
            if(error instanceof CodigoDeVerificacaoInvalidoError){
                throw new BadRequestException((error as Error).message);
            }else{
                throw new InternalServerErrorException("Ocorreu um erro desconhecido.");
            }
        }
    }

    @Post()
    async login(@Body() usuario: UsuarioModel) : Promise<UsuarioModel>{
        try {
            return await this.loginUsuarioService.execute(usuario);            
        } catch (error) {
            if(error instanceof DadosInvalidosUsuarioError || error instanceof UsuarioNaoVerificadoError){
                throw new BadRequestException((error as Error).message);
            }else{
                throw new InternalServerErrorException("Ocorreu um erro desconhecido.");
            }
        }
    }    
    
}