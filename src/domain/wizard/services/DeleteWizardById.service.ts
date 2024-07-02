import { Injectable, Scope } from "@nestjs/common";
import { CabecalhoPdiProvider } from "src/app/wizard/dataproviders/CabecalhoPdiProvider";

@Injectable({scope: Scope.REQUEST})
export default class DeleteWizardByIdService{
    constructor(private readonly cabecalhoPdiProvider: CabecalhoPdiProvider){};

    async execute(id: number) : Promise<any>{
        return {
                status: await this.cabecalhoPdiProvider.deleteById(id)
            }
    }
}