import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PassoPdiModel } from "./PassoPdiModel";

@Entity({name: 'T_ITEM_PDI'})
export class ItemPdiModel extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'titulo'})
    titulo: string;    

    @Column({name: 'descricao'})
    descricao: string;

    @Column({name: 'meta'})
    meta: number;

    @ManyToOne(() => PassoPdiModel, passo => passo.itens, {cascade: false})
    @JoinColumn({name: 'passoId', referencedColumnName: 'id'})
    passo: PassoPdiModel;    
}