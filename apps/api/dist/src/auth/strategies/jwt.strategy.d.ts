import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../common/prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly prisma;
    constructor(configService: ConfigService, prisma: PrismaService);
    validate(payload: any): Promise<{
        userRoles: ({
            role: {
                permissions: ({
                    permission: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        version: number;
                        action: string;
                        deletedAt: Date | null;
                        createdBy: string | null;
                        updatedBy: string | null;
                        resource: string;
                    };
                } & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    version: number;
                    deletedAt: Date | null;
                    createdBy: string | null;
                    updatedBy: string | null;
                    roleId: string;
                    permissionId: string;
                })[];
            } & {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                version: number;
                description: string | null;
                deletedAt: Date | null;
                createdBy: string | null;
                updatedBy: string | null;
            };
        } & {
            id: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
            version: number;
            deletedAt: Date | null;
            createdBy: string | null;
            updatedBy: string | null;
            roleId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        version: number;
        deletedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
        isActive: boolean;
        email: string;
        passwordHash: string;
        lastLoginAt: Date | null;
        mfaEnabled: boolean;
        mfaSecret: string | null;
        empEmployeeId: string | null;
    }>;
}
export {};
//# sourceMappingURL=jwt.strategy.d.ts.map