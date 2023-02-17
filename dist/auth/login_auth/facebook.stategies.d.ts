import { Profile } from 'passport-facebook';
declare const FacebookStragery_base: new (...args: any[]) => any;
export declare class FacebookStragery extends FacebookStragery_base {
    constructor();
    validate(accessToken: string, refreshToken: string, profile: Profile, done: (err: any, user: any, info?: any) => void): Promise<any>;
}
export {};
