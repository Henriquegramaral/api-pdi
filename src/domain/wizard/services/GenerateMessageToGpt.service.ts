import { Injectable, Scope } from "@nestjs/common";
import { DicasPdiModel } from "src/app/wizard/dataproviders/models/DicasPdiModel";
import { RequestDicasRestModel } from "src/app/wizard/entrypoints/models/RequestDicasRestModel";
import RequestTextFromIaService from "src/domain/chatgpt/services/RequestTextFromIa.service";

@Injectable({scope: Scope.REQUEST})
export default class GenerateMessageToGptService{
    constructor(private readonly requestTextFromIaService: RequestTextFromIaService){};

    async execute(requestDica: RequestDicasRestModel) : Promise<DicasPdiModel[]>{
        const dicas: DicasPdiModel[] = [];
        dicas.push({
            id: 0,
            titulo: 'Aqui vai o título da dica, por exemplo: Desenvolvedor pleno',
            conteudo: 'Aqui vai o conteúdo da dica, por exemplo: Minha posição atual na empresa é desenvolvedor pleno, desde x data...'
        });

        dicas.push({
            id: 1,
            titulo: 'Aqui vai o título da dica, por exemplo: Reconhecimento com remuneração',
            conteudo: 'Aqui vai o conteúdo da dica, por exemplo: Gosto de ser reconhecido na empresa com remuneração...'
        });        

        let message: string = 'Estou fazendo um PDI (Plano de Desenvolvimento Individual), minha profissão é ' + requestDica.area + ' e preciso que me mande uma LISTA DE DICAS DE O QUE POSSO ESCREVER NO PASSO: ' + requestDica.current + '('+ requestDica.descricaoPasso +') COM 20 ITENS EM JSON NO MESMO FORMATO DESTA LISTA : ' 
        + JSON.stringify(dicas) + ' (os campos id, titulo e conteudo devem ser obrigatóriamente preenchidos), você sempre deve falar como se fosse EU escrevendo, preciso que mande somente a lista na resposta, e mais nada, pois vou converter sua resposta diretamente para um objeto.';

        const responseDicas: DicasPdiModel[] = JSON.parse(await this.requestTextFromIaService.execute(message));        

        return responseDicas.filter(rd => rd.titulo && rd.conteudo);
    }
}