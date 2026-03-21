# CLAUDE.md — Development Execution Rules

This file defines **how to build**, not what to build. The product spec lives in `PRODUCT.md`. Slice definitions live in `docs/slices/`. This file governs execution discipline, workflow, and constraints for every task in this project.

These rules are non-negotiable. Follow them exactly.

---

## Required Reading Before Any Task

Before writing a single line of code, you must read:

1. `PRODUCT.md` — authoritative product spec
2. `CLAUDE.md` — this file
3. The current slice file in `docs/slices/` for the feature being implemented

Do not rely on memory. Do not assume you remember the spec. Re-read every time.

---

## Required Workflow

Every task follows this exact sequence. Do not skip or reorder phases.

```
PLAN → STOP → [WAIT FOR APPROVAL] → IMPLEMENT → VERIFY → TEST HANDOFF → STOP
```

### Phase 1 — PLAN

Before writing any code:

- State what you are about to implement
- List every file you intend to create or modify
- Describe the approach in plain language
- Identify any ambiguities or missing information
- Confirm the implementation stays within the current slice scope

### Phase 2 — STOP

After planning, **stop completely**.

Do not write code. Do not make "small preliminary changes." Do not create files. Wait for explicit user approval.

If the user has not approved the plan, you must not proceed.

### Phase 3 — IMPLEMENT

Only after explicit user approval:

- Implement exactly what was described in the plan
- Touch only the files listed in the plan
- Make no additions, no improvements, no refactors beyond the approved scope
- If you discover the task requires changes to files not in the plan, stop and report back

### Phase 4 — VERIFY

After implementation:

- Confirm every acceptance criterion from the slice file is satisfied
- Confirm no out-of-scope changes were made
- Confirm no new dependencies were added without approval

### Phase 5 — TEST HANDOFF

After verification:

- Provide exact manual test steps the user must follow to confirm the feature works
- These must match or extend the Manual Test Steps in the slice file
- State clearly: "Please test and confirm before I continue."
- **Do not proceed to the next task until the user confirms the tests passed.**

### Phase 6 — STOP

You are done. Do not start the next slice. Do not anticipate the next task. Wait.

---

## Core Rules

### No Code Without Approval

Never write code before presenting a plan and receiving explicit approval. This applies to every task, no matter how small.

### No Scope Expansion

Implement only what is defined in the current slice. If something is useful but not in scope, do not build it. If you think scope should expand, say so and wait for a decision.

### No Assumptions

If a requirement is unclear, stop and ask. Do not guess. Do not infer intent and proceed. Ambiguity is a stop condition.

### No Extra Features

Do not add features not defined in `PRODUCT.md`. Not even small conveniences. Not even "obvious" improvements. The product spec is the ceiling.

### No Premature Abstraction

Do not create shared utilities, base components, hooks, or helper functions unless they are explicitly required by the current task. Solve the immediate problem directly.

### Minimal Implementation Only

Write the simplest code that satisfies the acceptance criteria. Prefer three lines of direct code over one line of clever abstraction. Do not engineer for hypothetical future requirements.

---

## Tech Stack

Use only these technologies. Do not introduce new dependencies without explicit user approval.

| Layer            | Technology      |
| ---------------- | --------------- |
| Framework        | Next.js 16.2.0  |
| Language         | TypeScript      |
| Styling          | Tailwind CSS v4 |
| Database ORM     | Prisma          |
| Auth / Session   | iron-session    |
| Password hashing | bcryptjs        |
| Runtime          | Node.js         |

Next.js 16.2.0 may differ significantly from your training data. Before writing any Next.js code, read `node_modules/next/dist/docs/` for the relevant APIs. Heed all deprecation notices.

Do not install new packages. Do not use fetch polyfills, utility libraries, component libraries, animation libraries, or any third-party package not listed above.

---

## Vertical Slice Architecture

### One Slice at a Time

Each feature is built as a complete vertical slice. A slice owns everything needed to deliver its feature end-to-end: page, form, server action, query, and any required UI components.

Do not start a new slice until the current slice is complete and confirmed by the user.

### Slice Ownership

Each slice is responsible for its own:

- Page component(s)
- Server actions
- Database queries
- UI components specific to the feature
- Error states defined in `PRODUCT.md`

### Slice Order

Slices must be implemented in the order defined in `docs/slices/`. Do not reorder. Do not skip ahead. The order exists because later slices depend on earlier ones.

Current slice order:

