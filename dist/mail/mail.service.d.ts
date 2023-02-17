import { MailerService } from '@nestjs-modules/mailer';
import { Queue } from 'bull';
import { AccountLogin } from '../auth/entities/account.entities';
export declare class MailService {
    private mailerService;
    private mailQueue;
    constructor(mailerService: MailerService, mailQueue: Queue);
    sendUserConfirmation(params: any): Promise<void>;
    sendMessage(user: AccountLogin): Promise<any>;
}
