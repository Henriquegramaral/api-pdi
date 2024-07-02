import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Scope } from "@nestjs/common";
import GeraNovoWizardService from "src/domain/wizard/services/GeraNovoWizard.service";
import { CabecalhoPdiModel } from "../dataproviders/models/CabecalhoPdiModel";
import { DicasPdiModel } from "../dataproviders/models/DicasPdiModel";
import GenerateMessageToGptService from "src/domain/wizard/services/GenerateMessageToGpt.service";
import { RequestDicasRestModel } from "./models/RequestDicasRestModel";
import SaveWizardService from "src/domain/wizard/services/SaveWizard.service";
import GetWizardsByUserIdService from "src/domain/wizard/services/GetWizardsByUserId.service";
import GetWizardByIdService from "src/domain/wizard/services/GetWizardById.service";
import DeleteWizardByIdService from "src/domain/wizard/services/DeleteWizardById.service";
import GenerateMessageResumeToGptService from "src/domain/wizard/services/GenerateMessageResumeToGpt.service";

@Controller({path: 'wizard', scope: Scope.REQUEST})
export class WizardController {
    constructor(private readonly geraNovoWizardService: GeraNovoWizardService, 
                private readonly generateMessageToGptService: GenerateMessageToGptService, 
                private readonly saveWizardService: SaveWizardService,
                private readonly getWizardsByUserIdService: GetWizardsByUserIdService,
                private readonly getWizardByIdService: GetWizardByIdService,
                private readonly deleteWIzardByIdService: DeleteWizardByIdService,
                private readonly resumePdiService: GenerateMessageResumeToGptService){};

    @Get('novo')
    async novo() : Promise<CabecalhoPdiModel>{
        try {
            return await this.geraNovoWizardService.execute();            
        } catch (error) {            
            throw new InternalServerErrorException("Ocorreu um erro desconhecido.");            
        }
    }


    @Post('dicas')
    async dicas(@Body() requestDica: RequestDicasRestModel) : Promise<DicasPdiModel[]>{
        try {
            return await this.generateMessageToGptService.execute(requestDica);
        } catch (error) {            
            throw new InternalServerErrorException(error.message);            
        }
    }  
    
    @Post('save')
    async save(@Body() pdi: CabecalhoPdiModel) : Promise<CabecalhoPdiModel>{
        try {
            return await this.saveWizardService.execute(pdi)
        } catch (error) {            
            throw new InternalServerErrorException(error.message);            
        }
    }      

    @Get('user/:userId')
    async getByUserId(@Param('userId') userId: number) : Promise<CabecalhoPdiModel[]>{
        try {
            return await this.getWizardsByUserIdService.execute(userId);
        } catch (error) {            
            throw new InternalServerErrorException("Ocorreu um erro desconhecido.");            
        }
    }   
    
    @Get(':id')
    async getById(@Param('id') id: number) : Promise<CabecalhoPdiModel>{
        try {
            return await this.getWizardByIdService.execute(id);
        } catch (error) {            
            throw new InternalServerErrorException("Ocorreu um erro desconhecido.");            
        }
    } 
    
    @Delete(':id')
    async deleteById(@Param('id') id: number) : Promise<any>{
        try {
            return await this.deleteWIzardByIdService.execute(id);
        } catch (error) {            
            throw new InternalServerErrorException("Ocorreu um erro desconhecido.");            
        }
    }  
    
    @Post('resume')
    async resume(@Body() pdi: CabecalhoPdiModel) : Promise<string>{
        try {
            return await this.resumePdiService.execute(pdi);
        } catch (error) {            
            throw new InternalServerErrorException(error.message);            
        }
    }     
    
}