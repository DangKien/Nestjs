import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MailModule } from "../mail/mail.module";
import { MailProcessor } from "../mail/mail.processor";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AccountLogin } from "./entities/account.entities";
import { FacebookStragery } from "./login_auth/facebook.stategies";
import { GoogleStrategy } from "./login_auth/google.stategies";
import { JwtStrategy } from "./login_auth/jwt.stategies";
import { RefreshTokenStrategy } from "./login_auth/jwtRefreshToken.stategies";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: "hehe",
      signOptions: { expiresIn: "5d" },
    }),
    TypeOrmModule.forFeature([AccountLogin]),
    MailModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    FacebookStragery,
    GoogleStrategy,
    MailProcessor,
    RefreshTokenStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
