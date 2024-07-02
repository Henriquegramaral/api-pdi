import { Injectable } from "@nestjs/common";

@Injectable()
export class GetRandomNumberService {
    execute() : number {
        const maxValor = Math.pow(10, 6) - 1;
        const numeroAleatorio = Math.floor(Math.random() * (maxValor + 1));
        return numeroAleatorio;
    }
}