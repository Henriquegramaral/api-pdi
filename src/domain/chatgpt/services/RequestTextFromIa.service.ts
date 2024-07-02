import { Injectable } from "@nestjs/common";
import OpenAI from "openai";

@Injectable()
export default class RequestTextFromIaService {

    private openai = new OpenAI({apiKey: 'sua_chave_aqui'});

    async execute (message: string) : Promise<string> {
        let responseMessage: string = '';        
        const stream = await this.openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
            stream: true
        });
        for await (const chunk of stream) {
           responseMessage += chunk.choices[0]?.delta?.content || "";
        }
        return responseMessage;
    }
}