import { RoutingResolverService } from '../routing/routing-resolver.service';
export declare class PlatformNotificationSDK {
    private router;
    private readonly logger;
    constructor(router: RoutingResolverService);
    send(eventKey: string, payload: any): Promise<{
        status: string;
        recipients: string[];
    }>;
    broadcast(eventKey: string, payload: any, recipients: string[]): Promise<{
        status: string;
        count: number;
    }>;
}
//# sourceMappingURL=platform-notification.sdk.d.ts.map