import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ProductSituations } from "./ProductSituations";
import { ProductCategories } from "./ProductCategories";

@Entity("products")
export class Products {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    // Colunas das chaves estrangeiras (permitem enviar só o id no POST/PUT)
    @Column()
    productSituationId!: number;

    @Column()
    productCategoryId!: number;

    @ManyToOne(() => ProductSituations, (productSituation) => productSituation.products)
    @JoinColumn({ name: "productSituationId" })
    productSituation!: ProductSituations;

    @ManyToOne(() => ProductCategories, (productCategory) => productCategory.products)
    @JoinColumn({ name: "productCategoryId" })
    productCategory!: ProductCategories;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;
}
