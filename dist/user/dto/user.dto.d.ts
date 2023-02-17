export declare class CreateUserDto {
    id: number;
    name: string;
    username: string;
    password: string;
    email: string;
    address: string;
    age: number;
    isActive: boolean;
}
export declare class GetUserQuery {
    minAge?: number;
    take?: number;
    skip?: number;
    name?: string;
}
