import { Injectable, Scope } from "@nestjs/common";
import { TipoPdiProvider } from "src/app/wizard/dataproviders/TipoPdiProvider";
import { CabecalhoPdiModel } from "src/app/wizard/dataproviders/models/CabecalhoPdiModel";
import { PassoPdiModel } from "src/app/wizard/dataproviders/models/PassoPdiModel";
import { TipoPdiModel } from "src/app/wizard/dataproviders/models/TipoPdiModel";

@Injectable({scope: Scope.REQUEST})
export default class GeraNovoWizardService{
    constructor(private readonly tipoPdiProvider: TipoPdiProvider){};

    async execute() : Promise<CabecalhoPdiModel>{
        const tipos: TipoPdiModel[] = await this.tipoPdiProvider.findAllActives();
        const cabecalhoPdi: CabecalhoPdiModel = new CabecalhoPdiModel();
        cabecalhoPdi.area = '';
        cabecalhoPdi.dataCadastro = new Date();
        cabecalhoPdi.titulo = '';
        cabecalhoPdi.passos = [];

        for (let tipo of tipos) {
            const passo: PassoPdiModel = new PassoPdiModel();         
            passo.itens = [];
            passo.dicas = [];
            passo.tipo = tipo;  
            cabecalhoPdi.passos.push(passo);
        }        

        return cabecalhoPdi;
    }
}