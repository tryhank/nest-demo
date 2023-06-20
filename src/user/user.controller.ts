import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth.guard';
import { ConfigService } from '@nestjs/config';
@Controller('user')
export class UserController {
  @Inject(JwtService) private jwtService: JwtService;
  @Inject(ConfigService) private configService: ConfigService;

  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body(ValidationPipe) user: CreateUserDto) {
    const result = await this.userService.login(user);
    if (result) {
      const token = await this.jwtService.signAsync({
        user: {
          id: result.id,
          username: result.username,
        },
      });
      return {
        code: '200',
        data: `bearer ${token}`,
        msg: '登陆成功',
      };
    }
  }

  @Post('register')
  async register(@Body(ValidationPipe) user: CreateUserDto) {
    return await this.userService.register(user);
  }

  @Get('aaa')
  @UseGuards(AuthGuard)
  aaa() {
    return 'aaa';
  }

  @Get('bbb')
  bbb() {
    console.log(this.configService.get('aaa'));
    return 'bbb';
  }
}
