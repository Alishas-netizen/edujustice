# EduJustice

EduJustice is an independent education-transparency and student-rights platform. It helps students understand education corruption, submit authenticated complaints in anonymous or identified mode, upload protected evidence, track case status, and access verified transparency information.

> EduJustice is not a government organization and does not claim official affiliation.

## Open the project correctly

Do **not** double-click the source `index.html`; a Vite application must run through its development server or a deployed URL.

On Windows, double-click `START_EDUJUSTICE.cmd`. It installs dependencies when needed, starts the local server, and opens the working site automatically.

Alternatively:

```bash
npm install
npm start
```

## Features

- Premium responsive cyber-civic interface
- Firebase email/password authentication
- Authenticated complaint ownership and private tracking
- Anonymous or identified complaint modes
- Protected JPG, PNG, and PDF evidence upload (10 MB limit)
- User dashboard with complaint history
- Admin dashboard protected by Firebase custom claims
- Status workflow: Submitted → Under Review → Investigation → Action Taken → Resolved
- Firestore-based verified statistics with honest empty states
- Official education and grievance resources
- Accessibility, reduced-motion, mobile navigation, and responsive data tables
- Express API with security headers, CORS allow-list, rate limiting, and health checks

## Technology

React 19, Vite, TypeScript, Tailwind CSS, Framer Motion, Lucide React, Recharts, React Hook Form, Zod, Firebase Authentication, Cloud Firestore, Firebase Storage, Node.js, and Express.

## Local setup

```bash
npm install
cp .env.example .env
npm run dev
```

Run the frontend and API together:

```bash
npm run dev:all
```

Quality checks:

```bash
npm run check
```

## Firebase setup

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Add a Web App and copy its public web configuration into `.env` using `.env.example` as the template.
3. In Authentication → Sign-in method, enable Email/Password.
4. Create a Cloud Firestore database.
5. Enable Firebase Storage.
6. Install and authenticate the Firebase CLI: `npm install -g firebase-tools` then `firebase login`.
7. Select the project: `firebase use --add`.
8. Deploy security configuration: `firebase deploy --only firestore:rules,firestore:indexes,storage`.

Firebase web configuration values identify the Firebase project but should still be supplied through environment variables. Never commit `.env`, service-account JSON, private keys, passwords, or access tokens.

## Collections

### `users/{uid}`

`uid`, `name`, `email`, `role`, `createdAt`

### `complaints/{documentId}`

`complaintId`, `userId`, `anonymous`, `issueType`, `institution`, `description`, `incidentDate`, `evidencePaths`, `status`, `createdAt`, `updatedAt`, `resolutionNotes`

### `statistics/platform`

Aggregated verified platform counts and chart datasets. This document is public-readable and admin-write only. Do not put user details in it.

## Admin configuration

Admin authorization uses the custom claim `admin: true`. It cannot be granted from the frontend. Set it only from a trusted Admin SDK environment or Cloud Function, then have the user sign out and back in to refresh their token.

Example trusted Admin SDK operation:

```ts
await getAuth().setCustomUserClaims(uid, { admin: true })
```

The `users.role` field is informational; Firestore and Storage rules rely on the signed Firebase token custom claim.

## Security model

- A complaint can only be created for the authenticated user.
- Only its owner or an admin-token holder can read a complaint.
- Complaint status and resolution notes can only be changed by an admin.
- Evidence paths are protected by owner/admin Storage rules; permanent public URLs are not stored.
- Files are allow-listed by MIME type and limited to 10 MB in both UI and Storage rules.
- Users cannot grant themselves admin access or alter protected identity fields.
- Deletion is disabled in the initial policy to preserve complaint integrity and auditability.

Run Firebase Emulator Suite rule tests before production launch. Configure retention, incident response, legal review, and a real support contact for the target jurisdiction.

## Deployment

### Frontend / Firebase Hosting

```bash
npm run build
firebase deploy --only hosting
```

For Vercel, set the `VITE_FIREBASE_*` variables in project settings and keep the SPA fallback enabled.

### Express API

Deploy `server/index.ts` to a Node-compatible platform. Set `PORT` and an exact comma-separated `CLIENT_ORIGIN` allow-list. The frontend base URL should be provided using `VITE_API_BASE_URL`; no localhost URL is hardcoded.

## Project structure

```text
src/
  components/   reusable layout, auth, and UI elements
  contexts/     authentication state
  data/         awareness and rights content
  firebase/     client initialization
  pages/        public, user, and admin routes
  services/     complaint and evidence operations
  types/        shared application types
server/         Express API
firestore.rules
storage.rules
firestore.indexes.json
firebase.json
```

## Production checklist

- Configure real Firebase environment variables
- Deploy and emulator-test Firestore/Storage rules
- Create required Firestore composite indexes
- Configure the admin custom claim from a trusted environment
- Replace the example contact address with a monitored mailbox
- Complete privacy/legal review for the deployment jurisdiction
- Set data retention and evidence-access procedures
- Run `npm run check` and test at 360, 390, 768, 1024, and 1440 px
