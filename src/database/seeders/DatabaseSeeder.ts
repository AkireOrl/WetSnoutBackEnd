import { activitySeeder } from "./ActivitySeeder";
import { dogSeeder } from "./DogSeeder";
import { userSeeder } from "./UserSeeder";
import { roleSeeder } from "./RoleSeeder";


//-------------------------------------------------------
(async () =>{
    await roleSeeder();
    await userSeeder();
    await dogSeeder();
    await activitySeeder();
})();