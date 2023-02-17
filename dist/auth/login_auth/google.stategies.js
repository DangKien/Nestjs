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
exports.GoogleStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const common_1 = require("@nestjs/common");
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/redirect',
            scope: ['email', 'profile'],
        });
    }
    async validate(accessToken, refreshToken, profile, done) {
        var _a, _b;
        const { name, emails, photos, provider, id } = profile;
        const { givenName, familyName } = name;
        const user = {
            email: (_a = emails[0]) === null || _a === void 0 ? void 0 : _a.value,
            firstName: givenName,
            lastName: familyName,
            picture: (_b = photos[0]) === null || _b === void 0 ? void 0 : _b.value,
            accessToken,
            refreshToken,
            provider,
            id,
        };
        done(null, user);
    }
};
GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GoogleStrategy);
exports.GoogleStrategy = GoogleStrategy;
//# sourceMappingURL=google.stategies.js.map