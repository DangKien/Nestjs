import { AuthService } from './auth/auth.service';
import { User } from './user/entities/user.entity';
export declare class AppController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    getProfile(req: any): Promise<User>;
}
