# @ipd/types

Shared wire-contract types for the IPD (Isha Program Delivery) platform.

This package is the single source of truth for the HTTP request / response shapes exchanged between `ipd-api`, `ipd-admin`, and `ipd-user`. Schemas are authored in Zod; TypeScript types are inferred with `z.infer`.

## Layout

```
src/
  <domain>/
    <domain>.schema.ts    # Zod schemas + inferred types
    index.ts              # barrel re-export
    __tests__/
      <domain>.schema.test.ts
  index.ts                # flat back-compat re-export (legacy interfaces)
legacy/
  *.ts                    # pre-2.0 TypeScript interfaces (kept for Phase 4 migration)
```

## Conventions

One schema, one inferred type, one file, one test file, one subpath export. For each domain:

```ts
// src/users/users.schema.ts
import { z } from "zod";

export const UserSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string().min(1).max(100),
  role: z.enum(["admin", "member", "viewer"]),
  createdAt: z.iso.datetime(),
});
export type User = z.infer<typeof UserSchema>;
```

Consumers import per-domain to keep frontend bundles lean:

```ts
import { UserSchema, type User } from "@ipd/types/users";
```

The flat root import (`from "@ipd/types"`) resolves to the legacy TypeScript interfaces under `legacy/` so unmigrated call sites keep compiling. New code should prefer the subpath imports.

## Helpers

`src/common/common.schema.ts` exposes two response-envelope helpers that take a payload schema and return the full `{ status, message, payload }` envelope:

```ts
import { envelope, listEnvelope } from "@ipd/types/common";
import { TagSchema } from "@ipd/types/tags";

const GetTagResponseSchema = envelope(TagSchema);
const ListTagsResponseSchema = listEnvelope(TagSchema);
```

## Constants

Shared enums live in `src/constants/constants.schema.ts` as `as const` objects with companion Zod validators:

```ts
import { ELEMENT_TYPE, ElementTypeSchema, type ElementType } from "@ipd/types/constants";
```

`as const` is used instead of TypeScript `enum` to avoid nominal-type friction when consumers redeclare their own local enums.

## Scripts

```bash
bun test src/            # run all schema tests
bunx tsc --noEmit        # type-check
```

## Status

- Version `2.0.0` introduces the Zod-first internal layout.
- Legacy flat imports (`import { IProgram } from "@ipd/types"`) still resolve via `legacy/*.ts`.
- New domains are added under `src/<domain>/` with a schema, a barrel, and a test file.

See `plans/shared-types-zod-contract/shared-types-zod-contract.plan.md` in the monorepo root for the migration plan.
