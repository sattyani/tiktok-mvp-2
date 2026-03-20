# TikTok MVP — Product Specification

## Purpose

A simplified TikTok-style short-video web application for internal testing.

The goal is a functional prototype demonstrating the core short-video experience: watching, uploading, and interacting with videos. Mobile-first. Internal use only.

---

## Target Users

Internal test users only. Not intended for public release.

---

## Core User Flow

A test user can complete the full end-to-end flow:

1. Register a new account
2. Log in
3. Upload a short video with an optional caption
4. Browse videos in the feed
5. Like and unlike videos
6. View their uploaded videos on their profile

---

## Pages and Routes

| Route               | Access               | Description                                                                |
| ------------------- | -------------------- | -------------------------------------------------------------------------- |
| `/`                 | Public               | Redirects to `/login` for unauthenticated users, `/feed` for authenticated |
| `/login`            | Unauthenticated only | Login form. Authenticated users are redirected to `/feed`                  |
| `/register`         | Unauthenticated only | Registration form. Authenticated users are redirected to `/feed`           |
| `/register/success` | Public               | Post-registration confirmation page                                        |
| `/feed`             | Authenticated        | Main video feed                                                            |
| `/upload`           | Authenticated        | Video upload form                                                          |
| `/profile`          | Authenticated        | The logged-in user's own profile                                           |

All routes except `/login` and `/register` require authentication. Unauthenticated access to any protected route redirects to `/login`.

---

## Navigation

- A **bottom navigation bar** is always visible on authenticated pages (`/feed`, `/upload`, `/profile`).
- The bottom nav has three items: **Feed**, **Upload**, **Profile**.
- The bottom nav is **not shown** on `/login`, `/register`, or `/register/success`.

---

## Feature Specifications

---

### 1. Authentication

#### Registration

- Fields: **email**, **password**, **date of birth**
- No username required. Display name is derived from the email prefix (e.g. `samir@example.com → samir`).
- **Password rule:** Minimum 8 characters. No complexity requirements.
- Email must be a valid email format (basic validation)
- **Age gate:** User must be 13 or older (validated from date of birth). Registration fails with an inline error if the user is under 13.
- **Duplicate email:** Registration fails with an inline form error: "An account with this email already exists."
- **On success:** Redirect to `/register/success`, which displays a confirmation message and a link to log in. No automatic session is created at registration.

#### Login

- Fields: **email**, **password**
- **On failure:** Show a single generic inline error: "Invalid email or password." Do not distinguish between unknown email and wrong password.
- **On success:** Redirect to the originally requested protected route. If no prior destination, redirect to `/feed`.

#### Logout

- A logout button is visible on the profile page.
- **On logout:** Session is cleared and user is redirected to `/login`.

#### Session

- Session persists via a signed HTTP-only cookie until logout or expiry.
- No "remember me" option.
- No multi-device or multi-session management.
- If a session expires mid-use, the user is redirected to `/login` on their next page load or action. No proactive detection.

---

### 2. Video Upload

#### Constraints (enforced client-side)

- **Format:** MP4 only (enforced via file input `accept` attribute)
- **Max duration:** 60 seconds
- **Max file size:** 100 MB

#### Caption

- Optional. Maximum 200 characters.

#### Validation Feedback

- If a client-side constraint is violated (wrong format, too large, too long), an inline error message is shown directly below the file input. The upload button remains disabled until the error is resolved.
- Users are not warned before selecting a file — validation runs after selection.

#### Upload Behavior

- No progress bar, chunking, or resume support. If the upload fails, the user sees an inline error on the upload form and must retry manually.
- On server-side failure: show an inline error on the upload form (e.g. "Upload failed. Please try again.").
- **On success:** Redirect to `/profile`.
- Videos go live immediately after upload. No processing or review step.
- Video files are stored as `public/uploads/<uuid>.mp4`. UUID guarantees uniqueness; no duplicate-file handling is needed.

---

### 3. Video Feed

#### Content Rules

- Shows videos from **all users except the currently logged-in user**.
- Ordered **newest first** (reverse chronological).
- Initial load: first 10 videos.
- Infinite scroll loads the next 10 videos when the user approaches the end.
- No caching or prefetch optimization.

#### Empty and End States

- **No videos available:** Show an empty state message — "No videos yet" — with a link to the upload page.
- **All videos loaded:** Show an end-of-feed message (e.g. "You've seen all videos") below the last video. No looping.
- **Loading next batch:** A spinner is shown below the last video while the next batch is fetching.

#### Playback Behavior

- Each video occupies the full screen height (`100dvh`). Vertical snap-scroll between videos.
- Videos **autoplay** when in view and **loop** automatically.
- Only one video plays at a time. Videos not in view are paused.
- Videos autoplay **muted** by default (required by browsers).

#### Audio

- A **mute/unmute toggle** is visible on each video.
- If the user unmutes a video, the **unmuted state carries over** to subsequent videos for the rest of the session.

#### Video Card Overlay

Each video card in the feed displays the following over the video:

- Mute / unmute toggle
- Like button with current like count
- Caption text (if present)
- Uploader's display name

---

### 4. Likes

- Authenticated users can **like or unlike** any video in the feed.
- A user **cannot like their own videos**. (Own videos don't appear in the feed; the profile overlay has no like button.)
- **Like count** is shown on each video card in the feed.
- Like state (whether the current user has liked a video) is loaded at page/data fetch time. No real-time updates.

---

### 5. Profile

#### Header

- Displays: **display name** and **video count**.
- No total like count shown.

#### Video Grid

- Uploaded videos are shown in a **thumbnail grid** (newest first).
- Thumbnails are clean — no like count or metadata overlaid.
- **Empty state:** "You haven't uploaded any videos yet."

#### Video Overlay Player

- Tapping a thumbnail opens a **full-screen overlay player**.
- The overlay displays:
  - The video (autoplaying, looped, muted by default)
  - Caption text (if present)
  - A **close / back button** to dismiss the overlay and return to the profile grid
- No like button in the overlay. No playback controls beyond the browser defaults.

#### Restrictions

- Users can only view their **own** profile.
- Users **cannot** delete videos, edit captions, edit their profile, or change their password.

---

## Error Handling Scope

Only these error scenarios require user-facing feedback:

- Registration form validation errors (duplicate email, age gate, password too short)
- Login failure (invalid credentials)
- Upload client-side validation errors (file type, size, duration)
- Upload server-side failure

No global error system. No error pages beyond what the framework provides by default.

---

## Out of Scope

The following are intentionally excluded from this MVP:

- Comments
- Messaging / chat
- Following / followers
- Notifications
- Recommendation algorithms / personalization
- Search
- Hashtags
- Video editing tools
- Live streaming
- Ads
- Moderation systems
- Email verification
- Password reset
- Profile editing
- Caption editing
- Video deletion
- Analytics, logging, or user tracking
- Multi-device session management
- Upload progress, chunking, or resume

---

## Success Criteria

The MVP is considered complete when an internal test user can:

1. Register a new account (with age gate enforced)
2. Log in and be redirected appropriately
3. Upload an MP4 video (with client-side validation enforced)
4. Browse other users' videos in a full-screen snap-scroll feed
5. Like and unlike videos, seeing the count update
6. View their own uploaded videos in a profile grid
7. Tap a thumbnail to watch it in a full-screen overlay
8. Log out and be redirected to the login page
