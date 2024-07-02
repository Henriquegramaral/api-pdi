import { Injectable, Scope } from "@nestjs/common";
import { CabecalhoPdiProvider } from "src/app/wizard/dataproviders/CabecalhoPdiProvider";
import { CabecalhoPdiModel } from "src/app/wizard/dataproviders/models/CabecalhoPdiModel";

@Injectable({scope: Scope.REQUEST})
export default class GetWizardsByUserIdService{
    constructor(private readonly cabecalhoPdiProvider: CabecalhoPdiProvider){};

    async execute(userId: number) : Promise<CabecalhoPdiModel[]>{        
        return await this.cabecalhoPdiProvider.getAllByUserId(userId);
    }
}