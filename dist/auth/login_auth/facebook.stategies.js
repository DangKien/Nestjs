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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookStragery = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_facebook_1 = require("passport-facebook");
let FacebookStragery = class FacebookStragery extends (0, passport_1.PassportStrategy)(passport_facebook_1.Strategy, 'facebook') {
    constructor() {
        super({
            clientID: process.env.APP_ID,
            clientSecret: process.env.APP_SECRET,
            callbackURL: 'http://localhost:3000/auth/facebook/redirect',
            scope: 'email',
            profileFields: ['email', 'name'],
        });
    }
    async validate(accessToken, refreshToken, profile, done) {
        var _a;
        const { name, emails, provider, id } = profile;
        const { givenName, familyName } = name;
        const user = {
            email: (_a = emails === null || emails === void 0 ? void 0 : emails[0]) === null || _a === void 0 ? void 0 : _a.value,
            firstName: givenName,
            lastName: familyName,
            provider,
            id,
        };
        const payload = {
            user,
            accessToken,
        };
        done(null, payload);
    }
};
FacebookStragery = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FacebookStragery);
exports.FacebookStragery = FacebookStragery;
//# sourceMappingURL=facebook.stategies.js.map