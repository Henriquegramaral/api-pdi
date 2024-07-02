import { BaseEntity, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TipoPdiModel } from "./TipoPdiModel";
import { ItemPdiModel } from "./ItemPdiModel";
import { CabecalhoPdiModel } from "./CabecalhoPdiModel";
import { Exclude } from "class-transformer";
import { DicasPdiModel } from "./DicasPdiModel";

@Entity({name: 'T_PASSO_PDI'})
export class PassoPdiModel extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TipoPdiModel, {cascade: false})
    @JoinColumn({name: 'tipoId', referencedColumnName: 'id'})
    tipo: TipoPdiModel;

    @OneToMany(() => ItemPdiModel, item => item.passo, {cascade: true, orphanedRowAction: "delete"})
    itens: ItemPdiModel[]; 

    @Exclude()
    dicas: DicasPdiModel[];

    @ManyToOne(() => CabecalhoPdiModel, cabecalho => cabecalho.passos, {cascade: false, orphanedRowAction: "delete"})
    @JoinColumn({name: 'cabecalhoId', referencedColumnName: 'id'})
    cabecalho: CabecalhoPdiModel;
}