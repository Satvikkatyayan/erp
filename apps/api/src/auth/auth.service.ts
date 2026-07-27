import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../common/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto, ipAddress?: string, deviceInfo?: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
      include: { 
        userRoles: { include: { role: true } },
        employee: { include: { personalDetails: true } }
      },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials or inactive account');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const roleName = user.userRoles?.[0]?.role?.name || 'USER';
    const payload = { sub: user.id, email: user.email, role: roleName };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = uuidv4(); // Simple refresh token strategy

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Refresh token valid for 7 days

    await this.prisma.session.create({
      data: {
        userId: user.id,
        token: accessToken,
        refreshToken,
        expiresAt,
        ipAddress,
        deviceInfo,
      },
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.employee?.personalDetails?.firstName || '',
        lastName: user.employee?.personalDetails?.lastName || '',
        role: roleName,
      },
    };
  }

  async logout(refreshToken: string) {
    await this.prisma.session.delete({
      where: { refreshToken },
    });
  }

  async refreshTokens(refreshToken: string) {
    const session = await this.prisma.session.findUnique({
      where: { refreshToken },
      include: { user: { include: { userRoles: { include: { role: true } } } } },
    });

    if (!session || session.expiresAt < new Date()) {
      if (session) {
        await this.prisma.session.delete({ where: { id: session.id } });
      }
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const roleName = session.user.userRoles?.[0]?.role?.name || 'USER';
    const payload = { sub: session.user.id, email: session.user.email, role: roleName };
    const newAccessToken = this.jwtService.sign(payload);
    const newRefreshToken = uuidv4();

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.session.update({
      where: { id: session.id },
      data: {
        token: newAccessToken,
        refreshToken: newRefreshToken,
        expiresAt,
      },
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
