# ERP Development Tooling

This directory contains utility scripts utilized throughout the evolutionary stages of the ERP Architecture. 

**These scripts are developer tooling only.** 
They are not imported by the application, nor are they required at runtime. 

## Directory Structure

### `generators/`
Reusable code generators used for scaffolding future ERP modules. They generate base boilerplate code following established architectural patterns (Domains, Services, Controllers, Handlers).

### `schema-history/`
Historical schema generation and migration helper scripts used during architecture evolution. These track the phased roll-out of schema features, mostly via Prisma appends and replacements.

### `maintenance/`
One-off maintenance and repair utilities used to debug, clean, or enforce consistency across the codebase.
