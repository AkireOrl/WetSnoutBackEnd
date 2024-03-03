import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/users/userModel";
import { Appointment } from "../entities/appointments/appointmentModel";
import { Dog } from "../entities/dogs/dogModel";
import { Activity } from "../entities/activities/activityModel";
import { Role } from "../entities/roles/roleModel";

//-----------------------------------------------------------------------

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "root",
    database: "wetsnout",
    entities: [
        User,
        Appointment,
        Dog,
        Activity, 
        Role
    ],
    migrations: [`${__dirname}/migrations/**/*{.js,.ts}`],
    synchronize: false,
    logging: false,
 });