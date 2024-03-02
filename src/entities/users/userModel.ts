import { Column, Entity, JoinTable, ManyToMany, OneToMany,  PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../roles/roleModel";
import { Appointment } from "../appointments/appointmentModel";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ unique: true })
    username!: string;

    @Column()
    first_name?: string;
    

    @Column()
    last_name?: string;

    @Column({ unique: true })
    email!: string;

    @Column({select: false} ) // password is not selected by default in queries
    password!: string;

    @Column()
    photo?: string;

    @Column()
    city?: string;

    @Column()
    phone?: string;

    @Column()
    is_partner?: boolean = false;

    @Column()
    is_volunteer?:  boolean = true;

    @Column()
    is_active?: boolean = true;

    
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
    userAppointments?: Appointment[];

}
