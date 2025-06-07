# Novel-Encyclopedia

This repository contains an Angular project located under `encyclopedia/`. The application is automatically deployed to Firebase Hosting on each push to the `main` branch via GitHub Actions. The production build output is located in `encyclopedia/dist/encyclopedia/browser` and served through Firebase Hosting.

To enable deployments, create the following GitHub secrets in your repository:

- `FIREBASE_SERVICE_ACCOUNT` – JSON service account for your Firebase project
- `FIREBASE_PROJECT_ID` – Firebase project ID


