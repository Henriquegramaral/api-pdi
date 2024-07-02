import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PassoPdiModel } from "./PassoPdiModel";
import { UsuarioModel } from "src/app/cadastro/dataproviders/models/UsuarioModel";

@Entity({name: 'T_CABECALHO_PDI'})
export class CabecalhoPdiModel extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'area'})
    area: string;

    @Column({name: 'titulo'})
    titulo: string;

    @Column({name: 'dataCadastro'})
    dataCadastro: Date;

    @ManyToOne(() => UsuarioModel, {cascade: false})
    @JoinColumn({name: 'userId', referencedColumnName: 'id'})
    usuario: UsuarioModel;

    @OneToMany(() => PassoPdiModel, passo => passo.cabecalho, {cascade: true, orphanedRowAction: "delete"})
    passos: PassoPdiModel[]; 
}