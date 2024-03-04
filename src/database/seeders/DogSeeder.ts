import { AppDataSource } from "../data-source";
import { DogFactory } from "../factories/DogFactory";
import { Dog } from "../../entities/dogs/dogModel";

//-------------------------------------------------------------------------------

export const dogSeeder = async () => {

    try {
        await AppDataSource.initialize();

        const count = 5;

        const dogRepository = AppDataSource.getRepository(Dog);
        const dogFactory  = new DogFactory(dogRepository);

        const dogs = dogFactory.createMany(count);

        console.log(`Creating ${dogs} ...`);

        await  dogRepository.save(dogs);
        console.log("Seeding dogs completed successfully");
        return dogs;
       
    }catch (error) {
        console.error("Error seeding the database:", error);
}
}