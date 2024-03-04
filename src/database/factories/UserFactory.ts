import { Faker, faker } from "@faker-js/faker";
import { User } from "../../entities/users/userModel";
import { Role } from "../../entities/roles/roleModel";
import bcrypt  from 'bcrypt';
import { BaseFactory } from "./BaseFactory";
//---------------------------------------------------------------------------------
export class UserFactory extends BaseFactory<User> {
   static createMany(adminCount: number, arg1: { roles: Role[]; }) {
      throw new Error("Method not implemented.");
  }
    protected  generateSpecifics(user: User): User {
       user.username = faker.internet.userName(); 
       user.first_name = faker.person.firstName();
       user.last_name = faker.person.lastName();
       user.email = faker.internet.email({
        allowSpecialCharacters: true
     
     });
       user.password = bcrypt.hashSync("12345678", 10);
       user.photo = faker.image.avatar();
       user.city = faker.location.city();
       user.is_partner =  user.is_partner ? true : false;
       user.is_volunteer = user.is_volunteer?true:false;
       user.is_active = user.is_active?.valueOf() as boolean ;
       

     
 
       return user;
       
    }
 }