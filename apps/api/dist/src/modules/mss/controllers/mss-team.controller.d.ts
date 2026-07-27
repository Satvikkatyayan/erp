import { ManagerFacade } from '../facades/manager.facade';
export declare class MssTeamController {
    private readonly facade;
    constructor(facade: ManagerFacade);
    getDirectory(req: any): Promise<{
        id: string;
        name: string;
        position: string;
        status: string;
    }[]>;
}
//# sourceMappingURL=mss-team.controller.d.ts.map