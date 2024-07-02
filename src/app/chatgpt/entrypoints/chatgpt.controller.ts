import { Body, Controller, InternalServerErrorException, Post } from "@nestjs/common";
import RequestTextFromIaService from "src/domain/chatgpt/services/RequestTextFromIa.service";

@Controller({path: 'chat'})
export class ChatGptController {
    constructor(private readonly geraMensagemTeste: RequestTextFromIaService){};


    @Post()
    async dicas(@Body() request: any) : Promise<string>{
        try {
            return await this.geraMensagemTeste.execute(request.mensagem);
        } catch (error) {            
            throw new InternalServerErrorException("Ocorreu um erro desconhecido.");            
        }
    }    
    
}