# Novel-Encyclopedia

This repository contains an Angular project located under `encyclopedia/`. The application is automatically deployed to Firebase Hosting on each push to the `main` branch via GitHub Actions. The production build output is located in `encyclopedia/dist/encyclopedia/browser` and served through Firebase Hosting.

To enable deployments, create the following GitHub secret in your repository:

- `FIREBASE_TOKEN` – Firebase CI token generated via `firebase login:ci`


