"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const mail_module_1 = require("../mail/mail.module");
const mail_processor_1 = require("../mail/mail.processor");
const user_module_1 = require("../user/user.module");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const account_entities_1 = require("./entities/account.entities");
const facebook_stategies_1 = require("./login_auth/facebook.stategies");
const google_stategies_1 = require("./login_auth/google.stategies");
const jwt_stategies_1 = require("./login_auth/jwt.stategies");
const jwtRefreshToken_stategies_1 = require("./login_auth/jwtRefreshToken.stategies");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: 'hehe',
                signOptions: { expiresIn: '300s' },
            }),
            typeorm_1.TypeOrmModule.forFeature([account_entities_1.AccountLogin]),
            mail_module_1.MailModule,
        ],
        providers: [
            auth_service_1.AuthService,
            jwt_stategies_1.JwtStrategy,
            facebook_stategies_1.FacebookStragery,
            google_stategies_1.GoogleStrategy,
            mail_processor_1.MailProcessor,
            jwtRefreshToken_stategies_1.RefreshTokenStrategy,
        ],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map