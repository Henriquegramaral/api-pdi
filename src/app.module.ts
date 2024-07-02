import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModel } from './app/cadastro/dataproviders/models/UsuarioModel';
import { UsuarioProvider } from './app/cadastro/dataproviders/UsuarioProvider';
import { VerificacaoUsuarioModel } from './app/cadastro/dataproviders/models/VerificacaoUsuarioModel';
import { CadastraUsuarioService } from './domain/cadastro/services/CadastraUsuario.service';
import { UsuarioController } from './app/cadastro/entrypoints/Usuario.controller';
import { VerificacaoUsuarioProvider } from './app/cadastro/dataproviders/VerificacaoUsuarioProvider';
import { GetRandomNumberService } from './domain/util/services/GetRandomNumber.service';
import { MailModule } from './app/mail/Mail.module';
import RequestTextFromIaService from './domain/chatgpt/services/RequestTextFromIa.service';
import VerificaUsuarioService from './domain/autenticacao/services/VerificaUsuario.service';
import { AutenticacaoController } from './app/autenticacao/entrypoints/Autenticacao.controller';
import LoginUsuarioService from './domain/autenticacao/services/LoginUsuario.service';
import { TipoPdiModel } from './app/wizard/dataproviders/models/TipoPdiModel';
import { ItemPdiModel } from './app/wizard/dataproviders/models/ItemPdiModel';
import { PassoPdiModel } from './app/wizard/dataproviders/models/PassoPdiModel';
import { CabecalhoPdiModel } from './app/wizard/dataproviders/models/CabecalhoPdiModel';
import { TipoPdiProvider } from './app/wizard/dataproviders/TipoPdiProvider';
import GeraNovoWizardService from './domain/wizard/services/GeraNovoWizard.service';
import { WizardController } from './app/wizard/entrypoints/wizard.controller';
import GenerateMessageToGptService from './domain/wizard/services/GenerateMessageToGpt.service';
import { ChatGptController } from './app/chatgpt/entrypoints/chatgpt.controller';
import { CabecalhoPdiProvider } from './app/wizard/dataproviders/CabecalhoPdiProvider';
import SaveWizardService from './domain/wizard/services/SaveWizard.service';
import GetWizardsByUserIdService from './domain/wizard/services/GetWizardsByUserId.service';
import GetWizardByIdService from './domain/wizard/services/GetWizardById.service';
import DeleteWizardByIdService from './domain/wizard/services/DeleteWizardById.service';
import GenerateMessageResumeToGptService from './domain/wizard/services/GenerateMessageResumeToGpt.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '101105',
    database: 'pdi',
    entities: [UsuarioModel, VerificacaoUsuarioModel, TipoPdiModel, ItemPdiModel, PassoPdiModel, CabecalhoPdiModel],
    synchronize: true,
    logging: true,
    schema: "public"    
  }),
  TypeOrmModule.forFeature([UsuarioModel, VerificacaoUsuarioModel, TipoPdiModel, ItemPdiModel, PassoPdiModel, CabecalhoPdiModel]), 
  MailModule
  ],
  controllers: [AppController, UsuarioController, AutenticacaoController, WizardController, ChatGptController],
  providers: [AppService,
              UsuarioProvider,
              CadastraUsuarioService,
              VerificacaoUsuarioProvider,
              GetRandomNumberService,
              RequestTextFromIaService,
              VerificaUsuarioService,
              LoginUsuarioService,
              TipoPdiProvider,
              GeraNovoWizardService,
              GenerateMessageToGptService,
              CabecalhoPdiProvider,
              SaveWizardService,
              GetWizardsByUserIdService,
              GetWizardByIdService,
              DeleteWizardByIdService,
              GenerateMessageResumeToGptService
  ],
})
export class AppModule {}
