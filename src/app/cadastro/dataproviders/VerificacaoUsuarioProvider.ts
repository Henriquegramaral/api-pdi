import { InjectRepository } from "@nestjs/typeorm";
import { VerificacaoUsuarioModel } from "./models/VerificacaoUsuarioModel";
import { Repository } from "typeorm";
import { Injectable, Scope } from "@nestjs/common";

@Injectable({scope: Scope.REQUEST})
export class VerificacaoUsuarioProvider {
    constructor(@InjectRepository(VerificacaoUsuarioModel) private readonly verificacaoUsuarioRepository: Repository<VerificacaoUsuarioModel>){};

    async findAllByUserId(userId:number) : Promise<VerificacaoUsuarioModel[]>{
        return await this.verificacaoUsuarioRepository.find({
            where: {
                usuario: {id: userId},
                utilizado: false
            },
            relations: ['usuario']
        })
    }

    async findVerificationCode(codigoVerificacao:number) : Promise<VerificacaoUsuarioModel>{
        return await this.verificacaoUsuarioRepository.findOne({
            where: {
                codigoVerificacao: codigoVerificacao
            },
            relations: ['usuario']
        })
    }    

    async saveVerificacaoUsuario(entity: VerificacaoUsuarioModel) : Promise<VerificacaoUsuarioModel>{
        return await this.verificacaoUsuarioRepository.save(entity);
    }
}