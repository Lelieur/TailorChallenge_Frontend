I audited the repo config + key runtime paths and ran checks locally.

- npm run build: passes (1 hook warning)
- npm run typecheck: passes
- npm run lint: unusable right now because it lints .next output and reports ~1944 issues
- scoped lint (src + configs): only 2 warnings, so you can get to clean lint quickly

What to implement/change/update (priority order)

1. [P0] Fix lint pipeline so CI signal is real

- package.json:9 uses eslint ., which includes generated .next files and explodes noise.
- Change lint scripts to only lint source/config paths (or add .eslintignore for .next, node_modules).
- File: package.json:9

2. [P0] Migrate auth storage away from localStorage token

- You store auth token in browser storage (src/components/AuthForms/LoginForm/LoginForm.tsx:62), then read it in interceptors.
- In 2026 Next/App Router best practice is server-set session cookies (HttpOnly, Secure, SameSite) via cookies() APIs.
- Files: src/components/AuthForms/LoginForm/LoginForm.tsx:62, src/context/auth.context.tsx:43, src/services/\*.services.ts

3. [P0] Upgrade to Next.js 16 Active LTS

- You’re on next@15.5.12 (package.json:18).
- As of Oct 21, 2025, Next 16 is Active LTS; 15 is Maintenance LTS.
- Also account for 16 changes (next lint removal, Turbopack default, etc.).
- File: package.json:18

4. [P1] Move data fetching to Server Components where possible

- You fetch restaurant/user data in client effects (RestaurantsList, users/[id], map).
- In App Router, prefer server fetch + pass data to client islands only for interactivity.
- Files: src/components/RestaurantComponents/RestaurantsList/RestaurantsList.tsx:1, src/app/users/[id]/page.tsx:1, src/components/GoogleMapsAPI/CustomMap/CustomMap.tsx:23

5. [P1] Fix real logic/type bugs

- typeof window !== undefined is incorrect; should compare to string "undefined".
  - src/services/auth.services.ts:14
- localStorage.setItem("userData", userData) stores object incorrectly.
  - src/components/AuthForms/LoginForm/LoginForm.tsx:63
- Stars can produce NaN when ratings is empty (divide by 0).
  - src/components/Stars/Stars.tsx:10
- User and Restaurant interfaces don’t match usage (favoriteRestaurants cast to Restaurant, reviews?: []).
  - src/interfaces/User.interface.ts:5, src/interfaces/Restaurant.interface.ts:22, src/app/users/[id]/page.tsx:47
- ReviewsList uses non-unique key review.name.
  - src/components/ReviewComponents/ReviewsList/ReviewsLists.tsx:8

6. [P1] Replace deprecated images.domains with strict remotePatterns

- images.domains is deprecated since Next 14.
- File: next.config.ts:6

7. [P1] Use next/font/local instead of manual @font-face

- Better optimization, self-hosting behavior, and CLS control.
- Files: src/styles/globals.css:3, src/app/layout.tsx:1

8. [P2] Tailwind v4 cleanup

- You’re on Tailwind v4, but still keeping v3-style tailwind.config.ts content.
- v4 supports automatic source detection and CSS-first config (@theme, @source).
- Files: tailwind.config.ts:1, src/styles/tailwind.css:1

9. [P2] Fix form/button semantics and UX

- Multiple <button> inside <Link> patterns; better to style Link directly or use button with router.
- In step-form, navigation buttons should be type="button" to avoid accidental submits.
- Files: src/app/page.tsx:20, src/components/AuthForms/SignUpForm/SignUpForm.tsx:136

10. [P2] Consolidate API client layer

- You have multiple axios service classes with repeated interceptor/baseURL logic.
- Create shared typed client + error normalization + Zod schema validation for responses.
- Files: src/services/\*.services.ts

11. [P2] Naming/maintainability cleanup

- Typos in file/type names: Review.inteface.ts, GogleMapsApiProvider, AutocompleteAddres.
- README has duplicated numbering and outdated setup wording.
- Files: src/interfaces/Review.inteface.ts, src/providers/GogleMapsApiProvider.tsx, src/components/GoogleMapsAPI/AutocompleteAddress/AutocompleteAddress.tsx:5, README.md:17

12. [P2] Add test baseline

- No app tests currently. Add:

1. unit tests for helpers/components
2. integration for auth/forms
3. e2e smoke for login/restaurants/review flows

Suggested rollout

1. Week 1: lint pipeline fix, type fixes, auth/security decisions, quick bug fixes (window, NaN, keys, button types).
2. Week 2: Next 16 upgrade + image/font migration + Tailwind v4 cleanup.
3. Week 3: server-first data fetching refactor + test suite baseline.

Sources used

- Next.js 16 release (Oct 21, 2025): https://nextjs.org/blog/next-16
- Next.js support policy (16 Active LTS, 15 Maintenance): https://nextjs.org/support-policy
- Next.js upgrading docs (next upgrade, 2026): https://nextjs.org/docs/app/getting-started/upgrading
- Next Image deprecation (images.domains): https://nextjs.org/docs/pages/api-reference/components/image
- Next font optimization (next/font/local): https://nextjs.org/docs/app/api-reference/components/font
- Next auth guide (cookies/session recommendations): https://nextjs.org/docs/app/guides/authentication
- Next server/client + fetching guidance: https://nextjs.org/docs/app/getting-started/server-and-client-components and https://nextjs.org/docs/app/getting-started/fetching-data
- Tailwind v4 (CSS-first + automatic content detection): https://tailwindcss.com/blog/tailwindcss-v4 and https://tailwindcss.com/docs/functions-and-directives

If you want, I can apply this in code as a phased PR plan starting with P0/P1 only.
