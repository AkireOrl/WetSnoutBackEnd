import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "../appointments/appointmentModel";


@Entity("dogs")
export class Dog {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name?:string;

    @Column()
    race?:string;

    @Column()
    age? :number;

    @Column()
    size? :string;

    @Column()
    weight?: string;

    @Column()
    sociable?: string;

    @Column()
    photo?: string;

    @Column()
    gallery?:  string[];

    @Column()
    is_active:  boolean = true;

    @OneToMany(() => Appointment, (Appointment) => Appointment.dog_id)
    dogAppointments?: Appointment[];
    }