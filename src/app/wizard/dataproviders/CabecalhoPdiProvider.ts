import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable, Scope } from "@nestjs/common";
import { CabecalhoPdiModel } from "./models/CabecalhoPdiModel";

@Injectable({scope: Scope.REQUEST})
export class CabecalhoPdiProvider {
    constructor(@InjectRepository(CabecalhoPdiModel) private readonly cabecalhoPdiRepository: Repository<CabecalhoPdiModel>){};

    async save(pdi: CabecalhoPdiModel): Promise<CabecalhoPdiModel>{
        return await this.cabecalhoPdiRepository.save(pdi);
    }

    async getAllByUserId(userId: number): Promise<CabecalhoPdiModel[]>{
        return await this.cabecalhoPdiRepository.find({
            where: {
                usuario: {id: userId}
            },
            relations: ['usuario', 'passos', 'passos.tipo', 'passos.itens']
        })
    } 
    
    async getById(id: number): Promise<CabecalhoPdiModel>{
        return await this.cabecalhoPdiRepository.findOne(
            {
                where: {
                    id: id
                },
                relations: ['usuario', 'passos', 'passos.tipo', 'passos.itens']
            }
        );
    }

    async deleteById(id: number): Promise<boolean> {
        const register = await this.getById(id);
        if (register.passos && register.passos.length > 0) {
            await this.cabecalhoPdiRepository
                .createQueryBuilder()
                .relation(CabecalhoPdiModel, "passos")
                .of(register)
                .remove(register.passos);
        }
        await this.cabecalhoPdiRepository.remove(register);
        return true;
    }  
}