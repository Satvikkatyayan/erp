// ---------------------------------------------------------
// ERP Platform SDK
// This SDK exposes all stable public contracts for modules.
// ---------------------------------------------------------

// Context
export * from '../context/context.interface';
export * from '../context/context.factory';

// CQRS
export * from '../cqrs/cqrs.contracts';
export * from '../cqrs/cacheable-query.interface';
export * from '../cqrs/projection-handler.interface';
export * from '../cqrs/read-model-version.interface';

// Events
export * from '../events/event.contracts';
export * from '../events/event.catalog';

// Execution
export * from '../execution/execution-context';
export * from '../execution/interfaces/IExecutionContext';
export * from '../execution/interfaces/IJobScheduler';
export * from '../execution/interfaces/IRetryPolicy';
export * from '../execution/interfaces/IWorker';
export * from '../execution/interfaces/IWorkerResult';

// Monitoring
export * from '../monitoring/health.contracts';
export * from '../monitoring/health.aggregator';

// Registry
export * from '../registry/registry.interface';
export * from '../registry/abstract.registry';
export * from '../registry/worker.registry';
export * from '../registry/projection.registry';
export * from '../registry/event.registry';
