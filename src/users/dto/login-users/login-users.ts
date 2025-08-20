import { IsString, MaxLength, MinLength } from "class-validator";

export class LoginUsers {

    @IsString()
    @MaxLength(15)
    @MinLength(3)
    username: string
    
    @IsString()
    @MinLength(3)
    password: string
}
