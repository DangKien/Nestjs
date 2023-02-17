import { Job } from 'bull';
import { MailService } from './mail.service';
export declare class MailProcessor {
    private readonly mailService;
    private readonly logger;
    constructor(mailService: MailService);
    onActive(job: Job): void;
    onComplete(job: Job): void;
    onClean(job: Job[]): void;
    onError(job: Job<any>, error: any): void;
    sendWelcomeEmail(job: Job): Promise<any>;
}
