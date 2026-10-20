import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Products } from "./Products";

@Entity("product_categories")
export class ProductCategories {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;

    @OneToMany(() => Products, (product) => product.productCategory)
    products!: Products[];
}
