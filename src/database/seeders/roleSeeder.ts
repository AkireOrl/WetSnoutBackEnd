import { Role } from "../../entities/roles/roleModel";
import { AppDataSource } from "../data-source";

//----------------------------------------------------------------------------

export const roleSeeder = async () => {
    try {
       await AppDataSource.initialize();
 
       const roleRepository = AppDataSource.getRepository(Role);
 
       const userRole = new Role()
       userRole.role_name = "super_admin";
 
       const adminRole = new Role()
       adminRole.role_name = "admin";
 
       const superadminRole = new Role()
       superadminRole.role_name = "user";
 
       await roleRepository.save([userRole, adminRole, superadminRole]);
 
       console.log("Seeding roles completed successfully");
 
    } catch (error) {
       console.error("Error seeding the database", error);
    } finally {
       await AppDataSource.destroy();
    }
 };