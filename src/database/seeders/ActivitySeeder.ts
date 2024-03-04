import { Activity } from "../../entities/activities/activityModel";
import { AppDataSource } from "../data-source";

//------------------------------------------------------

export const activitySeeder = async () => {
    try {
        

        const activityRepository = AppDataSource.getRepository(Activity);

        const walkActivity = new Activity()
        walkActivity.activity_name= "walk";

        const transportActivity = new Activity()
        transportActivity.activity_name="transport"

        const cleaningActivity = new Activity()
        cleaningActivity.activity_name="cleaning";

        await activityRepository.save([walkActivity, transportActivity, cleaningActivity]);
        
        console.log("Activities have been seeded");
    } catch (error) {
        console.log(`Error while seeding activities: ${error}`);
    }finally{
        await AppDataSource.destroy();
    }
};

