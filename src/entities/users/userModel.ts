import { Column, Entity, JoinTable, ManyToMany, OneToMany,  PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../roles/roleModel";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ unique: true })
    username!: string;

    @Column()
    name?: string;
    

    @Column()
    surname?: string;

    @Column()
    photo?: string;

    @Column({select: false} ) // password is not selected by default in queries
    password!: string;

    @Column({ unique: true })
    email!: string;

    
    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable({
       name: "users_roles",
       joinColumn: {
          name: "user_id",
          referencedColumnName: "id",
       },
       inverseJoinColumn: {
          name: "role_id",
          referencedColumnName: "id",
       },
    })
    roles!: Role[];

   

    @OneToMany(() => Appointment, (appointment) => appointment.user_id)
    clientAppointments?: Appointment[];

}
