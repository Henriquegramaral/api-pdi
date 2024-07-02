import { Injectable, Scope } from "@nestjs/common";
import { CabecalhoPdiProvider } from "src/app/wizard/dataproviders/CabecalhoPdiProvider";
import { CabecalhoPdiModel } from "src/app/wizard/dataproviders/models/CabecalhoPdiModel";

@Injectable({scope: Scope.REQUEST})
export default class SaveWizardService{
    constructor(private readonly cabecalhoPdiProvider: CabecalhoPdiProvider){};

    async execute(pdi: CabecalhoPdiModel) : Promise<CabecalhoPdiModel>{
        pdi.dataCadastro = new Date();     
        pdi.passos.forEach(ps => ps.itens.forEach(it => {
            if(it.id === null || it.id === 0){
                delete it.id;
            }
        }));
        return await this.cabecalhoPdiProvider.save(pdi);
    }
}