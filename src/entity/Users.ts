import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Situations } from "./Situations";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @ManyToOne(() => Situations, (situations) => situations.users)
    @JoinColumn({ name: "situation_id" })
    situation!: Situations;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;
}