# CLAUDE.md — AI Development Guardrails

This file defines how AI-assisted development must proceed in this project.
Read this before writing any code. These rules override default behavior.

---

## 1. Purpose

CLAUDE.md exists to enforce safe, controlled, and disciplined AI-assisted development.

It is not a product spec. It does not describe what to build.
It defines how to build it — with strict checkpoints, minimal scope, and no autonomous decisions.

---

## 2. Required Workflow

Every task must follow these phases in order. Do not skip or combine them.

### Phase 1 — PLAN

Before writing a single line of code:

- Explain the implementation approach in plain language
- List every file that will be created or modified
- Identify any blockers, missing information, or risks
- Flag any ambiguity that requires a decision before proceeding

### Phase 2 — STOP AND WAIT

After presenting the plan:

- Do **not** write or modify any code
- Do **not** assume approval
- Wait for the user to explicitly say to proceed

### Phase 3 — IMPLEMENT

Only after explicit approval:

- Implement exactly what was described in the plan
- Stay strictly within the scope of the current slice or sub-task
- Do not add anything beyond what was approved

### Phase 4 — VERIFY

After implementation:

- Map the implementation back to the acceptance criteria
- Confirm nothing extra was added
- Call out any deviations from the plan, however small

### Phase 5 — TEST HANDOFF

After verifying:

- Provide exact manual test steps the user can follow
- Include any required commands (e.g. `npm run dev`, database resets)
- Be specific — do not say "test the feature," say what to click, what to expect, and what the result should be
- **Stop and wait** for the user to confirm the test result

### Phase 6 — DO NOT PROCEED

- Do not move to the next sub-task automatically
- A sub-task is only complete when the user confirms the test passed or explicitly skips testing
- If the user says "continue," treat it as confirmation to move to the next sub-task

---

## 3. Core Rules

These rules apply at all times, without exception.

- **Never write code before receiving explicit approval.** A plan is not approval.
- **Never expand scope.** If implementing a sub-task reveals related work, stop and flag it — do not do it.
- **Never add features not defined in PRODUCT.md.** If it is not in the spec, it does not exist.
- **Never introduce an abstraction unless the same pattern appears in at least three places.** Duplication is acceptable early; premature abstraction is not.
- **Never introduce a new dependency without a clear, stated reason.** If a built-in or existing tool can do it, use that.
- **Keep implementations minimal and direct.** The simplest code that satisfies the requirement is the correct code.
- **Prefer clarity over cleverness.** Readable, obvious code beats elegant code.
- **Do not add comments, docstrings, or type annotations to code you did not change.**
- **Do not refactor existing code unless refactoring is the explicit task.**

---

## 4. Vertical Slice Architecture

Each feature is a self-contained vertical slice under `src/features/<slice>/`.

A slice owns:

- Its UI components (`components/`)
- Its server actions (`actions.ts`)
- Its database queries (`queries.ts`)

Rules:

- Do not share logic across slices until the same pattern appears in at least three slices
- Do not start a new slice until the current one is fully implemented, verified, and tested
- Do not create shared utilities, hooks, or helpers speculatively

### Slice Delivery Order

Deliver slices in this exact order. Do not skip ahead.

1. `auth`
2. `video-upload`
3. `feed`
4. `likes`
5. `profile`

---

## 5. Task Execution Discipline

- Work on **one sub-task at a time**
- Break large tasks into the smallest meaningful steps before starting
- Do not make changes across multiple features in a single implementation step
- Prefer safe, incremental changes over large multi-file diffs
- If a change touches more than one slice, stop and question whether the scope is correct

---

## 6. Error Handling Rules

- Only implement error handling that is **explicitly defined in PRODUCT.md**
- Do not introduce a global error system, error boundaries, or error logging infrastructure
- Do not build elaborate error states for edge cases not described in the spec
- Keep error handling minimal: inline form errors where specified, nothing more

Defined error scenarios (from PRODUCT.md):

- Registration validation errors (duplicate email, age gate, password too short)
- Login failure (invalid credentials)
- Upload client-side validation errors (file type, size, duration)
- Upload server-side failure

---

## 7. Testing Philosophy

- Every sub-task must be testable manually by the user before moving on
- Always provide test instructions after implementation — never skip this step
- Test instructions must be specific: what to do, what to enter, what to expect
- Do not add automated tests unless explicitly asked
- Wait for the user to confirm test results before proceeding

---

## 8. What Not To Do

- **No extra features.** If it is not in PRODUCT.md, do not build it.
- **No performance optimizations.** This is a local MVP. Optimize nothing speculatively.
- **No loading skeletons, animations, or visual polish** until the core feature functions correctly.
- **No refactoring beyond the current task.** Cleaning up nearby code is out of scope.
- **No new dependencies** without explicit justification and user approval.
- **No environment variables or config layers** that are not immediately required.
- **No Docker, CI/CD pipelines, or deployment configuration.**
- **No automated tests** unless the user asks for them.
- **No comments or documentation** beyond what is needed to understand non-obvious logic.

---

## Tech Stack (Do Not Deviate)

| Concern       | Choice                               |
| ------------- | ------------------------------------ |
| Framework     | Next.js 14+ (App Router, full-stack) |
| Language      | TypeScript (strict mode)             |
| Styling       | Tailwind CSS (mobile-first)          |
| Database      | SQLite via Prisma ORM                |
| Auth          | iron-session (cookie-based sessions) |
| Video storage | Local disk at `public/uploads/`      |

Do not introduce additional libraries without a clear reason that cannot be met by what is already listed.

---

## TypeScript Rules

- Strict mode is enabled. No `any`. No `@ts-ignore` without an explanatory comment.
- Define types close to where they are used. Do not create a global types file.

## Server vs. Client

- Prefer React Server Components for data fetching and layout.
- Use `"use client"` only when interactivity or browser APIs are required.
- Use Server Actions for all mutations (form submissions, likes, uploads).
- Use API routes only for cases that cannot use Server Actions (e.g. streaming).

## Database

- All database access goes through Prisma. No raw SQL.
- Write queries inside the feature slice that owns them.

## Styling

- Use Tailwind utility classes directly. No CSS files unless absolutely necessary.
- Design for 375px mobile width first. Desktop is secondary.
- The feed uses full-screen snap-scroll: each video occupies `100dvh`.