1. `docs/slices/auth/01-registration.md`
2. `docs/slices/auth/02-login.md`
3. `docs/slices/auth/03-logout.md`
4. _(subsequent slices to be added)_

### No Cross-Slice Work

Do not implement anything that belongs to a future slice, even if it appears necessary. If a future dependency is missing, report it. Do not build ahead.

---

## Task Decomposition Rules

### Break Large Tasks Down

If a slice contains multiple distinct pieces (e.g., form + server action + redirect + error state), treat each as a sub-task. Plan and get approval for each sub-task individually.

### Each Sub-Task Must Be Independently Testable

Do not bundle changes that cannot be verified independently. If the user cannot test what you just built in isolation, the sub-task is too large.

### File Count Rule

Prefer changes that touch three or fewer files. If your plan requires modifying more than three files, consider whether the task should be decomposed further. Always explain why more files are necessary if you exceed this threshold.

### One Sub-Task at a Time

Complete and verify one sub-task before starting the next. Do not batch multiple sub-tasks into a single implementation step.

---

## Stop Conditions

You must stop immediately and report back to the user if any of the following are true:

- **Ambiguity:** A requirement can be interpreted more than one way
- **Missing information:** Something needed to implement the task is not defined in the slice or product spec
- **Scope expansion:** Completing the task requires building something outside the current slice
- **Too many files affected:** The task requires touching more files than can be justified
- **Unexpected state:** You encounter existing code or structure that conflicts with the plan
- **Dependency required:** The task cannot be completed without adding a new package

Do not work around these conditions. Do not make a judgment call and proceed. Stop and ask.

---

## Testing Philosophy

### Manual Test Required for Every Sub-Task

Every sub-task ends with a manual test handoff. This is not optional.

### Exact Test Steps Required

Test steps must be specific and reproducible. Do not write vague instructions like "verify it works." Write step-by-step instructions a human can follow without interpretation.

Example of acceptable test steps:

```
1. Start the dev server with `npm run dev`
2. Navigate to /register
3. Submit the form with email: test@example.com, password: password123, date of birth: 2000-01-01
4. Confirm redirect to /register/success
5. Confirm the page displays a confirmation message and a link to /login
```

### User Confirmation Required Before Continuing

After providing test steps, explicitly state:

> "Please run these tests and confirm they pass before I continue."

Do not proceed to the next sub-task until the user responds with confirmation.

---

## Error Handling Rules

### Only Implement Defined Errors

Implement error handling only for scenarios explicitly listed in `PRODUCT.md` under "Error Handling Scope":

- Registration form validation errors (duplicate email, age gate, password too short)
- Login failure (invalid credentials)
- Upload client-side validation errors (file type, size, duration)
- Upload server-side failure

### No Global Error System

Do not create a global error boundary, error logger, error reporting service, or shared error utility. Handle errors locally, inline, exactly where they occur.

### No Defensive Overengineering

Do not add error handling for scenarios that are not defined in `PRODUCT.md`. Do not handle edge cases that cannot occur in this application. Trust the framework's default behavior for everything not explicitly in scope.

---

## Execution Discipline

### Small, Safe Changes

Each change must be small enough that if it breaks something, the cause is immediately obvious. Do not batch multiple logical changes into one commit or implementation step.

### Do Not Refactor While Implementing

If you notice existing code that could be improved, do not refactor it. Complete the current task. Report the observation if relevant. Refactoring is a separate, explicitly approved task.

### Do Not Add Comments or Documentation

Do not add inline comments, JSDoc, or documentation unless explicitly asked. Do not add README files. Do not explain code in comments that is clear from reading it.

### Do Not Add Types for Coverage

Add TypeScript types only where necessary for correctness. Do not add types to code you did not write. Do not add exhaustive type annotations to satisfy a style preference.

---

## Out of Scope — Do Not Build

The following are permanently out of scope for this project. Do not implement, stub, or prepare infrastructure for any of these, even partially:

- Comments
- Messaging or chat
- Following or followers
- Notifications
- Search
- Hashtags
- Recommendation algorithms
- Video editing
- Live streaming
- Ads
- Moderation
- Email verification
- Password reset
- Profile editing
- Caption editing
- Video deletion
- Analytics or logging
- Multi-device session management
- Upload progress bars, chunking, or resume
- "Remember me" on login
- Real-time updates of any kind

If a user request touches any of these areas, decline and explain that it is out of scope per `PRODUCT.md`.
