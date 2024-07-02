import { Injectable, Scope } from "@nestjs/common";
import { CabecalhoPdiProvider } from "src/app/wizard/dataproviders/CabecalhoPdiProvider";
import { CabecalhoPdiModel } from "src/app/wizard/dataproviders/models/CabecalhoPdiModel";

@Injectable({scope: Scope.REQUEST})
export default class GetWizardByIdService{
    constructor(private readonly cabecalhoPdiProvider: CabecalhoPdiProvider){};

    async execute(id: number) : Promise<CabecalhoPdiModel>{        
        return await this.cabecalhoPdiProvider.getById(id);
    }
}