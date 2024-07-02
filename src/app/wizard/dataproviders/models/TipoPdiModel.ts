import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'T_TIPO_PDI'})
export class TipoPdiModel extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'titulo'})
    titulo: string;     

    @Column({name: 'chave'})
    chave: string;    

    @Column({name: 'descricao'})
    descricao: string;

    @Column({name: 'status'})
    status: boolean;
}