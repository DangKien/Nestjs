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
exports.MailProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const mail_service_1 = require("./mail.service");
let MailProcessor = class MailProcessor {
    constructor(mailService) {
        this.mailService = mailService;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    onActive(job) {
        console.log(`Processor:@OnQueueActive - Processing job ${job.id} of type ${job.name}.`);
    }
    onComplete(job) {
        console.log(`Processor:@OnQueueCompleted - Completed job ${job.id} of type ${job.name}.`);
        console.log('---------------------');
    }
    onClean(job) {
        console.log(`Processor:@OnQueueCleaned - Clean ${job.length} job`);
    }
    onError(job, error) {
        console.log(`Processor:@OnQueueFailed - Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack);
    }
    async sendWelcomeEmail(job) {
        try {
            const result = await this.mailService.sendUserConfirmation(job.data);
            return result;
        }
        catch (error) {
            this.logger.error('Failed to send confirmation email.', error.stack);
            throw error;
        }
    }
};
__decorate([
    (0, bull_1.OnQueueActive)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MailProcessor.prototype, "onActive", null);
__decorate([
    (0, bull_1.OnQueueCompleted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MailProcessor.prototype, "onComplete", null);
__decorate([
    (0, bull_1.OnQueueCleaned)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], MailProcessor.prototype, "onClean", null);
__decorate([
    (0, bull_1.OnQueueFailed)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MailProcessor.prototype, "onError", null);
__decorate([
    (0, bull_1.Process)('hehe'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MailProcessor.prototype, "sendWelcomeEmail", null);
MailProcessor = __decorate([
    (0, bull_1.Processor)('mailqueue'),
    __metadata("design:paramtypes", [mail_service_1.MailService])
], MailProcessor);
exports.MailProcessor = MailProcessor;
//# sourceMappingURL=mail.processor.js.map