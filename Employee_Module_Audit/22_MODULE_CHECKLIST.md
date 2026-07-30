# 22_MODULE_CHECKLIST

## Table of Contents
1. [Overview](#overview)
2. [Checklist](#checklist)

## Overview
This checklist defines the step-by-step process used to scaffold the Employee module. It serves as a guide for scaffolding future modules (e.g., Leave, Payroll).

## Checklist
- [ ] Define bounded context name (e.g., `leave`).
- [ ] Create folder structure (`api`, `commands`, `queries`, `services`, `repositories`, `sdk`, `events`, `controllers`).
- [ ] Define API layer (Request/Response DTOs).
- [ ] Define Commands (POJOs).
- [ ] Define Queries (POJOs).
- [ ] Create Database mapping (Prisma schemas prefixed with domain, e.g., `Lve*`).
- [ ] Implement Repositories (wrapping Prisma calls, injecting `tenantId`).
- [ ] Implement ExecutionService (handling `$transaction` and business logic).
- [ ] Implement QueryService (handling reads).
- [ ] Implement Command Handlers (inject ExecutionService, publish events).
- [ ] Implement Query Handlers (inject QueryService).
- [ ] Implement Controllers (inject handlers, mappers, guards).
- [ ] Implement SDK (exposing read-only queries).
- [ ] Register all providers and exports in `<Module>Module.ts`.
