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
exports.MailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
let MailService = class MailService {
    constructor(mailerService, mailQueue) {
        this.mailerService = mailerService;
        this.mailQueue = mailQueue;
    }
    async sendUserConfirmation(params) {
        await this.mailerService.sendMail(Object.assign({}, params));
    }
    async sendMessage(user) {
        const { email, firstName, provider } = user;
        await this.mailQueue.add('hehe', {
            to: email,
            from: '"Support Team" <support@just.engineer.com>',
            subject: '🚩🚩🚩🚩',
            template: 'confirmation',
            context: {
                name: firstName,
                provider: provider,
            },
        });
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, bull_1.InjectQueue)('mailqueue')),
    __metadata("design:paramtypes", [mailer_1.MailerService, Object])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map