import * as functions from 'firebase-functions';
const { app } = require('../dist/encyclopedia/server/main');

export const ssr = functions.region('us-central1').https.onRequest(app());
