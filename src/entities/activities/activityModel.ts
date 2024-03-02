import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "../appointments/appointmentModel";


@Entity("activities")
export class Activity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    activity_name!: string

    @Column()
    is_active:  boolean = true;

    @Column()
    created_at!: Date

    @Column()
    updated_at!: Date

    @OneToMany(() => Appointment, (appointment) => appointment.activity_id)
    activityAppointments?: Appointment[];
   
 }
