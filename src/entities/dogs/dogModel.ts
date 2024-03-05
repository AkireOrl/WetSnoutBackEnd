import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "../appointments/appointmentModel";


@Entity("dogs")
export class Dog {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({unique: false})
    name?:string;
    

    @Column()
    race?:string;

    @Column()
    age? :number;

    @Column()
    size? :string;

    @Column()
    gender? :string;

    @Column()
    weight?: string;

    @Column()
    sociable?: string;

    @Column()
    photo?: string;

    @Column('json', { nullable: true })
    gallery?:  string[];

    @Column()
    is_active?:  boolean = true;

    @OneToMany(() => Appointment, (Appointment) => Appointment.dog_id)
    dogAppointments?: Appointment[];
    }