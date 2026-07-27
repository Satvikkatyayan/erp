export declare class WorkflowGraphController {
    getGraphModel(id: string): Promise<{
        nodes: {
            id: string;
            type: string;
            data: {
                label: string;
            };
        }[];
        edges: {
            id: string;
            source: string;
            target: string;
            label: string;
        }[];
    }>;
}
//# sourceMappingURL=workflow-graph.controller.d.ts.map