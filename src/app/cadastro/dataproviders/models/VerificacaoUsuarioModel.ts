import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioModel } from "./UsuarioModel";
import { Exclude } from "class-transformer";

@Entity({name: 'T_VERIFICACAO_USUARIO'})
export class VerificacaoUsuarioModel extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'codigo_verificacao'})
    codigoVerificacao: number;

    @Column({name: 'utilizado'})
    utilizado: boolean;

    @ManyToOne(() => UsuarioModel, {cascade: true})
    @JoinColumn({name: 'userId', referencedColumnName: 'id'})
    usuario: UsuarioModel;

    @Exclude()
    codigoVerificacaoDigitadoUsuario: number;
}