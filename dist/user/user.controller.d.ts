import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto, GetUserQuery } from './dto/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(response: any, createUserDto: CreateUserDto): Promise<any>;
    findAll(response: any, query: GetUserQuery): Promise<any>;
    findOne(response: any, id: number): Promise<any>;
    update(response: any, id: number, updateUser: User): Promise<any>;
    remove(response: any, id: number): Promise<any>;
}
