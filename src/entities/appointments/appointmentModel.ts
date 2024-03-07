import {  Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, Unique } from "typeorm"
import { Dog } from "../dogs/dogModel";
import { User } from "../users/userModel";
import { Activity } from "../activities/activityModel";

@Entity("appointments")
@Unique(["dog_id", "date", "hour"])
export class Appointment {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    user_id!: number;

    @Column()
    dog_id!: number;

    @Column()
    activity_id!: number;

    @Column()
    date!: Date;

    @Column()
    hour!: string;

    @Column()
    is_active:  boolean = true;

    @Column()
    created_at?: Date

    @Column()
    updated_at?: Date

    @ManyToOne(() => User, (user) => user.roles)
    @JoinColumn ({name: "user_id", referencedColumnName:"id"})
    user?: User;



    @ManyToOne(() => Dog, (dogs) => dogs)
    @JoinColumn ({name: "dog_id", referencedColumnName:"id"})
    dog?: Dog;

    @ManyToOne(() => Activity, (activities) => activities)
    @JoinColumn ({name: "activity_id", referencedColumnName:"id"})
    activity?: Activity;

}
