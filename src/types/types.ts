export interface TokenData {
    email: string;
    userId: string;
    userRoles: string[];
    
 }

 export interface LoginUserRequestBody {
    email: string;
    password: string;
 }

 export interface CreateUserRequestBody {
    username: string;
    first_name?: string;
    last_name?: string;
    password: string;
    email: string;   
 }