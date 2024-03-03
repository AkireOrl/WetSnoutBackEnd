import { UserRoles } from "../../constants/UserRole";
import { Role } from "../../entities/roles/roleModel";
import { User } from "../../entities/users/userModel";
import { AppDataSource } from "../data-source";
import { UserFactory } from "../factories/UserFactory";



export const userSeeder = async () => {
    try {
       // Inicializar la conexión con la base de datos
       await AppDataSource.initialize();
 
       // Definir la cantidad de estudiantes a crear
       const count = 10;
 
       // / Llamar a la función para sembrar usuarios con roles de user
       await seedUsersWithRoles({
          roles: [UserRoles.USER],
          count: count,
       });
 
       // Imprimir mensaje de éxito
       console.log("Seeding users successfully completed");
    } catch (error) {
       console.error("Error seeding the database:", error);
    } finally {
       // Cerrar la conexión con la base de datos, independientemente del resultado
       await AppDataSource.destroy();
    }
 };
 
 export const seedUsersWithRoles = async ({
    roles,
    count,
 }: {
    roles: Role[];
    count: number;
 }) => {
    // Obtener repositorios y fábricas necesarios
    const userRepository = AppDataSource.getRepository(User);
 
    const userFactory = new UserFactory(userRepository);
 
    // Generar usuarios
    const users = userFactory.createMany(count);
 
    // Asignar roles a cada usuario
    users.forEach((user) => {
       user.roles = roles;
    });
 
    // Guardar usuarios en la base de datos
    await userRepository.save(users);
 
    return users;
 };