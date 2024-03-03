import { dogSeeder } from "./DogSeeder";
import { userSeeder } from "./UserSeeder";
import { roleSeeder } from "./roleSeeder"


//-------------------------------------------------------
(async () =>{
    await roleSeeder();
    await userSeeder();
    await dogSeeder();
})();