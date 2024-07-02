import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable, Scope } from "@nestjs/common";
import { TipoPdiModel } from "./models/TipoPdiModel";

@Injectable({scope: Scope.REQUEST})
export class TipoPdiProvider {
    constructor(@InjectRepository(TipoPdiModel) private readonly tipoPdiRepository: Repository<TipoPdiModel>){};

    async findAllActives(): Promise<TipoPdiModel[]>{
        return await this.tipoPdiRepository.find(
{            where: {
                status: true
            }}
        )
    }
}