# Novel-Encyclopedia

This repository contains an Angular Universal project located under `encyclopedia/`.
Server‑side rendering is handled by a Firebase Cloud Function exposed via Firebase
Hosting.  The GitHub Actions workflow builds the Universal bundle and deploys
both the hosting assets and Cloud Function on each push to the `main` branch.

### Deploy manually

```bash
cd encyclopedia
npm run deploy
```

The command builds the client and server bundles, compiles the Cloud Function
under `functions/` and runs `firebase deploy` using the configuration in
`firebase.json`.



