import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AccountLogin } from './entities/account.entities';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtTokenService: JwtService,
    private mailService: MailService,
    @InjectRepository(AccountLogin)
    private accountFBRepository: Repository<AccountLogin>,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.userService.findByUserName(username);
    if (!user) return null;

    return {
      ...user,
    };
  }

  async loginWithCredentials(user: any) {
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

  async refreshTokens(user: any) {
    const payload = { username: user.username, password: user.password };
    const payloadRefreshToken = {
      username: user.username,
      password: user.password,
    };

    return {
      access_token: this.jwtTokenService.sign(payload, {
        secret: 'hehe',
        expiresIn: '3m',
      }),
    };
  }

  async googleLogin(req: any): Promise<any> {
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

  async loginFacebook(req: any): Promise<any> {
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
}
