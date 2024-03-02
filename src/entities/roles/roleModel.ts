import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/userModel";

@Entity("roles")
export class Role {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    role_name!: string

    @Column()
    created_at!: Date

    @Column()
    updated_at!: Date


    users?: User[];
 }
