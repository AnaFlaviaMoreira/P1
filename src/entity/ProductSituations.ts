import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Products } from "./Products";

@Entity("product_situations")
export class ProductSituations {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;

    @OneToMany(() => Products, (product) => product.productSituation)
    products!: Products[];
}
