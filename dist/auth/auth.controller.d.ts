import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    private configService;
    constructor(authService: AuthService, configService: ConfigService);
    refreshTokens(req: Request): void;
    facebookLogin(): Promise<any>;
    facebookLoginRedirect(req: any): Promise<any>;
    googleAuthRedirect(req: any): Promise<any>;
}
