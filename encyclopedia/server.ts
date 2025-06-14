import 'zone.js/node';
import express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';
import { APP_BASE_HREF } from '@angular/common';
import { renderApplication, provideServerRendering } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './src/app/app.config';
import { AppComponent } from './src/app/app.component';

export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/encyclopedia/browser');
  const indexHtml = readFileSync(join(distFolder, 'index.html')).toString();

  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  server.get('*', async (req: express.Request, res: express.Response) => {
    const html = await renderApplication(() =>
      bootstrapApplication(AppComponent, {
        providers: [
          provideServerRendering(),
          { provide: APP_BASE_HREF, useValue: req.baseUrl },
          ...appConfig.providers
        ]
      }), {
        document: indexHtml,
        url: req.originalUrl,
      });
    res.send(html);
  });

  return server;
}

function run() {
  const port = process.env['PORT'] || 4000;

  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

if (require.main === module) {
  run();
}
