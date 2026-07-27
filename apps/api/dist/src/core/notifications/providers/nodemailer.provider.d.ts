import { INotificationProvider } from './notification-provider.interface';
export declare class NodemailerProvider implements INotificationProvider {
    private readonly logger;
    send(payload: any): Promise<boolean>;
}
//# sourceMappingURL=nodemailer.provider.d.ts.map