import { Injectable, Scope } from "@nestjs/common";
import { CabecalhoPdiModel } from "src/app/wizard/dataproviders/models/CabecalhoPdiModel";
import RequestTextFromIaService from "src/domain/chatgpt/services/RequestTextFromIa.service";

@Injectable({scope: Scope.REQUEST})
export default class GenerateMessageResumeToGptService{
    constructor(private readonly requestTextFromIaService: RequestTextFromIaService){};

    async execute(request: CabecalhoPdiModel) : Promise<string>{    
        let message: string = 'Estou fazendo um PDI (Plano de Desenvolvimento Individual), minha profissão é ' + request.area + ' e com base nas informações do meu PDI que estou lhe mandando, preciso que me mande um resumo de sugestões e dicas de como posso colocar meu PDI em prática, e também de como posso melhorar para meu PDI, mande o resultado em html, com estilização usando bootstrap, mande apenas o HTML\n\n' +
        'Este é o conteúdo do meu pdi: ' + JSON.stringify(request);
        const resposta = await this.requestTextFromIaService.execute(message);
        console.log(resposta);
        return resposta;       
    }
}