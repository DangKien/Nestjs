"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mail_service_1 = require("../mail/mail.service");
const user_service_1 = require("../user/user.service");
const account_entities_1 = require("./entities/account.entities");
let AuthService = class AuthService {
    constructor(userService, jwtTokenService, mailService, accountFBRepository) {
        this.userService = userService;
        this.jwtTokenService = jwtTokenService;
        this.mailService = mailService;
        this.accountFBRepository = accountFBRepository;
    }
    async validateUser(username, pass) {
        const user = await this.userService.findByUserName(username);
        if (!user)
            return null;
        if (username && user.password === pass) {
            return Object.assign({}, user);
        }
        return null;
    }
    async loginWithCredentials(user) {
        const payload = { username: user.username, password: user.password };
        const payloadRefreshToken = {
            username: user.username,
            password: user.password,
        };
        return {
            access_token: this.jwtTokenService.sign(payload, {
                secret: 'hehe',
                expiresIn: '5m',
            }),
            refresh_token: this.jwtTokenService.sign(payloadRefreshToken, {
                secret: 'heheboi',
            }),
        };
    }
    async googleLogin(req) {
        const { id, lastName, firstName, accessToken, provider } = req;
        const check = await this.accountFBRepository.findOne(id);
        await this.mailService.sendMessage(req);
        if (!check && provider === 'google') {
            const result = await this.accountFBRepository.save(req);
            return {
                message: `Hello ${lastName} ${firstName}. You are logging with google hehe`,
                result,
                access_token: accessToken,
            };
        }
        return {
            message: `Welcome back ${lastName} ${firstName}`,
            result: req,
            access_token: accessToken,
        };
    }
    async loginFacebook(req) {
        const { id, lastName, firstName, provider } = req.user;
        const check = await this.accountFBRepository.findOne(id);
        await this.mailService.sendMessage(req.user);
        if (!check && provider === 'facebook') {
            const result = await this.accountFBRepository.save(req.user);
            return {
                message: `Hello ${firstName} ${lastName}. You are logging with facebook huhu`,
                result,
                access_token: req.accessToken,
            };
        }
        return {
            message: `Welcome back ${firstName} ${lastName}`,
            result: req.user,
            access_token: req.accessToken,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectRepository)(account_entities_1.AccountLogin)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        mail_service_1.MailService,
        typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map