# 17_SECURITY

## Table of Contents
1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Authorization](#authorization)
4. [Tenant Isolation](#tenant-isolation)

## Overview
Security in the Employee module is enforced at two distinct boundaries: HTTP endpoints (via Guards/Decorators) and the Data Access Layer (via mandatory tenant/organization scope injection).

## Authentication
- **Mechanism:** JWT (JSON Web Tokens).
- **Implementation:** `@UseGuards(JwtAuthGuard)` applied at the Controller class level.
- **Responsibility:** Extracts user identity and tenant context from the request headers and populates `request.user`.

## Authorization
- **Mechanism:** Fine-grained Permission Strings (RBAC/ABAC hybrid).
- **Implementation:** `@UseGuards(PermissionGuard)` at the Controller class level, combined with `@RequirePermissions('permission:string')` on individual route methods.
- **Enforcement Mapping:**
  - `POST /onboard` -> `@RequirePermissions('employee:onboard')`
  - `POST /join` -> `@RequirePermissions('employee:join')`
  - `GET /*` -> `@RequirePermissions('employee:read')`

## Tenant Isolation
- **Mechanism:** Multi-tenancy is enforced structurally. Every Command and Query object MUST contain a `tenantId`.
- **Implementation:**
  - The Controller extracts `tenantId` from `request.user.tenantId` (set by `JwtAuthGuard`).
  - The Controller injects `tenantId` into the Command/Query constructor.
  - The Handler passes `tenantId` to the Service.
  - The Service passes `tenantId` to the Repository.
  - The Repository enforces `where: { tenantId }` on **every single Prisma query**.
- **Fail-safe:** Repositories do not have generic `findMany()` calls without a `tenantId` parameter.
