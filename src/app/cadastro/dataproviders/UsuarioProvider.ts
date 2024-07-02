import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioModel } from "./models/UsuarioModel";
import { Repository } from "typeorm";
import { Injectable, Scope } from "@nestjs/common";

@Injectable({scope: Scope.REQUEST})
export class UsuarioProvider {
    constructor(@InjectRepository(UsuarioModel) private readonly usuarioRepository: Repository<UsuarioModel>){};

    async findById(id: number): Promise<UsuarioModel>{
        return await this.usuarioRepository.findOneBy({
            id: id
        });
    }

    async findByEmail(email: string): Promise<UsuarioModel>{
        return await this.usuarioRepository.findOneBy({
            email: email
        });
    }    

    async save(usuario: UsuarioModel): Promise<UsuarioModel>{
        return await this.usuarioRepository.save(usuario);
    }
}