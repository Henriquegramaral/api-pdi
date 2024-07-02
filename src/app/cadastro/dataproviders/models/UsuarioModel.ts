import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'T_USUARIO'})
export class UsuarioModel extends BaseEntity{

    @PrimaryGeneratedColumn({name: 'id'})
    id: number;

    @Column({name: 'email'})
    email: string;

    @Column({name: 'senha'})
    senha: string;

    @Column({name: 'nome'})
    nome: string;

    @Column({name: 'verificado', default: false})
    verificado: boolean;
}